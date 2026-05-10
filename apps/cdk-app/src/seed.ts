import { ECSClient, RunTaskCommand } from "@aws-sdk/client-ecs";

const ecs = new ECSClient();

const SEEDS = ["plans", "types", "users"];

interface Event {
  type?: "migrate" | "seed";
  seed?: string;
}

export async function handler(event: Event) {
  const type = event.type ?? "migrate";

  let commands: { name: string; cmd: string[] }[];

  if (type === "migrate") {
    commands = [
      {
        name: "migrate",
        cmd: ["drizzle-kit", "migrate", "--config=./apps/web/drizzle.config.ts"],
      },
    ];
  } else {
    const seeds = event.seed ? [event.seed] : SEEDS;
    commands = seeds.map((seed) => ({
      name: seed,
      cmd: ["npx", "tsx", `apps/web/db/seeds/${seed}.ts`],
    }));
  }

  const tasks = await Promise.all(
    commands.map((c) =>
      ecs.send(
        new RunTaskCommand({
          cluster: process.env.CLUSTER_ARN!,
          taskDefinition: process.env.TASK_DEF_ARN!,
          launchType: "FARGATE",
          networkConfiguration: {
            awsvpcConfiguration: {
              subnets: process.env.SUBNET_IDS!.split(","),
              securityGroups: [process.env.SECURITY_GROUP_IDS!],
              assignPublicIp: "DISABLED",
            },
          },
          overrides: {
            containerOverrides: [
              {
                name: "SeedContainer",
                command: c.cmd,
              },
            ],
          },
        }),
      ),
    ),
  );

  return {
    statusCode: 200,
    body: JSON.stringify({
      type,
      commands: commands.map((c) => c.name),
      taskArns: tasks.flatMap((t) => t.tasks?.map((task) => task.taskArn) ?? []),
    }),
  };
}
