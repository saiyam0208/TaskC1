
export default function ArticleCard({ article }) {
  return (
    <article className="article-card">
      <img
        className="content-image"
        src={article.image}
        alt={article.title}
        loading="lazy"
      />

      <div className="content-card-body">
        <h3>{article.title}</h3>
        <p className="content-description">{article.description}</p>

        <div className="content-card-meta">
          <span>By {article.author}</span>
          <span className="content-rating">★ {article.rating}</span>
        </div>

        <button className="card-action" type="button">
          {article.button}
        </button>
      </div>
    </article>
  );
}
