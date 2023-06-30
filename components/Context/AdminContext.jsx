import { createContext, useEffect, useState } from "react";
import client from "../../pages/api/Services/AxiosClient";
import { toast } from "react-toastify";
import { Router, useRouter } from "next/router";



export const AdminContext = createContext();


const AdminContextProvider = ({ children }) => {
  const router = useRouter()

  // State for the applicant data
    const [applicantNumbers, setApplicantNumbers] = useState({
        total_applications: 0,
        being_reviewed: 0,
        approved_applications: 0,
    });
    const [applicantNumbersLoading, setApplicantNumbersLoading] = useState(true);
    const [applicants, setApplicants] = useState([]);
  const [applicantInReview, setApplicantInReview] = useState();
  const [currentFieldName, setCurrentFieldName] = useState("")
    
  // State for the chatboxes
    const [chatBoxes, setChatboxes] = useState([]);
  const [loadingChatboxes, setLoadingChatboxes] = useState(false);
  const [selectedChatbox, setSelectedChatbox] = useState("");

  // State for the modals
  const [rejectDocumentShowing, setRejectDocumentShowing] = useState(false);

    // Fetch Applicant Statistics from the backend
    const fetchStatistics = async () => {
      setApplicantNumbersLoading(true);
      try {
        const { data } = await client.get("/applicant/numbers");
        setApplicantNumbers(data);
        setApplicantNumbersLoading(false);
      } catch (err) {
        if (err.response?.status == 500)
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
            setApplicants(data.applicants.filter(applicant => applicant.status !== "In Progress"));
        } catch (err) {
          if (err.response && err.response?.status == 500)
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
  
  const rejectDocument = async (fieldName, message) => {
    const payload = { fieldName, message };
    try {
      const { data, status } = await client.post(`/review_documents/reject/${applicantInReview._id}`, payload);
      let applicantCopy = { ...applicantInReview }
      applicantCopy.doumentReviewStatuses[fieldName] = "Rejected";
      if (status == 200) setApplicantInReview(applicantCopy);
      toast.success(`${fieldName} Document Rejected`);
    } catch (err) {
      console.log(err)
      if (err.response && err.response.status == 500)
      alert("Something went wrong on the server 🥲");
    else {
      alert("Could not Reject Document");
    }
    }
    return true;


  }

  const fetchChatboxes = async () => {
    try {
      setLoadingChatboxes(true);
      const { data: { chats } } = await client.get("/messages");
      console.log(chats);

      if (chats) {
        chats?.sort(function(chatbox1 , chatbox2 ) {return chatbox2?.messages
    ?.filter((message) => message?.from == "applicant")
    ?.filter(
      (message) => message?.status?.applicant == "unread"
    )?.length - chatbox1?.messages
    ?.filter((message) => message?.from == "applicant")
    ?.filter(
      (message) => message?.status?.applicant == "unread"
    )?.length});
  setChatboxes(chats);

      }
      
    } catch (error) {
      console.log(error)
      alert("Could Not fetch the chatboxes!");
    } finally {
      setLoadingChatboxes(false);
    }
  };

  useEffect(() => {
    if (router.pathname.startsWith("/admin")) {
      setInterval(() => fetchChatboxes(), 5000);
    }
  }, []);


    return (
        <AdminContext.Provider value={{applicantNumbers, applicantNumbersLoading, fetchStatistics, fetchAllApplicants, applicants, applicantInReview, setApplicantInReview, approveDocument, rejectDocument, fetchChatboxes, chatBoxes, selectedChatbox, setSelectedChatbox, rejectDocumentShowing, setRejectDocumentShowing, currentFieldName, setCurrentFieldName}}>
            {children}
        </AdminContext.Provider>
    )
}

export default AdminContextProvider;