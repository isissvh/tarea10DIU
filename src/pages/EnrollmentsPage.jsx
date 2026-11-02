import Icon from "../components/Icon.jsx";
import CompanyMark from "../components/CompanyMark.jsx";
import EmptyState from "../components/EmptyState.jsx";

function EnrollmentsPage({ enrollments, onStartEnrollment, onOpenOffer, onOpenLogbook }) {
  return (
    <>
      <section className="welcome-row compact-welcome"><div><div className="eyebrow">REGISTRO DE PRÁCTICAS</div><h1>Inscripciones</h1><p>Registra prácticas gestionadas en el portal o directamente con una empresa.</p></div><button className="primary-button" onClick={onStartEnrollment}><Icon name="clipboard" size={16} /> Inscribir una práctica</button></section>
      <section className="applications-panel enrollment-hub-section"><div className="section-title-row"><div><h2>Prácticas inscritas <span className="count-pill">{enrollments.length}</span></h2><p>Las inscripciones son independientes de las postulaciones publicadas en el portal.</p></div></div>
        {enrollments.length ? <div className="tracking-list">{enrollments.map((item) => <article className="tracking-card" key={item.id}><div className="tracking-card-head"><CompanyMark {...item} size="large" /><div className="application-main"><strong>{item.title}</strong><span>{item.company}{item.location ? ` · ${item.location}` : ""}{item.isExternal && <em className="external-label">Externa al portal</em>}</span></div><span className="application-status"><span className="status-dot" />{item.status}</span>{!item.isExternal && <button className="details-button" onClick={() => onOpenOffer(item)}>Ver práctica <Icon name="arrow" size={15} /></button>}</div><div className="tracking-card-foot"><span>Enviada {item.submittedAt}</span><button className="outline-button" onClick={() => onOpenLogbook(item.id)}><Icon name="book" size={14} /> Abrir bitácora</button></div></article>)}</div> : <EmptyState title="Aún no has inscrito una práctica" description="Puedes registrar una práctica aunque no tenga una oferta publicada ni una postulación aprobada." action="Inscribir una práctica" onAction={onStartEnrollment} />}
      </section>
    </>
  );
}

export default EnrollmentsPage;
