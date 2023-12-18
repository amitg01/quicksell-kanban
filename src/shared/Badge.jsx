const Badge = ({ text, icon, ...rest }) => {
  return (
    <p className="badge" {...rest}>
      {icon && <span className="badge_icon">{icon}</span>}
      {text}
    </p>
  );
};

export default Badge;
