import mongoose from "mongoose"
const connectdb = async() =>{
    try {
        console.log(process.env.MONGOURI)
        const con = await mongoose.connect(`${process.env.MONGOURI}`)
        console.log("Database connection successful")
    } catch (error) {
        console.log(error)
    }
}
export default connectdb;