function Hero() {
    return (
        <>
            <section className="banner">
                <img
                    src="/images/Banner image.jpg"
                    alt="DEV@Deakin banner"
                />

                <div className="banner-message">
                    Hey, I'm Saiyam Sharma
                </div>
            </section>

            <section id="about" className="profile">
                <h1>Author Profile</h1>

                <img
                    src="/images/Profile image.jpeg"
                    alt="Profile"
                    className="profile-image"
                />

                <p>
                    I am an aspiring Artificial Intelligence and Machine Learning professional,
                    passionate about programming, emerging technologies,
                    and continuously developing my technical skills.
                </p>

                <div className="line"></div>

                <h2>Here's what I've done so far</h2>
            </section>
        </>
    );
}

export default Hero;