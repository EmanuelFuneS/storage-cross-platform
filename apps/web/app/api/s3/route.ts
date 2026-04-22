export async function POST(req: Request) {
  const body = await req.json();

  const res = await fetch(process.env.PRESIGNED_LAMBDA_URL!, {
    method: "POST",
    body: JSON.stringify(body),
  });

  return Response.json(await res.json());
}
