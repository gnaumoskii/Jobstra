import { Application } from "../../interfaces/Application";

export const fetchApplications = async (): Promise<Application[] | undefined> => {
    try {
        const response = await fetch("http://localhost:3000/applications");
        if (!response.ok) {
            throw new Error("An error occurred while fetching applications.");
        }
        const applications = await response.json();
        return applications;
    } catch (error) {
        console.log(error);
    }
};

export const fetchApplication = async (id: string): Promise<Application | undefined> => {
    try {
        const response = await fetch(`http://localhost:3000/applications/${id}`);
        if (!response.ok) {
            throw new Error("An error occurred while fetching the application.");
        }
        const application = await response.json();
        return application;
    } catch (error) {
        console.log(error);
    }
};

export const createApplication = async (application: Partial<Application>): Promise<Application | undefined> => {
    try {
        const response = await fetch("http://localhost:3000/applications", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(application),
        });
        if(!response.ok) {
            throw new Error("An error occurred while creating application.");
        }
        const createdApplication = await response.json();
        return createdApplication;
    } catch (error) {
        console.log(error);
    }

};

export const editApplication = async (id: string, application: Partial<Application>): Promise<Application | undefined> => {
    try {
        const response = await fetch(`http://localhost:3000/applications/${id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(application),
        });
        if(!response.ok) {
            throw new Error("An error occurred while creating application.");
        }
        const data = await response.json();
        console.log(data);
        return data.updatedData;
    } catch (error) {
        console.log(error);
    }

};

export const deleteApplication = async (id: string): Promise<void> => {
    try {
        const response = await fetch(`http://localhost:3000/applications/${id}`, {
            method: 'DELETE'
        });
        if(!response.ok) {
            throw new Error("An error occurred while deleting application.")
        }
    } catch (error) {
        console.log(error);
    }

}
