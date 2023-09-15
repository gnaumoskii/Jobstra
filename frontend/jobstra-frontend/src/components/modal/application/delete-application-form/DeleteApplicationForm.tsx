import React, { useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ApplicationDetailsContext } from '../../../job-application-details/JobApplicationDetails';
import { deleteApplication } from '../../../../services/api/applicationsApi';

export const DeleteApplicationForm: React.FC<{closeModal: () => void}> = ({closeModal}) => {
    const { id } = useParams();
    const { application } = useContext(ApplicationDetailsContext);
    const navigate = useNavigate();
    const deleteApplicationHandler = (event: React.SyntheticEvent) => {
        event.preventDefault();
        if(!id) return;
        deleteApplication(id);
        navigate("/");
    }
  return (
    <div className='ja-delete'>
        <h1 className='ja-delete__title'>Do you really want to delete the application for: <span className='ja-delete__title__company-name'>{application.companyName}</span></h1>
        <div className='ja-delete__buttons'>
            <button className='ja-delete__buttons__btn-submit' onClick={deleteApplicationHandler}>Delete</button>
            <button className='ja-delete__buttons__btn-cancel' onClick={closeModal}>Cancel</button>
        </div>
    </div>
  )
}
