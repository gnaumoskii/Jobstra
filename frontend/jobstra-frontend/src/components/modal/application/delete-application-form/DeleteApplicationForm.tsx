import React, {useState} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { deleteApplication } from '../../../../services/api/applicationsApi';
import { isErrorResponse } from '../../../../interfaces/Response';

export const DeleteApplicationForm: React.FC<{closeModal: () => void}> = ({closeModal}) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [error, setError] = useState({hasError: false, message: ""});
    const deleteApplicationHandler = async (event: React.SyntheticEvent) => {
        event.preventDefault();
        if(!id) return;

        const deleted = await deleteApplication(id);
        if(deleted && isErrorResponse(deleted)) {
          setError({hasError: true, message: deleted.message});
        } else {
          setError({hasError: false, message: ""});
          navigate("/");
        }

    }
  return (
    <div className='ja-delete'>
        <h1 className='ja-delete__title'>Do you really want to delete this application ?</h1>
        <div className='ja-delete__buttons'>
            <button className='ja-delete__buttons__btn-submit' onClick={deleteApplicationHandler}>Delete</button>
            <button className='ja-delete__buttons__btn-cancel' onClick={closeModal}>Cancel</button>
        </div>
        {error.hasError && <p className='ja-delete__error-message'>An error occured while deleting the app.</p>}
    </div>
  )
}
