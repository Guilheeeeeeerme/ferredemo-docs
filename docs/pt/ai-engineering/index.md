# AI Engineering na prática

<div class="atlas-hero"><p class="eyebrow">MAPA DE CAPACIDADE TÉCNICA</p><h1>Produtos de IA confiáveis são sistemas, não apenas prompts.</h1><p class="atlas-lede">Um recrutador entende a superfície de engenharia; um tech lead pode seguir cada afirmação até a arquitetura, controles e lacunas reais.</p></div>

## Prompt Engineering — explicitar o trabalho do modelo

Prompt Engineering define instruções, limites de contexto, contratos de saída e versionamento para tornar o comportamento do LLM previsível. Aqui significa **registries de prompts versionados**, não strings improvisadas no código.

**Onde e como:** PromptDesk é a referência: o chat worker usa um prompt registrado, cerca contexto não confiável, limita o modelo a texto e valida o resultado. Veja [guardrails](/pt/standards/guardrails) e [arquitetura PromptDesk](/pt/promptdesk/architecture).

<span class="status status-verified">VERIFIED</span> Prompts versionados + contexto cercado. <span class="status status-notfound">NOT FOUND</span> uso autônomo de ferramentas.

## Guardrails — controlar entrada, saída e consumo

Guardrails são controles determinísticos e operacionais: filtram entrada antes do LLM, restringem o prompt, fazem parse estrito, falham fechados e limitam consumo. Não significam que o modelo é seguro por natureza.

**Onde e como:** a base comum está em [Guardrails](/pt/standards/guardrails); Argus e Quizzeira alinham seus contratos. [Ladder e orçamentos](/pt/standards/model-ladder-and-budgets) mostra provedores, timeout e orçamento.

## Eval — decidir se conteúdo gerado pode avançar

Eval é uma etapa mensurável de aceitação, separada da geração. Ela torna a qualidade visível e impede que um rascunho vire conteúdo de usuário silenciosamente.

**Onde e como:** Quizzeira cria um banco rascunho e usa o [eval gate](/pt/quizzeira/eval-gate) antes de publicar conteúdo de estudo.

## RAG, chunks e banco vetorial — recuperar apenas quando há evidência

**RAG** acrescenta material recuperado ao modelo. Um **chunk** é um trecho recuperável de uma fonte. Um **vector database** (banco vetorial) guarda embeddings para buscar chunks semanticamente semelhantes. Ter embeddings não prova que exista um RAG ativo.

**Onde e como:** Quizzeira possui embeddings de 768 dimensões, mas busca é [UNUSED] na geração. Argus possui RAG parcial (`RAG_LIMIT=5`), mas sem query embedding no caminho ao vivo. PromptDesk não tem banco vetorial. Veja a [matriz comparativa](/pt/reference/comparison-matrix).

<span class="status status-partial">PARTIAL</span> Recuperação Argus. <span class="status status-unused">UNUSED</span> Busca na geração Quizzeira. <span class="status status-notfound">NOT FOUND</span> RAG PromptDesk.

## O que isso demonstra

Este portfolio é guiado por evidência: orquestração de modelos, custo/limites, gates de avaliação, fronteiras de segurança, observabilidade e revisão humana são sistemas de engenharia. Quando uma capacidade não existe, a documentação diz isso.
