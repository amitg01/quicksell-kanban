import Badge from "../shared/Badge";

const Tags = ({ tags }) => {
  if (!tags?.length) return null;
  return (
    <div className="tags">
      {tags.map((tag) => (
        <Badge key={tag} text={tag} />
      ))}
    </div>
  );
};

export default Tags;
