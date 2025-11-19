const checkboxes = document.querySelectorAll("input[name='survey']");
const quantitySections = document.querySelectorAll(".quantity-wrapper");
const form = document.getElementById("resourceForm");
const successMessage = document.getElementById("successMessage");

// Show/hide quantity sections based on survey selection
checkboxes.forEach((box) => {
  box.addEventListener("change", () => {
    quantitySections.forEach((section) => {
      const survey = section.getAttribute("data-survey");
      section.classList.toggle(
        "hidden",
        !Array.from(checkboxes).some((cb) => cb.checked && cb.value === survey)
      );
    });
  });
});

// Enforce max/min values on number inputs
document.querySelectorAll("input[type='number']").forEach((input) => {
  input.addEventListener("input", () => {
    if (input.value < 0) input.value = 0;
    if (input.max && Number(input.value) > Number(input.max))
      input.value = input.max;
  });
});

// Form submission
form.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(form);
  const data = {};

  formData.forEach((value, key) => {
    data[key] = value;
  });

  data.surveys = Array.from(checkboxes)
    .filter((cb) => cb.checked)
    .map((cb) => cb.value);

  console.log("Submitted:", data);

  successMessage.classList.remove("hidden");

  form.reset();
  quantitySections.forEach((section) => section.classList.add("hidden"));
  window.history.replaceState({}, document.title, window.location.pathname);
});
