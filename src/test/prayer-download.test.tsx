import { QueryClient } from "@tanstack/react-query";
import { createMemoryHistory, createRootRoute, createRoute, createRouter, Outlet, RouterProvider } from "@tanstack/react-router";
import { render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { PrayerDownloadButton, PrayerShareButton } from "@/components/PrayerPlayer";
import { setVip } from "@/lib/store";

function renderWithRouter(component: () => React.JSX.Element) {
  const rootRoute = createRootRoute({ component: () => <Outlet /> });
  const indexRoute = createRoute({ getParentRoute: () => rootRoute, path: "/", component });
  const vipRoute = createRoute({ getParentRoute: () => rootRoute, path: "/vip", component: () => null });
  const router = createRouter({
    routeTree: rootRoute.addChildren([indexRoute, vipRoute]),
    context: { queryClient: new QueryClient() },
    history: createMemoryHistory({ initialEntries: ["/"] }),
  });
  return render(<RouterProvider router={router} />);
}

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

describe("Prayer audio share button", () => {
  beforeEach(() => window.localStorage.clear());

  it("shows a locked teaser linking to the VIP offer for free users", async () => {
    setVip(false);
    renderWithRouter(PrayerShareButton);
    const link = await screen.findByRole("link", { name: /Compartilhar Oração em Áudio/ });
    expect(link.getAttribute("href")).toBe("/vip");
  });

  it("shows an active share button for VIP members", async () => {
    setVip(true);
    renderWithRouter(PrayerShareButton);
    const button = await screen.findByRole("button", { name: /Compartilhar Oração em Áudio/ });
    expect(button).toBeTruthy();
  });
});

describe("Prayer audio sharing", () => {
  beforeEach(() => {
    vi.resetModules();
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({ ok: true, blob: () => Promise.resolve(new Blob(["mp3-audio"], { type: "audio/mpeg" })) }),
    );
    vi.spyOn(HTMLAnchorElement.prototype, "click").mockImplementation(() => {});
    Object.defineProperty(URL, "createObjectURL", { configurable: true, value: vi.fn(() => "blob:audio") });
    Object.defineProperty(URL, "revokeObjectURL", { configurable: true, value: vi.fn() });
    Object.defineProperty(navigator, "share", { configurable: true, value: undefined });
    Object.defineProperty(navigator, "canShare", { configurable: true, value: undefined });
  });
  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  it("sends the mp3 attachment through native sharing", async () => {
    const share = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, "share", { configurable: true, value: share });
    Object.defineProperty(navigator, "canShare", { configurable: true, value: () => true });
    const { preparePrayerAudio, sharePrayerAudio } = await import("@/lib/share");
    await preparePrayerAudio();
    await sharePrayerAudio();
    const payload = share.mock.calls[0]?.[0] as ShareData | undefined;
    expect(payload?.files?.[0]?.name).toBe("oracao-da-manha.mp3");
    expect(payload?.files?.[0]?.type).toBe("audio/mpeg");
    expect(payload?.files?.[0]?.size).toBeGreaterThan(0);
    expect(HTMLAnchorElement.prototype.click).not.toHaveBeenCalled();
  });

  it("downloads the mp3 when attachments are unsupported, without leaving the app", async () => {
    const original = window.location.href;
    const { sharePrayerAudio } = await import("@/lib/share");
    await sharePrayerAudio();
    expect(HTMLAnchorElement.prototype.click).toHaveBeenCalledOnce();
    expect(window.location.href).toBe(original);
  });

  it("does not download after native sharing is cancelled", async () => {
    Object.defineProperty(navigator, "share", {
      configurable: true,
      value: vi.fn().mockRejectedValue(new DOMException("Cancelled", "AbortError")),
    });
    Object.defineProperty(navigator, "canShare", { configurable: true, value: () => true });
    const { preparePrayerAudio, sharePrayerAudio } = await import("@/lib/share");
    await preparePrayerAudio();
    await sharePrayerAudio();
    expect(HTMLAnchorElement.prototype.click).not.toHaveBeenCalled();
  });
});
