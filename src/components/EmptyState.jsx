import Icon from "./Icon.jsx";

function EmptyState({ title, description, action, onAction }) {
  return <div className="empty-state"><span className="empty-state-icon"><Icon name="search" size={22} /></span><h3>{title}</h3><p>{description}</p><button className="outline-button" onClick={onAction}>{action}</button></div>;
}

export default EmptyState;
