export const PRIORITY = {
  URGENT: 4,
  HIGH: 3,
  MEDIUM: 2,
  LOW: 1,
  NO_PRIORITY: 0,
};

export const PRIORITY_COLUMN_LABELS = {
  "No Priority": PRIORITY.NO_PRIORITY,
  Urgent: PRIORITY.URGENT,
  High: PRIORITY.HIGH,
  Medium: PRIORITY.MEDIUM,
  Low: PRIORITY.LOW,
};

export const GROUP_BY_LABELS = {
  PRIORITY: "priority",
  STATUS: "status",
  USER: "user",
};

export const SORT_BY_OPTIONS = {
  TITLE: "title",
  PRIORITY: "priority",
};

export const STATUS_GROUPS = [
  "Backlog",
  "Todo",
  "In progress",
  "Done",
  "Cancelled",
];
