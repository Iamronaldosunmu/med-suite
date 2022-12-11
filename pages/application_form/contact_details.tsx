import { useState } from "react";
import Button from "../../components/Button";
import InputGroup from "../../components/InputGroup";
import Logo from "../../components/Logo";
import ProgressBar from "../../components/ProgressBar";
import SelectInput from "../../components/SelectInput";
import styles from "../../styles/Form.module.css";
import { states } from "../../components/SelectInput/StatesAndLga";

const ContactDetails = () => {
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [stateOfOrigin, setStateOfOrigin] = useState("");
  const [localGovernmentArea, setLocalGovernmentArea] = useState("");
  // Address
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  return (
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
          />
          <InputGroup
            label="Middle Name"
            setValue={setMiddleName}
            value={middleName}
          />
          <InputGroup
            label="Last Name"
            setValue={setLastName}
            value={lastName}
          />
          <InputGroup
            label="Phone Number"
            setValue={setPhoneNumber}
            value={phoneNumber}
          />
          <SelectInput
            label="State Of Origin"
            value={stateOfOrigin}
            setValue={setStateOfOrigin}
            options={states.map((state) => state.name)}
          />
          <SelectInput
            label="Local Government Area"
            value={localGovernmentArea}
            setValue={setLocalGovernmentArea}
            options={states.find(state => state.name == stateOfOrigin)?.lgas}
          />
          <p className={styles.contactSection}>Address</p>
          <InputGroup label="Street" setValue={setStreet} value={street} />
          <InputGroup label="City" setValue={setCity} value={city} />
          <SelectInput
            label="State"
            value={state}
            setValue={setState}
            options={states.map((state) => state.name)}
          />
          <Button
            path="/application_form/documents"
            text="Next > Documents"
            orange
          />
        </form>
      </section>
    </main>
  );
};

export default ContactDetails;
