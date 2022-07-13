const res = require("express/lib/response");
const JobsModel = require("../models/jobs")

class Jobs{
    // Obtener todos los trabajos
    async getAllJob(){
        try{
            const job = await JobsModel.find()
            return job 
            
        }catch(error){
            console.log(error)
        }
    }
    // Obtener un empleo a traves del ID
    async getOne(id){
        try {
            const job = await JobsModel.findById(id)
            return job
        } catch (error) {
            console.log(error);
        }
    }

    // Registra un nuevo puesto de trabajo

    async createJob(data){
      try { 
        // La función cambia a minusculas los string de categoria
        data.category = this.#toLowerCaseList(data.category)
        const job = await JobsModel.create(data)
        return job
    } catch(error){
        if(error.errors.title){
            const message = `Please enter a title `
            return {
                error:true,
                message
            }}
        if(error.errors.category){
            const message = `Please select a category `
            return {
                error:true,
                message
            }}
        if(error.errors.country){
            const message = `Please enter the country `
            return {
                error:true,
                message
            }}
        if(error.errors.description){
            const message = `Please describe the job `
            return {
                error:true,
                message
            }}  
        }
}
// Agrega los datos de la persona que se postula al trabajo 
async apply(id, data){
    try {
        // Primero validamos si existe el puesto de trabajo
        const validationJob = await this.#validationJob(id)
        if (!validationJob.status){
            // Despues validamos si el postulante ya se postuló en el puesto
            const validationApplicant = await this.#validationApplicant(id, data.id)
            if(!validationApplicant.status){
                const job = await JobsModel.findByIdAndUpdate(id, { $push: {applicants: data}}, {new: true})
                return job
            }
            return {
                error: validationApplicant.status,
                message: validationApplicant.message
            } 
            
        }
        return {
            error: validationJob.status,
            message: validationJob.message
        } 
    } catch (error) {
        console.log(error);
    }
}

 // Elimina la postulación de un postulante a un puesto de trabajo 
 async unapply(id, userApplicant){
    try {
      //  console.log(userApplicant);
        const validationJob = await this.#validationJob(id)
        if (!validationJob.status){
            const validationApplicant = await this.#validationApplicant(id, userApplicant.id)
            if(validationApplicant.status){
                const job = await JobsModel.findByIdAndUpdate(id, { $pull: {applicants: {id: userApplicant.id}}}, {new: true})
                return job
            }
            return {
                error: !validationApplicant.status,
                message: validationApplicant.message
            } 
            
        }
        return {
            error: validationJob.status,
            message: validationJob.message
        } 
    } catch (error) {
        console.log(error);
    }
}

// Filtra los puestos de trabajos por categoria
async getJobByCategory(categories){
    try {
        categories.category = this.#toLowerCaseList(categories.category)
        const jobs = await JobsModel.find({
            category: {
                $all: categories.category
            }
        })
        if (jobs[0]) {
            return jobs
        }
        return {
            message: "There are no jobs for those categories"
        }
    } catch (error) {
        console.log(error);
    }
}

// Filtrar los puestos de trabajo por ubicación segun pais, provincia o ciudad
async getJobByLocation(location){
    try {
        let jobs
        if (location.country){
            jobs = await JobsModel.find({
                "location.country": location.country
            })
        }
        if (location.province){
            jobs = await JobsModel.find({
                "location.province": location.province
            })
        }
        if (location.city){
            jobs = await JobsModel.find({
                "location.city": location.city
            })
        }
        if (jobs[0]) {
            return jobs
        }
        return {
            message: "There are no jobs for those locations"
        }
    } catch (error) {
        console.log(error);
    }
}

// Visualizamos los puestos de trabajo a los que un postulante se postuló
async getJobByApplicant(applicant){
    try {
        const jobs = await JobsModel.aggregate([
            {
              $unwind: "$applicants"
            },
            {
              $match: {
                "applicants.id": applicant.id
              }
            }
          ])
        if (jobs[0]){
            return jobs
        }
        return {
            error: true,
            message: "No job applications found"
        }
    } catch (error) {
        console.log(error);
    }

}

// Visualizamos los puestos de trabajo que un empleador realizó
async getJobByEmployer(employer){
    try {
        const jobs = await JobsModel.find({"employer.id": employer.id})
        if (jobs[0]){
            return jobs
        }
        return {
            error: true,
            message: "No jobs created were found"
        }
    } catch (error) {
        console.log(error);
    }

}

// Valida si un puesto de trabajo existe a partir del ID
async #validationJob(id){
    try {
        
        const job = await JobsModel.findById(id)
        if (job) {
            return {
                status: false,
                message: ""
            }
        }
        return {
            status: true,
            message: "The job doesn't exist"
        }
        
    } catch (error) {
        console.log("error catch", error);
    }
}

// Hacemos la funcion si un postulante ya realizó la postulación a un puesto de trabajo
async #validationApplicant(idJob, idApplicant){
    try {
        const applicant = await JobsModel.findById(idJob)
        let band = false
        applicant.applicants.forEach(a => {
            if(a.id === idApplicant){
                band = true
            }
        });
        if (band){
            return {
                status: true,
                message: "You are already applied to the job"
            }
        }
        return {
            status: false,
            message: "You did not apply for this job"
        }
        
    } catch (error) {
        console.log(error);
    }
}

// Cambiamos los string de categoria a minusculas para facilitar el filtro
#toLowerCaseList(category){
    for (let i = 0; i < category.length; i++) {
        category[i] = category[i].toLowerCase()
    }
    return category
}

// Borramos un puesto de trabajo creado
async deleteJob(id){
    try{
        const job = await JobsModel.findByIdAndDelete(id)

        return job 
    }catch(error){
        console.log(error)
    }
}

}

module.exports = Jobs