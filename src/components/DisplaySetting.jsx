import { useState } from "react";

import { GROUP_BY_LABELS, SORT_BY_OPTIONS } from "../constants";
import { useBoard } from "../hooks/useBoard";
import Dropdown from "../shared/Dropdown";

const DisplaySetting = () => {
  const [showDisplaySetting, setShowDisplaySetting] = useState(false);
  const { sortBy, handleSortByChange, groupBy, handleGroupByChange } =
    useBoard();

  const onSortByChange = (e) => {
    setShowDisplaySetting(false);
    handleSortByChange(e);
  };

  const onGroupByChange = (e) => {
    setShowDisplaySetting(false);
    handleGroupByChange(e);
  };

  return (
    <div className="display_settings">
      <div
        onClick={() => setShowDisplaySetting(!showDisplaySetting)}
        className="flex display_settings_label"
      >
        <p>⚙️</p>
        <p>Display</p>
        <p className="show_more_btn">^</p>
      </div>
      {showDisplaySetting ? (
        <div className="filter_modal">
          <div className="flex-container">
            <p className="label">Grouping</p>
            <Dropdown
              onChange={onGroupByChange}
              value={groupBy}
              list={GROUP_BY_LABELS}
            />
          </div>
          <div className="flex-container mt">
            <p className="label">Ordering</p>
            <Dropdown
              onChange={onSortByChange}
              value={sortBy}
              list={SORT_BY_OPTIONS}
            />
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default DisplaySetting;
