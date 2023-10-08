import React, { useEffect, useState } from "react";
import JobApplicationCard from "../job-application-card/JobApplicationCard";
import Modal from "../modal/Modal";
import AddApplicationForm from "../modal/application/add-application-form/AddApplicationForm";
import { Application } from "../../interfaces/Application";
import { fetchApplications } from "../../services/api/applicationsApi";
import useLoading from "../../hooks/useLoading";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/store";
import { useNavigate } from "react-router-dom";
import AuthPrompt from "../auth-prompt/AuthPrompt";
import { isErrorResponse } from "../../interfaces/Response";

export const ApplicationsContext = React.createContext<{setApplications: React.Dispatch<React.SetStateAction<Application[]>>}>({setApplications: () => {}});

const JobApplicationList = () => {
    const [applications, setApplications] = useState<Application[]>([]);
    const [filteredApplications, setFilteredApplications] = useState<Application[]>([]);
    const [searchValue, setSearchValue] = useState("");
    const { loading, setLoading, error, setError} = useLoading();
    const [showAddModal, setShowAddModal] = useState(false);
    const isAuthorized = useSelector((state: RootState) => state.auth.isAuthorized);
    const dispatch = useDispatch();
    const navigate = useNavigate();


    useEffect(()=> {
        setFilteredApplications(applications);
    },[applications]);

    useEffect(() => {
        const fetchApplicationsHandler = async () => {
            setLoading(true);
            const data = await fetchApplications();
            if(isErrorResponse(data)) {
                setLoading(false);
                setError({hasError: true, message: data.message});
                return;
            }
            setLoading(false);
            setError({hasError: false, message: ""});
            setApplications(data);
            setFilteredApplications(data);
          }
          
        fetchApplicationsHandler();
    }, [dispatch, setError, setLoading, isAuthorized]);


    const searchApplicationsHandler = (event: React.SyntheticEvent) => {
        const target = event.target as HTMLInputElement;
        const searchValue = target.value.toLowerCase();
        setSearchValue(searchValue);
        setFilteredApplications(
            applications.filter(application => 
                application.companyName.toLowerCase().includes(searchValue.trim()) ||
                application.jobPosition.toLowerCase().includes(searchValue.trim()) ||
                application.interviewDescription.toLowerCase().includes(searchValue.trim())
            ));
        
    }

    const clearSearch = () => {
        setSearchValue("");
        setFilteredApplications(applications);
    }
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
                        value={searchValue}
                        id="applications-search"
                        name="applications-search"
                        onChange={searchApplicationsHandler}
                    />
                </div>
                <button className="job-applications__options__btn-clear" disabled={!isAuthorized} onClick={clearSearch}>Clear</button>
                <button className="job-applications__options__btn-add" disabled={!isAuthorized} onClick={() => isAuthorized ? setShowAddModal(true) : navigate("/login")}>Add new</button>

            </div>
            <ul className="job-applications__list">
                {loading && !error.hasError && <li className="job-applications__list__status-message">Loading applications...</li>}
                {!loading && error.hasError && isAuthorized && <li className="job-applications__list__status-message">{error.message || "Error occurred while loading applications."}</li>}
                {!loading && !error.hasError && isAuthorized && !applications.length && <li className="job-applications__list__status-message">No applications to show.</li>}
                {!loading && !isAuthorized && <li className="job-applications__list__status-message"><AuthPrompt /></li>}
                {!loading && !error.hasError && isAuthorized && applications.length > 0 && filteredApplications.map((application, index) => <JobApplicationCard animationDelay={index} key={application.id} application={application} />)}
            </ul>
            <ApplicationsContext.Provider value={{setApplications}}>
            {showAddModal && <Modal closeModal={() => setShowAddModal(false)} ModalContent={AddApplicationForm} />}
            </ApplicationsContext.Provider>
        </div>
    );
};

export default JobApplicationList;
