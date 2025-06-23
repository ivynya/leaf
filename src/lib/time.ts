import tinycolor from 'tinycolor2';
import { writable } from 'svelte/store';
import type { HSLColor, LightingConditions } from '$lib/schema.ts';

const colors = [
	{ h: 212, s: 50, l: 15 },
	{ h: 38, s: 35, l: 83 },
	{ h: 28, s: 47, l: 87 },
	{ h: 10, s: 10, l: 88 },
	{ h: 33, s: 63, l: 90 }
];

// prevents automatic updates to time
export const isLocked = writable(false);
let _isLocked = false;
isLocked.subscribe((isLocked) => (_isLocked = isLocked));

export const currentDayPercentage = writable<number>(getCurrentDayPercentage());
export const currentLightingConditions = writable<LightingConditions>({
	color: '#e0e0e0',
	isLight: true,
	v: 0,
	w: 0
});
export const isLight = writable<boolean>(false);
export const stylesheet = writable<string>('');
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
			return averageColors(colors[0], colors[0], time * 6 - index);
		case 1:
			return averageColors(colors[1], colors[2], time * 6 - index);
		case 2:
			return averageColors(colors[2], colors[3], time * 6 - index);
		case 3:
			return averageColors(colors[3], colors[3], time * 6 - index);
		case 4:
			return averageColors(colors[3], colors[4], time * 6 - index);
		case 5:
		case 6:
			return averageColors(colors[0], colors[0], time * 6 - index);
		default:
			return '#e0e0e0';
	}
}

// Averages two HSL colors (better method than RGB)
function averageColors(c1: HSLColor, c2: HSLColor, percent: number): string {
	const newColor = {
		h: c1.h + (c2.h - c1.h) * percent,
		s: c1.s + (c2.s - c1.s) * percent,
		l: c1.l + (c2.l - c1.l) * percent
	};
	return `hsl(${newColor.h}, ${newColor.s}%, ${newColor.l}%)`;
}

function getShadowAngleFromTime(time: number): { v: number; w: number } {
	return {
		v: Math.sin(time * Math.PI * 2),
		w: Math.cos(time * Math.PI * 2)
	};
}

// returns a percentage of the current elapsed time since 12am on the current day
function getCurrentDayPercentage(): number {
	let now = new Date();
	let midnight = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0);
	let elapsed = now.getTime() - midnight.getTime();
	const percent = Math.round((elapsed / (1000 * 60 * 60 * 24)) * 1e3) / 1e3;
	console.log('[LOG] Current day percentage: ' + percent);
	return percent;
}

export function initialize(interval: number = 15000) {
	updateCurrentDayPercentage();
	setInterval(updateCurrentDayPercentage, interval);
}

// Automatically updates time, unless locked by user
export function updateCurrentDayPercentage() {
	if (_isLocked) return;
	currentDayPercentage.set(getCurrentDayPercentage());
}

function lighten(c: string, a: number): tinycolor.Instance {
	return tinycolor(c).lighten(a);
}
function darken(c: string, a: number): tinycolor.Instance {
	return tinycolor(c).darken(a);
}

// If light, darkens the color, and if dark, lightens the color
function modify(c: string, l: boolean, a: number): tinycolor.Instance {
	if (l) return tinycolor(c).darken(a);
	else return tinycolor(c).lighten(a);
}

export function generateStylesheet(l: LightingConditions): string {
	const vx = -l.v; // mirrors along l.vertical axis
	const wx = -l.w; // mirrors along horizontal axis

	const c = 1.5; // contrast multiplier for relevant colors

	// Generate color l.variations based on given color
	return `
		--bg: ${tinycolor(l.color).toHexString()};
		--bg-t8: ${tinycolor(l.color).toHexString()}88;
		--bg-t0: ${tinycolor(l.color).toHexString()}00;
		--bg-lighter-t9: ${lighten(l.color, 4).toHexString()}99;
		--bg-lighter-t5: ${lighten(l.color, 4).toHexString()}55;
		--bg-lighter: ${lighten(l.color, 4).toHexString()};
		--bg-light: ${lighten(l.color, 3).toHexString()};
		--bg-dark: ${darken(l.color, 4).toHexString()};
		--bg-darker: ${darken(l.color, l.isLight ? 12 : 6).toHexString()};
		--bg-darker-t5: ${darken(l.color, l.isLight ? 12 : 6).toHexString()}55;
		--bg-darker-t9: ${darken(l.color, l.isLight ? 12 : 6).toHexString()}99;

		--bd-primary: ${tinycolor(l.color).lighten(5).toHexString()};
		--bd-secondary: ${tinycolor(l.color).lighten(2).toHexString()};
		--bd-radius-lg: 15px;
		--bd-radius-md: 10px;
		--bd-radius-sm: 5px;

		--sb-lightest: ${modify(l.color, l.isLight, 10).toHexString()};
		--sb-light: ${modify(l.color, l.isLight, 10).toHexString()};
		--sb-dark: ${modify(l.color, l.isLight, 15).toHexString()};
		--sb-darkest: ${modify(l.color, l.isLight, 10).toHexString()};

		--nm-md-h-primary: ${shadow(vx, wx, 6, 'md')} var(--bg-lighter);
		--nm-md-h-secondary: ${shadow(l.v, l.w, 6, 'md')} var(--bg-darker);
		--nm-md-b-primary: ${shadow(vx, wx, 6, 'md')} var(--bg-lighter-t5);
		--nm-md-b-secondary: ${shadow(l.v, l.w, 6, 'md')} var(--bg-darker-t5);

		--nm-sm-h-primary: ${shadow(vx, wx, 3, 'sm')} var(--bg-lighter);
		--nm-sm-h-secondary: ${shadow(l.v, l.w, 3, 'sm')} var(--bg-darker);
		--nm-sm-hb-primary: ${shadow(vx, wx, 3, 'sm')} var(--bg-lighter-t9);
		--nm-sm-hb-secondary: ${shadow(l.v, l.w, 3, 'sm')} var(--bg-darker-t9);
		--nm-sm-b-primary: ${shadow(vx, wx, 3, 'sm')} var(--bg-lighter-t5);
		--nm-sm-b-secondary: ${shadow(l.v, l.w, 3, 'sm')} var(--bg-darker-t5);

		--tx: ${l.isLight ? '#555' : '#f8f8f2'};
		--tx-muted: ${l.isLight ? darken(l.color, 25).toHexString() : lighten(l.color, 45).toHexString()};
		--tx-accent: ${l.isLight ? darken(l.color, 25).toHexString() : lighten(l.color, 30).toHexString()};
	`;
}

function shadow(v: number, w: number, m: number, sz: 'md' | 'sm') {
	return `${v * m}px ${w * m}px var(--nm-spread-${sz})`;
}
