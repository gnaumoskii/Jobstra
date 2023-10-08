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
            return {message: error.message};
        }
        return {message: "An error occured."}
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
            return {message: error.message};
        }
        throw new Error("An error occured while fetching the application.");
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
        if(error instanceof Error) {
            console.log(error);
        }
    }

}
