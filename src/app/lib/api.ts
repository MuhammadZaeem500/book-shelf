export async function fetchApi<T>(
  endpoint: string,
  options?: RequestInit,
): Promise<T | null> {
  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("access_token") || localStorage.getItem("token")
      : null;

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"}${endpoint}`,
    {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...options?.headers,
      },
    },
  );

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const errorMessage =
      Array.isArray(errorData.message)
        ? errorData.message[0]
        : errorData.message || "Something went wrong";

    throw new Error(errorMessage);
  }

  const text = await response.text();
  return text ? (JSON.parse(text) as T) : null;
}