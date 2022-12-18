import Joi from "joi";
import DocumentProps from "../Types/Document";

// Function to validate the text inputs
export const validateTextField: any = (
  value: string,
  label: string,
  min: number = 3,
  max: number = 50
) => {
  const schema = Joi.object({
    value: Joi.string().min(min).max(max).label(label).required(),
  });
  console.log(schema.validate({ value }));
  return schema.validate({ value }).error?.details[0].message;
};

// Function to validate the email input fields
export const validateEmailField: any = (
  value: string,
  label: string,
  min: number = 3,
  max: number = 50
) => {
  const schema = Joi.object({
    value: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: false } })
      .min(min)
      .max(max)
      .label(label)
      .required(),
  });
  console.log(schema.validate({ value }));
  return schema.validate({ value }).error?.details[0].message;
};

interface SignupPayloadInput {
  email: string;
  password: string;
  confirmPassword: string;
}

// Function to validate the inputs on the signup page all at once
export const validateSignupInputs = (payload: SignupPayloadInput) => {
  const schema = Joi.object({
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: false } })
      .min(3)
      .max(50)
      .label("Email")
      .required(),
    password: Joi.string().min(8).max(50).required().label("Password"),
    confirmPassword: Joi.string()
      .min(3)
      .max(50)
      .required()
      .label("Confirm Password"),
  });

  const validationResult = schema.validate(payload, { abortEarly: false });

  const result = {
    email: validationResult.error
      ? validationResult.error.details.find((item) => item.path[0] == "email")
          ?.message
      : "",
    password: validationResult.error
      ? validationResult.error.details.find(
          (item) => item.path[0] == "password"
        )?.message
      : "",
    confirmPassword: validationResult.error
      ? validationResult.error.details.find(
          (item) => item.path[0] == "confirmPassword"
        )?.message
      : "",
  };
  const { password, confirmPassword } = payload;
  if (!result.confirmPassword && password !== confirmPassword)
    result.confirmPassword = "Passwords Must Match";

  return result;
};

interface LoginPayloadInput {
  email: string;
  password: string;
}
// Function to validate the inputs on the login page all at once
export const validateLoginInputs = (payload: LoginPayloadInput) => {
  const schema = Joi.object({
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: false } })
      .min(3)
      .max(50)
      .label("Email")
      .required(),
    password: Joi.string().min(8).max(50).required().label("Password"),
  });

  const validationResult = schema.validate(payload, { abortEarly: false });

  const result = {
    email: validationResult.error
      ? validationResult.error.details.find((item) => item.path[0] == "email")
          ?.message
      : "",
    password: validationResult.error
      ? validationResult.error.details.find(
          (item) => item.path[0] == "password"
        )?.message
      : "",
  };

  return result;
};

interface ContactDetailsPayloadInput {
  firstName: string;
  middleName: string;
  lastName: string;
  phoneNumber: string;
  stateOfOrigin: string;
  countryOfOrigin: string;
  street: string;
  city: string;
  state: string;
}

export const validateContactDetailsInputs = (
  payload: ContactDetailsPayloadInput
) => {
  const schema = Joi.object({
    firstName: Joi.string().min(3).max(50).required().label("First Name"),
    middleName: Joi.string().min(3).max(50).required().label("Middle Name"),
    lastName: Joi.string().min(3).max(50).required().label("Last Name"),
    phoneNumber: Joi.string().min(3).max(15).required().label("Phone Number"),
    stateOfOrigin: Joi.string()
      .min(3)
      .max(50)
      .required()
      .label("State Of Orgin"),
    countryOfOrigin: Joi.string()
      .min(3)
      .max(50)
      .required()
      .label("Country Of Origin"),
    street: Joi.string().min(3).max(50).required().label("Street"),
    city: Joi.string().min(3).max(50).required().label("City"),
    state: Joi.string().min(3).max(50).required().label("State"),
  });

  const validationResult = schema.validate(payload, { abortEarly: false });

  const result = {
    firstName: validationResult.error
      ? validationResult.error.details.find(
          (item) => item.path[0] == "firstName"
        )?.message
      : "",
    middleName: validationResult.error
      ? validationResult.error.details.find(
          (item) => item.path[0] == "middleName"
        )?.message
      : "",
    lastName: validationResult.error
      ? validationResult.error.details.find(
          (item) => item.path[0] == "lastName"
        )?.message
      : "",
    phoneNumber: validationResult.error
      ? validationResult.error.details.find(
          (item) => item.path[0] == "phoneNumber"
        )?.message
      : "",
    stateOfOrigin: validationResult.error
      ? validationResult.error.details.find(
          (item) => item.path[0] == "stateOfOrigin"
        )?.message
      : "",
    countryOfOrigin: validationResult.error
      ? validationResult.error.details.find(
          (item) => item.path[0] == "countryOfOrigin"
        )?.message
      : "",
    street: validationResult.error
      ? validationResult.error.details.find((item) => item.path[0] == "street")
          ?.message
      : "",
    city: validationResult.error
      ? validationResult.error.details.find((item) => item.path[0] == "city")
          ?.message
      : "",
    state: validationResult.error
      ? validationResult.error.details.find((item) => item.path[0] == "state")
          ?.message
      : "",
  };

  return result;
};

interface ExperienceInput {
  nursingExperience: string;
  postGraduateExperience: string;
  proofOfWork?: DocumentProps;
}

export const validateExperienceInputs = (payload: ExperienceInput) => {
  const schema = Joi.object({
    nursingExperience: Joi.string()
      .min(3)
      .max(50)
      .required()
      .label("Nursing Experience"),
    postGraduateExperience: Joi.string()
      .min(3)
      .max(50)
      .required()
      .label("Post Graduate Experience"),
  });

  const validationResult = schema.validate(
    {
      nursingExperience: payload.nursingExperience,
      postGraduateExperience: payload.postGraduateExperience,
    },
    { abortEarly: false }
  );
  const result = {
    nursingExperience: validationResult.error
      ? validationResult.error.details.find(
          (item) => item.path[0] == "nursingExperience"
        )?.message
      : "",
    postGraduateExperience: validationResult.error
      ? validationResult.error.details.find(
          (item) => item.path[0] == "postGraduateExperience"
        )?.message
      : "",
    proofOfWork: payload.proofOfWork!.secure_url
      ? ""
      : '"Proof Of Work" is not allowed to be empty',
  };

  return result;
};

interface DocumentInput {
  nursingDegree: DocumentProps;
  practicingLicense: DocumentProps;
  photoIdentification: DocumentProps;
  evidenceOfRegistration: DocumentProps;
  resume: DocumentProps;
  referenceLetter: DocumentProps;
  birthCertificate: DocumentProps;
}

export const validateDocumentInputs = (payload: DocumentInput) => {
  const result = {
    nursingDegree: payload.nursingDegree!.secure_url
      ? ""
      : '"Nursing Degree" is not allowed to be empty',
    practicingLicense: payload.practicingLicense!.secure_url
      ? ""
      : '"Practicing License" is not allowed to be empty',
    photoIdentification: payload.photoIdentification!.secure_url
      ? ""
      : '"Photo Identification" is not allowed to be empty',
    evidenceOfRegistration: payload.evidenceOfRegistration!.secure_url
      ? ""
      : '"Evidence Of Registration" is not allowed to be empty',
    resume: payload.resume!.secure_url
      ? ""
      : '"Resume" is not allowed to be empty',
    referenceLetter: payload.referenceLetter!.secure_url
      ? ""
      : '"Reference Letters" is not allowed to be empty',
    birthCertificate: payload.birthCertificate!.secure_url
      ? ""
      : '"Birth Certificate" is not allowed to be empty',
  };

  return result;
};
