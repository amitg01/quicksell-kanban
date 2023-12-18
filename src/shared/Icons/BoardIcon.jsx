import {
  PRIORITY_COLUMN_LABELS,
  PRIORITY_ICONS,
  STATUS_ICONS,
} from "../../constants";

import { useBoard } from "../../hooks/useBoard";
import { getInitials } from "../../utils";

const StatusIcon = ({ status, ...rest }) => {
  const icon = STATUS_ICONS[status];
  return (
    <div className="icon" {...rest}>
      {icon}
    </div>
  );
};

const PriorityIcon = ({ priorityName, priorityValue, ...rest }) => {
  const priority = priorityValue ?? PRIORITY_COLUMN_LABELS[priorityName];
  const icon = PRIORITY_ICONS[priority];
  return (
    <div className="icon" {...rest}>
      {icon}
    </div>
  );
};

const UserIcon = ({ name, ...rest }) => {
  const initials = getInitials(name);
  return (
    <div className="icon user-icon" {...rest}>
      {initials}
    </div>
  );
};

const HeaderIcon = ({ title, ...rest }) => {
  const { groupBy } = useBoard();
  if (groupBy === "priority")
    return PriorityIcon({ priorityName: title, ...rest });
  if (groupBy === "status") return StatusIcon({ status: title, ...rest });
  if (groupBy === "user") return UserIcon({ name: title, ...rest });
};

const CardIcon = ({ type, task, ...rest }) => {
  const { groupBy } = useBoard();
  if (groupBy === type) return null;
  if (type === "priority")
    return PriorityIcon({ priorityValue: task.priority, ...rest });
  if (type === "status") return StatusIcon({ status: task.status, ...rest });
  if (type === "user") return UserIcon({ name: task.user.name, ...rest });
};

const BoardIcon = () => {};

BoardIcon.HeaderIcon = HeaderIcon;
BoardIcon.CardIcon = CardIcon;

export default BoardIcon;
