import React, { useEffect, useState, useCallback } from "react";
import JobApplicationCard from "../job-application-card/JobApplicationCard";
import Modal from "../modal/Modal";
import AddApplicationForm from "../modal/application/add-application-form/AddApplicationForm";
import { Application } from "../../interfaces/Application";
import { fetchApplications } from "../../services/api/applicationsApi";
import useLoading from "../../hooks/useLoading";

export const ApplicationsContext = React.createContext<{setApplications: React.Dispatch<React.SetStateAction<Application[]>>}>({setApplications: () => {}});

const JobApplicationList = () => {
    const [applications, setApplications] = useState<Application[]>([]);
    const { loading, setLoading, hasError, setHasError} = useLoading();
    const [showAddModal, setShowAddModal] = useState(false);
    const fetchApplicationsHandler = useCallback(async () => {
      setLoading(true);
      const applicationsData = await fetchApplications();
      if(!applicationsData) {
        setLoading(false);
        setHasError(true);
        return;
      }
      setLoading(false);
      setApplications(applicationsData)
    }, [setHasError, setLoading]);

    useEffect(() => {
        fetchApplicationsHandler();
    }, [fetchApplicationsHandler]);
    return (
        <div className="job-applications">
            <div className="job-applications__options">
                <div className="job-applications__options__search-container">
                    <label className="job-applications__options__search-container__label" htmlFor="applications-search">
                        SEARCH
                    </label>
                    <input
                        className="job-applications__options__search-container__input"
                        placeholder="Search for applications..."
                        type="text"
                        id="applications-search"
                        name="applications-search"
                    />
                </div>
                <button className="job-applications__options__add-button" onClick={() => setShowAddModal(true)}>Add</button>
            </div>
            <ul className="job-applications__list">
                {loading && !hasError && <li className="job-applications__list__status-message">Loading applications...</li>}
                {!loading && hasError && <li className="job-applications__list__status-message">Error occurred while loading applications.</li>}
                {!loading && !hasError && !applications.length && <li className="job-applications__list__status-message">No applications to show.</li>}
                {!loading && !hasError && applications.length && applications.map((application, index) => <JobApplicationCard animationDelay={index} key={application.id} application={application} />)}
            </ul>
            <ApplicationsContext.Provider value={{setApplications}}>
            {showAddModal && <Modal closeModal={() => setShowAddModal(false)} ModalContent={AddApplicationForm} />}
            </ApplicationsContext.Provider>
        </div>
    );
};

export default JobApplicationList;
