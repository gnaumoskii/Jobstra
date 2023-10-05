import Application from "../models/application.js";

const applicationResponseData = (application) => {
    return {
        id: application.id,
        companyName: application.companyName,
        jobPosition: application.jobPosition,
        interviewDescription: application.interviewDescription,
        applicationDate: application.applicationDate,
    };
};

export const getApplications = async (req, res) => {
    const applications = await req.user.getApplications();
    res.json(applications.map(application => applicationResponseData(application)));
};

export const getApplication = async (req, res) => {
    try {
        const id = req.params.id;
        const [application] = await req.user.getApplications({where: {id}});
        if(application) {
            res.json(applicationResponseData(application));
        } else {
            res.status(404);
            res.end();
        }

    } catch (error) {
        console.log(error);
    }
};

export const createApplication = async (req, res) => {
    console.log("creating....");
    const applicationData = req.body;
    
    const createdApplication = await req.user.createApplication(applicationData);
    
    res.json(createdApplication);
};

export const editApplication = async (req, res) => {
    const id = req.params.id;
    const applicationBody = req.body;
    console.log(applicationBody);
    await Application.update(applicationBody, { where: { id } });
    res.json({
        success: true,
        message: "Application successfully updated.",
        updatedData: applicationBody,
    });
};

export const deleteApplication = async (req, res) => {
    const id = req.params.id;
    const rowsDeleted = await Application.destroy({ where: { id } });

    if (rowsDeleted) {
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
};
