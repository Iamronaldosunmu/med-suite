import { useRouter } from "next/router";
import { FormEvent, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import Button from "../../components/Button";
import FadeIn from "../../components/FadeIn";
import FileUpload from "../../components/FileUpload";
import Logo from "../../components/Logo";
import ProgressBar from "../../components/ProgressBar";
import styles from "../../styles/Form.module.css";
import DocumentProps from "../../Types/Document";
import { validateDocumentInputs } from "../../utilities/TextFieldValidation";
import client from "../api/Services/AxiosClient";

const defaultDocument = {
  secure_url: "",
  public_id: "",
  fileName: "",
};

interface DocumentErrorsProps {
  nursingDegree: string | undefined;
  practicingLicense: string | undefined;
  photoIdentification: string | undefined;
  evidenceOfRegistration: string | undefined;
  resume: string | undefined;
  referenceLetter: string | undefined;
  birthCertificate: string | undefined;
}

const Documents = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["user", "applicant"]);

  const [nursingDegree, setNursingDegree] =
    useState<DocumentProps>(defaultDocument);
  const [practicingLicense, setPracticingLicense] =
    useState<DocumentProps>(defaultDocument);
  const [photoIdentification, setPhotoIdentification] =
    useState<DocumentProps>(defaultDocument);
  const [evidenceOfRegistration, setEvidenceOfRegistration] =
    useState<DocumentProps>(defaultDocument);
  const [resume, setResume] = useState<DocumentProps>(defaultDocument);
  const [referenceLetter, setReferenceLetters] =
    useState<DocumentProps>(defaultDocument);
  const [birthCertificate, setBirthCirtificate] =
    useState<DocumentProps>(defaultDocument);

  const [loading, setLoading] = useState(false);
  const [prevLoading, setPrevLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!cookies.user || !cookies.applicant) router.push("/login");
    else {
      setNursingDegree(cookies.applicant?.documents?.nursingDegree);
      setPracticingLicense(cookies.applicant?.documents?.practicingLicense);
      setPhotoIdentification(cookies.applicant?.documents?.photoIdentification);
      setEvidenceOfRegistration(
        cookies.applicant?.documents?.evidenceOfRegistration
      );
      setResume(cookies.applicant?.documents?.resume);
      setReferenceLetters(cookies.applicant?.documents?.referenceLetter);
      setBirthCirtificate(cookies.applicant?.documents?.birthCertificate);
    }
  }, []);
  const [errors, setErrors] = useState<DocumentErrorsProps>({
    nursingDegree: "",
    practicingLicense: "",
    photoIdentification: "",
    evidenceOfRegistration: "",
    resume: "",
    referenceLetter: "",
    birthCertificate: "",
  });

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrors(
      validateDocumentInputs({
        nursingDegree,
        practicingLicense,
        photoIdentification,
        evidenceOfRegistration,
        resume,
        referenceLetter,
        birthCertificate,
      })
    );

    if (
      nursingDegree.secure_url &&
      practicingLicense.secure_url &&
      photoIdentification.secure_url &&
      evidenceOfRegistration.secure_url &&
      resume.secure_url &&
      referenceLetter.secure_url &&
      birthCertificate.secure_url &&
      Object.values(errors).every((value) => !Boolean(value))
    ) {
      try {
        setLoading(true);
        const payload = {
          nursingDegree,
          practicingLicense,
          photoIdentification,
          evidenceOfRegistration,
          resume,
          referenceLetter,
          birthCertificate,
        };
        const { data } = await client.post(
          `/applicant/documents/${cookies.user.applicantId}`,
          payload
        );
        setCookie("applicant", {...cookies.applicant, documents: payload})
        router.push("/application_form/experience");
      } catch (error: any) {
        console.log(error);
        if (!error.response) alert("Please Check your internet Connection.");
        else {
          alert(error.response?.data?.message);
        }
      } finally {
        setLoading(false);
      }
    }
  };

  const onGoBack = async (e: FormEvent) => {
    e.preventDefault();
    setPrevLoading(true);
    try {
      const { data: applicantData } = await client.get(
        `/applicant/${cookies.user.applicantId}`
      );
      setCookie("applicant", applicantData.applicant);
      router.push("/application_form/contact_details");
    } catch (error) {
      console.log(error);
    } finally {
      setPrevLoading(false);
    }
  };

  return (
    <FadeIn>
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
                fieldName="nursingDegree"
                label="Nursing Degree"
                error={errors.nursingDegree}
                onFileUpload={() => setErrors({ ...errors, nursingDegree: "" })}
              />
              <FileUpload
                fieldName="practicingLicense"
                file={practicingLicense}
                setFile={setPracticingLicense}
                label="Valid Practicing License"
                error={errors.practicingLicense}
                onFileUpload={() =>
                  setErrors({ ...errors, practicingLicense: "" })
                }
              />
              <FileUpload
                fieldName="photoIdentification"
                file={photoIdentification}
                setFile={setPhotoIdentification}
                label="Data Page of International Passport or NIN ID"
                error={errors.photoIdentification}
                onFileUpload={() =>
                  setErrors({ ...errors, photoIdentification: "" })
                }
              />
              <FileUpload
                fieldName="evidenceOfRegistration"
                file={evidenceOfRegistration}
                setFile={setEvidenceOfRegistration}
                label="Evidence of Registration with the Nigerian Nursing Council"
                error={errors.evidenceOfRegistration}
                onFileUpload={() =>
                  setErrors({ ...errors, evidenceOfRegistration: "" })
                }
              />
              <FileUpload
                fieldName="resume"
                file={resume}
                setFile={setResume}
                label="Resume/CV"
                error={errors.resume}
                onFileUpload={() => setErrors({ ...errors, resume: "" })}
              />
              <FileUpload
                fieldName="referenceLetter"
                file={referenceLetter}
                setFile={setReferenceLetters}
                label="Reference Letters"
                error={errors.referenceLetter}
                onFileUpload={() =>
                  setErrors({ ...errors, referenceLetter: "" })
                }
              />
            </div>
            <div className={styles.outlier}>
              <FileUpload
                fieldName="birthCertificate"
                file={birthCertificate}
                setFile={setBirthCirtificate}
                label="Birth Certificate"
                error={errors.birthCertificate}
                onFileUpload={() =>
                  setErrors({ ...errors, birthCertificate: "" })
                }
              />
            </div>
            <div>
              <Button
                loading={loading}
                text="Next > Experience"
                orange
                onClick={onSubmit}
              />
              <Button
                loading={prevLoading}
                onClick={onGoBack}
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
