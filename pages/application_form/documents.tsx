import { useState } from "react";
import Button from "../../components/Button";
import FadeIn from "../../components/FadeIn";
import FileUpload from "../../components/FileUpload";
import Logo from "../../components/Logo";
import ProgressBar from "../../components/ProgressBar";
import styles from "../../styles/Form.module.css";

const Documents = () => {
  const [nursingDegree, setNursingDegree] = useState<File>();
  const [practicingLicense, setPracticingLicense] = useState<File>();
  const [photoIdentification, setPhotoIdentification] = useState<File>();
  const [evidenceOfRegistration, setEvidenceOfRegistration] = useState<File>();
  const [resume, setResume] = useState<File>();
  const [referenceLetters, setReferenceLetters] = useState<File>();
  const [letterOfGoodStanding, setLetterOfGoodStanding] = useState<File>();
  return (
    <FadeIn noExit>
      <main>
        <div className={styles.logoContainer}>
          <Logo />
        </div>
        <div className={styles.progressbarContainer}>
          <ProgressBar page={2} />
        </div>
        <section className={styles.formSection}>
          <form>
            <div className={styles.formGrid}>
              <FileUpload
                file={nursingDegree}
                setFile={setNursingDegree}
                label="Nursing Degree"
              />
              <FileUpload
                file={practicingLicense}
                setFile={setPracticingLicense}
                label="Valid Practicing License"
              />
              <FileUpload
                file={photoIdentification}
                setFile={setPhotoIdentification}
                label="Data Page of International Passport or NIN ID"
              />
              <FileUpload
                file={evidenceOfRegistration}
                setFile={setEvidenceOfRegistration}
                label="Evidence of Registration with the Nigerian Nursing Council"
              />
              <FileUpload file={resume} setFile={setResume} label="Resume/CV" />
              <FileUpload
                file={referenceLetters}
                setFile={setReferenceLetters}
                label="Reference Letters"
              />
            </div>
            <div className={styles.outlier}>
              <FileUpload
                file={letterOfGoodStanding}
                setFile={setLetterOfGoodStanding}
                label="Letter of good standing with Nursing Council"
              />
            </div>
            <div>
              <Button
                path="/application_form/experience"
                text="Next > Experience"
                orange
              />
              <Button
                path="/application_form/contact_details"
                text="Prev < Contact Details"
              />
            </div>
          </form>
        </section>
      </main>
    </FadeIn>
  );
};

export default Documents;
