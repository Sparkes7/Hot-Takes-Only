import { getRandomMovie } from "./fetchapi";

async function Main() {
  console.log(await getRandomMovie());
}
Main();

const userForms = document.getElementById("user-forms");
userForms.addEventListener("submit", handleSubmit);

function handleSubmit(event) {
  event.preventDefault();
  const formData = new FormData(userForms);
  const formValues = Object.fromEntries(formData);
  console.log(formValues);

  //URL will be localhost for now - will update this once we have render URL 
  fetch("http://localhost:8080/add-user-reviews", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ formValues }),
  });
};