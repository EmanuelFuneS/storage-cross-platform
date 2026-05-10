import { ECSClient, RunTaskCommand } from "@aws-sdk/client-ecs";

const ecs = new ECSClient();

const SEEDS = ["plans", "types", "users"];

interface Event {
  seed?: string;
}

export async function handler(event: Event) {
  const seeds = event.seed ? [event.seed] : SEEDS;

  const tasks = await Promise.all(
    seeds.map((seed) =>
      ecs.send(
        new RunTaskCommand({
          cluster: process.env.CLUSTER_ARN!,
          taskDefinition: process.env.TASK_DEF_ARN!,
          launchType: "FARGATE",
          networkConfiguration: {
            awsvpcConfiguration: {
              subnets: process.env.SUBNET_IDS!.split(","),
              securityGroups: [
                process.env.SECURITY_GROUP_IDS!,
              ],
              assignPublicIp: "DISABLED",
            },
          },
          overrides: {
            containerOverrides: [
              {
                name: "SeedContainer",
                command: ["npx", "tsx", `apps/web/db/seeds/${seed}.ts`],
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
      seeds,
      taskArns: tasks.flatMap((t) => t.tasks?.map((task) => task.taskArn) ?? []),
    }),
  };
}
