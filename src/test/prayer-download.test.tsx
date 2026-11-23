import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import { PrayerDownloadButton } from "@/components/PrayerPlayer";
import { setVip } from "@/lib/store";

describe("Prayer audio download", () => {
  beforeEach(() => window.localStorage.clear());

  it("is hidden for free users", () => {
    setVip(false);
    render(<PrayerDownloadButton />);
    expect(screen.queryByRole("button", { name: "Baixar oração em áudio" })).toBeNull();
  });

  it("is available for VIP members", () => {
    setVip(true);
    render(<PrayerDownloadButton />);
    expect(screen.getByRole("button", { name: "Baixar oração em áudio" })).toBeTruthy();
  });
});
