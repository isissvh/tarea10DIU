import { useState } from "react";
import Icon from "../components/Icon.jsx";
import CompanyMark from "../components/CompanyMark.jsx";
import DocumentTile from "../components/DocumentTile.jsx";

function EnrollmentPage({ offer, profile, onBack, onSubmit }) {
  const [draft, setDraft] = useState({
    title: offer?.title || "",
    company: offer?.company || "",
    area: offer?.area || "",
    location: offer?.location || "",
    studentName: profile.name,
    studentEmail: profile.email,
    supervisorName: "",
    supervisorEmail: "",
    startDate: "2026-12-01",
    endDate: "2027-02-28",
    modality: offer?.modality || "Presencial",
    schedule: offer?.schedule || "",
    stipend: offer?.stipend || "",
  });
  const [documents, setDocuments] = useState({ acceptance: false, regularity: false });
  const update = (key, value) => setDraft((current) => ({ ...current, [key]: value }));
  const submit = (event) => {
    event.preventDefault();
    onSubmit({ ...draft, documents, submittedAt: "Hoy" });
  };
  const toggleDocument = (key) => setDocuments((current) => ({ ...current, [key]: !current[key] }));

  return (
    <section className="enrollment-page">
      <button className="back-link" onClick={onBack}><Icon name="arrow" size={16} /> Volver a inscripciones</button>
      <div className="enrollment-heading"><div className="eyebrow">INSCRIPCIÓN DE PRÁCTICA</div><h1>Completa los antecedentes</h1><p>Registra una práctica publicada aquí o gestionada directamente con una empresa.</p></div>
      <div className="enrollment-layout">
        <form className="enrollment-form" onSubmit={submit}>
          <div className="enrollment-summary"><CompanyMark company={draft.company || "Práctica"} initials={(draft.company || "PR").slice(0, 2).toUpperCase()} color={offer?.color || "blue"} /><div><strong>{draft.title || "Nueva práctica"}</strong><span>{draft.company || "Ingresa la empresa"}{draft.location ? ` · ${draft.location}` : ""}</span></div></div>
          <section className="form-section">
            <div className="form-section-heading"><span className="section-number">01</span><div><h2>Datos de la práctica y empresa</h2><p>{offer ? "Confirma la oportunidad seleccionada." : "Puedes registrar aquí una práctica externa al portal."}</p></div></div>
            <div className="form-grid"><label>Nombre de la práctica<input value={draft.title} onChange={(event) => update("title", event.target.value)} required /></label><label>Empresa<input value={draft.company} onChange={(event) => update("company", event.target.value)} required /></label><label>Área de práctica<input value={draft.area} onChange={(event) => update("area", event.target.value)} required /></label><label>Ubicación<input value={draft.location} onChange={(event) => update("location", event.target.value)} /></label></div>
          </section>
          <section className="form-section">
            <div className="form-section-heading"><span className="section-number">02</span><div><h2>Persona supervisora</h2><p>Contacto referencial para el seguimiento.</p></div></div>
            <div className="form-grid"><label>Nombre del supervisor/a<input value={draft.supervisorName} onChange={(event) => update("supervisorName", event.target.value)} required /></label><label>Correo de contacto<input type="email" value={draft.supervisorEmail} onChange={(event) => update("supervisorEmail", event.target.value)} required /></label></div>
          </section>
          <section className="form-section">
            <div className="form-section-heading"><span className="section-number">03</span><div><h2>Fechas y condiciones</h2><p>Confirma la jornada acordada para tu práctica.</p></div></div>
            <div className="form-grid"><label>Fecha de inicio<input type="date" value={draft.startDate} onChange={(event) => update("startDate", event.target.value)} required /></label><label>Fecha de término<input type="date" value={draft.endDate} onChange={(event) => update("endDate", event.target.value)} required /></label><label>Modalidad<select value={draft.modality} onChange={(event) => update("modality", event.target.value)}><option>Híbrida</option><option>Presencial</option><option>Remota</option></select></label><label>Jornada<input value={draft.schedule} onChange={(event) => update("schedule", event.target.value)} required /></label><label>Sueldo / asignación mensual<input value={draft.stipend} readOnly /></label><label>Estudiante<input value={draft.studentName} onChange={(event) => update("studentName", event.target.value)} required /></label><label>Correo institucional<input type="email" value={draft.studentEmail} onChange={(event) => update("studentEmail", event.target.value)} required /></label></div>
          </section>
          <section className="form-section">
            <div className="form-section-heading"><span className="section-number">04</span><div><h2>Documentos requeridos</h2><p>Los adjuntos se muestran como vista previa.</p></div></div>
            <div className="document-grid">
              <DocumentTile title="Carta de aceptación" description="PDF · firmada por la empresa" attached={documents.acceptance} onToggle={() => toggleDocument("acceptance")} />
              <DocumentTile title="Certificado de alumno regular" description="Emitido por la universidad" attached={documents.regularity} onToggle={() => toggleDocument("regularity")} />
            </div>
          </section>
          <div className="form-submit-row"><p><Icon name="check" size={15} /> La inscripción y sus datos se guardan solo en este navegador.</p><button className="primary-button" type="submit">Enviar inscripción <Icon name="arrow" size={17} /></button></div>
        </form>
        <aside className="enrollment-status-panel">
          <div className="eyebrow">PANEL DE SEGUIMIENTO</div><h2>Estado de la práctica</h2><div className="status-current"><span className="status-dot" /> Borrador de inscripción</div>
          <ol className="status-timeline"><li className="current"><span className="timeline-marker">1</span><div><strong>Antecedentes</strong><small>Completa la información de la práctica</small></div></li><li><span className="timeline-marker">2</span><div><strong>Documentos</strong><small>Revisa los documentos requeridos</small></div></li><li><span className="timeline-marker">3</span><div><strong>Revisión</strong><small>Coordinación de prácticas</small></div></li><li><span className="timeline-marker">4</span><div><strong>Confirmación</strong><small>Estado final de la inscripción</small></div></li></ol>
        </aside>
      </div>
    </section>
  );
}

export default EnrollmentPage;
