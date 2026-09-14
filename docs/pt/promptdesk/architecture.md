# Arquitetura PromptDesk

<div class="flow-explainer"><img src="/atlas/promptdesk-flow.svg" alt="Fluxo de suporte do PromptDesk." /><div><h3>Como funciona</h3><p>Um pedido vira job protegido, resposta de modelo com rank e atualização visível de status.</p></div></div>

<span class="status status-verified">VERIFIED</span> API NestJS + worker BullMQ + Postgres dual + Redis + Socket.IO de **status** (não streaming de tokens).

```mermaid
flowchart LR
  UI[web / support] --> API[NestJS]
  API --> W[chat-worker]
  W --> LLM[Gemini/OpenAI]
```

Detalhe: [English](/en/promptdesk/architecture).
