import { useContext } from "react";
import { AdminContext } from "../Context/AdminContext";
import styles from "./ApplicantTable.module.css";

interface ApplicantTableProps {
  data: {
    firstName: string;
    lastName: string;
    _id: string;
    email: string;
    profilePicUrl: string;
  }[];
}

const ApplicantTable: React.FC<ApplicantTableProps> = ({ data }) => {
  const { setApplicantInReview, applicants } = useContext(AdminContext);
  console.log(data);
  return (
    <table className={styles.table}>
      <thead>
        <tr className={styles.tableHeader}>
          <th>Name</th>
          <th>Email</th>
          <th></th>
        </tr>
      </thead>
      <tbody className={styles.tableBody}>
        {data?.map((applicant, index) => (
          <tr key={index}>
            <td className={styles.emailField}>
              <div className={styles.profilePicture}>
                {applicant.profilePicUrl && (
                  <img src={applicant.profilePicUrl} />
                )}
                {!applicant.profilePicUrl && (
                  <div className={styles.profilePicPlaceholder}></div>
                )}
              </div>
              <p>
                {applicant.firstName} {applicant.lastName}
              </p>
            </td>
            <td>{applicant.email}</td>
            <td className={styles.buttonField}>
              <button
                onClick={() =>
                  setApplicantInReview(
                    applicants.filter(
                      (item: any) => item._id === applicant._id
                    )[0]
                  )
                }
                className={styles.viewButton}
              >
                View
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ApplicantTable;
