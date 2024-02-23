const {
  GetObjectCommand,
  S3Client,
  ListObjectsV2Command,
} = require("@aws-sdk/client-s3");

const getImageObject = async () => {
  let imageURL = "";
  let imageName = "";

  // S3バケットのクライアントインスタンス作成
  const s3Client = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
      accessKeyId: process.env.S3_ACCESS_KEY_ID,
      secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    },
  });

  // バケットへのコマンド取得
  const getList = new ListObjectsV2Command({
    Bucket: process.env.S3_BUCKET_NAME,
  });

  // オブジェクト取得
  try {
    let objectNameList = [];
    let isTruncated = true;

    while (isTruncated) {
      const { Contents, IsTruncated, NextContinuationToken } =
        await s3Client.send(getList);

      objectNameList = Contents.map((c) => c.Key);

      isTruncated = IsTruncated;
      getList.input.ContinuationToken = NextContinuationToken;
    }

    // オブジェクトのファイル名をランダムに取得
    const imageNumber = Math.floor(Math.random() * objectNameList.length);
    imageName = objectNameList[imageNumber].split(".")[0];

    const getObject = new GetObjectCommand({
      Bucket: process.env.S3_BUCKET_NAME,
      Key: objectNameList[imageNumber],
    });

    const response = await s3Client.send(getObject);
    imageURL = process.env.S3_BUCKET_URL + response.Body.req.path;
  } catch {
    imageURL = null;
    imageName = "error";
  }

  return {
    imageURL: imageURL,
    imageName: imageName,
  };
};

module.exports = getImageObject;
