require("dotenv").config();
const express = require("express");
const fetch = require("node-fetch");
const { compressMessages, estimateTokens } = require("./compression");
const { buildProviderChain } = require("./providers");

const app = express();
app.use(express.json({ limit: "20mb" }));

const PORT = process.env.PORT || 8787;
const GATEWAY_KEY = process.env.GATEWAY_KEY;
const MAX_HISTORY_TOKENS = Number(process.env.MAX_HISTORY_TOKENS || 6000);

const stats = { requests: 0, tokensInBefore: 0, tokensInAfter: 0 };

app.use((req, res, next) => {
  if (!GATEWAY_KEY) return next(); // sem chave configurada = uso local sem trava
  const auth = req.headers.authorization || "";
  if (auth === `Bearer ${GATEWAY_KEY}`) return next();
  return res.status(401).json({ error: "Chave do gateway inválida. Configure Authorization: Bearer <GATEWAY_KEY>." });
});

// Escolhe explicitamente um provedor se o model vier como "provedor/modelo",
// senão tenta cada provedor disponível em ordem até um responder.
function resolveTarget(model, chain) {
  if (model && model.includes("/")) {
    const [providerName, ...rest] = model.split("/");
    const found = chain.find((p) => p.name === providerName);
    if (found) return { providers: [found], model: rest.join("/") };
  }
  return { providers: chain, model };
}

app.post("/v1/chat/completions", async (req, res) => {
  const chain = buildProviderChain();
  if (chain.length === 0) {
    return res.status(500).json({ error: "Nenhum provedor configurado. Preencha ao menos uma chave no .env." });
  }

  const before = JSON.stringify(req.body.messages || []).length / 4;
  const compressedMessages = compressMessages(req.body.messages || [], MAX_HISTORY_TOKENS);
  const after = JSON.stringify(compressedMessages).length / 4;

  stats.requests += 1;
  stats.tokensInBefore += before;
  stats.tokensInAfter += after;

  const { providers, model } = resolveTarget(req.body.model, chain);
  const payload = { ...req.body, model, messages: compressedMessages };

  let lastError = null;
  for (const provider of providers) {
    try {
      const upstream = await fetch(`${provider.baseUrl}/chat/completions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${provider.key}`,
        },
        body: JSON.stringify(payload),
      });

      if (upstream.status === 429 || upstream.status >= 500) {
        lastError = `${provider.name} respondeu ${upstream.status}, tentando próximo provedor...`;
        continue;
      }

      const data = await upstream.json();
      res.setHeader("X-Gateway-Provider", provider.name);
      res.setHeader("X-Gateway-Tokens-Saved", Math.max(0, Math.round(before - after)));
      return res.status(upstream.status).json(data);
    } catch (err) {
      lastError = `${provider.name} falhou: ${err.message}`;
    }
  }

  return res.status(502).json({ error: "Todos os provedores falharam.", detail: lastError });
});

app.get("/stats", (req, res) => {
  const saved = stats.tokensInBefore - stats.tokensInAfter;
  const pct = stats.tokensInBefore > 0 ? ((saved / stats.tokensInBefore) * 100).toFixed(1) : "0.0";
  res.json({
    requisicoes: stats.requests,
    tokens_estimados_antes: Math.round(stats.tokensInBefore),
    tokens_estimados_depois: Math.round(stats.tokensInAfter),
    tokens_economizados: Math.round(saved),
    percentual_economizado: `${pct}%`,
  });
});

app.listen(PORT, () => {
  const chain = buildProviderChain();
  console.log(`token-gateway rodando em http://localhost:${PORT}`);
  console.log(`Provedores ativos: ${chain.map((p) => p.name).join(", ") || "NENHUM — configure o .env"}`);
});
