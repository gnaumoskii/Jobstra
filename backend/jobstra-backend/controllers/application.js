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
        if(!applications) {
            res.status(404).json({message: "An error occured while fetching applications."});
        }
        res.json(applications.map(application => applicationResponseData(application)));
};

export const getApplication = async (req, res) => {
        const id = req.params.id;
        const [application] = await req.user.getApplications({where: {id}});

        if(!application) {
            return res.status(404).json({message: "Application does not exist."});
            
        }
        return res.json(applicationResponseData(application));
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
