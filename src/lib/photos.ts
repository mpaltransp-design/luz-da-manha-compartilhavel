import beach from "@/assets/photos/beach.jpg.asset.json";
import walkway from "@/assets/photos/walkway.jpg.asset.json";
import autumn from "@/assets/photos/autumn.jpg.asset.json";
import vehicle from "@/assets/photos/vehicle.jpg.asset.json";
import road from "@/assets/photos/road.jpg.asset.json";
import golden from "@/assets/photos/golden.jpg.asset.json";
import praise from "@/assets/photos/praise.jpg.asset.json";
import friends from "@/assets/photos/friends.jpg.asset.json";
import roses from "@/assets/photos/roses.jpg.asset.json";
import wheat from "@/assets/photos/wheat.jpg.asset.json";
import lake from "@/assets/photos/lake.jpg.asset.json";
import bible from "@/assets/photos/bible.jpg.asset.json";
import candle from "@/assets/photos/candle.jpg.asset.json";
import meadow from "@/assets/photos/meadow.jpg.asset.json";
import bouquet from "@/assets/photos/bouquet.jpg.asset.json";

export const photos = {
  beach: beach.url,
  walkway: walkway.url,
  autumn: autumn.url,
  vehicle: vehicle.url,
  road: road.url,
  golden: golden.url,
  praise: praise.url,
  friends: friends.url,
  roses: roses.url,
  wheat: wheat.url,
  lake: lake.url,
  bible: bible.url,
  candle: candle.url,
  meadow: meadow.url,
  bouquet: bouquet.url,
};

export type PhotoKey = keyof typeof photos;
