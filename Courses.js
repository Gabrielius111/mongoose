const mongoose = require("mongoose")

const coursesSchema = new mongoose.Schema({
    title: String,
    teacher: String,
    data: {type: Date, default: Date.now},
});

const Course = mongoose.model("Courses", coursesSchema);

module.exports = mongoose.model("Courses", coursesSchema);