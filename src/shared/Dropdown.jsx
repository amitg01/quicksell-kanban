const Dropdown = ({ onChange, value, list }) => {
  return (
    <div className="dropdown_container">
      <select className="dropdown" onChange={onChange} value={value}>
        {Object.keys(list).map((key) => (
          <option key={key} value={list[key]}>
            {list[key]}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
