import { useEffect, useState } from "react";
import Icon from "../components/Icon.jsx";
import { storeProfileCv } from "../services/profileFiles.js";
import { readProfileCv } from "../services/profileFiles.js";

function ProfilePage({ profile, setProfile, editing, setEditing, onExplore }) {
  const [draft, setDraft] = useState({
    ...profile,
    interestsText: (profile.interests || []).join(", "),
    skillsText: (profile.skills || []).join(", "),
    cvFile: null,
  });
  const [cvFileAvailable, setCvFileAvailable] = useState(false);
  const [cvError, setCvError] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  useEffect(() => {
    let active = true;
    readProfileCv().then((file) => {
      if (!active) return;
      setCvFileAvailable(Boolean(file));
      if (!file && profile.cvName === "CV_John_Python.pdf") {
        setProfile((current) => current.cvName === "CV_John_Python.pdf" ? { ...current, cvName: "" } : current);
      }
    }).catch(() => { if (active) setCvFileAvailable(false); });
    return () => { active = false; };
  }, [profile.cvName, setProfile]);
  const update = (key, value) => setDraft((current) => ({ ...current, [key]: value }));
  const saveProfile = async (event) => {
    event.preventDefault();
    setCvError("");
    setIsSaving(true);
    try {
      if (draft.cvFile) await storeProfileCv(draft.cvFile);
      setProfile({
        name: draft.name,
        email: draft.email,
        career: draft.career,
        institution: draft.institution,
        interests: draft.interestsText.split(",").map((item) => item.trim()).filter(Boolean),
        skills: draft.skillsText.split(",").map((item) => item.trim()).filter(Boolean),
        cvName: draft.cvFile?.name || draft.cvName,
      });
      if (draft.cvFile) setCvFileAvailable(true);
      setEditing(false);
    } catch {
      setCvError("No pudimos guardar el CV en este navegador. Revisa el espacio disponible e intenta nuevamente.");
    } finally {
      setIsSaving(false);
    }
  };
  const downloadCv = async () => {
    setCvError("");
    try {
      const file = await readProfileCv();
      if (!file) {
        setCvError("Selecciona un archivo de CV para guardarlo en este navegador.");
        setEditing(true);
        return;
      }
      const url = URL.createObjectURL(file);
      const link = document.createElement("a");
      link.href = url;
      link.download = file.name || profile.cvName || "curriculum";
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.setTimeout(() => URL.revokeObjectURL(url), 1000);
    } catch {
      setCvError("No se pudo abrir el CV guardado en este navegador.");
    }
  };
  return (
    <>
      <section className="welcome-row compact-welcome"><div><div className="eyebrow">TU INFORMACIÓN</div><h1>Mi perfil</h1><p>Actualiza tus datos personales, intereses, habilidades y currículum.</p></div></section>
      <section className="profile-layout">
        <div className="profile-card"><div className="profile-card-banner"><div className="profile-large-avatar">JP</div></div>{editing ? <form className="profile-edit-form" onSubmit={saveProfile}>
          <label>Nombre completo<input value={draft.name} onChange={(event) => update("name", event.target.value)} required /></label>
          <label>Correo institucional<input type="email" value={draft.email} onChange={(event) => update("email", event.target.value)} required /></label>
          <label>Carrera<input value={draft.career} onChange={(event) => update("career", event.target.value)} required /></label>
          <label>Institución<input value={draft.institution} onChange={(event) => update("institution", event.target.value)} required /></label>
          <label>Intereses <small>Separa cada interés con una coma.</small><input value={draft.interestsText} onChange={(event) => update("interestsText", event.target.value)} placeholder="Datos, desarrollo..." /></label>
          <label>Habilidades <small>Separa cada habilidad con una coma.</small><input value={draft.skillsText} onChange={(event) => update("skillsText", event.target.value)} placeholder="Python, SQL..." /></label>
          <label className="cv-upload">Currículum<input type="file" accept=".pdf,.doc,.docx" onChange={(event) => { const file = event.target.files?.[0]; if (file) { update("cvFile", file); update("cvName", file.name); setCvError(""); } }} /><small>El archivo se guarda solo en este navegador; no se carga a una empresa.</small></label>
          {draft.cvFile && <p className="cv-selected">Archivo seleccionado: {draft.cvFile.name}</p>}
          {cvError && <p className="form-error" role="alert">{cvError}</p>}
          <div className="profile-edit-actions"><button className="primary-button" type="submit" disabled={isSaving}>{isSaving ? "Guardando…" : "Guardar perfil"}</button><button className="text-button" type="button" onClick={() => { setDraft({ ...profile, interestsText: (profile.interests || []).join(", "), skillsText: (profile.skills || []).join(", "), cvFile: null }); setCvError(""); setEditing(false); }}>Cancelar</button></div>
        </form> : <div className="profile-card-body"><button className="edit-profile-button" onClick={() => setEditing(true)}><Icon name="edit" size={15} /> Editar perfil</button><h2>{profile.name}</h2><p>{profile.email}</p><div className="profile-divider" /><div className="profile-field"><span>Carrera</span><strong>{profile.career}</strong></div><div className="profile-field"><span>Institución</span><strong>{profile.institution}</strong></div><div className="profile-tag-field"><span>Intereses</span><div className="detail-tags">{(profile.interests || []).map((item) => <span key={item}>{item}</span>)}</div></div><div className="profile-tag-field"><span>Habilidades</span><div className="detail-tags">{(profile.skills || []).map((item) => <span key={item}>{item}</span>)}</div></div><div className="cv-card"><span className="document-icon"><Icon name="book" size={17} /></span><div><strong>{profile.cvName ? "Currículum guardado" : "Currículum"}</strong><small>{profile.cvName || "Sin archivo seleccionado"}</small></div>{cvFileAvailable && <button className="outline-button" onClick={downloadCv}>Descargar</button>}<button className="outline-button" onClick={() => setEditing(true)}>Actualizar</button></div>{cvError && <p className="form-error" role="alert">{cvError}</p>}</div>}</div>
        <div className="profile-side"><div className="profile-completeness"><div className="profile-progress-head"><span>Perfil de estudiante</span><strong>Actualizable</strong></div><div className="progress-track"><span /></div><p>Guarda tus conocimientos e intereses para personalizar las prácticas que revisas.</p><button className="subtle-link" onClick={() => setEditing(true)}>Completar perfil <Icon name="arrow" size={15} /></button></div><div className="profile-opportunity"><div className="quick-icon lavender"><Icon name="spark" size={17} /></div><h3>Tu perfil puede abrirte puertas</h3><p>Revisa prácticas relacionadas con tus conocimientos e intereses.</p><button className="outline-button" onClick={onExplore}>Explorar prácticas</button></div></div>
      </section>
    </>
  );
}

export default ProfilePage;
