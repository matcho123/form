const checkboxes = document.querySelectorAll("input[name='survey']");
const quantitySection = document.getElementById("quantitySection");

// Show/hide quantity section
checkboxes.forEach((cb) => {
  cb.addEventListener("change", () => {
    const anyChecked = [...checkboxes].some((x) => x.checked);

    // Toggle visibility (your original behavior)
    quantitySection.classList.toggle("hidden", !anyChecked);

    // Smooth fade in/out effect
    quantitySection.style.opacity = anyChecked ? "1" : "0";
  });
});

// Enforce max values on number inputs
document.querySelectorAll("input[type='number']").forEach((input) => {
  input.addEventListener("input", () => {
    if (input.value < 0) input.value = 0;
    if (input.max && Number(input.value) > Number(input.max)) {
      input.value = input.max;
    }
  });
});

// Handle form submission
document.getElementById("resourceForm").addEventListener("submit", (e) => {
  e.preventDefault();

  const data = Object.fromEntries(new FormData(e.target));
  data.surveys = [
    ...document.querySelectorAll("input[name='survey']:checked"),
  ].map((c) => c.value);

  console.log("Submitted:", data);

  document.getElementById("successMessage").classList.remove("hidden");

  e.target.reset();
  quantitySection.classList.add("hidden");

  // Reset opacity when hidden
  quantitySection.style.opacity = "0";
});
