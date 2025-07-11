import Newsletter from "../models/newsletterModel.js";
import transporter from "../config/nodemailer.js"

export const subscribeToNewsletter = async (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.json({ success: false, message: "Name and Email are required." });
  }

  try {
    // Check if email already exists
    const existing = await Newsletter.findOne({ email });
    if (existing) {
      return res.json({success: false, message: "Email is already subscribed." });
    }

    // Check if name already exists
    const existingName = await Newsletter.findOne({ name });
    if (existingName) {
      return res.json({success: false, message: "Name already exist." });
    }

    const newSubscriber = new Newsletter({ name, email });
    await newSubscriber.save();

    res.json({ success: true, message: "Subscribed successfully!" });

    const mailOptions = {
    from: process.env.SENDER_EMAIL,
    to: email,
    subject: "Thanks for Subscribing!",
    html: `<h3>Hello ${name},</h3>
           <p>Thank you for subscribing to Success Degree College's newsletter!</p>
           <p>We'll keep you updated with the latest news.</p>`,
  };

  await transporter.sendMail(mailOptions);

  } catch (err) {
    console.error("Newsletter error:", err);
    res.json({ success: false, message: "Server error. Please try again later." });
  }
};

export const getAllSubscribers = async (req, res) => {
  try {
    const subscribers = await Newsletter.find().sort({ subscribedAt: -1 });
    res.status(200).json({success: true,subscribers});
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch subscribers." });
  }
};

export const deleteSubscribersById = async (req, res) => {
    try {
        const { id } = req.body;
        await Newsletter.findByIdAndDelete(id);
        res.json({success: true, message: 'Subscribers deleted successfully'})
    } catch (error) {
        res.json({success: false, message: error.message})
    }
}
