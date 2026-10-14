export default function TutorialCard({ tutorial }) {
  return (
    <article className="tutorial-card">
      <img
        className="content-image"
        src={tutorial.image}
        alt={tutorial.title}
        loading="lazy"
      />

      <div className="content-card-body">
        <h3>{tutorial.title}</h3>
        <p className="content-description">{tutorial.description}</p>

        <div className="content-card-meta">
          <span>By {tutorial.username}</span>
          <span className="content-rating">★ {tutorial.rating}</span>
        </div>

        <button className="card-action" type="button">
          {tutorial.button}
        </button>
      </div>
    </article>
  );
}
