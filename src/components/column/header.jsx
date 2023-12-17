const ColumnHeader = ({ title, ticketsCount }) => {
  return (
    <div className="column-header">
      <div className="titleBox">
        <p>i</p>
        <p className="title">{title}</p>
        <p>{ticketsCount}</p>
      </div>
      <div className="ctaBox">
        <p>+</p>
        <p>-</p>
      </div>
    </div>
  );
};

export default ColumnHeader;
