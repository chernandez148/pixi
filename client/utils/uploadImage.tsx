import AWS from "aws-sdk";
import { AppDispatch } from '../redux/types';
import { setFileName } from "@/redux/slices/fileName";

const uploadImage = async (imageURI: string, userID: string, dispatch: AppDispatch): Promise<void> => {
  try {
    const S3_BUCKET = process.env.EXPO_PUBLIC_S3_BUCKET;
    const REGION = process.env.EXPO_PUBLIC_REGION;
    const ACCESS_KEY_ID = process.env.EXPO_PUBLIC_ACCESS_KEY_ID;
    const SECRET_ACCESS_KEY = process.env.EXPO_PUBLIC_SECRET_ACCESS_KEY;

    AWS.config.update({
      accessKeyId: ACCESS_KEY_ID,
      secretAccessKey: SECRET_ACCESS_KEY,
    });

    if (!S3_BUCKET || !REGION || !ACCESS_KEY_ID || !SECRET_ACCESS_KEY) {
      console.error("Missing AWS credentials or bucket name");
      alert("Configuration error. Contact support.");
      return;
    }

    const s3 = new AWS.S3({ region: REGION });

    const response = await fetch(imageURI);
    if (!response.ok) {
      throw new Error(`Failed to fetch image. Status: ${response.status}`);
    }

    const blob = await response.blob();
    const key = `users/${userID}/media/${imageURI.split("/").pop()}`;
    dispatch(setFileName(key));  // Make sure key is set correctly

    const params = {
      Bucket: S3_BUCKET,
      Key: key,
      Body: blob,
      ContentType: blob.type,
    };

    const upload = s3
      .putObject(params)
      .on("httpUploadProgress", (evt) => {
        console.log(`Uploading ${(evt.loaded * 100) / evt.total}%`);
      });

    const data = await upload.promise();

    if (data) {
      console.log("Upload Data:", data);
    } else {
      console.error("Upload response is empty.");
      alert("File upload failed");
    }
  } catch (err) {
    console.error("Upload failed:", err);
  }
};

export default uploadImage;
