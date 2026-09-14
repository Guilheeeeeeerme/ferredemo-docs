# Atlas do ecossistema

<div class="atlas-hero"><p class="eyebrow">ECOSSISTEMA FERRE / ATLAS DE ARQUITETURA</p><h1>Entenda o que roda, onde roda e por que isso importa.</h1><p class="atlas-lede">Três produtos focados compartilham planos operacionais, não APIs entre si. Este é o ponto de entrada visual para a arquitetura auditada.</p></div>

<div class="atlas-grid">
  <a class="atlas-card" href="/pt/promptdesk/architecture"><img src="/icons/promptdesk.svg" alt="" /><span>01 / IA DE SUPORTE</span><strong>PromptDesk</strong><p>Pedido do cliente → orquestração LLM protegida → resposta para o operador.</p></a>
  <a class="atlas-card" href="/pt/quizzeira/architecture"><img src="/icons/quizzeira.svg" alt="" /><span>02 / SISTEMA DE ESTUDO</span><strong>Quizzeira</strong><p>Prova pública → banco rascunho → gate de avaliação → pílula de estudo.</p></a>
  <a class="atlas-card" href="/pt/argus/architecture"><img src="/icons/argus.svg" alt="" /><span>03 / TRIAGEM VISUAL</span><strong>Argus</strong><p>Frame de câmera → análise multimodal → caso para triagem humana.</p></a>
</div>

## Mapa operacional

<img class="atlas-diagram" src="/atlas/system-map.svg" alt="Diagrama dos planos compartilhados de dados, LLM e observabilidade para PromptDesk, Quizzeira e Argus." />

<div class="concept-strip"><div><b>Dados compartilhados</b><span>Postgres, Redis e MinIO são primitivas operacionais comuns.</span></div><div><b>Roteamento LLM</b><span>PromptDesk e Argus podem usar Headroom; Quizzeira fica intencionalmente fora.</span></div><div><b>Status auditado</b><span>As etiquetas mostram evidência, não promessa de marketing.</span></div></div>

## Leia cada sistema como uma história

<div class="flow-explainer"><img src="/atlas/promptdesk-flow.svg" alt="Fluxo de suporte do PromptDesk." /><div><h3>PromptDesk</h3><p>A UI envia o pedido para a API; o worker escolhe o LLM e devolve uma resposta com status.</p><a href="/pt/promptdesk/architecture">Explorar a arquitetura →</a></div></div>
<div class="flow-explainer"><img src="/atlas/quizzeira-flow.svg" alt="Fluxo de conteúdo e estudo do Quizzeira." /><div><h3>Quizzeira</h3><p>Os três planos transformam material público em estudo avaliado com run loops, não BullMQ.</p><a href="/pt/quizzeira/architecture">Explorar a arquitetura →</a></div></div>
<div class="flow-explainer"><img src="/atlas/argus-flow.svg" alt="Fluxo de triagem visual do Argus." /><div><h3>Argus</h3><p>Frames são preparados, avaliados por VLM ao vivo e entregues como casos para operador.</p><a href="/pt/argus/architecture">Explorar a arquitetura →</a></div></div>

## Como ler a evidência

<span class="status status-verified">VERIFIED</span> implementado e comprovado. <span class="status status-partial">PARTIAL</span> incompleto no caminho ativo. <span class="status status-unused">UNUSED</span> existe, mas não está ativo. <span class="status status-notfound">NOT FOUND</span> não há evidência. Comece pela [legenda](/pt/reference/status-legend), [guardrails](/pt/standards/guardrails) ou [matriz comparativa](/pt/reference/comparison-matrix).
