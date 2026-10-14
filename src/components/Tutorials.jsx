
import TutorialCard from "./TutorialCard";

const tutorials = [
  {
    id: 1,
    title: "React and Component Design",
    description:
      "Build reusable interfaces and understand how props and state make React applications interactive.",
    rating: 4.9,
    username: "Saiyam Sharma",
    image:
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=700&q=80",
    button: "Learn React",
  },
  {
    id: 2,
    title: "Data Analysis with Python",
    description:
      "Work with datasets, explore trends and create meaningful visualisations using Python tools.",
    rating: 4.8,
    username: "Saiyam Sharma",
    image:
      "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=700&q=80",
    button: "Learn Python",
  },
  {
    id: 3,
    title: "Git and Collaborative Coding",
    description:
      "Track code changes, organise commits and understand the foundations of team development.",
    rating: 4.7,
    username: "Saiyam Sharma",
    image:
      "https://images.unsplash.com/photo-1556075798-4825dfaaf498?auto=format&fit=crop&w=700&q=80",
    button: "Learn Git",
  },
];

export default function Tutorials() {
  return (
    <section id="tutorials" className="featured-section tutorials-section">
      <h2>Skills in Practice</h2>
      <p className="section-subtitle">
        Practical concepts I'm developing as an AI and ML student.
      </p>

      <div className="featured-grid">
        {tutorials.map((tutorial) => (
          <TutorialCard key={tutorial.id} tutorial={tutorial} />
        ))}
      </div>

      <button className="see-more" type="button">
        Explore All Skills
      </button>
    </section>
  );
}
