# AI Engineering in practice

<div class="atlas-hero"><p class="eyebrow">TECHNICAL CAPABILITY MAP</p><h1>Reliable AI products are systems, not prompts.</h1><p class="atlas-lede">A recruiter can see the engineering surface; a tech lead can follow each claim to the real architecture, controls, and known gaps.</p></div>

## Prompt Engineering — make the model's job explicit

Prompt Engineering is the discipline of defining instructions, context boundaries, output contracts, and versioning so an LLM behaves predictably. Here it means **versioned prompt registries**, not ad-hoc strings in application code.

**Where and how:** PromptDesk is the reference: its chat worker takes a registered prompt, fences untrusted customer context, limits the model to text, and validates results before use. See [guardrails](/en/standards/guardrails) and [PromptDesk architecture](/en/promptdesk/architecture).

<span class="status status-verified">VERIFIED</span> Versioned prompts + fenced context. <span class="status status-notfound">NOT FOUND</span> autonomous tool use.

## Guardrails — constrain inputs, outputs, and spend

Guardrails are deterministic and operational controls around an LLM: screen unsafe input before a call, constrain the prompt, parse output strictly, fail closed, and cap requests. They are not a claim that the model is inherently safe.

**Where and how:** the shared baseline is [Guardrails](/en/standards/guardrails); Argus and Quizzeira align to its contracts. [Model ladder & budgets](/en/standards/model-ladder-and-budgets) shows provider order, timeouts, and request budgets.

## Eval — decide when generated content can move forward

An eval is a measurable acceptance step, separate from generation. It makes quality visible and prevents a draft from silently becoming a user-facing result.

**Where and how:** Quizzeira generates a draft bank, then applies an [eval gate](/en/quizzeira/eval-gate) before publishing study content. Its verified thresholds are documented with the pipeline rather than presented as generic AI claims.

## RAG, chunks, and vector databases — retrieve only when evidence supports it

**RAG** augments a model with retrieved material. A **chunk** is a retrievable slice of source content. A **vector database** stores embeddings so semantically similar chunks can be found. These three terms are related, but having embeddings does not prove a live RAG path.

**Where and how:** Quizzeira has 768-dimensional embeddings, but retrieval is [UNUSED] on its generation path. Argus has partial RAG plumbing (`RAG_LIMIT=5`) but no query embedding on the live path. PromptDesk has no vector store. See [comparison matrix](/en/reference/comparison-matrix) and [not in scope](/en/reference/not-in-scope).

<span class="status status-partial">PARTIAL</span> Argus retrieval. <span class="status status-unused">UNUSED</span> Quizzeira generation search. <span class="status status-notfound">NOT FOUND</span> PromptDesk RAG.

## What this demonstrates

The portfolio is intentionally evidence-backed: model orchestration, cost/rate controls, evaluation gates, security boundaries, observability, and human review are documented as engineering systems. Where a capability is missing, the documentation says so.
