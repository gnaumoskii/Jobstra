import { Application } from "../../interfaces/Application";
import { ErrorResponse } from "../../interfaces/Response";

export const fetchApplications = async (): Promise<Application[] | ErrorResponse> => {
    try {
            const response = await fetch("http://localhost:3000/applications", {credentials: "include"});

            if (!response.ok) {
                const errorData: ErrorResponse = await response.json();
                if(errorData)  {
                    throw new Error(errorData.message);
                }
            }
            
            const applications: Application[] = await response.json();
            return applications;

    } catch (error) {
        if(error instanceof Error) {
            return {message: error.message == "Failed to fetch" ? "An error occured while fetching the applications." : error.message};
        }
        throw new Error("An error occured while fetching the applications.");
    }
};

export const fetchApplication = async (id: string): Promise<Application | ErrorResponse> => {
    try {
        const response = await fetch(`http://localhost:3000/applications/${id}`, {credentials: "include"});

        if (!response.ok) {
            const errorData: ErrorResponse = await response.json();
            throw new Error(errorData.message);
        }

        const application = await response.json();
        return application;
    } catch (error) {
        if(error instanceof Error) {
            return {message: error.message == "Failed to fetch" ? "An error occured while fetching the application." : error.message};
        }
        throw new Error("An error occured while fetching the application.");
    }
};

export const createApplication = async (application: Partial<Application>): Promise<Application | ErrorResponse> => {
    try {
        const response = await fetch("http://localhost:3000/applications", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(application),
        });
        if(!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message);
        }
        const createdApplication = await response.json();
        return createdApplication;
    } catch (error) {
        if(error instanceof Error) {
            return {message: error.message == "Failed to fetch" ? "An error occured while creating the application." : error.message};
        }
        throw new Error("An error occured while creating the application.");
    }

};

export const editApplication = async (id: string, application: Partial<Application>): Promise<Application | ErrorResponse> => {
    try {
        const response = await fetch(`http://localhost:3000/applications/${id}`, {
            method: "PATCH",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(application),
        });
        if(!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        if(error instanceof Error) {
            return {message: error.message == "Failed to fetch" ? "An error occured while updating the application." : error.message};
        }
        throw new Error("An error occured while updating the application.");
    }

};

export const deleteApplication = async (id: string): Promise<void | ErrorResponse> => {
    try {
        const response = await fetch(`http://localhost:3000/applications/${id}`, {
            method: 'DELETE',
            credentials: "include"
        });
        if(!response.ok) {
            throw new Error();
        }
    } catch (error) {
        return {message: "An error occurred while deleting application."}
    }

}
