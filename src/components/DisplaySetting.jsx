import { useState } from "react";

import { GROUP_BY_LABELS, SORT_BY_OPTIONS } from "../constants";
import { useBoard } from "../hooks/useBoard";
import Dropdown from "../shared/Dropdown";

const DisplaySetting = () => {
  const [showDisplaySetting, setShowDisplaySetting] = useState(false);
  const { sortBy, handleSortByChange, groupBy, handleGroupByChange } =
    useBoard();

  return (
    <div className="display_settings">
      <div
        onClick={() => setShowDisplaySetting(!showDisplaySetting)}
        className="flex display_settings_label"
      >
        <p>⚙️</p>
        <p>Display</p>
        <p
          style={{
            transform: "rotateX(180deg)",
            fontSize: "1.4rem",
            marginBottom: ".4rem",
            color: "#575759",
            fontWeight: "800",
          }}
        >
          ^
        </p>
      </div>
      {showDisplaySetting ? (
        <div
          className="filter_modal"
          onBlur={() => setShowDisplaySetting(false)}
        >
          <div className="flex-container">
            <p className="label">Grouping</p>
            <Dropdown
              onChange={handleGroupByChange}
              value={groupBy}
              list={GROUP_BY_LABELS}
            />
          </div>
          <div className="flex-container mt">
            <p className="label">Ordering</p>
            <Dropdown
              onChange={handleSortByChange}
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
