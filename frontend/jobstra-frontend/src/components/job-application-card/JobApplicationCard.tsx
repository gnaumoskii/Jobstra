import { useNavigate } from "react-router-dom";
import { Application } from "../../interfaces/Application";
import { dateFormat } from "../../services/dateFormat";

interface JobApplicationProps {
  application: Application;
  animationDelay: number;
}

const JobApplicationCard: React.FC<JobApplicationProps> = ({application, animationDelay}) => {
  const navigate = useNavigate();
  const applicationDate = dateFormat(new Date(application.createdAt));

  return (
    <li className="job-application" style={{animationDelay: (animationDelay * 37).toString() + "ms"}} onClick={() => navigate(`/applications/${application.id}`)}>
        <h1 className="job-application__company-name">{application.companyName}</h1>
        <p className="job-application__job-position--label">Job Position</p>
        <p className="job-application__job-position">{application.jobPosition}</p>
        <p className="job-application__date-created--label">Date of application</p>
        <p className="job-application__date-created">{applicationDate}</p>
        <p className="job-application__interview-description">{application.interviewDescription}</p>
    </li>
  )
}

export default JobApplicationCard