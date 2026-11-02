import { useEffect, useState } from "react";
import Icon from "../components/Icon.jsx";
import CompanyMark from "../components/CompanyMark.jsx";
import EmptyState from "../components/EmptyState.jsx";

function LogbookPage({ applications: items, selectedId: preferredId, entries, setEntries, onExplore }) {
  const [selectedId, setSelectedId] = useState(preferredId ?? items[0]?.id ?? "");
  const [entryText, setEntryText] = useState("");
  const [entryDate, setEntryDate] = useState(() => new Date().toISOString().slice(0, 10));
  useEffect(() => {
    if (preferredId != null) setSelectedId(preferredId);
    else if (!items.some((item) => String(item.id) === String(selectedId))) setSelectedId(items[0]?.id ?? "");
  }, [preferredId, items, selectedId]);
  const selectedPractice = items.find((item) => String(item.id) === String(selectedId)) || items[0];
  const visibleEntries = entries.filter((entry) => String(entry.applicationId) === String(selectedPractice?.id));
  const addEntry = (event) => {
    event.preventDefault();
    if (!selectedPractice || !entryText.trim()) return;
    setEntries((previous) => [{ id: Date.now(), applicationId: selectedPractice.id, date: entryDate, text: entryText.trim() }, ...previous]);
    setEntryText("");
  };
  return (
    <>
      <section className="welcome-row compact-welcome"><div><div className="eyebrow">REGISTRO DE ACTIVIDADES</div><h1>Bitácora de práctica</h1><p>Deja constancia de tus avances, aprendizajes y tareas realizadas.</p></div></section>
      {selectedPractice ? <section className="logbook-layout">
        <div className="logbook-main">
          <div className="logbook-practice-card"><CompanyMark {...selectedPractice} size="large" /><div><strong>{selectedPractice.title}</strong><span>{selectedPractice.company} · {selectedPractice.location}</span></div><span className="application-status"><span className="status-dot" />Inscripción registrada</span></div>
          {items.length > 1 && <label className="logbook-select">Práctica<select value={selectedId} onChange={(event) => setSelectedId(items.find((item) => String(item.id) === event.target.value)?.id ?? "")}>{items.map((item) => <option key={item.id} value={item.id}>{item.company} · {item.title}</option>)}</select></label>}
          <form className="logbook-form" onSubmit={addEntry}><div className="section-title-row"><div><h2>Nueva entrada</h2><p>Registra tareas, avances y aprendizajes de tu práctica.</p></div></div><label>Fecha<input type="date" value={entryDate} onChange={(event) => setEntryDate(event.target.value)} required /></label><label>Actividad y aprendizaje<textarea rows="5" value={entryText} onChange={(event) => setEntryText(event.target.value)} placeholder="¿Qué hiciste hoy? ¿Qué aprendiste?" required /></label><button className="primary-button" type="submit">Guardar entrada <Icon name="arrow" size={16} /></button></form>
        </div>
        <aside className="logbook-history"><div className="section-title-row"><div><h2>Entradas <span className="count-pill">{visibleEntries.length}</span></h2><p>Actividad registrada</p></div></div>
          {visibleEntries.length ? <div className="log-entry-list">{visibleEntries.map((entry) => <article className="log-entry" key={entry.id}><span className="log-entry-date"><Icon name="clock" size={14} />{entry.date}</span><p>{entry.text}</p></article>)}</div> : <div className="logbook-empty"><span className="empty-state-icon"><Icon name="book" size={20} /></span><strong>Tu bitácora está vacía</strong><p>Guarda una entrada para comenzar el registro de esta práctica.</p></div>}
        </aside>
      </section> : <EmptyState title="Tu bitácora aparecerá al inscribirte" description="Registra una práctica desde Inscripciones para comenzar a guardar actividades." action="Explorar prácticas" onAction={onExplore} />}
    </>
  );
}

export default LogbookPage;
