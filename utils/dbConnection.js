import mongoose from "mongoose";

const db = () => {
  mongoose.connect(process.env.MONGODB_CONNECTION_URI, {
  }).then(() => {
    console.log("Connected successfully");
  }).catch(() => {
    console.log("Error");
  })

}
export default db 