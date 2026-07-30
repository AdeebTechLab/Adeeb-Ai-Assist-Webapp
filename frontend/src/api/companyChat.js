const API = "http://127.0.0.1:8000";

export async function askCompany(question) {
  const response = await fetch(`${API}/company/ask`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      question,
    }),
  });

  if (!response.ok) {
    throw new Error("Unable to contact AI.");
  }

  return await response.json();
}