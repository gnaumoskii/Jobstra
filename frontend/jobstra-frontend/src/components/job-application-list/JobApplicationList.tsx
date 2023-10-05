import React, { useEffect, useState } from "react";
import JobApplicationCard from "../job-application-card/JobApplicationCard";
import Modal from "../modal/Modal";
import AddApplicationForm from "../modal/application/add-application-form/AddApplicationForm";
import { Application } from "../../interfaces/Application";
import { fetchApplications } from "../../services/api/applicationsApi";
import useLoading from "../../hooks/useLoading";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/store";
import { disauthorize } from "../../store/authSlice";
import { useNavigate } from "react-router-dom";
import AuthPrompt from "../auth-prompt/AuthPrompt";

export const ApplicationsContext = React.createContext<{setApplications: React.Dispatch<React.SetStateAction<Application[]>>}>({setApplications: () => {}});

const JobApplicationList = () => {
    const [applications, setApplications] = useState<Application[]>([]);
    const { loading, setLoading, hasError, setHasError} = useLoading();
    const [showAddModal, setShowAddModal] = useState(false);
    const isAuthorized = useSelector((state: RootState) => state.auth.isAuthorized);
    const dispatch = useDispatch();
    const navigate = useNavigate();



    useEffect(() => {
        const fetchApplicationsHandler = async () => {
            
            setLoading(true);
            const applicationsData = await fetchApplications();
            if("statusCode" in applicationsData) {
              setLoading(false);
              if(applicationsData.statusCode === 401) {
                  dispatch(disauthorize());
              } else {
                  setHasError(true);
              }
              return;
            }
            setLoading(false);
            setApplications(applicationsData)
          }
          
        fetchApplicationsHandler();
    }, [dispatch, setHasError, setLoading, isAuthorized]);
    return (
        <div className="job-applications">
            <div className="job-applications__options">
                <div className="job-applications__options__search-container">
                    <label className="job-applications__options__search-container__label" htmlFor="applications-search">
                        SEARCH
                    </label>
                    <input
                        disabled={!isAuthorized}
                        className="job-applications__options__search-container__input"
                        placeholder="Search for applications..."
                        type="text"
                        id="applications-search"
                        name="applications-search"
                    />
                </div>
                <button className="job-applications__options__add-button" disabled={!isAuthorized} onClick={() => isAuthorized ? setShowAddModal(true) : navigate("/login")}>Add</button>
            </div>
            <ul className="job-applications__list">
                {loading && !hasError && <li className="job-applications__list__status-message">Loading applications...</li>}
                {!loading && hasError && <li className="job-applications__list__status-message">Error occurred while loading applications.</li>}
                {!loading && !hasError && isAuthorized && !applications.length && <li className="job-applications__list__status-message">No applications to show.</li>}
                {!loading && !hasError && !isAuthorized && <li className="job-applications__list__status-message"><AuthPrompt /></li>}
                {!loading && !hasError && isAuthorized && applications.length > 0 && applications.map((application, index) => <JobApplicationCard animationDelay={index} key={application.id} application={application} />)}
            </ul>
            <ApplicationsContext.Provider value={{setApplications}}>
            {showAddModal && <Modal closeModal={() => setShowAddModal(false)} ModalContent={AddApplicationForm} />}
            </ApplicationsContext.Provider>
        </div>
    );
};

export default JobApplicationList;
