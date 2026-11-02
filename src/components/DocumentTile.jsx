import Icon from "./Icon.jsx";

function DocumentTile({ title, description, attached, onToggle }) {
  return (
    <div className={"document-tile " + (attached ? "attached" : "")}>
      <span className="document-icon"><Icon name={attached ? "check" : "bookmark"} size={17} /></span>
      <div><strong>{title}</strong><small>{attached ? "Documento adjunto · vista previa" : description}</small></div>
      <button type="button" className="outline-button" onClick={onToggle}>{attached ? "Quitar" : "Simular adjunto"}</button>
    </div>
  );
}

export default DocumentTile;
