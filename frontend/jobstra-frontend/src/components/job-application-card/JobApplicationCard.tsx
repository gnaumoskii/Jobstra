interface JobApplicationProps {
  application: Application;
}

const JobApplicationCard = ({application}: JobApplicationProps) => {

  const applicationDate: Date = new Date(application.createdAt);
  const applicationDateString: string = `${applicationDate.getDay()}.${applicationDate.getMonth()}.${applicationDate.getFullYear()}`;

  return (
    <li className="job-application">
        <h1 className="job-application__company-name">{application.companyName}</h1>
        <p className="job-application__job-position--label">Job Position</p>
        <p className="job-application__job-position">{application.jobPosition}</p>
        <p className="job-application__date-created--label">Date of application</p>
        <p className="job-application__date-created">{applicationDateString}</p>
        <p className="job-application__interview-description">{application.interviewDescription}</p>
    </li>
  )
}

export default JobApplicationCard