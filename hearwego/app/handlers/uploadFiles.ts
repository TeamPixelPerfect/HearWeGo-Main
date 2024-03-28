import AWS from "aws-sdk";
import { Content } from "next/font/google";

export const uploadImage = async (fileName: string, buffer: string) => {
  const S3_BUCKET = "hwgbucket";
  const REGION = "ap-south-1";

  AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
  });
  const s3 = new AWS.S3({
    params: { Bucket: S3_BUCKET },
    region: REGION,
  });


  const base64Data = Buffer.from(buffer.replace(/^data:image\/\w+;base64,/, ""), 'base64');
  const type = buffer.split(';')[0].split('/')[1];

  const params = {
    Bucket: S3_BUCKET,
    Key: fileName+`.${type}`,
    Body: base64Data,
    ContentEncoding: 'base64',
    ContentType: `image/${type}`,      
  };

  var upload = s3
    .upload(params)
    .on("httpUploadProgress", (evt) => {
      console.log("Uploading " + Math.floor(evt.loaded * 100) / evt.total + "%");
    })
    .promise();

    try {
        const { Location } = await upload;
        console.log("Image uploaded successfully", Location);
        return Location;
    } catch (error) {
        console.log(error);
        throw new Error("Error uploading image");
    }
};

export const uploadSong = async (file: File) => {
  const S3_BUCKET = "hwgbucket";
  const REGION = "ap-south-1";

  AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
  });
  const s3 = new AWS.S3({
    params: { Bucket: S3_BUCKET },
    region: REGION,
  });

  const params = {
    Bucket: S3_BUCKET,
    Key: `songs/${file.name}`,
    Body: file,
    ContentType: file.type,    
  };

  var upload = s3
    .upload(params)
    .on("httpUploadProgress", (evt) => {
      console.log("Uploading " + Math.floor(evt.loaded * 100) / evt.total + "%");
    })
    .promise();

    try {
        const { Location } = await upload;
        console.log("Song uploaded successfully", Location);
        return Location;
    } catch (error) {
        console.log(error);
        throw new Error("Error uploading song");
    }
};