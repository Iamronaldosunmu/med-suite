import { createContext, useState } from "react";
import client from "../../pages/api/Services/AxiosClient";


export const AdminContext = createContext();


const AdminContextProvider = ({ children }) => {
    const [applicantNumbers, setApplicantNumbers] = useState({
        total_applications: 0,
        being_reviewed: 0,
        approved_applications: 0,
    });
    const [applicantNumbersLoading, setApplicantNumbersLoading] = useState(true);
  const [applicants, setApplicants] = useState([]);
  const [applicantInReview, setApplicantInReview] = useState();


    // Fetch Applicant Statistics from the backend
    const fetchStatistics = async () => {
      setApplicantNumbersLoading(true);
      try {
        const { data } = await client.get("/applicant/numbers");
        setApplicantNumbers(data);
        setApplicantNumbersLoading(false);
      } catch (err) {
        if (err.response.status == 500)
          alert("Something went wrong on the server 🥲");
        else {
          alert("Could not Fetch data");
        }
      }
    };

    // Fetch All the Applicants in the database
    const fetchAllApplicants = async () => {
        try {
            const { data } = await client.get("/applicant");
            setApplicants(data.applicants);
        } catch (err) {
          if (err.response && err.response.status == 500)
            alert("Something went wrong on the server 🥲");
          else {
            alert("Could not Fetch data");
          }
        }
  }
  
  // Approve a document
  const approveDocument = async ( fieldName ) => {
    const payload = { fieldName };
    const { data, status } = await client.post(`/review_documents/approve/${applicantInReview._id}`, payload);
    let applicantCopy = { ...applicantInReview }
    applicantCopy.doumentReviewStatuses[fieldName] = "Accepted";
    if (status == 200) setApplicantInReview(applicantCopy);
  }

    return (
        <AdminContext.Provider value={{applicantNumbers, applicantNumbersLoading, fetchStatistics, fetchAllApplicants, applicants, applicantInReview, setApplicantInReview, approveDocument}}>
            {children}
        </AdminContext.Provider>
    )
}

export default AdminContextProvider;