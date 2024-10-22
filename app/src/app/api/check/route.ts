import { NextRequest,NextResponse } from "next/server";
import prisma from "@/lib/prisma-client";


export async function GET(request: NextRequest) {
    try {
        const Id= request.nextUrl.searchParams.get('id');
        console.log(Id);
        if(!Id){
            return NextResponse.json(
                { error: 'Id not found' },
                { status: 404 }
            );
        }

        const user = await prisma.userData.findUnique({
            where: {
                id: Id
            }
        })
        console.log(user);
        return NextResponse.json({ user }, { status: 200 });
    } catch (error) {
        console.log(error);
        
    }
}