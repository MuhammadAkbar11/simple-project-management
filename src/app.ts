const title = document.createElement("h1");
title.textContent = "TypeScript Crash Course By Acedemind";

const renderButton = document.createElement("button");
renderButton.textContent = "Click Here !";

document.body.append(title);
document.body.append(renderButton);

const button = document.querySelector("button")!;

function clickHandler(message: string) {
  console.log("Clicked! " + message);
}

button?.addEventListener("click", clickHandler.bind(null, "You're Welcome!"));
