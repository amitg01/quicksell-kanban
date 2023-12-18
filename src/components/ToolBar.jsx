import { GROUP_BY_LABELS, SORT_BY_OPTIONS } from "../constants";
import { useBoard } from "../hooks/useBoard";

const ToolBar = () => {
  const { sortBy, handleSortByChange, groupBy, handleGroupByChange } =
    useBoard();
  return (
    <div className="toolBar">
      <div>
        <select id="groupBy" onChange={handleGroupByChange} value={groupBy}>
          {Object.keys(GROUP_BY_LABELS).map((key) => (
            <option key={key} value={GROUP_BY_LABELS[key]}>
              {GROUP_BY_LABELS[key]}
            </option>
          ))}
        </select>
      </div>
      <div>
        <select id="sortBy" onChange={handleSortByChange} value={sortBy}>
          {Object.keys(SORT_BY_OPTIONS).map((key) => (
            <option key={key} value={SORT_BY_OPTIONS[key]}>
              {SORT_BY_OPTIONS[key]}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default ToolBar;
