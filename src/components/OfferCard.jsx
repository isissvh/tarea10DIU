import Icon from "./Icon.jsx";
import CompanyMark from "./CompanyMark.jsx";

function OfferCard({ offer, saved, onSave, onOpen }) {
  return (
    <article className="offer-card offer-row-card clickable-card" role="link" tabIndex={0} aria-label={`Ver detalles de ${offer.title}`} onClick={onOpen} onKeyDown={(event) => { if (event.target === event.currentTarget && (event.key === "Enter" || event.key === " ")) { event.preventDefault(); onOpen(); } }}>
      <CompanyMark {...offer} size="large" />
      <div className="offer-row-main">
        <div className="offer-card-heading"><span className="offer-card-company">{offer.company}</span><span className="posted-date">Publicada {offer.posted}</span></div>
        <h3>{offer.title}</h3>
        <p className="offer-short-description">{offer.description}</p>
        <div className="offer-tags">{offer.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
      </div>
      <div className="offer-row-meta">
        <span className="offer-match-badge"><Icon name="spark" size={14} /> {offer.match}% compatible</span>
        <span className="offer-fact"><Icon name="pin" size={15} /> {offer.location}</span>
        <span className="offer-fact"><Icon name="clock" size={15} /> {offer.modality}</span>
        <strong className="stipend">{offer.stipend} <small>/ mes</small></strong>
      </div>
      <div className="offer-row-actions">
        <button className={"bookmark-action " + (saved ? "saved" : "")} onClick={(event) => { event.stopPropagation(); onSave(); }} aria-label={saved ? "Quitar de guardadas" : "Guardar práctica"} aria-pressed={saved} title={saved ? "Quitar de guardadas" : "Guardar práctica"}>
          <Icon name="bookmark" size={21} />
        </button>
        <button className="details-button" onClick={(event) => { event.stopPropagation(); onOpen(); }}>Ver detalles <Icon name="arrow" size={15} /></button>
      </div>
    </article>
  );
}

export default OfferCard;
