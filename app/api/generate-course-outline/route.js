import { courseOutline } from "@/configs/AiModel";
import { db } from "@/configs/db";
import { STUDY_MATERIAL_TABLE } from "@/configs/schema";
import { inngest } from "@/inngest/client";
import { NextResponse } from "next/server";

export async function POST(req){

    
    const {courseId, topic, courseType, difficultyLevel, createdBy} = await req.json();
    console.log(courseId, topic, courseType, difficultyLevel, createdBy)
    const PROMPT = "Generate a study material for "+topic+" for an "+ courseType+" and level of difficulty will be "+difficultyLevel+" with summary of course, list of Chapter along with summary for each chapter with black emojis as a field, Topic list in each chapter in  All in Json format"
    const aiResp = await courseOutline.sendMessage(PROMPT); 
    const aiResult= JSON.parse(aiResp.response.text());
    console.log(createdBy)
    const dbResult=await db.insert(STUDY_MATERIAL_TABLE).values({
        courseId: courseId,
        courseType:courseType,
        topic:topic, 
        difficultyLevel:difficultyLevel, 
        courseLayout:aiResult, 
        createdBy:createdBy


    }).returning({resp:STUDY_MATERIAL_TABLE})

    const result=await inngest.send({

        name:'notes.generate', 
        data:{
            course: dbResult[0].resp

        }
       

    });
    console.log(result)
    console.log(dbResult);
    return NextResponse.json({result:dbResult[0]})

}