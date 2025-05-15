// import {  } from "drizzle-orm/mysql-core";
import { text,boolean, serial, varchar ,pgTable, json, integer, timestamp} from "drizzle-orm/pg-core";
//import {  } from "drizzle-orm/pg-core";


export const USER_TABLE=pgTable('users',{

    id:serial().primaryKey(),
    name:varchar().notNull(), 
    email:varchar().notNull(),
    isMember:boolean().default(false)
}
)

export const STUDY_MATERIAL_TABLE=pgTable('studyMaterial', {

    id: serial().primaryKey(), 
    courseId:varchar().notNull(),
    courseType:varchar(),
    topic:varchar().notNull(), 
    difficultyLevel:varchar().default('Easy'), 
    courseLayout:json(), 
    createdBy:varchar().notNull(),
    status:varchar().default('Generating'),
    createdAt: timestamp().defaultNow(),
})

export const CHAPTER_NOTES_TABLE = pgTable('chapterNotes', {

    id:serial().primaryKey(), 
    courseId: varchar().notNull(), 
    chapterId:integer().notNull(), 
    notes:text()

})