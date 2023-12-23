import tinycolor from "tinycolor2";
import { writable } from "svelte/store";
import type { HSLColor, LightingConditions } from "$lib/schema.ts";

// prevents automatic updates to time
export const isLocked = writable(false);
let _isLocked = false;
isLocked.subscribe((isLocked) => _isLocked = isLocked);

export const currentDayPercentage = writable<number>(getCurrentDayPercentage());
export const currentLightingConditions = writable<LightingConditions>({
  color: "#e0e0e0",
  isLight: true,
  v: 0,
  w: 0,
});
export const isLight = writable<boolean>(false);
export const stylesheet = writable<string>("");
currentLightingConditions.subscribe((l) => {
  isLight.set(l.isLight);
  stylesheet.set(generateStylesheet(l));
});
currentDayPercentage.subscribe((p) => {
  currentLightingConditions.set(getLightingConditions(p));
});

function getLightingConditions(time: number): LightingConditions {
  const color = getBackgroundColorFromTime(time);
  const shadow = getShadowAngleFromTime(time);
  const isLight = tinycolor(color).isLight();
  return { color, isLight, v: shadow.v, w: shadow.w };
}

function getBackgroundColorFromTime(time: number): string {
  const index = Math.floor(time * 6);
  switch (index) {
    case 0:
      return averageColors(
        { h: 231, s: 15, l: 18 },
        { h: 231, s: 15, l: 18 },
        time * 6 - index,
      );
    case 1:
      return averageColors(
        { h: 38, s: 52, l: 83 },
        { h: 28, s: 47, l: 87 },
        time * 6 - index,
      );
    case 2:
      return averageColors(
        { h: 28, s: 47, l: 87 },
        { h: 0, s: 0, l: 88 },
        time * 6 - index,
      );
    case 3:
      return averageColors(
        { h: 0, s: 0, l: 88 },
        { h: 0, s: 0, l: 88 },
        time * 6 - index,
      );
    case 4:
      return averageColors(
        { h: 0, s: 0, l: 88 },
        { h: 33, s: 63, l: 90 },
        time * 6 - index,
      );
    case 5:
    case 6:
      return averageColors(
        { h: 231, s: 15, l: 18 },
        { h: 231, s: 15, l: 18 },
        time * 6 - index,
      );
    default:
      return "#e0e0e0";
  }
}

// Averages two HSL colors (better method than RGB)
function averageColors(c1: HSLColor, c2: HSLColor, percent: number): string {
  const newColor = {
    h: c1.h + (c2.h - c1.h) * percent,
    s: c1.s + (c2.s - c1.s) * percent,
    l: c1.l + (c2.l - c1.l) * percent,
  };
  return `hsl(${newColor.h}, ${newColor.s}%, ${newColor.l}%)`;
}

function getShadowAngleFromTime(time: number): { v: number; w: number } {
  return {
    v: Math.sin(time * Math.PI * 2),
    w: Math.cos(time * Math.PI * 2),
  };
}

// returns a percentage of the current elapsed time since 12am on the current day
function getCurrentDayPercentage(): number {
  let now = new Date();
  let midnight = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    0,
    0,
    0,
    0,
  );
  let elapsed = now.getTime() - midnight.getTime();
  const percent = Math.round((elapsed / (1000 * 60 * 60 * 24)) * 1e3) / 1e3;
  console.log("[LOG] Current day percentage: " + percent);
  return percent;
}

export function initialize(interval: number = 15000) {
  updateCurrentDayPercentage();
  setInterval(updateCurrentDayPercentage, interval);
}

// Automatically updates time, unless locked by user
function updateCurrentDayPercentage() {
  if (_isLocked) return;
  currentDayPercentage.set(getCurrentDayPercentage());
}

export function generateStylesheet(l: LightingConditions): string {
  const // mirrors along l.vertical axis
  vx = -l.v;
  const // mirrors along horizontal axis
  wx = -l.w;

  // Generate scrollbar colors based on light/dark
  const scrollbar = l.isLight
    ? `
		--scrollbar-lightest: ${tinycolor(l.color).darken(10).toHexString()};
		--scrollbar-light: ${tinycolor(l.color).darken(10).toHexString()};
		--scrollbar-dark: ${tinycolor(l.color).darken(15).toHexString()};
		--scrollbar-darkest: ${tinycolor(l.color).darken(10).toHexString()};
	`
    : `
		--scrollbar-lightest: ${tinycolor(l.color).lighten(10).toHexString()};
		--scrollbar-light: ${tinycolor(l.color).lighten(10).toHexString()};
		--scrollbar-dark: ${tinycolor(l.color).lighten(15).toHexString()};
		--scrollbar-darkest: ${tinycolor(l.color).lighten(10).toHexString()};
	`;
  
  // Generate color l.variations based on gil.ven color
  return `
		--background: ${tinycolor(l.color).toHexString()};
		--background-transparent: ${tinycolor(l.color).toHexString()}00;
		--background-lighter: ${tinycolor(l.color).lighten(4).toHexString()};
		--background-darker: ${tinycolor(l.color).darken(12).toHexString()};

		--border-primary: ${tinycolor(l.color).lighten(5).toHexString()};
		--border-secondary: ${tinycolor(l.color).lighten(2).toHexString()};

		${scrollbar}

		--nm-shadow-md-primary: ${shadow(vx, wx, 6, "md")} var(--background-lighter);
		--nm-shadow-md-secondary: ${shadow(l.v, l.w, 6, "md")} var(--background-darker);
	
		--nm-shadow-sm-primary: ${shadow(vx, wx, 3, "sm")} var(--background-lighter);
		--nm-shadow-sm-secondary: ${shadow(l.v, l.w, 3, "sm")} var(--background-darker);

		--text-color: ${l.isLight ? "#555" : "#f8f8f2"};
		--text-muted: ${
    l.isLight
      ? tinycolor(l.color).darken(25).toHexString()
      : tinycolor(l.color).lighten(45).toHexString()
  };
		--text-accent: ${
    l.isLight
      ? tinycolor(l.color).darken(25).toHexString()
      : tinycolor(l.color).lighten(30).toHexString()
  };
		
		--border-radius: 10px;
		--border-radius-sm: 5px;
	`;
}

function shadow(v: number, w: number, m: number, sz: "md" | "sm") {
  return `${v * m}px ${w * m}px var(--nm-spread-${sz})`;
}
