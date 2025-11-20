const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");

app.use(express.json());
app.use(cors());

//  mongodb+srv://bereisagb_db_user:hU042DhrjYrpmV75@mongoose.ytmfdhp.mongodb.net/?retryWrites=true&w=majority&appName=Mongoose

mongoose.connect("mongodb+srv://bereisagb_db_user:hU042DhrjYrpmV75@shoppinglist.uwy7q5b.mongodb.net/shoppingDB?retryWrites=true&w=majority")
.then(()=> console.log("connected to DB"))
.catch((error)=> console.log(error));

const { createCourses, getAllRecords, findOneCourse, updateCourseById, deleteOneCourse} = require("./coursesController");

app.post("/courses", createCourses);
app.get("/allcourses", getAllRecords);
app.get("/courses/:id", findOneCourse);
app.put("/course/:id", updateCourseById);
app.delete("/course/:id", deleteOneCourse);

//////////////
app.listen(5000, () => console.log("Serveris veikia"));
