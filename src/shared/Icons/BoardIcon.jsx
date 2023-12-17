import {
  PRIORITY_COLUMN_LABELS,
  PRIORITY_ICONS,
  STATUS_ICONS,
} from "../../constants";

import { useBoard } from "../../hooks/useBoard";
import { getInitials } from "../../utils";

const StatusIcon = ({ status }) => {
  const icon = STATUS_ICONS[status];
  return <div className="icon">{icon}</div>;
};

const PriorityIcon = ({ priorityName, priorityValue }) => {
  const priority = priorityValue || PRIORITY_COLUMN_LABELS[priorityName];
  const icon = PRIORITY_ICONS[priority];
  return <div className="icon">{icon}</div>;
};

const UserIcon = ({ name }) => {
  const initials = getInitials(name);
  return <div className="icon user-icon">{initials}</div>;
};

const HeaderIcon = ({ title }) => {
  const { groupBy } = useBoard();
  if (groupBy === "priority") return PriorityIcon({ priorityName: title });
  if (groupBy === "status") return StatusIcon({ status: title });
  if (groupBy === "user") return UserIcon({ name: title });
};

const CardIcon = ({ type, task }) => {
  const { groupBy } = useBoard();
  if (groupBy === type) return null;
  if (type === "priority")
    return PriorityIcon({ priorityValue: task.priority });
  if (type === "status") return StatusIcon({ status: task.status });
  if (type === "user") return UserIcon({ name: task.user.name });
};

const BoardIcon = () => {};

BoardIcon.HeaderIcon = HeaderIcon;
BoardIcon.CardIcon = CardIcon;

export default BoardIcon;
