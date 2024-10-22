import app from "./app.js";
import dotenv from "dotenv";
import connectDB from "./database/index.js";
import cron from 'node-cron';
import { taskProcessing } from "./utils/task-processing.js";
import { UserData } from "./models/userdata_model.js";
import { Server } from 'socket.io';
import { createServer } from "http";

import { SQSClient, ReceiveMessageCommand, DeleteMessageCommand } from '@aws-sdk/client-sqs';
import mongoose from "mongoose";

dotenv.config({ path: './.env' });

export const envMode = process.env.NODE_ENV?.trim() || 'DEVELOPMENT';
const port = process.env.PORT || 8000;



const server = createServer(app);
const io = new Server(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

const sqsClient = new SQSClient({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.ACCESS_KEY_ID,
        secretAccessKey: process.env.SECRET_ACCESS_KEY,
    },
});



 const receiveMessageFromSQS = async (queueUrl) => {
    const params = {
        QueueUrl: queueUrl,
        MaxNumberOfMessages: 1,  
        WaitTimeSeconds: 10,
    };

    const command = new ReceiveMessageCommand(params);
    const response = await sqsClient.send(command);
    
   
    return response.Messages || [];  
};



 const deleteMessageFromSQS = async (queueUrl, receiptHandle) => {
    const params = {
        QueueUrl: queueUrl,
        ReceiptHandle: receiptHandle,
    };
    const command = new DeleteMessageCommand(params);
    return await sqsClient.send(command);
};



connectDB()
.then(() => {
    io.on('connection', (socket) => {
        console.log('New client connected:', socket.id);

        socket.on('disconnect', () => {
            console.log('Client disconnected:', socket.id);
        });
   
    // Schedule a task to run every second
    cron.schedule('* * * * *', async () => {  // This line runs the task every second
        try {
            const messages = await receiveMessageFromSQS(process.env.SQS_URL);
    
            if (messages.length === 0) {
                console.log('No messages available.');
                return;
            }
    
            console.log('Received messages from SQS:', messages);
            for (const message of messages) {
                const { Body, ReceiptHandle } = message;
                const parsedBody = JSON.parse(Body);
                const { userId } = parsedBody;
    
                // Find the user by userId
                const findUser = await UserData.findOne({ _id: userId });
                if (!findUser || findUser.length === 0) {
                    console.error('User not found for userId:', userId);
                    return;
                }
    
                console.log('Found User:', findUser); // Debugging log for findUser
    
                // Process the task for the found user
                const taskProcessingCommand = await taskProcessing(findUser);
                const { hash, wordCount } = taskProcessingCommand;
                console.log('Task Processing Command:', taskProcessingCommand); // Debugging log for taskProcessingCommand
    
                // Update the user document with the new values
                const updateUser = await UserData.findOneAndUpdate(
                    { _id: userId },
                    { status: 'processed', titleHash: hash, wordCount: wordCount, updatedAt: Date.now() },
                    { new: true }
                );
    
                console.log('User updated:', updateUser);  // Debugging log for update
    
                io.emit('userUpdated', updateUser); // Emit event to notify clients
                await deleteMessageFromSQS(process.env.SQS_URL, ReceiptHandle);
            }
        } catch (error) {
            console.error('Error processing messages from SQS:', error);
        }
    });
    });
    

    server.listen(port, () => {
        console.log(`Server is running on Port: ${port} in ${envMode} Mode.`);
    });
})
.catch((err) => {
    console.log("MongoDB connection failed:", err);
});
