import { getDataSource } from "@/lib/db";
import { User } from "@/lib/entities/user";
import { NextResponse } from "next/server";

export async function GET() {
    const ds = await getDataSource();
    const users = await ds.getRepository(User).find();
    return NextResponse.json(users);
    
}