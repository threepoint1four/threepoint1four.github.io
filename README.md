## Run locally

Run Jekyll with: jekyll serve

Then open http://127.0.0.1:4000/. GitHub Pages builds the site from the repository root when Pages is configured to publish from main.

## Writing

Add a Markdown file to _posts/ named YYYY-MM-DD-slug.md. Start with front matter like this:

    ---
    title: A problem worth keeping
    description: A short summary for the notes index.
    date: 2026-10-22
    tags: [math, competitive-programming]
    math: true
    ---

Write the rest in Markdown. For inline math, wrap a LaTeX expression in single dollar signs. For display math, put double dollar signs on their own lines around the expression.

Set math: true only when a note uses LaTeX. MathJax loads on that page. Tags are descriptive labels; notes stay in one chronological feed so a topic can overlap with another.
