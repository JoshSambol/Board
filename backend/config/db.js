import mongoose from "mongoose"

const connectdb = async() =>{
    try {
        const con = await mongoose.connect(`${process.env.MONGOURI}`)
        console.log("Sevrer connection successful")
    } catch (error) {
        console.log(error)
    }
}
export default connectdb;