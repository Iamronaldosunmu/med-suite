const { createContext, useState } = require("react");

export const ContactDetailsContext = createContext();

const ContactDetailsProvider = ({ children }) => {
    
    const [firstName, setFirstName] = useState("");
    const [middleName, setMiddleName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [stateOfOrigin, setStateOfOrigin] = useState("");
    const [countryOfOrigin, setCountryOfOrigin] = useState("");
    // Address
    const [street, setStreet] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    return (
        <ContactDetailsContext.Provider value={{
            firstName, setFirstName, middleName, setMiddleName, lastName, setLastName, phoneNumber, setPhoneNumber, stateOfOrigin,
            setStateOfOrigin, street, setStreet, city, setCity, state, setState, countryOfOrigin, setCountryOfOrigin
        }}>
            {children}
        </ContactDetailsContext.Provider>
    );
}

export default ContactDetailsProvider;