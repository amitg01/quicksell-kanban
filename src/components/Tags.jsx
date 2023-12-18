import Badge from "../shared/Badge";

const Tags = ({ tags }) => {
  if (!tags?.length) return null;
  return (
    <div className="tags">
      {tags.map((tag) => (
        <Badge key={tag} text={tag} icon="⚪" />
      ))}
    </div>
  );
};

export default Tags;
