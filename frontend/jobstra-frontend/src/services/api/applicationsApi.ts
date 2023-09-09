import { transformSnakeToCamelObj } from "../snakeToCamel";
import { Application } from "../../interfaces/Application";

export const createApplication = async (application: {company_name: string, job_position: string, interview_description: string}): Promise<Application> => {
    const response = await fetch("http://localhost:3000/applications", {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(application)
    });
    const data = await response.json();
    return transformSnakeToCamelObj<Application>(data);
}