import { Application } from "../../interfaces/Application";
import { ErrorResponse } from "../../interfaces/ErrorResponse";

export const fetchApplications = async (): Promise<Application[] | ErrorResponse> => {
    let statusCode = 200;
    try {
            const response = await fetch("http://localhost:3000/applications", {credentials: "include"});
            if (!response.ok) {
                statusCode = response.status;
                throw new Error("An error occured while fetching the applications.")
            }
            
            const applications = await response.json();
            return applications;

    } catch (error) {
        return {success: false, statusCode, message: "error"}
    }
};

export const fetchApplication = async (id: string): Promise<Application | undefined> => {
    try {
        const response = await fetch(`http://localhost:3000/applications/${id}`, {credentials: "include"});
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
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(application),
        });
        console.log(await response.json());
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
            credentials: "include",
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
            method: 'DELETE',
            credentials: "include"
        });
        if(!response.ok) {
            throw new Error("An error occurred while deleting application.")
        }
    } catch (error) {
        console.log(error);
    }

}
