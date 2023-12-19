import studentModel from "../models/studentModel.js";

const updateTaskStatus = async (studentId) => {
  try {
    const student = await studentModel.findById(studentId);
    
    if (student && student.tasks && student.tasks.length > 0) {
      const currentDate = new Date();
      const updatedTasks = student.tasks.map(task => {
        if (task.dueDate < currentDate && task.taskStatus !== 'Completed') {
          task.taskStatus = 'Overdue';
        }
        return task;
      });
      
      student.tasks = updatedTasks;
      await student.save();
    }
  } catch (error) {
    console.error('Error updating task statuses:', error);
  }
};

export default updateTaskStatus
