import React, { useEffect, useState, useReducer } from "react";
import JobApplicationCard from "../job-application-card/JobApplicationCard";
import Modal from "../modal/Modal";
import AddApplicationForm from "../modal/application/add-application-form/AddApplicationForm";
import { Application } from "../../interfaces/Application";

export const ApplicationsContext = React.createContext<{applications: Application[], setApplications: React.Dispatch<React.SetStateAction<Application[]>>}>({});

enum ApplicationModalsType {
  ADD = 'ADD',
  EDIT = 'EDIT',
  DETAILS = 'DETAILS'
}

interface ApplicationModalsState {
  showAddModal: boolean;
  showEditModal: boolean;
  showDetailsModal: boolean;
}

interface Loading {
  isLoading: boolean;
  isLoaded: boolean;
}

export interface ApplicationModalsAction {
  type: ApplicationModalsType;
  payload: ApplicationModalsState;
}

const InitialApplicationModalsState: ApplicationModalsState = {
    showAddModal: false,
    showEditModal: false,
    showDetailsModal: false
}

const applicationModalReducer = (state: ApplicationModalsState , action: ApplicationModalsAction) => {
  if(action.type === "ADD") {
    return {...state, showAddModal: action.payload.showAddModal};
  } else if(action.type === "EDIT") {
    return {...state, showEditModal: action.payload.showEditModal};
  } else if(action.type === "DETAILS") {
    return {...state, showDetailsModal: action.payload.showDetailsModal};
  }
  return {...state};
}

const JobApplicationList = () => {
    const [applications, setApplications] = useState<Application[]>([]);
    const [state, dispatch] = useReducer(applicationModalReducer, InitialApplicationModalsState);
    const [loading, setLoading] = useState<Loading>({isLoading: true, isLoaded: false});
    useEffect(() => {
        const fetchApplications = async (): Promise<void> => {
          try {
            setLoading({isLoading: true, isLoaded: false});
            const res = await fetch("http://localhost:3000/applications");
            const data = await res.json();
            const transformedData: Application[] = [];
            data.forEach((application: { id: string; company_name: string; job_position: string; created_at: Date; interview_description: string }) => {
                transformedData.push({
                    id: application.id,
                    companyName: application.company_name,
                    jobPosition: application.job_position,
                    createdAt: application.created_at,
                    interviewDescription: application.interview_description,
                });
            });
            setApplications(transformedData);
            setLoading({isLoading: false, isLoaded: true});
            
          } catch (error) {
            setLoading({isLoading: false, isLoaded: false});
          }

        };
        
        fetchApplications();
    }, []);
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
                <button className="job-applications__options__add-button" onClick={() => dispatch({ type: ApplicationModalsType.ADD, payload: {...state, showAddModal: true}})}>Add</button>
            </div>
            <ul className="job-applications__list">
                {loading.isLoading && !loading.isLoaded && <li className="job-applications__list__status-message">Loading applications...</li>}
                {!loading.isLoading && loading.isLoaded && !applications.length && <li className="job-applications__list__status-message">No applications to show.</li>}
                {!loading.isLoading && !loading.isLoaded && <li className="job-applications__list__status-message">Error occured while loading applications.</li>}
                {!loading.isLoading && loading.isLoaded && applications.length && applications.map(application => <JobApplicationCard key={application.id} application={application} />)}
            </ul>
            <ApplicationsContext.Provider value={{applications, setApplications}}>
            {state.showAddModal && <Modal closeModal={() => dispatch({type: ApplicationModalsType.ADD, payload: {...state, showAddModal: false}})} ModalContent={AddApplicationForm} />}
            </ApplicationsContext.Provider>
        </div>
    );
};

export default JobApplicationList;
