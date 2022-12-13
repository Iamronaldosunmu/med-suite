import Joi from "joi";

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
