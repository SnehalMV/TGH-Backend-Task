import studentModel from "../models/studentModel.js";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";

export const postSignup = async (req, res) => {
  try {
    const { name, email, department, password } = req.body
    const exists = await studentModel.findOne({ email })
    if (exists) {
      res.status(409).send("Student Already Exists")
    } else {
      const hashedPassword = await bcrypt.hash(password, 10)
      const studentDetails = new studentModel({
        name,
        email,
        department,
        password: hashedPassword
      })
      await studentDetails.save()

      const token = jwt.sign({ studentId: studentDetails.email }, process.env.SECRET_KEY, { expiresIn: "2h" });

      res.cookie("token", token, { httpOnly: true, maxAge: 2 * 60 * 60 * 1000 })
      res.cookie("studentId", studentDetails._id, { httpOnly: true, maxAge: 2 * 60 * 60 * 1000 })
      res.send({
        student: email,
        success: true,
        message: "Student Registered Successfully"

      })
    }

  } catch (error) {
    console.error("Error registering student:", error);
    res.status(500).send("Internal Server Error");
  }

}

export const postLogin = async (req, res) => {
  try {
    const { email, password } = req.body
    const student = await studentModel.findOne({ email })
    if (student) {
      const passwordCheck = await bcrypt.compare(password, student.password)
      if (passwordCheck) {
        const token = jwt.sign({ studentId: email }, process.env.SECRET_KEY, { expiresIn: "2h" });

        res.cookie("token", token, { httpOnly: true, maxAge: 2 * 60 * 60 * 1000 })
        res.cookie("studentId", student._id, { httpOnly: true, maxAge: 2 * 60 * 60 * 1000 })
        res.send({
          student: email,
          success: true,
          message: "Student Login Successful"

        })
      } else {
        res.send('Incorrect Credentials')
      }
    } else {
      res.send('Student does not exist')
    }
  } catch (error) {
    console.error("Error logging In: ", error);
    res.status(500).send("Internal Server Error");
  }
}

export const getLogout = (req, res) => {
  res.clearCookie('token')
  res.clearCookie('studentId')
  res.send({ message: 'Student Logged Out' })
}

export const postChangeTaskStatus = async (req, res) => {
  try {
    const studentID = req.cookies["studentId"]
    const { task, status } = req.body
    await studentModel.updateOne({ _id: studentID, 'tasks.task': task }, { $set: { 'tasks.$.taskStatus': status } }, { new: true })
    res.send({
      success: true,
      message: "Task Status Updated"

    })
  } catch (error) {
    console.error("Error Updating: ", error);
    res.status(500).send("Internal Server Error");
  }
}