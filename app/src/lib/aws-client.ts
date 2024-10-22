// src/utils/awsSqs.ts
import {SQSClient,SendMessageCommand} from '@aws-sdk/client-sqs';


const sqsClient = new SQSClient({
    region: process.env.AWS_REGION,
    credentials: {
      accessKeyId: process.env.ACCESS_KEY_ID!,
      secretAccessKey: process.env.SECRET_ACCESS_KEY!,
    },
  });

  export const sendMessageToSQS = async (messageBody: any, queueUrl: string) => {
    const params = {
      QueueUrl: queueUrl,
      MessageBody: JSON.stringify(messageBody),
    }
    const command = new SendMessageCommand(params);
  return await sqsClient.send(command); 
}