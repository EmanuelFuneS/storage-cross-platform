ALTER TABLE "files" ALTER COLUMN "size" SET DATA TYPE bigint;--> statement-breakpoint
ALTER TABLE "plans" ALTER COLUMN "capacity" SET DATA TYPE bigint;--> statement-breakpoint
ALTER TABLE "usersStorage" ALTER COLUMN "capacity" SET DATA TYPE bigint;--> statement-breakpoint
ALTER TABLE "usersStorage" ALTER COLUMN "used" SET DATA TYPE bigint;