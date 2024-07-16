export async function get(url: string) {
  const response = await fetch(url);

  if (!response) {
    throw new Error("failed while fetching ;(");
  }
  const data = (await response.json()) as unknown;
  return data;
}
