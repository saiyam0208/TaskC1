
import ArticleCard from "./ArticleCard";

const articles = [
  {
    id: 1,
    title: "Exploring Artificial Intelligence",
    description:
      "Discover how intelligent systems solve problems, recognise patterns and support real-world decisions.",
    rating: 4.8,
    author: "Saiyam Sharma",
    image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=700&q=80",
    button: "Explore AI",
  },
  {
    id: 2,
    title: "Building Modern Web Applications",
    description:
      "Explore how React, JavaScript and backend technologies work together to create interactive websites.",
    rating: 4.9,
    author: "Saiyam Sharma",
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=700&q=80",
    button: "Explore Web Dev",
  },
  {
    id: 3,
    title: "Making Sense of Data",
    description:
      "Learn how data cleaning, visualisation and analysis turn raw information into useful insights.",
    rating: 4.7,
    author: "Saiyam Sharma",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=700&q=80",
    button: "Explore Analytics",
  },
];

export default function Articles() {
  return (
    <section id="articles" className="featured-section">
      <h2>Ideas Worth Exploring</h2>
      <p className="section-subtitle">
        Technology, creativity and lessons from my learning journey.
      </p>

      <div className="featured-grid">
        {articles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>

      <button className="see-more" type="button">
        Discover More
      </button>
    </section>
  );
}
