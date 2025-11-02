const form = document.querySelector("#form");
let inputs = {};

// Load form dynamically
async function loadForm() {
  try {
    const response = await fetch("formFields.json");
    const data = await response.json();

    // Create the form fields markup
    const formHTML = data.formControls
      .map(
        (control) => `
          <div class="form-control">
            <label for="${control.for}"><b>${control.label}</b></label>
            <input 
              type="${control.type}" 
              id="${control.id}" 
              placeholder="${control.placeholder}" 
            />
            <small><b>${control.errorMessage}</b></small>
          </div>
        `
      )
      .join("");

    //Insert the fields between the <h2> and <button>
    const submitBtn = form.querySelector("button");
    submitBtn.insertAdjacentHTML("beforebegin", formHTML);

    // Select the inputs after they exist
    inputs = {
      username: document.querySelector("#username"),
      email: document.querySelector("#email"),
      password: document.querySelector("#password"),
      password2: document.querySelector("#password2"),
    };
  } catch (error) {
    console.error("Error loading form:", error);
  }
}

// Utility: show success/error messages
const showMessage = (input, message = "", type = "") => {
  const formControl = input.closest(".form-control");
  const small = formControl.querySelector("small");
  formControl.className = `form-control ${type}`;
  small.textContent = message;
};

// Capitalize first letter of field name
const formatName = (name) =>
  name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();

const validateRequired = (fields) => {
  fields.forEach((input) => {
    if (!input.value.trim()) {
      showMessage(input, `${formatName(input.id)} is required`, "error");
    } else {
      showMessage(input, "", "success");
    }
  });
};

// Check Username length
const validateUsernameLength = (input) => {
  const min = 3,
    max = 13;
  const len = input.value.trim().length;
  if (len < min) {
    showMessage(input, `Username must be at least ${min} characters`, "error");
    return;
  }
  if (len > max) {
    showMessage(input, `Username must be less than ${max} characters`, "error");
    return;
  }
  showMessage(input, "", "success");
};

// Check Password length
const validatePasswordLength = (input) => {
  const min = 3,
    max = 20;
  const len = input.value.trim().length;
  if (len < min) {
    showMessage(
      input,
      `${formatName(input.id)} must be at least ${min} characters`,
      "error"
    );
    return;
  }
  if (len > max) {
    showMessage(
      input,
      `${formatName(input.id)} must be less than ${max} characters`,
      "error"
    );
    return;
  }
  showMessage(input, "", "success");
};

// Check if passwords match
const validatePasswordMatch = (p1, p2) => {
  if (p1.value !== p2.value) {
    showMessage(p2, "Passwords do not match", "error");
  }
};

//Adding event listener after the form is loaded
loadForm().then(() => {
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const { username, email, password, password2 } = inputs;

    validateRequired([username, email, password, password2]);
    validateUsernameLength(username);
    validatePasswordLength(password);
    validatePasswordLength(password2);
    validatePasswordMatch(password, password2);
  });
});
