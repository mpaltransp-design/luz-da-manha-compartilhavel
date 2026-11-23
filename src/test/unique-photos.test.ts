import { describe, expect, it } from "vitest";
import { messages } from "@/lib/messages";

describe("catálogo de fotos", () => {
  it("cada mensagem tem uma foto exclusiva", () => {
    const photos = messages.map((m) => m.photo);
    expect(new Set(photos).size).toBe(messages.length);
  });
});
