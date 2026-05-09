export async function getTypes() {
  const res = await fetch(`/api/types`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  return data;
}
