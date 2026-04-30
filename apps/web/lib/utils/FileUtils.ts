export async function deleteFile(s3Key: string) {
  const response = await fetch(`/api/s3`, {
    method: "POST",
    body: JSON.stringify({
      action: "delete",
      s3Key: s3Key,
    }),
  }).then((res) => res.json());

  const { deleted, success } = await response;

  if (deleted && success) return deleted;

  return success;
}

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
