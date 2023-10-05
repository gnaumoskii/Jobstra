import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Application } from "../../interfaces/Application";
import { fetchApplication } from "../../services/api/applicationsApi";
import { dateFormat } from "../../services/dateFormat";
import Modal from "../modal/Modal";
import EditApplicationForm from "../modal/application/edit-application-form/EditApplicationForm";
import useLoading from "../../hooks/useLoading";
import { DeleteApplicationForm } from "../modal/application/delete-application-form/DeleteApplicationForm";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

const emptyApplicationPlaceholder: Application = { 
    id: "", 
    companyName: "", 
    jobPosition: "", 
    applicationDate: "", 
    interviewDescription: "" 
};

export const ApplicationDetailsContext = React.createContext<{setApplication: React.Dispatch<React.SetStateAction<Application>>;application: Application;}>({ setApplication: () => {}, application: emptyApplicationPlaceholder });

const JobApplicationDetails = () => {
    const { id } = useParams();
    const [application, setApplication] = useState<Application>(emptyApplicationPlaceholder);
    const { loading, setLoading, hasError, setHasError } = useLoading();
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const applicationDate = dateFormat(new Date(application.applicationDate));
    const isAuthorized = useSelector((state: RootState) => state.auth.isAuthorized);
    useEffect(() => {
        const getApplication = async (id: string): Promise<void> => {
            setLoading(true);
            const applicationData = await fetchApplication(id);
            if (!applicationData) {
                setLoading(false);
                setHasError(true);
                return;
            }
            setHasError(false);
            setApplication(applicationData);
            setLoading(false);
        };
        getApplication(id as string);
    }, [id, setHasError, setLoading, isAuthorized]);
    return (
        <div className="ja-details">
            {loading && <div className="ja-details__status-message"> Loading application...</div>}
            {!loading && hasError && <div className="ja-details__status-message">Error occurred while loading the application.</div>}
            {!loading && !hasError && (
                <>
                    <div className="ja-details__header">
                        <h1 className="ja-details__header__title">{application?.companyName}</h1>
                        <div className="ja-details__header-buttons">
                            <button className="ja-details__header-buttons__btn--edit" onClick={() => setShowEditModal(true)}>
                                EDIT
                            </button>
                            <button className="ja-details__header-buttons__btn--delete" onClick={() => setShowDeleteModal(true)}>DELETE</button>
                        </div>
                    </div>
                    <div className="ja-details__container">
                        <div className="ja-details__container-info">
                            <p className="ja-details__container-info__job-position--label">Job Position</p>
                            <p className="ja-details__container-info__job-position">{application?.jobPosition}</p>
                        </div>
                        <div className="ja-details__container-info">
                            <p className="ja-details__container-info__date-created--label">Date of Application</p>
                            <p className="ja-details__container-info__date-created">{applicationDate}</p>
                        </div>
                    </div>
                    <div className="ja-details__container-info">
                        <p className="ja-details__container-info__interview-description--label">Interview Description</p>
                        {application?.interviewDescription ? (
                            <p className="ja-details__container-info__interview-description">{application?.interviewDescription}</p>
                        ) : (
                            <p className="ja-details__container-info__interview-description">No interview description provided for this application.</p>
                        )}
                    </div>
                </>
            )}
            <ApplicationDetailsContext.Provider value={{ setApplication, application }}>
                {showEditModal && <Modal ModalContent={EditApplicationForm} closeModal={() => setShowEditModal(false)} />}
            </ApplicationDetailsContext.Provider>
            {showDeleteModal && <Modal ModalContent={DeleteApplicationForm} closeModal={() => setShowDeleteModal(false)} />}
            
        </div>
    );
};

export default JobApplicationDetails;
