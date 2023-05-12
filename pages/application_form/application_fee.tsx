import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { PaystackButton } from "react-paystack";
import Button from "../../components/Button";
import FadeIn from "../../components/FadeIn";
import Logo from "../../components/Logo";
import ProgressBar from "../../components/ProgressBar";
import styles from "../../styles/Form.module.css";
import buttonStyles from "../../components/Button/Button.module.css";
import client from "../api/Services/AxiosClient";

const ApplicationFee = () => {
  const router = useRouter();
  const [cookies, setCookie, removeCookie] = useCookies(["user", "applicant"]);
  const [freeButtonLoading, setFreeButtonLoading] = useState(false);

  useEffect(() => {
    if (typeof window !== undefined)
    alert(`We are Waiving the application Fee for the First 50 applicants. 
    To proceed without paying, click the 'Apply For free' button.`)
  }, [])

  useEffect(() => {
    if (!cookies.user || !cookies.applicant) router.push("/login");
  });
  const config = {
    email: cookies.user?.email,
    amount: 3000000,
    publicKey: process.env.NEXT_PUBLIC_PS_PUBLIC_KEY!,
  };
  const handlePaystackCloseAction = () => {
    alert("Payment could not be Completed");
  };
  const markPaymentAsCompleted = async () => {
    try {
      const response = await client.post(
        `/applicant/payment/${cookies.user.applicantId}`
      );
      setCookie("applicant", { ...cookies.applicant, paymentCompleted: true });
      router.replace("/payment_successful");
    } catch (error) {
      alert(
        "Something went wrong... If your payment was successful, send us a message at medsuiteofficial@gmail.com"
      );
    }
  };
  const handlePaystackSuccessAction = () => {
    markPaymentAsCompleted();
  };
  const componentProps = {
    ...config,
    text: "Pay NGN 30,000",
    onSuccess: handlePaystackSuccessAction,
    onClose: handlePaystackCloseAction,
  };
  return (
    <FadeIn>
      <main>
        <div className={styles.logoContainer}>
          <Logo />
        </div>
        <div className={styles.progressbarContainer}>
          <ProgressBar page={4} />
        </div>
        <section className={styles.applicationFeeContainer}>
          <div className={styles.paystackLogoContainer}>
            <img
              className={styles.paystackLogo}
              src="/icons/paystackLogo.svg"
            />
          </div>
          {/* <Button color="#11C981" text="Pay N2,500" />
           */}
          <div
            className={`${buttonStyles.button} ${buttonStyles.paystackButtonContainer}`}
          >
            <PaystackButton {...componentProps} />
          </div>
          <Button
            color="#FF6B00"
            onClick={() => {
              try {
                setFreeButtonLoading(true);
                markPaymentAsCompleted()
              } catch (err : any) {
                alert (err.message)
              } finally {
                setFreeButtonLoading(false);
              }
            }}
            text={freeButtonLoading ? "Loading..." : "Apply For Free"}
          />
          <Button
            onClick={() => router.push("/application_form/experience")}
            text="Prev < Experience"
          />
        </section>
      </main>
    </FadeIn>
  );
};
export default ApplicationFee;
