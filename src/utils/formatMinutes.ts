export const fmtMinutes = (mins: number) => {
	const h = Math.floor(mins / 60);
	const m = mins % 60;
	return `${h}h ${m}m`;
};
