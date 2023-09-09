import { useRef, useState, useContext } from "react";
import { createApplication } from "../../../../services/api/applicationsApi";
import { ApplicationsContext } from "../../../job-application-list/JobApplicationList";
import { Application } from "../../../../interfaces/Application";

interface Validation {
  hasError: boolean;
  message?: string;
}

const AddApplicationForm: React.FC<{closeModal: () => void}> = ({closeModal}) => {
  const [validation, setValidation] = useState<Validation>({hasError: false});
  const companyNameRef = useRef<HTMLInputElement>(null);
  const jobPositionRef = useRef<HTMLInputElement>(null);
  const interviewDescriptionRef= useRef<HTMLTextAreaElement>(null);
  const { setApplications } = useContext(ApplicationsContext);

  const validateForm = (): boolean => {
    const companyName = companyNameRef.current?.value || "";
    const jobPosition = jobPositionRef.current?.value  || "";
    if(companyName.trim().length === 0 && jobPosition.trim().length === 0) {
      setValidation({hasError: true, message: "Please enter Company Name and Job Position."});
      return false;
    } else if(companyName.trim().length === 0) {
      setValidation({hasError: true, message: "Please enter Company Name."});
      return false;
    } else if(jobPosition.trim().length === 0) {
      setValidation({hasError: true, message: "Please enter Job Position."});
      return false;
    }

    setValidation({hasError: false});
    return true;
  }

  // Validates the input fields on change if the form is submitted with errors.
  const validationOnChangeHandler = (event: React.SyntheticEvent): void => {
    event.preventDefault();
    if(!validation.hasError) return;
    validateForm();
  }
  
  const onSubmitHandler = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    const companyName = companyNameRef.current?.value || "";
    const jobPosition = jobPositionRef.current?.value || "";
    const interviewDescription = interviewDescriptionRef.current?.value || "";
    const application = {
      company_name: companyName,
      job_position: jobPosition,
      created_at: new Date(),
      interview_description: interviewDescription
    }
    try {
      if(!validateForm()) {
        return;
      }
      const data: Application = await createApplication(application);
      
      setApplications((prevState): Application[] => {
        console.log(prevState);
        console.log(data);
        return [...prevState, data]
      });
      closeModal();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <form onSubmit={onSubmitHandler} className="form-add">
      <h1 className="form-add__title">Add Application</h1>
      <div className="form-add__input-container">
      <label className="form-add__input-container__label" htmlFor="company-name">Company Name*</label>
      <input className="form-add__input-container__input" type="text" id="company-name" name="company-name" ref={companyNameRef} onChange={validationOnChangeHandler}/>
      </div>
      <div className="form-add__input-container">
        <label className="form-add__input-container__label" htmlFor="job-position">Job Position*</label>
        <input className="form-add__input-container__input" type="text" id="job-position" name="job-position" ref={jobPositionRef} onChange={validationOnChangeHandler}/>
      </div>
      <div className="form-add__input-container">
        <label className="form-add__input-container__label" htmlFor="interview-description">Interview Description</label>
        <textarea className="form-add__input-container__input" id="interview-description" ref={interviewDescriptionRef} name="interview-description" />
      </div>
      <p className="form-add__validation-message">{validation.hasError && validation.message}</p>
      <div className="form-add__buttons">
        <button className="form-add__buttons__btn-add">Submit</button> 
        <button className="form-add__buttons__btn-cancel" type="button" onClick={closeModal}>Cancel</button> 
      </div>
    </form>
  )
}

export default AddApplicationForm