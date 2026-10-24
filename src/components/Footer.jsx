
import React, { useState } from "react";

function Footer() {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const cleanEmail = email.trim();
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(cleanEmail)) {
            setMessage("Please enter a valid email address.");
            setIsSuccess(false);
            return;
        }

        setSubmitting(true);
        setMessage("");
        setIsSuccess(false);

        try {
            const response = await fetch(
                "http://localhost:5000/subscribe",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ email: cleanEmail }),
                }
            );

            const data = await response.json().catch(() => ({}));

            if (!response.ok) {
                throw new Error(
                    data.message ||
                    data.error ||
                    "Subscription failed. Please try again."
                );
            }

            setMessage(
                data.message ||
                "Thanks for subscribing! You're on the list."
            );
            setIsSuccess(true);
            setEmail("");
        } catch (error) {
            console.error("Subscription error:", error);
            setMessage(
                error.message ||
                "Unable to connect to the server. Please try again."
            );
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <>
            <section className="newsletter">
                <div className="newsletter-content">
                    <h2>SIGN UP FOR OUR DAILY INSIDER</h2>

                    <p className="newsletter-description">
                        Get updates on my projects, AI/ML journey and latest articles.
                    </p>

                    <form
                        className="newsletter-form"
                        onSubmit={handleSubmit}
                    >
                        <label
                            className="visually-hidden"
                            htmlFor="newsletter-email"
                        >
                            Email address
                        </label>

                        <input
                            id="newsletter-email"
                            type="email"
                            name="email"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            placeholder="Enter your email address"
                            autoComplete="email"
                            required
                            disabled={submitting}
                        />

                        <button
                            type="submit"
                            className="newsletter-button"
                            disabled={submitting}
                        >
                            {submitting ? "Subscribing..." : "Subscribe"}
                            {!submitting && (
                                <span
                                    className="newsletter-arrow"
                                    aria-hidden="true"
                                >
                                    →
                                </span>
                            )}
                        </button>
                    </form>

                    <p className="newsletter-note">
                        <span aria-hidden="true">♧ </span>
                        Your email is used for the subscription only.
                    </p>

                    {message && (
                        <p
                            className="newsletter-message"
                            role="status"
                            aria-live="polite"
                            style={{
                                marginTop: "14px",
                                fontSize: "13px",
                                fontWeight: 600,
                                color: isSuccess ? "#236b43" : "#b42318",
                            }}
                        >
                            {message}
                        </p>
                    )}
                </div>
            </section>

            <section id="contact" className="contact">
                <h2>Contact</h2>

                <p>
                    Email:{" "}
                    <a href="mailto:saiyams0213@gmail.com">
                        saiyams0213@gmail.com
                    </a>
                </p>

                <p>
                    GitHub:{" "}
                    <a
                        href="https://github.com/saiyam0208"
                        target="_blank"
                        rel="noreferrer"
                    >
                        github.com/saiyam0208
                    </a>
                </p>

                <p>
                    LinkedIn:{" "}
                    <a
                        href="https://www.linkedin.com/in/saiyam-sharma-36581b381"
                        target="_blank"
                        rel="noreferrer"
                    >
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
