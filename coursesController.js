const Course = require("./Courses.js");

console.log();

//CREATE
// @ POST
const createCourses = async (req, res) => {
  try {
    const { title, teacher } = req.body;

console.log(title, teacher)

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
    const myCoursesFromDB = await Course.find();

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
    const oneCourse = await Course.findById(id);
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

// UPDATE
// @ PUT

const updateCourseById = async(req, res) => {
  try{

    const {id} = req.params;
    const {title, teacher} = req.body;

    if(!title || !teacher){
      return res.status(400).json({ error: "Data not found "});
    }


 let courseFromDB = await Course.findById(id);

 if (!courseFromDB) {
  return res.status(400).json({ error: "Course not found"});
 }

 courseFromDB.title = title;
 courseFromDB.teacher = teacher;

 const result = await courseFromDB.save();

return res.status(200).json({ message: "record updated successfully", result});
  } catch(err) {
    console.log(err);
    res.status(500).json({error: "internal server error. something wrong"})
  }
}

// DELETE

const deleteOneCourse = async(req, res) => {
  try{
    const {id} = req.params;
    
    const result = await Course.findByIdAndDelete(id);

    if(!result){
      return res.status(404).json({ message: "Course not found"})
    }

    res.status(200).json({ message: "record updated successfully", result});
  } catch(err) {
    console.log(err);
    res.status(500).json({ error: "internal server error. something wrong"});
  }
}


module.exports = { createCourses, getAllRecords, findOneCourse, updateCourseById, deleteOneCourse};
