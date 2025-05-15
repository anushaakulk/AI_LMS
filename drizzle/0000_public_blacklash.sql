CREATE TABLE IF NOT EXISTS "chapterNotes" (
	"id" serial PRIMARY KEY NOT NULL,
	"courseId" varchar NOT NULL,
	"chapterId" integer NOT NULL,
	"notes" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "studyMaterial" (
	"id" serial PRIMARY KEY NOT NULL,
	"courseId" varchar NOT NULL,
	"courseType" varchar,
	"topic" varchar NOT NULL,
	"difficultyLevel" varchar DEFAULT 'Easy',
	"courseLayout" json,
	"createdBy" varchar NOT NULL,
	"status" varchar DEFAULT 'Generating',
	"createdAt" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"email" varchar NOT NULL,
	"isMember" boolean DEFAULT false
);
