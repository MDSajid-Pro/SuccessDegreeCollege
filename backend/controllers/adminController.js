import jwt from 'jsonwebtoken'
import Newsletter from '../models/newsletterModel.js';

export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (email !== process.env.ADMIN_EMAIL) {
      return res.json({
        success: false,
        message: 'Invalid Email'
      })
    }

    if (password !== process.env.ADMIN_PASSWORD) {
      return res.json({
        success: false,
        message: 'Invalid Password'
      })
    }
    
    const token = jwt.sign({ email }, process.env.JWT_SECRET)
    res.json({success: true,token })
    
  } catch (error) {
    res.json({
      success: false,
      message: error.message
    })
  }
}

export const getAllComments = async (req, res) => {
  try {
    const comments = await Newsletter.find({}).sort({ createdAt: -1 })
    res.json({success: true, comments})
  } catch (error) {
    res.json({success: false, message: error.message})
  }
}

export const approveSubscriberById = async (req, res) => {
  try {
    const { id } = req.body;

    await Newsletter.findByIdAndUpdate(id, { isApproved: true });
    res.json({success: true, message:'Approved successfully'})

  } catch (error) {
    res.json({success: false, message: error.message})
  }
}