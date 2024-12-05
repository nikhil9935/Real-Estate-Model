const scanner = require("sonarqube-scanner");
const userToken = 'squ_50a3f8f7960581c657161102eb332265adc27724';

scanner(
  {
    serverUrl: "http://localhost:9000",
    token: userToken,
    options: {
      "sonar.sources": "./src",
      "sonar.exclusions": "src/tests/**,src/App.test.ts/**,src/reportWebVitals.js**,src/components**,src/modules**,src/pages**,src/sonarqube-scanner.js**,src/reportWebVitals.js**,src/setupTests.js**,src/jest.config.js**,src/index.js**",

    },
  },
  () => process.exit()
);



