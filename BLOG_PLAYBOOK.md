# Blog playbook (3 posts a week)

Schedule: Monday, Wednesday, Friday. One post per run.

## Topic rules
- Intricate, in-depth AI engineering topics most creators skip (e.g. KV-cache and prompt caching economics, MCP tool poisoning, eval design for agents, speculative decoding, retrieval failure modes, guardrail latency budgets, agent memory architectures, healthcare/pharma AI constraints).
- Never generic ("what is RAG", "why RAG fails").
- Each topic must map to a search question a recruiter, hiring manager or engineer would type.

## Structure (answer-first, for SEO, GEO and AEO)
1. Title that contains the question or key phrase (under 65 characters where possible).
2. `tldr` frontmatter: a 2-3 sentence direct answer. Rendered as "Short answer" at the top.
3. Body: 1,800-2,800 words, H2s phrased as questions people ask, short paragraphs, one idea per section.
4. At least 2 original diagrams (SVG in `public/blog/<slug>/`, embedded with `<Figure>`), plus a table or code where it helps.
5. Real company examples and numbers, every claim linked to a primary source (engineering blogs, papers, official docs).
6. `faq` frontmatter: 3-5 Q&As (emitted as FAQPage schema).
7. "What I would do" section with Achyuta's own engineering take.
8. Internal links to 2+ related posts and to a project or video where relevant.

## Frontmatter
title, description (150-160 chars), date, topic, keywords, tldr, faq, cover (optional), featured, video (optional).

## Quality gate before publishing
- Facts checked against opened sources; no unsourced numbers.
- Plain, technical wording; terms defined on first use.
- `npm run build` passes; page checked on mobile.
