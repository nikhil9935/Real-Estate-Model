// const scanner = require("sonarqube-scanner");
// const userToken = 'squ_50a3f8f7960581c657161102eb332265adc27724';

// scanner(
//   {
//     serverUrl: "http://localhost:9000",
//     token: userToken,
//     options: {
//       "sonar.sources": "./src",
//       // "sonar.exclusions": "**/__test__/*", 
//       "sonar.exclusions": [
//         "**/__test__/*",
//         "**/modules/users/controller.ts"
//       ],
//     },
//   },
//   () => process.exit()
// );
const scanner = require("sonarqube-scanner");
const userToken = 'squ_50a3f8f7960581c657161102eb332265adc27724';

console.log('__dirname:', __dirname);

scanner(
  {
    serverUrl: "http://localhost:9000",
    token: userToken,
    options: {
      "sonar.sources": "./src",
      // "sonar.exclusions": "src/__test__/**,src/swaggerConfig.ts,src/modules/**", 
      // "sonar.exclusions":  "src/__test__/**,src/app.ts/**,src/modules/**,src/swaggerConfig.ts/**", 
      "sonar.exclusions":  "src/__test__/**,src/modules/**,src/swaggerConfig.ts**",
      
    },
  },
  () => process.exit()
);

