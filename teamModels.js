 
 
const mongoose = require('mongoose');

//team
const teamSchema = new mongoose.Schema({
  cover: {
    type: String,
    required: true, // Cover image for the team member
  },
  name: {
    type: String,
    required: true, // Team member's name
  },
  work: {
    type: String,
    required: true, // Position or role
  },
});

//home

const homeAboutSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true, // Title for the "About" section
  },
  description: {
    type: String,
    required: true, // Detailed description
  },
  image: {
    type: String,  // Image URL
    required: true,
  },
});

//course

const courseCardSchema = new mongoose.Schema({
  cover: {
    type: String,
    required: true, // Course cover image
  },
  coursesName: {
    type: String,
    required: true, // Course name
  },
  courTeacher: [{
    dcover: {
      type: String, // Teacher's cover image
      required: true,
    },
    name: {
      type: String,  // Teacher's name
      required: true,
    },
    totalTime: {
      type: String,  // Total hours/lectures for the course
      required: true,
    }
  }],
  priceAll: {
    type: String,  // Total price for the course
    required: true,
  },
  pricePer: {
    type: String,  // Price per month
    required: true,
  }
});


//enrollment

const enrollmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, // Student's name
  },
  email: {
    type: String,
    required: true, // Student's email
  },
  mobile: {
    type: String,
    required: true, // Student's mobile number
  },
  resume: {
    type: String, // Path to the uploaded resume file
  },
  courseName: {
    type: String,
    required: true, // The name of the course being enrolled in
  },
});

//online 

const onlineSchema = new mongoose.Schema({
  cover: {
    type: String,
    required: true,
  },
  courseName: {
    type: String,
    required: true,
  },
  course: {
    type: String,
    required: true,
  },
});

//contact
const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  subject: { type: String, required: true },
  message: { type: String, required: true },
});



const Team = mongoose.model('Team', teamSchema, 'team');
const HomeAbout = mongoose.model('HomeAbout', homeAboutSchema, 'homeAbout');
const CourseCard = mongoose.model('CourseCard', courseCardSchema, 'courseCard');
const Enrollment = mongoose.model('Enrollment', enrollmentSchema);
const Online = mongoose.model('Online', onlineSchema, 'online');
const Contact = mongoose.model('Contact', contactSchema);
module.exports = { Team, HomeAbout, CourseCard, Enrollment, Online, Contact };  
