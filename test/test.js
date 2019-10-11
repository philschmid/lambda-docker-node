var dockerLambda = require("docker-lambda");
const path = require("path");

console.log("Preparing to test docker images");

var theEvent = { tests: { "1": "self.assertEqual(2,2)" } };

// docker run -v "$PWD":/var/task lambci/lambda index.handler '{"some": "event"}
try {
  var lambdaCallbackResult = dockerLambda({
    dockerImage: "lambci/lambda:nodejs10.x",
    // dockerArgs: ["-m", "1.5G"],
    dockerArgs: ["-m", "512MB"],
    taskDir: path.join(__dirname, "../"),
    handler: "src/index.foo",
    event: theEvent
  });
} catch (error) {
  console.error(error.message);
}

console.log(lambdaCallbackResult);
