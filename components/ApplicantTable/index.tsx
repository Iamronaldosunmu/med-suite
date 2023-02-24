import { useContext } from "react";
import { AdminContext } from "../Context/AdminContext";
import styles from "./ApplicantTable.module.css";
import messageStyles from "../../styles/MessagePage.module.css";
import { motion } from "framer-motion";

interface ApplicantTableProps {
  data: {
    firstName: string;
    lastName: string;
    _id: string;
    email: string;
    profilePicUrl: string;
  }[];
  sortOption: number;
  searchValue: string;
}

const ApplicantTable: React.FC<ApplicantTableProps> = ({ data, searchValue, sortOption }) => {
  const { setApplicantInReview, applicants } = useContext(AdminContext);
  return (
    <>
      <table className={styles.table}>
        <thead>
          <tr className={styles.tableHeader}>
            <th>Name</th>
            <th>Email</th>
            <th></th>
          </tr>
        </thead>
        {data && (
          <tbody className={styles.tableBody}>
            {data?.filter(item => ([item.firstName.toLowerCase(), item.lastName.toLowerCase(), item.email.toLowerCase()].some(item => item.includes(searchValue.toLowerCase())))).sort((a: any, b: any) => {
              if (sortOption == 1) return a.firstName.localeCompare(b.firstName);
              else if (sortOption == 2) return b.firstName.localeCompare(a.firstName);
              else return 0;
            }).map((applicant, index) => (
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
                  <motion.button
                    whileHover={{ scale: 1.04 }}
                    whileTap={{scale: 0.98}}
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
                  </motion.button>
                </td>
              </tr>
            ))}
          </tbody>
        )}
      </table>
      {data?.filter(item => ([item.firstName.toLowerCase(), item.lastName.toLowerCase(), item.email.toLowerCase()].some(item => item.includes(searchValue.toLowerCase())))).length == 0 && (
        <div className={styles.noTableContentBanner}>
          <motion.div initial={{opacity: 0}} animate={{opacity: 1}} className={messageStyles.preview}>
            <div>Nothing To See Here</div>
          </motion.div>
        </div>
      )}
    </>
  );
};

export default ApplicantTable;
