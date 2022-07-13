const {mongoose} = require("../config/db")

const Schema = mongoose.Schema

const jobsSchema = new Schema({
  employer: {
    id: String,
    name: String,
    email: String,
    role: {
        type: String,
        enum: ["applicant", "employer", "admin"]
    }
  },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    applicants: [{
      _id: String,
      id: String,
      name: String,
      email: String,
      role: {
          type: String,
          enum: ["applicant", "employer", "admin"]
      }
  }],
    category: [String],
    creationDate: { 
      type: Date, 
      immutable: true,
      default: Date.now 
  },
     location: {
      country: String,
      province: String,
      city: String
  },
     
  salary: Number,
      
      
})

const JobsModel = mongoose.model("Jobs",jobsSchema)

module.exports = JobsModel