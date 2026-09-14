# Ecosystem atlas

<div class="atlas-hero">
  <p class="eyebrow">FERRE ECOSYSTEM / ARCHITECTURE ATLAS</p>
  <h1>Understand what runs, where it runs, and why it matters.</h1>
  <p class="atlas-lede">Three focused products share operating planes, not product APIs. This is the visual entry point to their audited architecture.</p>
</div>

<div class="atlas-grid">
  <a class="atlas-card" href="/en/promptdesk/architecture"><img src="/icons/promptdesk.svg" alt="" /><span>01 / SUPPORT AI</span><strong>PromptDesk</strong><p>Customer request → guarded LLM orchestration → operator-ready answer.</p></a>
  <a class="atlas-card" href="/en/quizzeira/architecture"><img src="/icons/quizzeira.svg" alt="" /><span>02 / STUDY SYSTEM</span><strong>Quizzeira</strong><p>Public exam → draft bank → evaluation gate → study pill.</p></a>
  <a class="atlas-card" href="/en/argus/architecture"><img src="/icons/argus.svg" alt="" /><span>03 / VISION TRIAGE</span><strong>Argus</strong><p>Camera frame → multimodal assessment → human triage case.</p></a>
</div>

## The operating map

<img class="atlas-diagram" src="/atlas/system-map.svg" alt="Diagram of shared data, LLM, and observability planes for PromptDesk, Quizzeira, and Argus." />

<div class="concept-strip"><div><b>Shared data</b><span>Postgres, Redis, and MinIO are common operating primitives.</span></div><div><b>LLM routing</b><span>PromptDesk and Argus can use Headroom; Quizzeira stays intentionally off it.</span></div><div><b>Audit status</b><span>Claims are evidence labels, not marketing claims.</span></div></div>

## Read a system as a story

<div class="flow-explainer"><img src="/atlas/promptdesk-flow.svg" alt="PromptDesk support request flow." /><div><h3>PromptDesk</h3><p>Support UI sends a request to the API; a worker selects an LLM and returns a status-aware answer.</p><a href="/en/promptdesk/architecture">Explore the architecture →</a></div></div>
<div class="flow-explainer"><img src="/atlas/quizzeira-flow.svg" alt="Quizzeira content and study flow." /><div><h3>Quizzeira</h3><p>Its three planes turn public material into evaluated study content, using run loops rather than BullMQ.</p><a href="/en/quizzeira/architecture">Explore the architecture →</a></div></div>
<div class="flow-explainer"><img src="/atlas/argus-flow.svg" alt="Argus vision triage flow." /><div><h3>Argus</h3><p>Frames are prepared, evaluated by a live VLM, and sent to a human operator as triage cases.</p><a href="/en/argus/architecture">Explore the architecture →</a></div></div>

## How to read evidence

<span class="status status-verified">VERIFIED</span> implemented and evidenced. <span class="status status-partial">PARTIAL</span> incomplete on the active path. <span class="status status-unused">UNUSED</span> present but not live. <span class="status status-notfound">NOT FOUND</span> no evidence exists. Start with the [status legend](/en/reference/status-legend), [guardrails](/en/standards/guardrails), or [comparison matrix](/en/reference/comparison-matrix).
