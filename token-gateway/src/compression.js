// Compressão conservadora: nunca toca no conteúdo de blocos de código,
// só reduz espaços redundantes, linhas duplicadas e histórico antigo.

function estimateTokens(text) {
  // Aproximação padrão da indústria: ~4 caracteres por token.
  return Math.ceil((text || "").length / 4);
}

function collapseBlankLines(text) {
  return text.replace(/\n{3,}/g, "\n\n").replace(/[ \t]+\n/g, "\n");
}

function dedupeRepeatedBlocks(text) {
  const blocks = text.split(/\n\n+/);
  const seen = new Set();
  const out = [];
  for (const block of blocks) {
    const key = block.trim();
    if (key.length > 80 && seen.has(key)) continue; // bloco grande repetido, pula
    if (key.length > 80) seen.add(key);
    out.push(block);
  }
  return out.join("\n\n");
}

function compressText(text) {
  if (!text) return text;
  return dedupeRepeatedBlocks(collapseBlankLines(text));
}

// Comprime cada mensagem individualmente e depois corta o histórico mais antigo
// até caber no orçamento de tokens, sempre preservando a mensagem de sistema
// e a última mensagem do usuário (a pergunta atual).
function compressMessages(messages, maxHistoryTokens) {
  const compressed = messages.map((m) => ({
    ...m,
    content: typeof m.content === "string" ? compressText(m.content) : m.content,
  }));

  const systemMsgs = compressed.filter((m) => m.role === "system");
  const rest = compressed.filter((m) => m.role !== "system");
  const lastUser = rest[rest.length - 1];
  const middle = rest.slice(0, -1);

  let budget = maxHistoryTokens;
  const kept = [];
  for (let i = middle.length - 1; i >= 0; i--) {
    const cost = estimateTokens(
      typeof middle[i].content === "string" ? middle[i].content : JSON.stringify(middle[i].content)
    );
    if (cost > budget) break;
    budget -= cost;
    kept.unshift(middle[i]);
  }

  const droppedCount = middle.length - kept.length;
  const final = [...systemMsgs, ...kept];
  if (droppedCount > 0) {
    final.push({
      role: "system",
      content: `[Aviso do gateway: ${droppedCount} mensagem(ns) antiga(s) do histórico foram removidas para economizar tokens.]`,
    });
  }
  if (lastUser) final.push(lastUser);

  return final;
}

module.exports = { estimateTokens, compressText, compressMessages };
