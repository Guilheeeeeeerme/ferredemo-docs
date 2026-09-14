# Arquitetura Argus

<div class="flow-explainer"><img src="/atlas/argus-flow.svg" alt="Fluxo de triagem visual do Argus." /><div><h3>Como funciona</h3><p>Frames viram evidência para avaliação multimodal ao vivo antes da decisão humana de triagem.</p></div></div>

<span class="status status-verified">VERIFIED</span> `stream-gateway` → `stream-prep` → `prompt-eval` → API WS → triage. LLM ao vivo só em **prompt-eval**. i18n de produto: en + pt-BR.

Detalhe: [English](/en/argus/architecture).
