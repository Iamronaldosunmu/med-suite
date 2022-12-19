import { string } from "joi";
import Router, { useRouter } from "next/router";
import { FormEvent, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import Button from "../../components/Button";
import FadeIn from "../../components/FadeIn";
import FileUpload from "../../components/FileUpload";
import InfoMessage from "../../components/InfoMessage";
import Logo from "../../components/Logo";
import ProgressBar from "../../components/ProgressBar";
import SelectInput from "../../components/SelectInput";
import styles from "../../styles/Form.module.css";
import DocumentProps from "../../Types/Document";
import {
  validateExperienceInputs,
  validateTextField,
} from "../../utilities/TextFieldValidation";
import client from "../api/Services/AxiosClient";

interface ExperienceFormErrors {
  nursingExperience?: string;
  postGraduateExperience?: string;
  proofOfWork?: string;
}

const defaultProofOfWork = {
  secure_url: "",
  public_id: "",
  fileName: "",
};

const Experience = () => {
  const experienceOptions = [
    "Less than 2 years",
    "2 - 5 years",
    "More than 5 years",
  ];
  const [nursingExperience, setNursingExperience] = useState("");
  const [postGraduateExperience, setPostGraduateExperience] = useState("");
  const [proofOfWork, setProofOfWork] =
    useState<DocumentProps>(defaultProofOfWork);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<ExperienceFormErrors>({
    nursingExperience: "",
    postGraduateExperience: "",
    proofOfWork: "",
  });
  const [cookies, setCookie, removeCookie] = useCookies(["user", "applicant"]);
  const router = useRouter();

  useEffect(() => {
    if (!cookies.user || !cookies.applicant) router.push("/login");
    else {
      setNursingExperience(cookies.applicant.experience?.nursingExperience);
      setPostGraduateExperience(
        cookies.applicant.experience?.postGraduateExperience
      );
      setProofOfWork(cookies.applicant.experience?.proofOfWork);
    }
  }, []);

  const saveExperience = async (redirectPath: string) => {
    setErrors(
      validateExperienceInputs({
        nursingExperience,
        postGraduateExperience,
        proofOfWork,
      })
    );
    if (
      nursingExperience &&
      postGraduateExperience &&
      proofOfWork?.secure_url &&
      Object.values(errors).every((value) => !Boolean(value))
    ) {
      setLoading(true);
      try {
        const payload = {
          nursingExperience,
          postGraduateExperience,
          proofOfWork: {
            secure_url: proofOfWork.secure_url,
            public_id: proofOfWork.public_id,
            fileName: proofOfWork.fileName,
          },
        };
        const response = await client.post(
          `/applicant/experience/${cookies.user.applicantId}`,
          payload
        );
        router.push(redirectPath);
      } catch (error: any) {
        if (!error.response) alert("Please Check your internet Connection.");
        else {
          console.log(error);
          alert(error.response?.data?.message);
        }
      } finally {
        setLoading(false);
      }
    }
    console.log(errors);
  };
  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await saveExperience("/application_form/application_fee");
  };
  const onGoBack = async (e: FormEvent) => {
    e.preventDefault();
    setCookie("applicant", {
      ...cookies.applicant,
      experience: { nursingExperience, postGraduateExperience, proofOfWork },
    });
    router.push("/application_form/documents");
  };
  return (
    <FadeIn>
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
              error={errors.nursingExperience}
              onBlur={() =>
                setErrors({
                  ...errors,
                  nursingExperience: validateTextField(
                    nursingExperience,
                    "Nursing Experience"
                  )
                    ? validateTextField(nursingExperience, "Nursing Experience")
                    : "",
                })
              }
            />
            <SelectInput
              label="Experience in Post Graduate Nursing Specialty Area"
              value={postGraduateExperience}
              setValue={setPostGraduateExperience}
              options={experienceOptions}
              error={errors.postGraduateExperience}
              onBlur={() =>
                setErrors({
                  ...errors,
                  postGraduateExperience: validateTextField(
                    postGraduateExperience,
                    "Post-Graduate Experience"
                  )
                    ? validateTextField(
                        postGraduateExperience,
                        "Post-Graduate Experience"
                      )
                    : "",
                })
              }
            />
            <FileUpload
              fieldName={"proofOfWork"}
              error={errors.proofOfWork}
              file={proofOfWork}
              setFile={setProofOfWork}
              onFileUpload={() => setErrors({ ...errors, proofOfWork: "" })}
              label="Proof of working experience in a hospital setting in the last 12 months"
            />
          <InfoMessage text={"Kindly request for a letter of Good Standing from the Nursing and Midwifery Council in your country which will verify among other things, your nursing education and license. The letter should be addressed medsuiteofficial@gmail.com"} />
          <InfoMessage text={"You may have to make a payment to the Nursing and Midwifery Council in your country to enable Dataflow Group initiate the verification request for your credential verification"} />

            <div>
              <div>
                <Button
                  loading={loading}
                  onClick={onSubmit}
                  text="Next > Application Fee"
                  orange
                />
              </div>
              <Button
                onClick={onGoBack}
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
