import mongoose, { Schema } from "mongoose";

const studentSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  department: {
    type: String,
    required: true
  },
  tasks: [{
    _id: false,
    task: {
      type: String,
      required: true
    },
    taskStatus: {
      type: String,
      default: 'Pending'
    },
    dueDate: {
      type: Date,
      required: true
    }
  }]
})

const studentModel = mongoose.model('student', studentSchema)

export default studentModel