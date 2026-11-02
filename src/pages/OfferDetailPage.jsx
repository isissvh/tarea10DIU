import Icon from "../components/Icon.jsx";
import CompanyMark from "../components/CompanyMark.jsx";
import { companyDetails } from "../data/practices.js";

function OfferDetailPage({ offer, saved, postulation, onSave, onBack, onPostulate, onGoTracking }) {
  return (
    <section className="offer-detail-page">
      <button className="back-link" onClick={onBack}><Icon name="arrow" size={16} /> Volver a resultados</button>
      <div className="detail-page-heading">
        <div className="detail-company-head"><CompanyMark {...offer} size="large" /><div><span className="company-name">{offer.company}</span><span className="company-sector">{offer.area}</span></div></div>
        <button className={"bookmark-action detail-bookmark-action " + (saved ? "saved" : "")} onClick={onSave} aria-label={saved ? "Quitar de guardadas" : "Guardar práctica"} aria-pressed={saved} title={saved ? "Quitar de guardadas" : "Guardar práctica"}><Icon name="bookmark" size={22} /><span>{saved ? "Guardada" : "Guardar"}</span></button>
      </div>
      <h1 className="detail-title">{offer.title}</h1>
      <div className="detail-match"><span><Icon name="spark" size={15} /> {offer.match}% compatible con tu perfil</span><span>Publicada el {offer.posted}</span></div>
      <div className="detail-tags">{offer.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
      <div className="detail-page-grid">
        <div className="detail-main-column">
          <div className="detail-stats">
            <div><span><Icon name="pin" size={16} /> Ubicación</span><strong>{offer.location}</strong><small>{offer.region}</small></div>
            <div><span><Icon name="building" size={16} /> Modalidad</span><strong>{offer.modality}</strong><small>{offer.schedule}</small></div>
            <div><span><Icon name="clock" size={16} /> Duración</span><strong>{offer.duration}</strong><small>Cierre: {offer.closing}</small></div>
            <div><span><Icon name="spark" size={16} /> Asignación mensual</span><strong>{offer.stipend}</strong><small>Sueldo mensual referencial</small></div>
          </div>
          <div className="detail-section"><h3>Sobre esta práctica</h3><p>{offer.description}</p></div>
          <div className="detail-section"><h3>Lo que buscamos</h3><ul className="requirement-list">{offer.requirements.map((requirement) => <li key={requirement}><span className="list-check"><Icon name="check" size={13} /></span>{requirement}</li>)}</ul></div>
          <div className="detail-section"><h3>Sobre {offer.company}</h3><p>{companyDetails[offer.company]?.description || "Conoce el equipo y las tareas asociadas a esta práctica."}</p></div>
        </div>
        <aside className="detail-aside">
          <div className="enroll-callout"><div className="eyebrow">POSTULACIÓN</div><h2>¿Te interesa esta práctica?</h2><p>Envía una solicitud de ingreso. La inscripción de prácticas se registra por separado desde el menú Inscripciones.</p>{postulation ? <><div className="postulation-status-pill">Estado de la postulación: <strong>Enviada</strong></div><button className="primary-button full-width" onClick={onGoTracking}>Ver seguimiento <Icon name="arrow" size={17} /></button></> : <button className="primary-button full-width" onClick={onPostulate}>Postular a esta práctica <Icon name="arrow" size={17} /></button>}</div>
        </aside>
      </div>
    </section>
  );
}

export default OfferDetailPage;
