const escapeHtml = (value) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");

const renderInlineMarkdown = (text) => {
  let rendered = escapeHtml(text);
  rendered = rendered.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  rendered = rendered.replace(/\*(.+?)\*/g, "<em>$1</em>");
  return rendered;
};

const renderMarkdown = (markdown) => {
  const lines = markdown.split("\n");
  const html = [];
  let inList = false;

  const closeList = () => {
    if (inList) {
      html.push("</ul>");
      inList = false;
    }
  };

  lines.forEach((line) => {
    const trimmed = line.trim();

    if (!trimmed) {
      closeList();
      return;
    }

    if (trimmed.startsWith("### ")) {
      closeList();
      html.push(`<h3>${renderInlineMarkdown(trimmed.slice(4))}</h3>`);
      return;
    }

    if (trimmed.startsWith("## ")) {
      closeList();
      html.push(`<h2>${renderInlineMarkdown(trimmed.slice(3))}</h2>`);
      return;
    }

    if (trimmed.startsWith("# ")) {
      closeList();
      html.push(`<h1>${renderInlineMarkdown(trimmed.slice(2))}</h1>`);
      return;
    }

    if (trimmed.startsWith("- ")) {
      if (!inList) {
        html.push("<ul>");
        inList = true;
      }
      html.push(`<li>${renderInlineMarkdown(trimmed.slice(2))}</li>`);
      return;
    }

    closeList();
    html.push(`<p>${renderInlineMarkdown(trimmed)}</p>`);
  });

  closeList();
  return html.join("");
};

const renderArticleMeta = (article) => {
  const parts = [article.topic, article.readingTime, article.date].filter(Boolean);
  return parts.map((part) => `<span>${escapeHtml(part)}</span>`).join("");
};

document.addEventListener("DOMContentLoaded", async () => {
  const mainContent = document.getElementById("articles-main");
  if (!mainContent) {
    return;
  }

  const urlParams = new URLSearchParams(window.location.search);
  const postSlug = urlParams.get("post");

  try {
    const response = await fetch("articles/articles.json");
    if (!response.ok) {
      throw new Error("Unable to load article index");
    }

    const data = await response.json();
    const articles = Array.isArray(data.articles) ? data.articles : [];

    if (postSlug) {
      const article = articles.find((item) => item.slug === postSlug);

      if (!article) {
        throw new Error("Post not found");
      }

      const markdownResponse = await fetch(`articles/${postSlug}.md`);
      if (!markdownResponse.ok) {
        throw new Error("Post not found");
      }

      const markdown = await markdownResponse.text();
      document.title = `${article.title} | Shake Dewan`;
      mainContent.innerHTML = `
        <article class="article-view section-reveal active">
          <a href="articles.html" class="article-back">&larr; Back to articles</a>
          <header class="article-header">
            <p class="eyebrow">Article</p>
            <h2>${escapeHtml(article.title)}</h2>
            <div class="article-meta">${renderArticleMeta(article)}</div>
            <p>${escapeHtml(article.summary)}</p>
          </header>
          <div class="markdown-body">
            ${renderMarkdown(markdown)}
          </div>
          <div class="article-actions">
            <a href="case-studies.html" class="btn btn-secondary">See the case studies</a>
            <a href="https://cal.com/shake-dewan/30min" target="_blank" rel="noopener noreferrer"
              class="btn btn-primary">Book a Call</a>
          </div>
        </article>
      `;
      return;
    }

    if (articles.length === 0) {
      mainContent.innerHTML = `
        <div class="article-view section-reveal active">
          <p class="eyebrow">Writing</p>
          <h2>No articles published yet.</h2>
          <p>The article archive will grow over time. For now, the homepage and case studies carry the strongest proof.</p>
        </div>
      `;
      return;
    }

    const featured = articles.find((article) => article.featured) || articles[0];
    const remainingArticles = articles.filter((article) => article.slug !== featured.slug);

    const featureMarkup = `
      <article class="article-feature section-reveal active">
        <p class="eyebrow">Featured Essay</p>
        <h2>${escapeHtml(featured.title)}</h2>
        <p>${escapeHtml(featured.summary)}</p>
        <div class="article-meta">${renderArticleMeta(featured)}</div>
        <div class="hero-actions">
          <a href="articles.html?post=${encodeURIComponent(featured.slug)}" class="btn btn-primary">Read the featured article</a>
          <a href="case-studies.html" class="btn btn-ghost">Case studies</a>
        </div>
      </article>
    `;

    const cardsMarkup =
      remainingArticles.length > 0
        ? remainingArticles
            .map(
              (article) => `
                <article class="article-card section-reveal">
                  <div class="article-kicker">${renderArticleMeta(article)}</div>
                  <h3>${escapeHtml(article.title)}</h3>
                  <p>${escapeHtml(article.summary)}</p>
                  <a href="articles.html?post=${encodeURIComponent(article.slug)}" class="route-link">Read article</a>
                </article>
              `
            )
            .join("")
        : `
          <article class="article-card section-reveal">
            <div class="article-kicker"><span>Archive</span></div>
            <h3>More writing is on the way.</h3>
            <p>The archive is intentionally small for now. Quality beats volume, and each new essay should deepen the authority platform.</p>
            <a href="case-studies.html" class="route-link">Review the case studies</a>
          </article>
        `;

    mainContent.innerHTML = `
      ${featureMarkup}
      <div class="article-grid">
        ${cardsMarkup}
      </div>
    `;
  } catch (error) {
    mainContent.innerHTML = `
      <div class="article-view section-reveal active">
        <p class="eyebrow">Articles</p>
        <h2>There was a problem loading the archive.</h2>
        <p>Please try again later.</p>
      </div>
    `;
  }
});
