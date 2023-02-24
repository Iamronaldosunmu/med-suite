import { useContext, useEffect, useState } from "react";
import DashboardNavContainer from "../../../components/Admin/DashboardNav";
import ApplicantTable from "../../../components/ApplicantTable";
import Card from "../../../components/Card";
import ContactDetailsItem from "../../../components/ContactDetailsItem";
import DocumentItem from "../../../components/Document";
import SearchInput from "../../../components/SearchInput";
import SortButton from "../../../components/SortButton";
import TableNav from "../../../components/TableNav";
import ViewApplicationButton from "../../../components/ViewApplicationButton";
import styles from "../../../styles/DashboardStyles.module.css";
import applicationStyles from "../../../styles/ViewApplication.module.css";
import { AnimatePresence, motion } from "framer-motion";
import AdminDocumentItem from "../../../components/AdminDocumentItem";
import { AdminContext } from "../../../components/Context/AdminContext";
import { toast, ToastContainer } from "react-toastify";
import { useRouter } from "next/router";
import RejectDocument from "../../../components/RejectDocumentModal";
import { useCookies } from "react-cookie";
import client from "../../api/Services/AxiosClient";

const Dashboard = () => {
  const [selectedNav, setSelectedNav] = useState("All Applicants");
  const [activeNav, setActiveNav] = useState("contact");
  const [searchValue, setSearchValue] = useState("");
  const [sortOption, setSortOption] = useState(0);
  const [cookies, setCookie, removeCookie] = useCookies(["admin"]);

  const documents: any[] = [];
  const router = useRouter();
  const { applicantId } = router.query;



  const {
    applicantNumbers,
    applicantNumbersLoading,
    fetchStatistics,
    fetchAllApplicants,
    applicants,
    applicantInReview,
    setApplicantInReview,
    rejectDocumentShowing,
    setRejectDocumentShowing,
  } = useContext(AdminContext);

  useEffect(() => {
    fetchStatistics();
    fetchAllApplicants();
  }, []);

  useEffect(() => {
    if (!router.isReady) return;
    console.log(applicants.find((item: any) => item._id == applicantId));
    setApplicantInReview(
      applicants.find((item: any) => item._id == applicantId)
    );
  }, [router.isReady]);

  const toggleSortOption = () => {
    if (sortOption < 2) {
      setSortOption(sortOption + 1);
    } else {
      setSortOption(0);
    }
  };

  useEffect(() => {
    if (!cookies.admin) router.push("/admin");
  });

  const onAproveApplicant = async () => {
    console.log("This Button Is Working!");

    try {
      const { data } = await client.post(`/applicant/approve_applicant/${applicantInReview._id}`);
      fetchAllApplicants();
      setApplicantInReview({ ...applicantInReview, status: "Approved" });
      toast.success("Applicant Approved Successfully");
    } catch (error: any) {
      toast.error("Applicant Could not be approved. Something went wrong.")
    }
  };

  return (
    <>
      <AnimatePresence>
        {rejectDocumentShowing && (
          <RejectDocument setShowing={setRejectDocumentShowing} />
        )}
      </AnimatePresence>

      <ToastContainer autoClose={1300} />
      <DashboardNavContainer selectedNav="Dashboard">
        <div className={styles.pageContainer}>
          <section className={styles.dashboardSection}>
            <h1 className={styles.dashboardHeader}>Admin Dasboard</h1>
            <section className={styles.cardSection}>
              <Card
                header="Applications Started"
                icon="Applications"
                loading={applicantNumbersLoading}
                number={applicantNumbers.total_applications}
              />
              <Card
                header="Being Reviewed"
                icon="Reviews"
                loading={applicantNumbersLoading}
                number={applicantNumbers.being_reviewed}
              />
              <Card
                header="Approved"
                icon="Submitted"
                loading={applicantNumbersLoading}
                number={applicantNumbers.approved_applications}
              />
            </section>
            <section className={styles.controlsSection}>
              <div className={styles.searchInputContainer}>
                <SearchInput
                  searchValue={searchValue}
                  setSearchValue={setSearchValue}
                  placeholder="Search For Applicants . . . "
                />
              </div>
              <SortButton sortOption={sortOption} onSort={toggleSortOption} />
            </section>
            <TableNav
              selectedNav={selectedNav}
              setSelectedNav={setSelectedNav}
            />
            <ApplicantTable
              sortOption={sortOption}
              data={(selectedNav == "All Applicants"
                ? applicants
                : selectedNav == "In Review"
                ? applicants.filter(
                    (applicant: any) => applicant.status == "Being Reviewed"
                  )
                : selectedNav == "Approved For Interview"
                ? applicants.filter(
                    (applicant: any) => applicant.status == "Approved"
                  )
                : applicants.filter(
                    (applicant: any) => applicant.status == "Submitted"
                  )
              )?.map((applicant: any) => {
                return {
                  firstName: applicant.contactDetails.firstName,
                  lastName: applicant.contactDetails.lastName,
                  email: applicant.user.email,
                  _id: applicant._id,
                  profilePicUrl: applicant.documents.profilePicture?.secure_url,
                };
              })}
              searchValue={searchValue}
            />
          </section>
          {applicantInReview && (
            <motion.section
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className={styles.viewApplication}
            >
              {applicantInReview.status !== "Approved" && <button
                onClick={onAproveApplicant}
                disabled={
                  !Object.values(
                    applicantInReview.doumentReviewStatuses
                      ? applicantInReview.doumentReviewStatuses
                      : {}
                  )
                    .filter(
                      (item: any) =>
                        item == "Accepted" ||
                        item == "Rejected" ||
                        item == "Being Reviewed"
                    )
                    .every((status) => status == "Accepted")
                }
                className={`${styles.approveApplicant} ${
                  !Object.values(
                    applicantInReview.doumentReviewStatuses
                      ? applicantInReview.doumentReviewStatuses
                      : {}
                  )
                    .filter(
                      (item) =>
                        item == "Accepted" ||
                        item == "Rejected" ||
                        item == "Being Reviewed"
                    )
                    .every((status) => status == "Accepted")
                    ? styles.disabled
                    : ""
                }`}
              >
                Approve This Applicant
              </button>}
              <section className={applicationStyles.applicantDetails}>
                <div
                  className={`${applicationStyles.profilePicContainer} ${styles.profilePic}`}
                >
                  <img
                    className={applicationStyles.profilePic}
                    src={
                      applicantInReview?.documents?.profilePicture?.secure_url
                    }
                  />
                </div>
                <div className={`${applicationStyles.textContainer} `}>
                  <p>
                    Status: <span>{applicantInReview.status}</span>
                  </p>
                  <p>
                    {applicantInReview.contactDetails?.firstName}{" "}
                    {applicantInReview.contactDetails?.lastName}
                  </p>
                  <p className={applicationStyles.applicantId}>
                    ID:{" "}
                    <span
                      className={`${applicationStyles.orangeText} ${applicationStyles.clipped}`}
                    >
                      {applicantInReview._id}
                    </span>
                  </p>
                </div>
              </section>
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() =>
                  router.push(
                    `/admin/dashboard/messages?user_id=${applicantInReview._id}`
                  )
                }
                className={styles.messageIconContainer}
              >
                <div>
                  <svg
                    width="28"
                    height="28"
                    viewBox="0 0 28 28"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M13.9987 15.1667C14.643 15.1667 15.1654 14.6443 15.1654 14C15.1654 13.3557 14.643 12.8333 13.9987 12.8333C13.3544 12.8333 12.832 13.3557 12.832 14C12.832 14.6443 13.3544 15.1667 13.9987 15.1667Z"
                      fill="#D5D5D9"
                    />
                    <path
                      d="M18.6667 15.1667C19.311 15.1667 19.8333 14.6443 19.8333 14C19.8333 13.3557 19.311 12.8333 18.6667 12.8333C18.0223 12.8333 17.5 13.3557 17.5 14C17.5 14.6443 18.0223 15.1667 18.6667 15.1667Z"
                      fill="#D5D5D9"
                    />
                    <path
                      d="M9.33268 15.1667C9.97701 15.1667 10.4993 14.6443 10.4993 14C10.4993 13.3557 9.97701 12.8333 9.33268 12.8333C8.68835 12.8333 8.16602 13.3557 8.16602 14C8.16602 14.6443 8.68835 15.1667 9.33268 15.1667Z"
                      fill="#D5D5D9"
                    />
                    <path
                      d="M22.2477 5.75167C20.3335 3.82492 17.807 2.62642 15.1038 2.36279C12.4006 2.09915 9.69015 2.78691 7.43969 4.30749C5.18923 5.82807 3.53981 8.08618 2.7758 10.6925C2.01178 13.2989 2.18104 16.0901 3.25441 18.585C3.36628 18.8169 3.40298 19.0779 3.35941 19.3317L2.33274 24.2667C2.29318 24.4559 2.30126 24.652 2.35624 24.8373C2.41123 25.0226 2.51139 25.1913 2.64774 25.3283C2.75951 25.4393 2.89259 25.5265 3.03896 25.5846C3.18533 25.6428 3.34196 25.6707 3.49941 25.6667H3.73274L8.72607 24.6633C8.97986 24.6328 9.23721 24.669 9.47274 24.7683C11.9677 25.8417 14.7589 26.011 17.3652 25.2469C19.9716 24.4829 22.2297 22.8335 23.7503 20.5831C25.2708 18.3326 25.9586 15.6221 25.695 12.9189C25.4313 10.2158 24.2328 7.68926 22.3061 5.77501L22.2477 5.75167ZM23.2161 15.505C22.988 16.898 22.4469 18.2211 21.6335 19.3747C20.8202 20.5284 19.7558 21.4825 18.5204 22.1653C17.285 22.8482 15.9109 23.2419 14.5013 23.3169C13.0918 23.3919 11.6836 23.1462 10.3827 22.5983C9.92137 22.4021 9.42576 22.299 8.92441 22.295C8.7054 22.2965 8.48689 22.316 8.27107 22.3533L4.98107 23.0183L5.64607 19.7283C5.77852 19.0158 5.69314 18.2799 5.40107 17.6167C4.8532 16.3158 4.60751 14.9076 4.68251 13.4981C4.75751 12.0885 5.15124 10.7144 5.83407 9.479C6.5169 8.24362 7.47104 7.1792 8.62468 6.36586C9.77833 5.55252 11.1014 5.01144 12.4944 4.78334C13.9566 4.54337 15.4548 4.65497 16.8653 5.10891C18.2758 5.56284 19.5579 6.34607 20.6056 7.3938C21.6533 8.44153 22.4366 9.72365 22.8905 11.1341C23.3444 12.5446 23.456 14.0429 23.2161 15.505Z"
                      fill="#D5D5D9"
                    />
                  </svg>
                </div>
              </motion.div>
              <nav className={applicationStyles.nav}>
                <ViewApplicationButton
                  active={activeNav == "contact"}
                  onClick={() => setActiveNav("contact")}
                  text={"Contact Info"}
                />
                <ViewApplicationButton
                  active={activeNav == "documents"}
                  onClick={() => setActiveNav("documents")}
                  text={"Documents"}
                />
                <ViewApplicationButton
                  active={activeNav == "experience"}
                  onClick={() => setActiveNav("experience")}
                  text={"Experience"}
                />
              </nav>
              <div className={styles.applicationContentContainer}>
                <motion.div
                  animate={{
                    x:
                      activeNav == "contact"
                        ? 0
                        : activeNav == "documents"
                        ? "-33.33333%"
                        : "-66.66777%",
                    transition: {
                      duration: 0.4,
                    },
                  }}
                  className={styles.gridContainer}
                >
                  <div className={styles.contactContainer}>
                    <div>
                      <ContactDetailsItem
                        title="First Name:"
                        text={applicantInReview.contactDetails?.firstName}
                      />
                      <ContactDetailsItem
                        title="Last Name:"
                        text={applicantInReview.contactDetails?.lastName}
                      />
                      <ContactDetailsItem
                        title="Middle Name:"
                        text={applicantInReview.contactDetails?.middleName}
                      />
                      <ContactDetailsItem
                        title="Phone Number:"
                        text={applicantInReview.contactDetails?.phoneNumber}
                      />
                      <ContactDetailsItem
                        title="State Of Origin:"
                        text={applicantInReview.contactDetails?.stateOfOrigin}
                      />
                      <ContactDetailsItem
                        title="Country Of Origin:"
                        text={applicantInReview.contactDetails?.countryOfOrigin}
                      />
                      <h3 className={styles.smallHeader}>Address</h3>
                      <ContactDetailsItem
                        title="Street: "
                        text={applicantInReview.contactDetails?.street}
                      />
                      <ContactDetailsItem
                        title="Town / City: "
                        text={applicantInReview.contactDetails?.city}
                      />
                      <ContactDetailsItem
                        title="State: "
                        text={applicantInReview.contactDetails?.state}
                      />
                    </div>
                  </div>
                  <div className={styles.documentsContainer}>
                    {Object.keys(
                      applicantInReview.documents
                        ? applicantInReview.documents
                        : {}
                    )
                      ?.filter((item) => item != "_id")
                      .map((document: any, index: number) => {
                        return (
                          <AdminDocumentItem
                            key={index}
                            status={
                              applicantInReview.doumentReviewStatuses[document]
                            }
                            fieldName={document}
                            url={
                              applicantInReview?.documents[document]?.secure_url
                            }
                          />
                        );
                      })}
                  </div>
                  <div className={styles.experienceContainer}>
                    <div className={styles.experienceItems}>
                      <ContactDetailsItem
                        title="Nursing Experience:"
                        text={applicantInReview.experience?.nursingExperience}
                      />
                      <ContactDetailsItem
                        title="Experience in Post Graduate Nursing Specialty Area:"
                        text={
                          applicantInReview.experience?.postGraduateExperience
                        }
                      />
                    </div>
                    <AdminDocumentItem
                      status={
                        applicantInReview.doumentReviewStatuses?.proofOfWork
                      }
                      url={
                        applicantInReview?.experience?.proofOfWork?.secure_url
                      }
                      fieldName={"proofOfWork"}
                    />
                  </div>
                </motion.div>
              </div>
            </motion.section>
          )}
          {/* {!applicantInReview && <section className={styles.viewApplicantPlaceholder}>
          <p>View Applicant here</p>
        </section>} */}
        </div>
      </DashboardNavContainer>
    </>
  );
};
export default Dashboard;
