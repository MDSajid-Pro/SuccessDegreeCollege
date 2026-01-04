import Notice from '../models/noticeModel.js'

// @desc    Get all notices
// @route   GET /api/notices
export const getNotices = async (req, res) => {
  try {
    // Sort by createdAt descending (newest first)
    const notices = await Notice.find().sort({ createdAt: -1 });
    res.status(200).json(notices);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a new notice
// @route   POST /api/notices
export const createNotice = async (req, res) => {
  const { title, category, date, link, isNew } = req.body;

  if (!title || !category || !date) {
    return res.status(400).json({ message: 'Please add all required fields' });
  }

  try {
    const notice = await Notice.create({
      title,
      category,
      date,
      link,
      isNew
    });
    res.status(201).json(notice);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete a notice
// @route   DELETE /api/notices/:id
export const deleteNotice = async (req, res) => {
  try {
    const notice = await Notice.findById(req.params.id);

    if (!notice) {
      return res.status(404).json({ message: 'Notice not found' });
    }

    await notice.deleteOne();
    res.status(200).json({ id: req.params.id, message: 'Notice deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateNotice = async (req, res) => {
  const notice = await Notice.findById(req.params.id);
  if (notice) {
    notice.title = req.body.title || notice.title;
    notice.category = req.body.category || notice.category;
    notice.date = req.body.date || notice.date;
    notice.isNew = req.body.isNew || notice.isNew;

    const updatedNotice = await notice.save();
    res.json(updatedNotice);
  } else {
    res.status(404);
    throw new Error('Notice not found');
  }
};