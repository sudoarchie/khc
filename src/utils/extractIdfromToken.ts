import jwt from "jsonwebtoken";

export default function ExtractId({ token }: { token: string }) {
  try {
    const decoded = jwt.decode(token);

    // Ensure decoded is an object and has the required properties
    if (typeof decoded === "object" && decoded && "id" in decoded && "email" in decoded) {
      const { id } = decoded as { id: string; email: string };
      if (!id) throw new Error("Invalid token!!");
      return id;
    } else {
      throw new Error("Invalid token structure!!");
    }
  } catch (err) {
    throw new Error(err instanceof Error ? err.message : "Something went wrong!!");
  }
}
