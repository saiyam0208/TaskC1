
import React, { useState } from "react";
import "../App.css";

export default function NewPost() {
    const [postType, setPostType] = useState("Question");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [abstract, setAbstract] = useState("");
    const [articleText, setArticleText] = useState("");
    const [tags, setTags] = useState("");
    const [popup, setPopup] = useState({
        open: false,
        type: "warning",
        title: "",
        message: "",
    });

    function showPopup(type, title, message) {
        setPopup({ open: true, type, title, message });
    }

    function closePopup() {
        setPopup((current) => ({ ...current, open: false }));
    }

    function handlePost(event) {
        event.preventDefault();

        const tagList = tags
            .split(",")
            .map((tag) => tag.trim())
            .filter(Boolean);

        if (!title.trim()) {
            showPopup(
                "warning",
                "Let's Add a Title",
                "Your post needs a title before you can continue. Please enter a clear and descriptive title."
            );
            return;
        }

        if (postType === "Question" && !description.trim()) {
            showPopup(
                "warning",
                "Tell Us More",
                "Please add some details about your question so readers can understand what you need help with."
            );
            return;
        }

        if (postType === "Article" && !abstract.trim()) {
            showPopup(
                "warning",
                "Add an Introduction",
                "Please write a short abstract to introduce the main idea of your article."
            );
            return;
        }

        if (postType === "Article" && !articleText.trim()) {
            showPopup(
                "warning",
                "Your Article Needs Content",
                "Your title and abstract are ready, but the main article text is still missing."
            );
            return;
        }

        if (tagList.length > 3) {
            showPopup(
                "warning",
                "Too Many Tags",
                "Please choose up to three relevant tags to keep your post focused."
            );
            return;
        }

        if (tagList.some((tag) => tag.length > 30)) {
            showPopup(
                "warning",
                "One Tag Is Too Long",
                "Please keep each tag to 30 characters or fewer."
            );
            return;
        }

        showPopup(
            "success",
            "Looking Good!",
            `Your ${postType.toLowerCase()} has passed validation and is ready. This demo does not save posts to a database yet.`
        );

        setTitle("");
        setDescription("");
        setAbstract("");
        setArticleText("");
        setTags("");
    }

    return (
        <main className="new-post-page">
            <form className="new-post-form" onSubmit={handlePost}>
                <h1 className="new-post-heading">New Post</h1>

                <div className="post-type-row">
                    <span className="post-type-label">Select Post Type:</span>

                    <label>
                        <input
                            type="radio"
                            name="postType"
                            value="Question"
                            checked={postType === "Question"}
                            onChange={() => setPostType("Question")}
                        />
                        Question
                    </label>

                    <label>
                        <input
                            type="radio"
                            name="postType"
                            value="Article"
                            checked={postType === "Article"}
                            onChange={() => setPostType("Article")}
                        />
                        Article
                    </label>
                </div>

                <h2 className="post-section-heading">
                    What do you want to ask or share?
                </h2>

                <p className="post-instructions">
                    This section changes according to the type of post you select.
                    Complete the relevant fields below.
                </p>

                <div className="post-field-row">
                    <label className="post-field-label" htmlFor="post-title">
                        Title
                    </label>
                    <input
                        id="post-title"
                        className="post-text-input"
                        type="text"
                        value={title}
                        onChange={(event) => setTitle(event.target.value)}
                        placeholder={
                            postType === "Question"
                                ? "Start your question with how, what, why, etc."
                                : "Enter a descriptive title"
                        }
                        maxLength={120}
                    />
                </div>

                {postType === "Question" ? (
                    <div className="post-field-column">
                        <label className="post-field-label" htmlFor="post-description">
                            Describe your problem
                        </label>
                        <textarea
                            id="post-description"
                            className="post-textarea post-question-text"
                            value={description}
                            onChange={(event) => setDescription(event.target.value)}
                            placeholder="Explain your question in detail..."
                            maxLength={5000}
                        />
                    </div>
                ) : (
                    <>
                        <div className="post-field-column">
                            <label className="post-field-label" htmlFor="post-abstract">
                                Abstract
                            </label>
                            <textarea
                                id="post-abstract"
                                className="post-textarea post-abstract-text"
                                value={abstract}
                                onChange={(event) => setAbstract(event.target.value)}
                                placeholder="Write a short introduction to your article..."
                                maxLength={1000}
                            />
                        </div>

                        <div className="post-field-column">
                            <label className="post-field-label" htmlFor="post-article-text">
                                Article Text
                            </label>
                            <textarea
                                id="post-article-text"
                                className="post-textarea post-article-text"
                                value={articleText}
                                onChange={(event) => setArticleText(event.target.value)}
                                placeholder="Write your article here..."
                                maxLength={10000}
                            />
                        </div>
                    </>
                )}

                <div className="post-field-row post-tags-row">
                    <label className="post-field-label" htmlFor="post-tags">
                        Tags
                    </label>
                    <input
                        id="post-tags"
                        className="post-text-input"
                        type="text"
                        value={tags}
                        onChange={(event) => setTags(event.target.value)}
                        placeholder={`Add up to 3 tags for your ${postType.toLowerCase()}, e.g., Java`}
                    />
                </div>

                <div className="post-submit-row">
                    <button className="post-submit-button" type="submit">
                        Post
                    </button>
                </div>
            </form>

            {popup.open && (
                <div className="custom-popup-overlay" onClick={closePopup}>
                    <div
                        className={`custom-popup ${popup.type}`}
                        role="alertdialog"
                        aria-modal="true"
                        aria-labelledby="popup-title"
                        aria-describedby="popup-message"
                        onClick={(event) => event.stopPropagation()}
                    >
                        <div className="custom-popup-heading">
                            <span className="popup-icon" aria-hidden="true">
                                {popup.type === "success" ? "✓" : "!"}
                            </span>
                            <h2 id="popup-title">{popup.title}</h2>
                        </div>

                        <div className="custom-popup-body">
                            <p id="popup-message">{popup.message}</p>
                        </div>

                        <div className="custom-popup-footer">
                            <button type="button" onClick={closePopup}>
                                Got it
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
}