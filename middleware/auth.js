import jwt from "jsonwebtoken"

export const createToken = async (studentDetails) => {
  const token = jwt.sign({ studentId: studentDetails._id }, process.env.SECRET_KEY, { expiresIn: "24h" })
  return token
}

export const auth = (req, res, next) => {
  try {
    const token = req.cookies["token"]
    const valid = jwt.verify(token, process.env.SECRET_KEY)
    if (valid) {
      next()
    } 
  } catch (error) {
    res.status(401).json({
      success: false,
      message: error.message
    })
  }
}

export default auth