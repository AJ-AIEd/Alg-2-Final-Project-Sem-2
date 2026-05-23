export const HISTORY_LABELS = [
  "'04",
  "'05",
  "'06",
  "'07",
  "'08",
  "'09",
  "'10",
  "'11",
  "'12",
  "'13",
  "'14",
  "'15",
  "'16",
  "'17",
  "'18",
  "'19",
  "'20",
  "'21",
  "'22",
  "'23",
  "'24",
  "'25",
];

export const HISTORY_LEVELS = [
  78, 82, 88, 85, 90, 62, 55, 80, 84, 86, 80, 58, 52, 75, 80, 85, 82, 79, 56, 30, 12, 80,
];

export const HISTORY_EL_NINO = [
  false,
  false,
  false,
  false,
  false,
  true,
  true,
  false,
  false,
  false,
  false,
  true,
  true,
  false,
  false,
  false,
  false,
  false,
  false,
  true,
  true,
  false,
];
export const HISTORY_DANGER_LINE = HISTORY_LABELS.map(() => 20);

export const LINEAR_LABELS = ["Apr 11", "Apr 18", "Apr 22", "Apr 29", "May 21", "Jun", "Jul", "Aug"];
export const LINEAR_ACTUAL = [16.5, 14.9, 16.1, 17.1, 25.0, 28, 32, 34];
export const LINEAR_MODEL = [16.5, 14.9, 13.7, 11.0, 8.3, 4.3, null, null];
export const LINEAR_TRUE_BOTTOM = 10.5;
export const LINEAR_TRUE_BOTTOM_LINE = LINEAR_LABELS.map(() => LINEAR_TRUE_BOTTOM);

export const FULL_LABELS = [
  "Mar 30",
  "Apr 11",
  "May",
  "Jun",
  "Aug",
  "Oct",
  "Dec",
  "Feb 25",
  "Apr 25",
  "May 25",
  "Jun 25",
  "Jul 25",
];

export const FULL_LEVELS = [39, 16.5, 25, 28, 34, 38, 39, 40.4, 42, 60, 70, 89.7];
export const FULL_DANGER_THRESHOLD = 20;
export const FULL_DANGER_THRESHOLD_LINE = FULL_LABELS.map(() => FULL_DANGER_THRESHOLD);

export const ENTRY_CRISIS_LABELS = ["Jan 1", "Mar 4", "Apr 9", "Apr 11", "Apr 15"];
export const ENTRY_CRISIS_LEVELS = [40, 22.75, 18.78, 16.32, 15];
export const ENTRY_CRISIS_DANGER_LINE = ENTRY_CRISIS_LABELS.map(() => 20);
export const ENTRY_RATIONING_START_INDEX = 3;
export const ENTRY_CRISIS_NOTES = [
  "Jan 1 is an approximate reported starting level: Acueducto later said Chingaza was received at around 40% capacity.",
  "Mar 4 and Apr 9 values are reported by Infobae from EAAB communication: 22.75% to 18.78%.",
  "Apr 11 value is from Bogotá city public reporting: Chingaza at 16.32% when rationing began.",
  "Apr 15 value is from AP reporting: Chingaza around 15%, its lowest level ever at that point.",
  "No recovery data is shown in this entry graph. Lines connect reported points; missing days are not daily measurements.",
];
