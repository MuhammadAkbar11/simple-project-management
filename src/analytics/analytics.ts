let logged;

function sendAnalytics(data: string) {
  console.info("\n");
  console.info(`Sending...`);
  setTimeout(() => {
    console.info("Success to send analytics");
    console.log({ data: data });
    logged = true;
    console.log("Log : " + logged);
  }, 2000);
}

sendAnalytics("Typescript crash course");
