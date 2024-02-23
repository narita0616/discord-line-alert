const apis = require("./apis");
const { getImageObject } = apis();

// テスト実行
console.log("apis.js test start");
console.log("");

// getImageObjectのテスト
const getImageObjectTest = async () => {
  console.log("getImageObject:");
  try {
    const object = await getImageObject();
    if (!object) throw new Error();
    if (!object.imageName) throw new Error();

    console.log("OK");
  } catch {
    console.log("NG");
  }
};

getImageObjectTest();
