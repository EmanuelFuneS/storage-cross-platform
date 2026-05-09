export async function downloadFile(s3Key: string) {
  const response = await fetch(`/api/s3`, {
    method: "POST",
    body: JSON.stringify({
      action: "download",
      s3Key: s3Key,
    }),
  }).then((res) => res.json());

  const { downloadUrl, success } = await response;

  if (success && downloadUrl) return downloadUrl;

  return success;
}
