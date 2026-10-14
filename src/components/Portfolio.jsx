
function Portfolio() {
    const projects = [
        {
            title: "Hackathon",
            image: "/images/hackathon.jpg",
            description:
                "Collaborated on a practical project, developing teamwork, problem-solving and creative thinking.",
        },
        {
            title: "Cloud Computing Internship",
            image: "/images/certificate CC.jpeg",
            description:
                "Completed a cloud computing mentorship program and developed an understanding of cloud technologies.",
        },
        {
            title: "Football and Teamwork",
            image: "/images/football.jpg",
            description:
                "Football has helped me develop discipline, communication, teamwork and decision-making.",
        },
    ];

    const skills = [
        {
            name: "Artificial Intelligence",
            rating: 4.5,
            description:
                "Understanding how intelligent systems solve problems, make decisions and support real-world applications.",
        },
        {
            name: "Machine Learning",
            rating: 4.3,
            description:
                "Learning how models identify patterns in data and use those patterns to make predictions.",
        },
        {
            name: "Python Programming",
            rating: 4.6,
            description:
                "Using Python to write programs, process information and build foundations for AI and data science.",
        },
        {
            name: "Data Analysis",
            rating: 4.4,
            description:
                "Cleaning datasets, exploring trends and presenting useful insights through tables and visualisations.",
        },
        {
            name: "Neural Networks",
            rating: 4.0,
            description:
                "Exploring how connected layers learn from examples and recognise complex patterns in data.",
        },
        {
            name: "Web Development",
            rating: 4.2,
            description:
                "Building responsive interfaces with HTML, CSS and JavaScript while learning React and application integration.",
        },
    ];

    const photos = [
        { src: "/images/new image.jpg", alt: "Travel photograph" },
        { src: "/images/download.jpg", alt: "Architecture photograph" },
        { src: "/images/download (1).jpg", alt: "City landmark photograph" },
        { src: "/images/dome.jpg", alt: "Architectural dome photograph" },
    ];

    return (
        <section id="work" className="portfolio">
            <h2>My Portfolio</h2>
            <p>
                A selection of my learning experiences, interests and technical skills.
            </p>

            <div className="projects">
                {projects.map((project) => (
                    <article className="project-card" key={project.title}>
                        <img src={project.image} alt={project.title} />
                        <div className="project-content">
                            <h3>{project.title}</h3>
                            <p>{project.description}</p>
                        </div>
                    </article>
                ))}
            </div>


            <section id="gallery" className="gallery-section">
                <div className="line" />
                <h2>My Photos</h2>

                <div className="gallery">
                    {photos.map((photo) => (
                        <div className="gallery-item" key={photo.src}>
                            <img src={photo.src} alt={photo.alt} loading="lazy" />
                        </div>
                    ))}
                </div>
            </section>
        </section>
    );
}

export default Portfolio;
