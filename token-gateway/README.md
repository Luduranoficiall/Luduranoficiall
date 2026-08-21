# token-gateway

Gateway local, compatível com a API da OpenAI, que:

1. **Comprime o histórico de mensagens** antes de mandar pro modelo (corta repetição,
   espaços redundantes e histórico antigo que não cabe no orçamento de tokens).
2. **Roteia entre provedores** usando **as suas próprias chaves de API** — sem
   depender de assinatura de nenhuma ferramenta (Claude Code, Copilot, etc.),
   e sem burlar limite de uso de ninguém.
3. Faz **fallback automático**: se um provedor falhar ou estourar limite, tenta o próximo.
4. Mostra em `/stats` quanto você está economizando de tokens de verdade.

> ⚠️ Este projeto **não** usa credenciais de assinatura como backend de proxy.
> Ele só funciona com chaves de API legítimas que você mesmo cadastrar no `.env`.

## 🚀 Como rodar (na sua máquina, não nesta sessão)

```bash
cd token-gateway
npm install
cp .env.example .env
```

Edite o `.env` e preencha **pelo menos uma** chave de API sua (OpenAI, Gemini,
DeepSeek ou Groq — todas têm camada gratuita ou de baixo custo).

```bash
npm start
```

O gateway sobe em `http://localhost:8787` (ou a porta que você definir).

## 🔌 Como usar

Qualquer ferramenta que aceite uma **URL base de API compatível com OpenAI**
pode apontar pra cá em vez de ir direto no provedor. Exemplo com `curl`:

```bash
curl http://localhost:8787/v1/chat/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer troque-por-uma-senha-forte" \
  -d '{
    "model": "gemini/gemini-2.0-flash",
    "messages": [{"role": "user", "content": "Olá!"}]
  }'
```

- `model` pode vir como `"provedor/modelo"` (ex.: `openai/gpt-4o-mini`) para forçar
  um provedor específico, ou só o nome do modelo para deixar o gateway escolher
  pela ordem do `.env`.

## 🛰️ Usando com o Google Antigravity

O Antigravity é uma ferramenta muito recente e a interface dela pode mudar. O que
você precisa verificar nas configurações dele:

1. Procure por uma opção de **"custom model provider"**, **"OpenAI-compatible endpoint"**
   ou **"base URL"** nas configurações de modelo/API do Antigravity.
2. Se existir, aponte para `http://localhost:8787/v1` e use a `GATEWAY_KEY` do
   seu `.env` como API key.
3. Se o Antigravity **não expuser** essa opção na versão que você tem instalada,
   infelizmente não dá pra forçar — cada ferramenta decide se permite endpoint
   customizado. Nesse caso, você ainda pode usar o `token-gateway` diretamente
   em código seu (scripts, backend, outros agentes) via chamadas HTTP normais.

> Não tenho como confirmar o nome exato dessa opção no Antigravity porque é um
> produto lançado muito recentemente e a interface pode ter mudado depois do
> meu treinamento — confirme o nome do campo na documentação oficial dele.

## 📊 Ver quanto você está economizando

```bash
curl http://localhost:8787/stats
```

## 🧩 Reaproveitando em qualquer projeto futuro

Este gateway é **independente** — não depende do resto deste repositório.
Para usar em outro projeto seu, basta:

1. Copiar a pasta `token-gateway/` para onde quiser (ou rodar ela uma vez e
   deixar ligada em background na sua máquina/servidor).
2. Apontar o `base_url` da API de IA do novo projeto para
   `http://localhost:8787/v1`.

Assim você não precisa reconfigurar nada a cada novo app — é ligar uma vez e
usar pra sempre.
