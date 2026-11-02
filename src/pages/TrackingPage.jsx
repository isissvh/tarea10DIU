import { useState } from "react";
import Icon from "../components/Icon.jsx";
import CompanyMark from "../components/CompanyMark.jsx";
import EmptyState from "../components/EmptyState.jsx";

function TrackingPage({ postulations, enrollments, onOpenOffer, onOpenLogbook, onExplore }) {
  const [filter, setFilter] = useState([]);
  const practiceCount = new Set([...postulations, ...enrollments].map((item) => item.id)).size;
  return (
    <>
      <section className="welcome-row compact-welcome"><div><div className="eyebrow">ESTADO Y SEGUIMIENTO</div><h1>Seguimiento</h1><p>Consulta el estado de tus postulaciones y el avance de tus inscripciones.</p></div><div className="application-summary"><span className="summary-circle"><Icon name="send" size={19} /></span><span><strong>{practiceCount}</strong><small>Registros</small></span></div></section>
      <div className="tracking-filter" role="group" aria-label="Filtrar seguimiento">
        {[{ id: "todas", label: "Todas" }, { id: "postulaciones", label: `Postulaciones (${postulations.length})` }, { id: "inscripciones", label: `Inscripciones (${enrollments.length})` }].map((item) => <button key={item.id} type="button" className={(item.id === "todas" ? !filter.length : filter.includes(item.id)) ? "active" : ""} aria-pressed={(item.id === "todas" ? !filter.length : filter.includes(item.id))} onClick={() => setFilter((previous) => item.id === "todas" ? [] : previous.includes(item.id) ? previous.filter((id) => id !== item.id) : [...previous, item.id])}>{item.label}</button>)}
      </div>
      {(!filter.length || filter.includes("postulaciones")) && <section className="applications-panel tracking-section"><div className="section-title-row"><div><h2>Postulaciones <span className="count-pill">{postulations.length}</span></h2><p>Una postulación es una solicitud de ingreso. El estado se muestra como enviada mientras se espera respuesta.</p></div></div>
        {postulations.length ? <div className="tracking-list">{postulations.map((item) => <article className="tracking-card postulation-card" key={item.id}>
          <div className="tracking-card-head"><CompanyMark {...item} size="large" /><div className="application-main"><strong>{item.title}</strong><span>{item.company}{item.location ? ` · ${item.location}` : ""}</span></div><span className="application-status sent-status"><span className="status-dot" />Enviada</span><button className="details-button" onClick={() => onOpenOffer(item)}>Ver práctica <Icon name="arrow" size={15} /></button></div>
          <div className="tracking-card-foot"><span>Solicitud enviada {item.submittedAt}</span><span className="status-explanation">Esperando respuesta de la empresa</span></div>
        </article>)}</div> : <EmptyState title="Aún no has postulado" description="Envía una solicitud desde los detalles de una práctica. Aquí aparecerá su estado." action="Explorar prácticas" onAction={onExplore} />}
      </section>}
      {(!filter.length || filter.includes("inscripciones")) && <section className="applications-panel tracking-section"><div className="section-title-row"><div><h2>Inscripciones <span className="count-pill">{enrollments.length}</span></h2><p>Seguimiento de prácticas inscritas, sean del portal o externas.</p></div></div>
        {enrollments.length ? <div className="tracking-list">{enrollments.map((item) => <article className="tracking-card" key={item.id}>
          <div className="tracking-card-head"><CompanyMark {...item} size="large" /><div className="application-main"><strong>{item.title}</strong><span>{item.company}{item.location ? ` · ${item.location}` : ""}{item.isExternal && <em className="external-label">Externa al portal</em>}</span></div><span className="application-status"><span className="status-dot" />{item.status}</span>{!item.isExternal && <button className="details-button" onClick={() => onOpenOffer(item)}>Ver práctica <Icon name="arrow" size={15} /></button>}</div>
          <div className="tracking-progress"><div className="tracking-progress-head"><strong>Avance de inscripción</strong><span>Etapa 1 de 4</span></div><div className="progress-track"><span /></div><div className="tracking-steps"><span className="done"><Icon name="check" size={13} /> Enviada</span><span>Revisión de documentos</span><span>Coordinación</span><span>Confirmación</span></div></div>
          <div className="tracking-card-foot"><span>Enviada {item.submittedAt}</span><button className="outline-button" onClick={() => onOpenLogbook(item.id)}><Icon name="book" size={14} /> Abrir bitácora</button></div>
        </article>)}</div> : <div className="tracking-empty-inline">Todavía no hay inscripciones. Puedes registrar una práctica desde el menú Inscripciones, aunque no hayas postulado aquí.</div>}
      </section>}
    </>
  );
}

export default TrackingPage;
