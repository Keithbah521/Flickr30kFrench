const mongoose = require('mongoose')
mongoose.disconnect()
require('dotenv/config')
mongoose.set("strictQuery", false);
async function connect_to_db() {
    try {
        await mongoose.connect(process.env.DB_CONNECTION)
        console.log("Succefully Connected")
    } catch (error) {
        console.log(error)
    }
}
// Create our Schema
const NocaptionsSchema = mongoose.Schema({
    img: {
        type: String,
        required: true
    },
    EnCap: {
        type: String,
        required: true
    },
    FrCap: {
        type: String,
        required: true
    },
    Correct_fr: {
        type: String,
        //default: "Correct"
    },
    status: {
        type: Number,
        default: 0
    }
})
module.exports = mongoose.model("Nocaptions", NocaptionsSchema)
console.log(mongoose.connection.readyState);
connect_to_db()