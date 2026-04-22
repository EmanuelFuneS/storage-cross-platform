async function uploadeFile(file: File) {
  const { url } = await fetch("/api/presigned-url", {
    method: "POST",
    body: JSON.stringify({ fileName: file.name, fileType: file.type }),
  }).then((r) => r.json());

  await fetch(url, {
    method: "PUT",
    body: file,
    headers: { "Content-Type": file.type },
  });
}
