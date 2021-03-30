import mongoose from 'mongoose'

async function dbConnect() {

    if (mongoose.connection.readyState >= 1) {
        return
    }

    console.log(process.env.MONGODB_URI)
    return mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
    })
}

export default dbConnect