const express = require("express");
const connectDB = require("./Config/Db");
const studentModel = require("./StudentModel");
const bodyParser = require("body-parser");
const cors = require('cors');
const courseModel = require("./CourseModal");


// const cors=require('cors');

const app = express();

const PORT = 8080;
connectDB();
app.use(cors(
    {
        origin:'*',
    }
));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  // res.send("Avneeesh Singh Yadav")
  res.status(200).json({
    name: "Avneesh Singh Yadav",
    age: 21,
    college: "IIT Kanpur",
  });
});
6
// POST STUDENT API

app.post("/student", async (req, res) => {
  try {
    console.log("req avneesh:", req.body);
    const { name, email, age, course } = req.body;

    if (!name || !email || !course) {
      return res.status(400).json({
        message: "Name, email and course are required fields",
      });
    }

    const isstudentExist = await studentModel.findOne({ email: email });
    console.log("isstudentExist:", isstudentExist);
    if (isstudentExist) {
      return res.status(400).json({
        message: "Student with this email already exists",
      });
    }

    const newStudent = new studentModel({
      name: name,
      email: email,
      age: age,
      course: course,
    });
    newStudent.save();

    return res.status(201).json({
      message: "Student created successfully",
      student: newStudent,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error in creating student",
      error: error.message,
    });
  }
});

// GET STUDENT API

app.get("/all-student", async (req, res) => {
  try {
    const student = await studentModel.find();

    return res.status(200).json({
      message: "Student get successfully",
      students: student,
    });
  } catch (error) {
    return res.status(500).json({
      message: "error in the db",
      error: error.message,
    });
  }
});

// UPDATE STUDENT API

app.put("/update-student/:id", async (req, res) => {
  try {
    const studentId = req.params.id;

    console.log("isStudentexist not running");
    console.log("Updating student:", studentId, req.body);
    const updatedStudent = await studentModel.findByIdAndUpdate(
      studentId,
      { ...req.body },
      { new: true }
    );

    if (!updatedStudent) {
      return res.status(404).json({
        message: "Student not found",
      });
    }
    return res.status(200).json({
      message: "Student updated successfully",
      student: updatedStudent,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error in updating student",
      error: error.message,
    });
  }
});

// DELETE STUDENT API

app.delete("/student/:id", async (req, res) => {
  try {
    const studentId = req.params.id;

    const deletedStudent = await studentModel.findByIdAndDelete(studentId);

    if (!deletedStudent) {
      return res.status(404).json({
        message: "Student not found",
      });
    }
    return res.status(200).json({
      message: "Student deleted successfully",
      student: deletedStudent,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error in deleting student",
      error: error.message,
    });
  }
});




//   api for courses will be added here
app.post("/courses",async (req,res)=>{
  try {
  const {courseId, courseName, duration, description } = req.body;

  const isCousrseExist = await courseModel.findOne({ courseId: courseId });
  console.log("isCousrseExist:", isCousrseExist);
  if (isCousrseExist) {
    return res.status(400).json({
      message: "Course with this ID already exists",
    });
  }

  const newCourse = new courseModel({
    courseId: courseId || "",
    courseName: courseName || "",
    duration: duration ||"",
    description: description || ""
  });
  newCourse.save();

  res.status(200).json({
    message: "Course created successfully",
    courseId: courseId,
    courseName: courseName,
    duration: duration,
    description: description
  });

   } catch (error) {
    return res.status(500).json({
      message: "Error in creating course",
      error: error.message,
    });
    
  }

})

// Get all courses Api
app.get("/all-courses",async (req,res)=>{
  try {
    const courses =await courseModel.find()

   if(courses.length===0){
    return res.status(404).json({
      message:"No courses found"
    });
   }

    res.status(200).json({
      message:"Courses fetched successfully",
      courses:courses
    });
    
  } catch (error) {
    return res.status(500).json({
      message: "Error in fetching courses",
      error: error.message,
    });
    
  }
})


// delete course api
app.delete("/course/:id",async (req,res)=>{
  try {
    const courseId = req.params.id;
    console.log("Deleting course with ID:", courseId);
    const deletedCourse = await courseModel.findOneAndDelete({courseId:courseId});

    if (!deletedCourse) {
      return res.status(404).json({
        message: "Course not found",
      });
    } 
    return res.status(200).json({
      message: "Course deleted successfully",
      course: deletedCourse,
    });   
  } catch (error) {
    return res.status(500).json({
      message: "Error in deleting course",
      error: error.message,
    });
  }
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
