import { db } from "@/configs/db";
import { inngest } from "./client";
import { CHAPTER_NOTES_TABLE, STUDY_MATERIAL_TABLE, USER_TABLE } from "@/configs/schema";
import { eq } from "drizzle-orm";
import { GenerateNotesModel } from "@/configs/AiModel";
import { json } from "drizzle-orm/mysql-core";

export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event, step }) => {
    await step.sleep("wait-a-moment", "1s");
    return { message: `Hello ${event.data.email}!` };
  },
);


export const CreateNewUser = inngest.createFunction(

  { id: 'create-user' },
  { event: 'user.create' },
  async ({ event, step }) => {
    const {user} = event.data;
    const result = await step.run('Check User and create new if Not in DB', async () => {
      // Check If User Already Exist
      const result = await db.select().from(USER_TABLE)
        .where(eq(USER_TABLE.email, user?.primaryEmailAddress?.emailAddress)) // Query to get user from DB
      console.log(result);
      if (result?.length == 0) {
        // Is Not, Then add to DB
        const UserResp = await db.insert(USER_TABLE).values({
          name: user?.fullName, //Full name from clerk. 
          email: user?.primaryEmailAddress?.emailAddress // email address from Primary Email.
        }).returning({ id: USER_TABLE.id }) // Stores id to UserResp
        console.log(UserResp);
        return UserResp;
        
      }
      return result;
    })

    return 'Success';
  }

  // Step is to Send Welcome Email notification 

  // Step to Send Email notification After 3 days

)

export const GenerateNotes=inngest.createFunction(
  {id:'generate-course'}, 
  {event:'notes.generate'}, 
  async({event, step}) => {
    const {course} = event.data;

    const notesResult = await step.run('Generate Chapter Notes', async()=>{

      const chapters = course?.courseLayout.chapters; 
      let index = 0; 
      chapters.forEach(async(chapter)=>{
        console.log("chapter: "+ JSON.stringify(chapter))
        const PROMPT=`Generate beautiful exam material detailed content for the chapter, make sure to include all topic points in the content and make sure to give the output in beautiful HTML format that is visually appealing to see. (Do not Add HTMLK, Head, Body, title tag). Put the response HTML string in a dictionary with a field called "html_content" .The chapter is: ${JSON.stringify(chapter)}`
        console.log("Prompt: " + PROMPT)
        const result = await GenerateNotesModel.sendMessage(PROMPT);

        console.log("Response: "+result.response.text());
        const jsonAiResponse = JSON.parse(result.response.text());
        console.log("jsonAiResponse: ",  jsonAiResponse)
        const html_content = jsonAiResponse.html_content;
        console.log("html_content: "+html_content);

        //const aiResp = result.response.text();
        const aiResp = jsonAiResponse.html_content;

        await db.insert(CHAPTER_NOTES_TABLE).values({
            chapterId: index, 
            courseId: course?.courseId,
            notes: aiResp

        })
        index=index+1;
      })
      
    
      return 'Completed'
    })
    const updateCourseStatusResult = await step.run('Update Course Status to Ready', async()=>{

      const result = await db.update(STUDY_MATERIAL_TABLE).set({

        status:'Ready'
      }).where(eq(STUDY_MATERIAL_TABLE.courseId, course?.courseId));
      return 'Success'
    })
  }

  

)