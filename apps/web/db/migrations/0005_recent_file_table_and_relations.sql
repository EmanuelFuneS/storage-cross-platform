CREATE TABLE "recentsFile" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"storageId" uuid,
	"fileId" uuid,
	"opened_at" timestamp DEFAULT now(),
	CONSTRAINT "recentsFile_storageId_fileId_unique" UNIQUE("storageId","fileId")
);
--> statement-breakpoint
ALTER TABLE "recentsFile" ADD CONSTRAINT "recentsFile_storageId_usersStorage_id_fk" FOREIGN KEY ("storageId") REFERENCES "public"."usersStorage"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "recentsFile" ADD CONSTRAINT "recentsFile_fileId_files_id_fk" FOREIGN KEY ("fileId") REFERENCES "public"."files"("id") ON DELETE cascade ON UPDATE no action;