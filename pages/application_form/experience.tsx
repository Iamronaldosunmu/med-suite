import { useState } from "react";
import Button from "../../components/Button";
import FadeIn from "../../components/FadeIn";
import FileUpload from "../../components/FileUpload";
import Logo from "../../components/Logo";
import ProgressBar from "../../components/ProgressBar";
import SelectInput from "../../components/SelectInput";
import styles from "../../styles/Form.module.css";

const Experience = () => {
  const experienceOptions = [
    "Less than 2 years",
    "2 - 5 years",
    "More than 5 years",
  ];
  const [nursingExperience, setNursingExperience] = useState("");
  const [postGraduateExperience, setPostGraduateExperience] = useState("");
  const [proofOfWork, setProofOfWork] = useState<File>();
  return (
    <FadeIn noExit>
      <main>
        <div className={styles.logoContainer}>
          <Logo />
        </div>
        <div className={styles.progressbarContainer}>
          <ProgressBar page={3} />
        </div>
        <section className={styles.formSection}>
          <form>
            <SelectInput
              label="Nursing Experience"
              value={nursingExperience}
              setValue={setNursingExperience}
              options={experienceOptions}
            />
            <SelectInput
              label="Post-Graduate Working Experience"
              value={postGraduateExperience}
              setValue={setPostGraduateExperience}
              options={experienceOptions}
            />
            <FileUpload
              file={proofOfWork}
              setFile={setProofOfWork}
              label="Proof of working experience in a hospital setting in the last 12 months"
            />
            <div>
              <Button
                path="/application_form/application_fee"
                text="Next > Application Fee"
                orange
              />
              <Button
                path="/application_form/documents"
                text="Prev < Experience"
              />
            </div>
          </form>
        </section>
      </main>
    </FadeIn>
  );
};
export default Experience;
