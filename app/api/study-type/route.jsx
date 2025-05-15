import { db } from "@/configs/db";
import { CHAPTER_NOTES_TABLE } from "@/configs/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(req){

    const {courseId} = await req.json();
    const notes= await db.select().from(CHAPTER_NOTES_TABLE)
    .where(eq(CHAPTER_NOTES_TABLE?.courseId, courseId))

    const result={
        notes:notes

    }
    console.log("results" + result)
    return NextResponse.json(result);
}