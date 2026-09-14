export class ApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

export async function fetchApi<T>(
  endpoint: string,
  options?: RequestInit,
): Promise<T | null> {
  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("token") ||
        localStorage.getItem("access_token") ||
        localStorage.getItem("accessToken") ||
        localStorage.getItem("jwt")
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
    const errorMessage = Array.isArray(errorData.message)
      ? errorData.message[0]
      : errorData.message || "Something went wrong";

    // Throw custom error holding the exact HTTP status (401, 403, 500, etc.)
    throw new ApiError(errorMessage, response.status);
  }

  const text = await response.text();
  return text ? (JSON.parse(text) as T) : null;
}