import { transformSnakeToCamelObj } from "../snakeToCamel";
import { Application, ApplicationRawData } from "../../interfaces/Application";

export const fetchApplications = async (): Promise<Application[] | undefined> => {
    try {
        const response = await fetch("http://localhost:3000/applications");
        if (!response.ok) {
            throw new Error("An error occurred while fetching applications.");
        }
        const data = await response.json();
        const applications: Application[] = data.map((application: object) => transformSnakeToCamelObj<Application>(application));
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
        const data = await response.json();
        const application = transformSnakeToCamelObj<Application>(data);
        return application;
    } catch (error) {
        console.log(error);
    }
};

export const createApplication = async (application: Partial<ApplicationRawData>): Promise<Application | undefined> => {
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
        const data = await response.json();
        return transformSnakeToCamelObj<Application>(data);
    } catch (error) {
        console.log(error);
    }

};

export const editApplication = async (id: string, application: Partial<ApplicationRawData>): Promise<Application | undefined> => {
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
        return transformSnakeToCamelObj<Application>(data);
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
