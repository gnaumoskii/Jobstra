import ApplicationSorts from "../enums/ApplicationSorts";
import { Application } from "../interfaces/Application";

export const sortApplications = (value: number, applications: Application[]): Application[] => {
    switch(value) {
        case ApplicationSorts.DateCreated_NEW:
            return [...applications].sort((a,b) => new Date(b.applicationDate).getTime() - new Date(a.applicationDate).getTime());
        case ApplicationSorts.DateCreated_OLD:
            return [...applications].sort((a,b) => new Date(a.applicationDate).getTime() - new Date(b.applicationDate).getTime());
        case ApplicationSorts.CompanyName_AZ:
            return [...applications].sort((a,b) => a.companyName.toLowerCase().localeCompare(b.companyName.toLowerCase()));
        case ApplicationSorts.CompanyName_ZA:
            return [...applications].sort((a,b) => b.companyName.toLowerCase().localeCompare(a.companyName.toLowerCase()));
        case ApplicationSorts.JobPosition_AZ:
            return [...applications].sort((a,b) => a.jobPosition.toLowerCase().localeCompare(b.jobPosition.toLowerCase()));
        case ApplicationSorts.JobPosition_ZA:
            return [...applications].sort((a,b) => b.jobPosition.toLowerCase().localeCompare(a.jobPosition.toLowerCase()));
        default:
            return [...applications].sort((a,b) => new Date(b.applicationDate).getTime() - new Date(a.applicationDate).getTime());
    }
}