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
    try {
        const applicationData = req.body;
        const createdApplication = await req.user.createApplication(applicationData);
        res.json(createdApplication);
    } catch (error) {
        res.status(500).json({message: "An error occured while creating the application."});
    }
};

export const editApplication = async (req, res) => {
    try {
        const id = req.params.id;
        const applicationBody = req.body;
        await Application.update(applicationBody, { where: { id } });
        res.json(applicationBody);
    } catch (error) {
        res.status(500).json({message: "An error occured while updating the application."});
    }

};

export const deleteApplication = async (req, res) => {
    try {
        const id = req.params.id;
        await Application.destroy({ where: { id } });
        res.status(200).end();
    } catch (error) {
        res.status(500).json({message: "An error occured while deleting the application."});
    }
};
