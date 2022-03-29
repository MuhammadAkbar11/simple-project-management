const title = document.createElement("h1");
title.textContent = "TypeScript Crash Course By Acedemind";

const renderButton = document.createElement("button");
renderButton.textContent = "Click Here !";

document.body.append(title);
document.body.append(renderButton);

const button = document.querySelector("button")!;

type Click = {
  status: boolean;
  message: string;
};

function clickHandler(data: Click) {
  console.log("Clicked! " + data);
}

button?.addEventListener(
  "click",
  clickHandler.bind(null, { status: true, message: "You're Welcome!" })
);
