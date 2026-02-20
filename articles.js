document.addEventListener('DOMContentLoaded', async () => {
    const mainContent = document.getElementById('articles-main');
    if (!mainContent) return;

    const urlParams = new URLSearchParams(window.location.search);
    const postSlug = urlParams.get('post');

    if (postSlug) {
        // Load single post
        try {
            const response = await fetch(`articles/${postSlug}.md`);
            if (!response.ok) throw new Error('Post not found');
            const markdown = await response.text();

            mainContent.innerHTML = `
                <div class="article-container" style="max-width: 800px; margin: 0 auto; padding: 4rem 20px;">
                    <a href="articles.html" style="color: var(--accent); margin-bottom: 2rem; display: inline-block;">&larr; Back to Articles</a>
                    <div class="markdown-body">
                        ${marked.parse(markdown)}
                    </div>
                </div>
            `;
        } catch (error) {
            mainContent.innerHTML = `
                <div style="text-align:center; padding: 10rem 20px;">
                    <h2>Post not found</h2>
                    <br>
                    <a href="articles.html" class="btn btn-secondary"><i class="ti ti-arrow-left"></i> Back to articles</a>
                </div>
            `;
        }
    } else {
        // Load index
        try {
            const response = await fetch('articles/articles.json');
            const data = await response.json();

            let html = `
                <header class="hero" style="text-align: center; border-bottom: none; padding-top: 4rem; padding-bottom: 2rem;">
                    <div class="hero-text" style="max-width: 800px; margin: 0 auto;">
                        <h1 class="hero-title">Insights & Articles</h1>
                        <p class="hero-subtitle">Thoughts on AI strategy, engineering, and startups.</p>
                    </div>
                </header>
                <div class="articles-grid" style="display: flex; flex-direction: column; gap: 2rem; max-width: 800px; margin: 0 auto; padding: 0 20px 6rem 20px;">
            `;

            if (data.articles.length === 0) {
                html += `<p style="text-align: center; color: var(--text-secondary);">No articles published yet.</p>`;
            } else {
                data.articles.forEach(article => {
                    html += `
                        <div class="edu-card" style="margin: 0; display: block; text-decoration: none; transition: transform 0.2s; cursor: pointer;" onclick="window.location='articles.html?post=${article.slug}'">
                            <span style="color: var(--text-muted); font-size: 0.9rem;">${article.date}</span>
                            <h3 style="font-size: 1.5rem; margin: 0.5rem 0; color: var(--text-primary); transition: color 0.2s;">${article.title}</h3>
                            <p style="color: var(--text-secondary); margin-bottom: 1rem;">${article.summary}</p>
                            <span style="color: var(--accent); font-weight: 500;">Read more &rarr;</span>
                        </div>
                    `;
                });
            }

            html += `</div>`;
            mainContent.innerHTML = html;

            // Add hover effect for cards via JS to keep it simple since styles are inline
            document.querySelectorAll('.edu-card').forEach(card => {
                card.addEventListener('mouseenter', () => {
                    card.style.borderColor = 'var(--text-primary)';
                    card.querySelector('h3').style.color = 'var(--accent)';
                });
                card.addEventListener('mouseleave', () => {
                    card.style.borderColor = 'var(--border-color)';
                    card.querySelector('h3').style.color = 'var(--text-primary)';
                });
            });

        } catch (error) {
            mainContent.innerHTML = `<div style="text-align:center; padding: 10rem 20px;"><h2>Error loading articles</h2><p style="color: var(--text-secondary);">Please try again later.</p></div>`;
        }
    }
});
