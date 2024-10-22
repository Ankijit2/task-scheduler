import { NextRequest,NextResponse } from "next/server";
import { UserDataSchema } from "@/types/Userdata";
import { sendMessageToSQS } from "@/lib/aws-client";
import prisma from "@/lib/prisma-client";



export async function POST(request: NextRequest) {
  try {
      const body = await request.json();
      const verifyIncommingData = UserDataSchema.safeParse(body);
      if (!verifyIncommingData.success) {
        return NextResponse.json(
          {
            error: verifyIncommingData.error,
            message: 'Invalid inputs or missing fields',
          },
          { status: 400 } 
        );
      }
      const user = await prisma.userData.create({
          data: verifyIncommingData.data,
      });

      await sendMessageToSQS({ userId: user.id }, process.env.SQS_URL!);
      return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
        { error: 'Something went wrong' },
        { status: 500 }
      );
}
  }



export async function GET() {
   try {
     const users = await prisma.userData.findMany();
     return NextResponse.json(users);
   } catch (error) {
    return NextResponse.json(
        { error: 'Something went wrong' },
        { status: 500 }
      );
}
}