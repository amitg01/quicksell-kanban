import BoardIcon from "../../shared/Icons/BoardIcon";

const ColumnHeader = ({ title, ticketsCount }) => {
  return (
    <div className="column-header">
      <div className="titleBox">
        <BoardIcon.HeaderIcon title={title} />
        <p className="title">{title}</p>
        <p className="tickets_count">{ticketsCount}</p>
      </div>
      <div className="ctaBox">
        <p>+</p>
        <p className="settings-btn">⚙️</p>
      </div>
    </div>
  );
};

export default ColumnHeader;
