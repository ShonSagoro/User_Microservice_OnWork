import { StorageService } from "../../domain/services/StorageServices";
import * as aws from 'aws-sdk';
import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

export class S3Services implements StorageService {

  private bucketName: string;
  private folderName: string;

  constructor() {
    this.bucketName = process.env.S3_BUCKET_NAME as string;
    this.folderName = process.env.S3_FOLDER as string;
  }

  async execute(file: Buffer, fileName: string, mimeType: string): Promise<string> {
    const s3Url = `https://${this.bucketName}.s3.amazonaws.com/${this.folderName}/${fileName}`;

    try {
      await axios.put(s3Url, file, {
        headers: {
          'Content-Type': mimeType,
          'x-amz-acl': 'public-read',
        },
      });

      return s3Url;
    } catch (error:any) {
      console.error(error.message);
      throw new Error(`Failed to upload file to S3: ${error.message}`);
    }
  }
}