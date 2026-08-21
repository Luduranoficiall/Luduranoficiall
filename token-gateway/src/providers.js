// Monta a lista de provedores disponíveis a partir das SUAS chaves no .env.
// Cada provedor só entra na lista se você preencheu a chave dele — nada de
// credencial de assinatura, nada de conta compartilhada.

function buildProviderChain() {
  const candidates = [
    { name: "openai", key: process.env.OPENAI_API_KEY, baseUrl: process.env.OPENAI_BASE_URL },
    { name: "gemini", key: process.env.GEMINI_API_KEY, baseUrl: process.env.GEMINI_BASE_URL },
    { name: "deepseek", key: process.env.DEEPSEEK_API_KEY, baseUrl: process.env.DEEPSEEK_BASE_URL },
    { name: "groq", key: process.env.GROQ_API_KEY, baseUrl: process.env.GROQ_BASE_URL },
  ];
  return candidates.filter((p) => p.key && p.baseUrl);
}

module.exports = { buildProviderChain };
