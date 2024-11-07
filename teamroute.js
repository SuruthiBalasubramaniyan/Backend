const express = require('express');
const router = express.Router();
const multer = require('multer');
const { Team, HomeAbout, CourseCard, Enrollment, Online, Contact,  } = require('../models/teamModels'); // Ensure Online is imported

// Middleware for file upload (Multer)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});
const upload = multer({ storage: storage });

// Route to get all team members
router.get('/team', async (req, res) => {
  try {
    const teamMembers = await Team.find();
    res.json(teamMembers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Route to get all homeAbout documents
router.get('/home-about', async (req, res) => {
  try {
    const aboutInfo = await HomeAbout.find();
    res.json(aboutInfo);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Route to add a new homeAbout entry
router.post('/home-about', async (req, res) => {
  const { title, description, image } = req.body;

  const newHomeAbout = new HomeAbout({
    title,
    description,
    image,
  });

  try {
    const savedAbout = await newHomeAbout.save();
    res.status(201).json(savedAbout);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Route to get all course cards
router.get('/course-card', async (req, res) => {
  try {
    const courses = await CourseCard.find();
    res.json(courses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Route to add a new course card
router.post('/course-card', async (req, res) => {
  const { cover, coursesName, courTeacher, priceAll, pricePer } = req.body;

  const newCourseCard = new CourseCard({
    cover,
    coursesName,
    courTeacher,
    priceAll,
    pricePer,
  });

  try {
    const savedCourse = await newCourseCard.save();
    res.status(201).json(savedCourse);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Route for enrollment
router.post('/enroll', upload.single('resume'), async (req, res) => {
  try {
    const { name, email, mobile, courseName } = req.body;
    const resumePath = req.file ? req.file.path : '';

    const enrollment = new Enrollment({
      name,
      email,
      mobile,
      resume: resumePath,
      courseName,
    });

    await enrollment.save();
    res.status(201).json({ success: true, message: 'Enrollment successful!' });
  } catch (error) {
    console.error('Error during enrollment:', error);
    res.status(500).json({ success: false, message: 'Enrollment failed.' });
  }
});

// Route to get all online cover documents
router.get('/online', async (req, res) => {
  try {
    const online = await Online.find();
    res.json(online);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Route to add a new online cover entry
router.post('/online', async (req, res) => {
  const { Cover, courseName, course } = req.body;

  const newOnline = new Online({
    cover,
    courseName,
    course,
  });

  try {
    const savedOnline = await newOnline.save();
    res.status(201).json(savedOnline);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//contact
router.post('/contact', async (req, res) => {
  const { name, email, subject, message } = req.body;

  try {
      const newContact = new Contact({ name, email, subject, message });
      await newContact.save();
      res.status(200).json({ message: 'Message sent successfully!' });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error saving message' });
  }
});


//login route

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = user.generateAuthToken(); // Use JWT for token generation
    res.json({ token, user: { name: user.name, email: user.email, image: user.image } });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});



module.exports = router;
