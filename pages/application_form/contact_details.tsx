import { FormEvent, useContext, useEffect, useRef, useState } from "react";
import Button from "../../components/Button";
import InputGroup from "../../components/InputGroup";
import Logo from "../../components/Logo";
import ProgressBar from "../../components/ProgressBar";
import SelectInput from "../../components/SelectInput";
import styles from "../../styles/Form.module.css";
import { states } from "../../components/SelectInput/StatesAndLga";
import FadeIn from "../../components/FadeIn";
import {
  validateContactDetailsInputs,
  validateTextField,
} from "../../utilities/TextFieldValidation";
import { ContactDetailsContext } from "../../components/Context/ContactDetailsContext";
import client from "../api/Services/AxiosClient";
import { UserContext } from "../../components/Context/UserContext";
import Router, { useRouter } from "next/router";
import { useCookies } from "react-cookie";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import inputStyles from "../../components/InputGroup/InputGroup.module.css";
import { AnimatePresence, motion } from "framer-motion";
import countriesData from "../../Data/countries.json";

interface ContactDetailsFormErrors {
  firstName?: string;
  middleName?: string;
  lastName?: string;
  phoneNumber?: string;
  stateOfOrigin?: string;
  countryOfOrigin?: string;
  street?: string;
  city?: string;
  state?: string;
}

const ContactDetails = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["user", "applicant"]);

  const router = useRouter();
  const [firstName, setFirstName] = useState(
    cookies.applicant?.contactDetails?.firstName
  );
  const [middleName, setMiddleName] = useState(
    cookies.applicant?.contactDetails?.middleName
  );
  const [lastName, setLastName] = useState(
    cookies.applicant?.contactDetails?.lastName
  );
  const [phoneNumber, setPhoneNumber] = useState(
    cookies.applicant?.contactDetails?.phoneNumber
  );
  const [stateOfOrigin, setStateOfOrigin] = useState(
    cookies.applicant?.contactDetails?.stateOfOrigin
  );
  const [countryOfOrigin, setCountryOfOrigin] = useState(
    cookies.applicant?.contactDetails?.countryOfOrigin
  );
  // Address
  const [street, setStreet] = useState(
    cookies.applicant?.contactDetails?.street
  );
  const [city, setCity] = useState(cookies.applicant?.contactDetails?.city);
  const [state, setState] = useState(cookies.applicant?.contactDetails?.state);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<ContactDetailsFormErrors>({
    firstName: "",
    middleName: "",
    lastName: "",
    phoneNumber: "",
    stateOfOrigin: "",
    countryOfOrigin: "",
    city: "",
    street: "",
    state: "",
  });
  useEffect(() => {
    if (!cookies.user || !cookies.applicant) {
      router.push("/login");
    }
  });
  const updateCookies = async () => {
    const { data: applicantData } = await client.get(
      `/applicant/${cookies.user.applicantId}`
    );
    setCookie("applicant", applicantData.applicant);
    localStorage?.setItem("applicant", JSON.stringify(applicantData.applicant));
  };
  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrors(
      validateContactDetailsInputs({
        firstName,
        middleName,
        lastName,
        phoneNumber,
        stateOfOrigin,
        countryOfOrigin,
        street,
        city,
        state,
      })
    );
    if (
      firstName &&
      middleName &&
      lastName &&
      stateOfOrigin &&
      countryOfOrigin &&
      phoneNumber &&
      street &&
      city &&
      state &&
      Object.values(errors).every((value) => !Boolean(value))
    ) {
      try {
        setLoading(true);
        const payload = {
          firstName,
          middleName,
          lastName,
          phoneNumber,
          stateOfOrigin,
          countryOfOrigin,
          street,
          city,
          state,
        };
        const { data } = await client.post(
          `/applicant/contact_details/${cookies.user.applicantId}`,
          payload
        );
        await updateCookies();
        router.push("/application_form/documents");
      } catch (error: any) {
        console.log(error)
        if (!error.response) alert("Please Check your internet Connection.");
        else {
          alert(error.response?.data?.message);
        }
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <FadeIn>
      <main>
        <div className={styles.logoContainer}>
          <Logo />
        </div>
        <div className={styles.progressbarContainer}>
          <ProgressBar page={1} />
        </div>
        <section className={styles.formSection}>
          <form>
            <InputGroup
              label="First Name"
              setValue={setFirstName}
              value={firstName}
              error={errors.firstName}
              onBlur={() =>
                setErrors({
                  ...errors,
                  firstName: validateTextField(firstName, "First Name")
                    ? validateTextField(firstName, "First Name")
                    : "",
                })
              }
            />
            <InputGroup
              label="Middle Name"
              setValue={setMiddleName}
              value={middleName}
              error={errors.middleName}
              onBlur={() =>
                setErrors({
                  ...errors,
                  middleName: validateTextField(middleName, "Middle Name")
                    ? validateTextField(middleName, "Middle Name")
                    : "",
                })
              }
            />
            <InputGroup
              label="Last Name"
              setValue={setLastName}
              value={lastName}
              error={errors.lastName}
              onBlur={() =>
                setErrors({
                  ...errors,
                  lastName: validateTextField(lastName, "Last Name")
                    ? validateTextField(lastName, "Last Name")
                    : "",
                })
              }
            />

            {/* <InputGroup
              label="Phone Number"
              setValue={setPhoneNumber}
              value={phoneNumber}
              error={errors.phoneNumber}
              onBlur={() =>
                setErrors({
                  ...errors,
                  phoneNumber: validateTextField(phoneNumber, "Phone Number")
                    ? validateTextField(phoneNumber, "Phone Number")
                    : "",
                })
              }
            /> */}
            <style jsx global>
              {`
                .selected-flag.open {
                  background: #ebebeb !important;
                }
                .flag-dropdown {
                  background-color: #ebebeb !important;
                  border-radius: 8px;
                }
                .selected-flag:hover {
                  background-color: #ebebeb !important;
                }
                .form-control {
                  height: 51.4px !important;
                }
                @media screen and (max-width: 1024px) {
                  .form-control {
                    height: 42.4px !important;
                    font-size: 14px !important;
                  }
                }
              `}
            </style>
            <div className={inputStyles.container}>
              <label className={inputStyles.label}>Phone Number</label>
              <PhoneInput
                country={"ng"}
                value={phoneNumber}
                onChange={(phone) => {
                  setPhoneNumber(phone);
                }}
                onBlur={() =>
                  setErrors({
                    ...errors,
                    phoneNumber: validateTextField(phoneNumber, "Phone Number")
                      ? validateTextField(phoneNumber, "Phone Number")
                      : "",
                  })
                }
                containerStyle={{ width: "100%" }}
                inputStyle={{
                  width: "100%",
                  background: "#ebebeb",
                  paddingLeft: 60,
                  border: 0,
                  borderRadius: 8,
                }}
                buttonStyle={{ border: 0, width: 50, left: 0, paddingLeft: 10 }}
              />
              <AnimatePresence>
                {errors.phoneNumber && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className={inputStyles.error}
                  >
                    {errors.phoneNumber}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
            <InputGroup
              label="State Of Origin"
              value={stateOfOrigin}
              setValue={setStateOfOrigin}
              error={errors.stateOfOrigin}
              onBlur={() =>
                setErrors({
                  ...errors,
                  stateOfOrigin: validateTextField(
                    stateOfOrigin,
                    "State Of Origin"
                  )
                    ? validateTextField(stateOfOrigin, "State Of Origin")
                    : "",
                })
              }
            />
            <SelectInput
              label="Country Of Origin"
              value={countryOfOrigin}
              setValue={setCountryOfOrigin}
              options={Object.values(countriesData).map(
                (country) => country["Country Name"]
              )}
              error={errors.countryOfOrigin}
              onBlur={() => {
                setErrors({
                  ...errors,
                  countryOfOrigin: validateTextField(
                    countryOfOrigin,
                    "Country Of Origin"
                  )
                    ? validateTextField(countryOfOrigin, "Country Of Origin")
                    : "",
                });
              }}
            />
            {/* <SelectInput
              label="Local Government Area"
              value={localGovernmentArea}
              setValue={setLocalGovernmentArea}
              options={
                states.find((state) => state.name == stateOfOrigin)?.lgas
              }
              error={errors.localGovernmentArea}
              onBlur={() =>
                setErrors({
                  ...errors,
                  localGovernmentArea: validateTextField(
                    localGovernmentArea,
                    "Local Government Area"
                  )
                    ? validateTextField(
                        localGovernmentArea,
                        "Local Government Area"
                      )
                    : "",
                })
              }
            /> */}
            <p className={styles.contactSection}>Address</p>
            <InputGroup
              label="Street"
              setValue={setStreet}
              value={street}
              error={errors.street}
              onBlur={() =>
                setErrors({
                  ...errors,
                  street: validateTextField(street, "Street")
                    ? validateTextField(street, "Street")
                    : "",
                })
              }
            />
            <InputGroup
              label="City"
              setValue={setCity}
              value={city}
              error={errors.city}
              onBlur={() =>
                setErrors({
                  ...errors,
                  city: validateTextField(city, "City")
                    ? validateTextField(city, "City")
                    : "",
                })
              }
            />
            <InputGroup
              label="State / Province of Residence"
              value={state}
              setValue={setState}
              error={errors.state}
              onBlur={() =>
                setErrors({
                  ...errors,
                  state: validateTextField(state, "State")
                    ? validateTextField(state, "State")
                    : "",
                })
              }
            />
            {/* <SelectInput
              label="State / Province of Residence"
              value={state}
              setValue={setState}
              options={states.map((state) => state.name)}
              error={errors.state}
              onBlur={() =>
                setErrors({
                  ...errors,
                  state: validateTextField(state, "State")
                    ? validateTextField(state, "State")
                    : "",
                })
              }
            /> */}
            <Button onClick={onSubmit} text="Next > Documents" orange />
          </form>
        </section>
      </main>
    </FadeIn>
  );
};

export default ContactDetails;
