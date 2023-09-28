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
  const applicationDateRef = useRef<HTMLInputElement>(null);
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
    const companyName = companyNameRef.current?.value as string;
    const jobPosition = jobPositionRef.current?.value as string;
    const interviewDescription = interviewDescriptionRef.current?.value as string;
    const applicationDate = new Date(applicationDateRef.current?.value as string).toISOString();

    const application = {
      companyName,
      jobPosition,
      applicationDate,
      interviewDescription
    }
    try {
      if(!validateForm()) {
        return;
      }
      const data: Application | undefined = await createApplication(application);
      
      if(!data) {
        setValidation({hasError: true, message: "An error occurred while creating application."});
        return;
      }
      setApplications((prevState): Application[] => {
        return [...prevState, data]
      });
      closeModal();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <form onSubmit={onSubmitHandler} className="application-form">
      <h1 className="application-form__title">Add Application</h1>
      <div className="application-form__input-container">
      <label className="application-form__input-container__label" htmlFor="company-name">Company Name*</label>
      <input className="application-form__input-container__input" autoComplete="off" type="text" id="company-name" name="company-name" ref={companyNameRef} onChange={validationOnChangeHandler}/>
      </div>
      <div className="application-form__input-container">
        <label className="application-form__input-container__label" htmlFor="job-position">Job Position*</label>
        <input className="application-form__input-container__input" autoComplete="off" type="text" id="job-position" name="job-position" ref={jobPositionRef} onChange={validationOnChangeHandler}/>
      </div>
      <div className="application-form__input-container">
        <label className="application-form__input-container__label" htmlFor="created-at">Date of Application</label>
        <input className="application-form__input-container__input" type="date" id="created-at" defaultValue={new Date().toISOString().split('T')[0]} name="created-at" ref={applicationDateRef} onChange={validationOnChangeHandler}/>
      </div>
      <div className="application-form__input-container">
        <label className="application-form__input-container__label" htmlFor="interview-description">Interview Description</label>
        <textarea className="application-form__input-container__input" id="interview-description" ref={interviewDescriptionRef} name="interview-description" />
      </div>
      <p className="application-form__validation-message">{validation.hasError && validation.message}</p>
      <div className="application-form__buttons">
        <button className="application-form__buttons__btn-submit">Submit</button> 
        <button className="application-form__buttons__btn-cancel" type="button" onClick={closeModal}>Cancel</button> 
      </div>
    </form>
  )
}

export default AddApplicationForm