
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
    cors({
        origin: ["http://localhost:5173", "http://localhost:5174"],
        methods: ["GET", "POST", "OPTIONS"],
        allowedHeaders: ["Content-Type"],
    })
);

app.use(express.json());

// Health check
app.get("/", (_req, res) => {
    res.status(200).send("Newsletter backend is running.");
});

// Newsletter subscription
app.post("/subscribe", async (req, res) => {
    const email =
        typeof req.body?.email === "string"
            ? req.body.email.trim()
            : "";

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
        return res.status(400).json({
            message: "Please enter a valid email address.",
        });
    }

    if (!process.env.SENDGRID_API_KEY || !process.env.SENDER_EMAIL) {
        console.error("SendGrid configuration is missing.");

        return res.status(500).json({
            message: "The email service is not configured yet.",
        });
    }

    try {
        const response = await fetch(
            "https://api.sendgrid.com/v3/mail/send",
            {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${process.env.SENDGRID_API_KEY}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    personalizations: [{ to: [{ email }] }],
                    from: { email: process.env.SENDER_EMAIL },
                    subject: "Welcome to DEV@Deakin",
                    content: [
                        {
                            type: "text/plain",
                            value:
                                "Welcome to DEV@Deakin! Thank you for subscribing.",
                        },
                    ],
                }),
            }
        );

        console.log("SendGrid HTTP status:", response.status);

        if (response.status === 202) {
            return res.status(202).json({
                message:
                    "Subscription successful! Your welcome email has been accepted for delivery.",
            });
        }

        const errorDetails = await response.text();

        console.error("SendGrid HTTP status:", response.status);
        console.error("SendGrid error details:", errorDetails);

        return res.status(502).json({
            message: "SendGrid rejected the request. Check the backend terminal.",
        });
    } catch (error) {
        console.error("Subscription error:", error);

        return res.status(500).json({
            message: "A server error occurred. Please try again later.",
        });
    }
});

app.listen(PORT, () => {
    console.log(`Newsletter backend running at http://localhost:${PORT}`);
});
