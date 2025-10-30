// Select form and input fields
const form = document.querySelector("#form");
const inputs = {
  username: document.querySelector("#username"),
  email: document.querySelector("#email"),
  password: document.querySelector("#password"),
  password2: document.querySelector("#password2"),
};

// Show error or success message
const showMessage = (input, message = "", type = "") => {
  const formControl = input.closest(".form-control");
  const small = formControl.querySelector("small");
  formControl.className = `form-control ${type}`;
  small.textContent = message;
};

// Check required fields
const validateRequired = (fields) => {
  fields.forEach((input) => {
    if (!input.value.trim()) {
      showMessage(input, `${formatName(input.id)} is required`, "error");
    } else {
      showMessage(input, "", "success");
    }
  });
};

// Check input length
const validateLength = (input, min, max) => {
  const length = input.value.trim().length;
  if (length < min) {
    showMessage(
      input,
      `${formatName(input.id)} must be at least ${min} characters`,
      "error"
    );
  } else if (length > max) {
    showMessage(
      input,
      `${formatName(input.id)} must be less than ${max} characters`,
      "error"
    );
  } else {
    showMessage(input, "", "success");
  }
};

// Check if passwords match
const validatePasswordMatch = (pass1, pass2) => {
  if (pass1.value !== pass2.value) {
    showMessage(pass2, "Passwords do not match", "error");
  }
};

// Capitalize first letter of field name ( ma fe da3e for this "for fun ;)" )
const formatName = (name) =>
  name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();

// Validate on form submit
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const { username, email, password, password2 } = inputs;

  validateRequired([username, email, password, password2]);
  validateLength(username, 3, 13);
  validateLength(password, 3, 20);
  validatePasswordMatch(password, password2);
});
