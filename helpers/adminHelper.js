import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import studentModel from '../models/studentModel.js';

export const postAdminLogin = (req, res) => {
  try {
    const { email, password } = req.body
    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
      const token = jwt.sign({ studentId: email }, process.env.SECRET_KEY, { expiresIn: "2h" });

      res.cookie("token", token, { httpOnly: true, maxAge: 2 * 60 * 60 * 1000 })
      res.send({
        user: email,
        success: true,
        message: "Admin Login Successful"

      })
    } else {
      res.send("Invalid Credentials")
    }

  } catch (error) {
    console.error("Invalid ", error);
    res.status(500).send("Internal Server Error");
  }
}

export const getAdminLogout = (req, res) => {
  res.clearCookie('token')
  res.send({ message: 'Admin Logged Out' })
}

export const postCreateStudent = async (req, res) => {
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

      res.send({
        success: true,
        message: "Student Created Successfully"
      })
    }
  } catch (error) {
    console.error("Error creating student:", error);
    res.status(500).send("Internal Server Error")
  }
}

export const postAssignTask = async (req, res) => {
  try {
    const { studentID, task, dueDate } = req.body
    const newTask = {
      task,
      dueDate: new Date(dueDate)
    }
    await studentModel.findOneAndUpdate({ _id: studentID }, { $push: { tasks: newTask } }, { new: true })
    res.send({
      success: true,
      message: "Assigned task to Student"
    })
  } catch (error) {
    console.error("Error Assigning task:", error);
    res.status(500).send("Internal Server Error")
  }


}