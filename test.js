require("dotenv").config();

// API TEST
switch (process.env.TEST_NUMBER) {
  case "1":
    require("./modules/apis/apisTest");
    break;
}
