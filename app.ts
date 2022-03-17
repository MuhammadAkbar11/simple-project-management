const renderButton = document.createElement("button");
renderButton.textContent = "Click Here !";

document.body.append(renderButton);

const button = document.querySelector("button");

button?.addEventListener("click", () => {
  console.log("click");
});
