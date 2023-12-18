const Badge = ({ text, ...rest }) => {
  return (
    <p className="badge" {...rest}>
      {text}
    </p>
  );
};

export default Badge;
