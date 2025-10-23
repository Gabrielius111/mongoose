const Courses = require("./Courses.js");

console.log();

//CREATE
// @ POST
const createCourses = async (req, res) => {
  try {
    const { title, teacher } = req.body;

    if (!title || !teacher) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const result = await Course.create({ title, teacher });

    res.status(200).json({ message: "Record created", data: result });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "internal server error. Something wrong" });
  }
};

//READ
//@ GET

const getAllRecords = async (req, res) => {
  try {
    const myCoursesFromDB = await Courses.find();

    if (myCoursesFromDB.length === 0) {
      returnres.status(404).json({ message: "No courses found in DB" });
    }
    res.status(200).json(myCoursesFromDB);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "internal server error. Something wrong" });
  }
};

// READ by ID
// @ GET
const findOneCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const oneCourse = await Courses.findById(id);
    if (!oneCourse) {
      return res
        .status(400)
        .json({ message: "Such course does not exist in DB" });
    }
    res.status(200).json(oneCourse);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "internal server error. Something wrong" });
  }
};

module.exports = { createCourses, getAllRecords, findOneCourse };
