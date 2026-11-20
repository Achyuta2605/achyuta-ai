# Portfolio

Personal portfolio site: projects, articles (MDX, organized by topic), videos and resume.

- `npm run dev`: local dev server
- `content/blog/*.mdx`: articles (frontmatter: title, description, date, topic, featured, video, draft)
- `src/lib/site.ts`: profile, experience, education, topics
- `src/lib/projects.ts`, `src/lib/videos.ts`: projects and videos data
- `public/media`: web-compressed videos and covers
- Drafts are hidden unless `SHOW_DRAFTS=1`. Set `NEXT_PUBLIC_SITE_URL` to the final domain.

Design is a neutral placeholder until the design reference arrives.
