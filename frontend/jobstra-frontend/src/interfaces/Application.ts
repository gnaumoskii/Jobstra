export interface Application {
    id: string;
    companyName: string;
    jobPosition: string;
    createdAt: Date;
    interviewDescription: string;
}

export interface ApplicationRawData {
    id: string;
    company_name: string;
    job_position: string;
    created_at: Date;
    interview_description: string;
}