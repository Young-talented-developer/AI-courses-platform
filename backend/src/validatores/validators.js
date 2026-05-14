/**
 * Phone number validation
 * Pattern: Israeli phone number format
 */
const validatePhone = (phone) => {
  if (!phone) {
    throw new Error("Phone number is required");
  }

  const phoneStr = String(phone).trim();
  const phoneRegex = /^(?:[+972]|0)(?:5[0-9]|[0-49][0-9])[0-9]{7}$/;

  if (!phoneRegex.test(phoneStr)) {
    throw new Error("Invalid phone number format");
  }

  return phoneStr;
};

/**
 * Password validation
 * Requirements:
 * - Minimum 6 characters
 * - At least one letter
 * - At least one number
 */
const validatePassword = (password) => {
  if (!password) {
    throw new Error("Password is required");
  }

  const passwordStr = String(password).trim();

  if (passwordStr.length < 6) {
    throw new Error("Password must be at least 6 characters");
  }

  if (!/[a-zA-Z]/.test(passwordStr)) {
    throw new Error("Password must contain at least one letter");
  }

  if (!/[0-9]/.test(passwordStr)) {
    throw new Error("Password must contain at least one number");
  }

  return passwordStr;
};

/**
 * Name validation
 */
const validateName = (name) => {
  if (!name) {
    throw new Error("Name is required");
  }

  const nameStr = String(name).trim();

  if (nameStr.length < 2) {
    throw new Error("Name must be at least 2 characters");
  }

  if (nameStr.length > 100) {
    throw new Error("Name must be less than 100 characters");
  }

  return nameStr;
};

/**
 * Prompt text validation
 */
const validatePromptText = (promptText) => {
  if (!promptText) {
    throw new Error("Prompt text is required");
  }

  const textStr = String(promptText).trim();

  if (textStr.length < 5) {
    throw new Error("Prompt must be at least 5 characters");
  }

  if (textStr.length > 2000) {
    throw new Error("Prompt must be less than 2000 characters");
  }

  return textStr;
};

/**
 * ID validation (for category, subCategory, etc.)
 */
const validateId = (id, fieldName = "ID") => {
  if (!id) {
    throw new Error(`${fieldName} is required`);
  }

  const idNum = Number(id);

  if (!Number.isInteger(idNum) || idNum <= 0) {
    throw new Error(`${fieldName} must be a positive integer`);
  }

  return idNum;
};

module.exports = {
  validatePhone,
  validatePassword,
  validateName,
  validatePromptText,
  validateId,
};
