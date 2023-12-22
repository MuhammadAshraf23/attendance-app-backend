const mongoose = require("mongoose");

const StudentSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    courseName: {
        type: String,
        required: true,
    },
    imageUrl: {
        type: String,
    },
    checkInTime: {
        type: String, 
    },
    checkOutTime: {
        type: String, 
    },
});

const Student = mongoose.model("Student", StudentSchema);

module.exports = Student;
