import React, { useContext, useState, useRef } from 'react'
import { Application } from '../../../../interfaces/Application';
import { editApplication } from '../../../../services/api/applicationsApi';
import { useParams } from 'react-router-dom';
import { ApplicationDetailsContext } from '../../../job-application-details/JobApplicationDetails';
import { isErrorResponse } from '../../../../interfaces/Response';

const EditApplicationForm: React.FC<{application: Application,closeModal: () => void}> = ({closeModal}) => {
    const [error, setError] = useState({hasError: false, message: ""});
    const { id } = useParams();
    const {application, setApplication} = useContext(ApplicationDetailsContext);
    const companyNameRef = useRef<HTMLInputElement>(null);
    const jobPositionRef = useRef<HTMLInputElement>(null);
    const createdAtRef = useRef<HTMLInputElement>(null);
    const interviewDescriptionRef = useRef<HTMLTextAreaElement>(null);

    const validateForm = (): boolean => {
      const companyName = companyNameRef.current?.value || "";
      const jobPosition = jobPositionRef.current?.value  || "";
      if(companyName.trim().length === 0 && jobPosition.trim().length === 0) {
        setError({hasError: true, message: "Please enter Company Name and Job Position."});
        return false;
      } else if(companyName.trim().length === 0) {
        setError({hasError: true, message: "Please enter Company Name."});
        return false;
      } else if(jobPosition.trim().length === 0) {
        setError({hasError: true, message: "Please enter Job Position."});
        return false;
      }
  
      setError({hasError: false, message: ""});
      return true;
    }
  
    // Validates the input fields on change if the form is submitted with errors.
    const validationOnChangeHandler = (event: React.SyntheticEvent): void => {
      event.preventDefault();
      if(!error.hasError) return;
      validateForm();
    }
  
    const onSubmitHandler = async (event: React.SyntheticEvent) => {
      event.preventDefault();
      const companyName = companyNameRef.current?.value;
      const jobPosition = jobPositionRef.current?.value;
      const interviewDescription = interviewDescriptionRef.current?.value;
      const applicationDate = new Date(createdAtRef.current?.value as string).toISOString() ;
      
      const application = {
        companyName,
        jobPosition,
        applicationDate,
        interviewDescription
      }
        if(!validateForm() || !id) {
          return;
        }

        const data = await editApplication(id, application);
        if(isErrorResponse(data)) {
          setError({hasError: true, message: data.message});
          return;
        }
        console.log(data);
        setApplication(data);
        closeModal();
    }
  return (
    <form onSubmit={onSubmitHandler} className="application-form">
    <h1 className="application-form__title">Edit Application</h1>
    <div className="application-form__input-container">
    <label className="application-form__input-container__label" htmlFor="company-name">Company Name*</label>
    <input className="application-form__input-container__input" autoComplete="off" type="text" id="company-name" name="company-name" ref={companyNameRef} defaultValue={application.companyName} onChange={validationOnChangeHandler}/>
    </div>
    <div className="application-form__input-container">
      <label className="application-form__input-container__label" htmlFor="job-position">Job Position*</label>
      <input className="application-form__input-container__input" autoComplete="off" type="text" id="job-position" name="job-position" ref={jobPositionRef} defaultValue={application.jobPosition} onChange={validationOnChangeHandler}/>
    </div>
    <div className="application-form__input-container">
      <label className="application-form__input-container__label" htmlFor="created-at">Date of Application</label>
      <input className="application-form__input-container__input" type="date" id="created-at" ref={createdAtRef} defaultValue={new Date(application.applicationDate).toISOString().split('T')[0]} name="created-at" onChange={validationOnChangeHandler}/>
    </div>
    <div className="application-form__input-container">
      <label className="application-form__input-container__label" htmlFor="interview-description">Interview Description</label>
      <textarea className="application-form__input-container__input" id="interview-description" name="interview-description" ref={interviewDescriptionRef} defaultValue={application.interviewDescription} />
    </div>
    {error.hasError && <p className="application-form__validation-message">{error.message || "An error occured while updating the application."}</p>}
    <div className="application-form__buttons">
      <button className="application-form__buttons__btn-submit">Submit</button> 
      <button className="application-form__buttons__btn-cancel" type="button" onClick={closeModal}>Cancel</button> 
    </div>
  </form>
  )
}

export default EditApplicationForm