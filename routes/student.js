const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Student = require('../models/StudentSchema');
const multer= require ('multer')

const storage = multer.diskStorage({
  destination: "images",
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },

});
const upload = multer({
  storage: storage
})



// Add a new student
router.post('/add-student', upload.single("student-photo"),async (req, res) => {
    console.log("req-->",req.body)
    console.log("image",req.file)
  try {
    const { firstName, lastName, email, password, courseName,image } = req.body;
    const imageUrl=req.file.path
    const newStudent = new Student({
      firstName,
      lastName,
      email,
      password,
      courseName,
      // Assuming imageBuffer is defined elsewhere in your code
      imageUrl,
    });

    const savedStudent = await newStudent.save();
    res.status(201).json(savedStudent);
  } catch (error) {
    console.error('Error adding student:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get all students
router.get('/get-students', async (req, res) => {
    console.log("reqBody__+++>",req.body)
  try {
    const students = await Student.find();
    res.status(200).json(students);
  } catch (error) {
    console.error('Error getting students:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get a single student by ID
// router.get("/get-single-student/:id", async (req, res) => {
//   console.log("req-->",res.body)
//   console.log("req-->",req.body)
//   try {
//     const { id } = req.params;
//      console.log("id--",id)
//     // Convert the id to a MongoDB ObjectId
//     const mongooseId = mongoose.Types.ObjectId(id);

//     const individual = await Student.findOne({ _id: mongooseId });

//     if (individual) {
//       res.status(200).json(individual);
//     } else {
//       res.status(404).json({ error: 'Student not found' });
//     }
//   } catch (error) {
//     console.error('Error fetching single student data:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });
router.get('/get-single-student/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const user = await Student.findById(id);
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});



router.post('/update-user-data/:id', async (req, res) => {
  const userId = req.params.id;
  const { checkInTime, checkOutTime } = req.body;

  try {
    const user = await Student.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    if (checkInTime) {
      user.checkInTime = checkInTime;
    }
    if (checkOutTime) {
      user.checkOutTime = checkOutTime;
    }
    await user.save();
    res.json({ success: true, message: 'User data updated successfully' });
  } catch (error) {
    console.error('Error updating user data:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});
module.exports = router;
