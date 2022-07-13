const express = require("express")
const {authMiddleware} = require("../middleware/authValidation")
const JobsService = require("../services/jobs")

function jobs(app){
    const router = express.Router()
    const jobServ = new JobsService()

    app.use("/api/jobs",router)

    router.get("/",...authMiddleware("applicant-employer-admin"),  async (req,res)=>{   //

        const job = await jobServ.getAllJob()
        return res.json(job)
    })
    router.get("/:id",...authMiddleware("applicant-employer-admin"),  async(req,res) => { //
        const job = await jobServ.getOne(req.params.id)
        return res.json(job)
        
    })
    router.post("/", ...authMiddleware("employer-admin"), async (req,res)=>{
        const data = req.body
        data.employer = req.user
        const job = await jobServ.createJob(data)
        return res.json(job)
    })
    router.put("/apply/:id", ...authMiddleware("applicant-admin"), async (req, res) => {
        const applicant = req.user
        const job = await jobServ.apply(req.params.id, applicant)
        return res.json(job)
    })

    router.put("/unapply/:id", ...authMiddleware("applicant-admin"), async (req, res) => {
        const applicant = req.user
        const job = await jobServ.unapply(req.params.id, applicant)
        return res.json(job)
    })
    router.post("/category/",...authMiddleware("applicant-admin"), async (req,res)=>{
        const job = await jobServ.getJobByCategory(req.body)

        return res.json(job)
    })
    router.post("/location/",...authMiddleware("applicant-admin"), async (req,res)=>{

        const job = await jobServ.getJobByLocation(req.body)
        return res.json(job)
    })
    
    router.post("/me", ...authMiddleware("applicant-admin"), async (req,res) => {
        const job = await jobServ.getJobByApplicant(req.user)
        return res.json(job)
    })

    router.post("/employer", ...authMiddleware("employer-admin"), async (req, res) => {
        const job = await jobServ.getJobByEmployer(req.user)
        return res.json(job)
    })
    router.delete("/:id",...authMiddleware("employer-admin"), async (req,res)=>{
        const job = await jobServ.deleteJob(req.params.id)
        return res.json(job)
    })
}

module.exports = jobs