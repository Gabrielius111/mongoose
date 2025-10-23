const express = require("express");
const app = express();
const mongoose = require("mongoose")

app.use(express.json());

//  mongodb+srv://bereisagb_db_user:hU042DhrjYrpmV75@mongoose.ytmfdhp.mongodb.net/?retryWrites=true&w=majority&appName=Mongoose

mongoose.connect("mongodb+srv://bereisagb_db_user:hU042DhrjYrpmV75@mongoose.ytmfdhp.mongodb.net/?retryWrites=true&w=majority&appName=Mongoose")
.then(()=> console.log("connected to DB"))
.catch((error)=> console.log(error));

const { createCourses, getAllRecords, findOneCourse } = require("./coursesController");

app.post("/courses", createCourses);
app.get("/allcourses", getAllRecords);
app.get("/course/:id", findOneCourse)
//////////////
app.listen(5050, () => console.log("Serveris veikia"));
