ALTER TABLE "usersStorage" DROP CONSTRAINT "usersStorage_userId_users_id_fk";
--> statement-breakpoint
ALTER TABLE "usersStorage" ADD CONSTRAINT "usersStorage_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;