import AdmissionModel from '../models/admissionModel.js';// Ensure file extension is .js
import transporter from "../config/nodemailer.js"

// --- 2. Email Helper Function ---
const sendEmail = async (to, subject, htmlContent) => {
  try {
    const mailOptions = {
      from: `"Admin Success Degree College" <${process.env.SENDER_EMAIL}>`,
      to: to,
      subject: subject,
      html: htmlContent
    };

    await transporter.sendMail(mailOptions);
    console.log(`✅ Email sent to ${to}`);
    return true;
  } catch (error) {
    console.error("❌ Email Failed:", error);
    return false;
  }
};

// --- CONTROLLERS ---

// @desc    Submit a new admission application
// @route   POST /api/admission
export const submitAdmission = async (req, res) => {
  try {
    // 1. Validation
    if (!req.files || !req.files.photo || !req.files.transcript) {
      return res.status(400).json({ success: false, message: "Photo and Transcript files are required." });
    }

    // 2. Generate Unique ID (Format: ADM-YEAR-RANDOM)
    const year = new Date().getFullYear();
    const randomNum = Math.floor(1000 + Math.random() * 9000); 
    const uniqueId = `ADM-${year}-${randomNum}`;

    // 3. Prepare data
    const admissionData = {
      applicationId: uniqueId,
      ...req.body,
      photo: req.files.photo[0].path,
      transcript: req.files.transcript[0].path
    };

    // 4. Save to Database
    const newAdmission = await AdmissionModel.create(admissionData);

    res.status(201).json({
      success: true,
      message: "Application submitted successfully",
      applicationId: newAdmission.applicationId
    });

  } catch (error) {
    console.error("Admission Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get all applications
// @route   GET /api/admission
export const getAllAdmissions = async (req, res) => {
  try {
    const admissions = await AdmissionModel.find().sort({ createdAt: -1 });
    res.json({ success: true, admissions });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update application (Edit details OR Approve/Reject with Email)
// @route   PUT /api/admission/:id
export const updateAdmission = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // 1. Find the existing application first
    const existingApp = await AdmissionModel.findById(id);
    if (!existingApp) {
      return res.status(404).json({ success: false, message: "Application not found" });
    }

    // 2. Update the document
    const updatedAdmission = await AdmissionModel.findByIdAndUpdate(
      id,
      req.body,
      { new: true } // Return the updated document
    );

    // 3. Logic: If 'status' was changed, send the Email
    let emailSent = false;
    
    // Check if status exists in body AND it is different from the old status
    if (status && status !== existingApp.status) {
      
      let emailSubject = "";
      let emailBody = "";

      if (status === "Approved") {
        emailSubject = "🎉 Admission Application Approved!";
        emailBody = `
          <div style="font-family: Arial, sans-serif; padding: 20px; color: #333; max-width: 600px; border: 1px solid #ddd; border-radius: 10px;">
            <h2 style="color: #166534;">Congratulations, ${updatedAdmission.firstName}!</h2>
            <p>We are pleased to inform you that your application for the <strong>${updatedAdmission.program}</strong> program has been <strong>APPROVED</strong>.</p>
            <p><strong>Application ID:</strong> ${updatedAdmission.applicationId}</p>
            <hr style="border: 1px solid #eee; margin: 20px 0;">
            <p>Please visit the college office with your original documents to complete the admission process.</p>
          </div>
        `;
      } else if (status === "Rejected") {
        emailSubject = "Update on your Admission Application";
        emailBody = `
          <div style="font-family: Arial, sans-serif; padding: 20px; color: #333; max-width: 600px; border: 1px solid #ddd; border-radius: 10px;">
            <h2 style="color: #991b1b;">Application Status Update</h2>
            <p>Dear ${updatedAdmission.firstName},</p>
            <p>We regret to inform you that your application (ID: ${updatedAdmission.applicationId}) has been <strong>REJECTED</strong>.</p>
            <p>If you believe this is an error, please contact the administration office.</p>
          </div>
        `;
      }

      // Send Email if subject was set
      if (emailSubject) {
        emailSent = await sendEmail(updatedAdmission.email, emailSubject, emailBody);
      }
    }

    res.json({ 
      success: true, 
      message: emailSent ? "Updated & Email Sent" : "Details Updated Successfully", 
      admission: updatedAdmission 
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete application
// @route   DELETE /api/admission/:id
export const deleteAdmission = async (req, res) => {
  try {
    const application = await AdmissionModel.findByIdAndDelete(req.params.id);
    
    if (!application) {
      return res.status(404).json({ success: false, message: "Application not found" });
    }

    res.json({ success: true, message: "Application deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};