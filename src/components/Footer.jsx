function Footer() {
    const handleSubmit = (event) => {
        event.preventDefault();

        const email = event.target.email.value;

        if (email) {
            alert("Thank you for subscribing!");
            event.target.reset();
        }
    };

    return (
        <>
            <section className="newsletter">
                <h2>SIGN UP FOR OUR DAILY INSIDER</h2>

                <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        required
                    />

                    <button type="submit">
                        Subscribe
                    </button>
                </form>
            </section>

            <section id="contact" className="contact">
                <h2>Contact</h2>

                <p>Email: saiyams0213@gmail.com</p>

                <p>
                    GitHub:{" "}
                    <a href="https://github.com/saiyam0208">
                        github.com/saiyam0208
                    </a>
                </p>

                <p>
                    LinkedIn:{" "}
                    <a href="https://www.linkedin.com/in/saiyam-sharma-36581b381">
                        Saiyam Sharma's LinkedIn
                    </a>
                </p>
            </section>

            <footer>
                <div className="footer-columns">
                    <div>
                        <h3>Explore</h3>
                        <p>Home</p>
                        <p>Questions</p>
                        <p>Articles</p>
                        <p>Tutorials</p>
                    </div>

                    <div>
                        <h3>Support</h3>
                        <p>FAQs</p>
                        <p>Help</p>
                        <p>Contact Us</p>
                    </div>

                    <div>
                        <h3>Stay Connected</h3>
                        <p>Facebook</p>
                        <p>Twitter</p>
                        <p>Instagram</p>
                    </div>
                </div>

                <p>DEV@Deakin 2026</p>

                <div className="footer-links">
                    Privacy Policy &nbsp;&nbsp; Terms &nbsp;&nbsp; Code of Conduct
                </div>
            </footer>
        </>
    );
}

export default Footer;