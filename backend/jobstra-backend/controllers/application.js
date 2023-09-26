import Application from "../models/application.js";

export const getAllApplications = async (req,res) => {
    const applications = await Application.findAll();
    res.json(applications);
}

export const getApplication = async (req,res) => {
    try {
        const id = req.params.id;
        const application = await Application.findByPk(id);
        res.json(application);
    } catch (error) {
        console.log(error);
    }
}

export const createApplication = async (req,res) => {
    const {companyName, jobPosition, interviewDescription} = req.body;
    const applications = await Application.create({
        companyName,
        jobPosition,
        interviewDescription
    });
    res.json(applications);
}

export const editApplication = async (req,res) => {
    const id = req.params.id;
    const applicationBody = req.body;
    await Application.update(applicationBody, {where: { id }})
    res.json({
        success: true,
        message: "Application successfully updated.",
        updatedData: applicationBody
    });
}

export const deleteApplication = async (req,res) => {
    const id = req.params.id;
    const rowsDeleted = await Application.destroy({where: {id}});

    if(rowsDeleted) {
        res.json({
            success: true,
            message: "Application deleted.",
        });
    } else {
        res.json({
            success: false,
            message: "No application is deleted.",
        });
    }

}