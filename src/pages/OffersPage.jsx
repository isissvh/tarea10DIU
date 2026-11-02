import Icon from "../components/Icon.jsx";
import OfferCard from "../components/OfferCard.jsx";
import EmptyState from "../components/EmptyState.jsx";

function OffersPage({ savedPage = false, query, setQuery, area, setArea, location, setLocation, sort, setSort, offers: visibleOffers, savedIds, onToggleSaved, onOpenOffer, onReset, onGoOffers }) {
  const hasFilters = query || area !== "Todas las áreas" || location !== "Todas las comunas";
  return (
    <>
      <section className="welcome-row">
        <div><div className="eyebrow">{savedPage ? "TU LISTA PERSONAL" : "OPORTUNIDADES PARA TI"}</div><h1>{savedPage ? "Prácticas que guardaste" : <>Hola, John <span className="wave">👋</span></>}</h1><p>{savedPage ? "Vuelve a revisar las oportunidades que te interesaron." : "Encuentra una práctica que conecte con lo que sabes y lo que quieres aprender."}</p></div>
        <div className="welcome-side"><div className="welcome-avatar">JP</div><div><span>Tu perfil</span><strong>Ing. Civil Informática</strong><small>UTFSM · 5.º año</small></div></div>
      </section>
      {!savedPage && (
        <section className="metric-row" aria-label="Resumen de oportunidades">
            <div className="metric-card"><span className="metric-icon blue-soft"><Icon name="search" size={17} /></span><div><small>Oportunidades abiertas</small><strong>8 <span>disponibles</span></strong></div><span className="metric-spark">↗</span></div>
          <div className="metric-card"><span className="metric-icon violet-soft"><Icon name="spark" size={17} /></span><div><small>Compatibles contigo</small><strong>5 <span>según tu perfil</span></strong></div><span className="metric-spark">↗</span></div>
          <div className="metric-card"><span className="metric-icon green-soft"><Icon name="clock" size={17} /></span><div><small>Próximos cierres</small><strong>8 <span>para revisar</span></strong></div><span className="metric-spark">↗</span></div>
        </section>
      )}
      <section className="offers-section">
        <div className="section-title-row offers-title"><div><div className="eyebrow">{savedPage ? "SELECCIÓN PERSONAL" : "VACANTES RECIENTES"}</div><h2>{savedPage ? "Tus prácticas guardadas" : "Prácticas para explorar"} <span className="count-pill">{visibleOffers.length}</span></h2><p>{savedPage ? "Abre el detalle para revisar requisitos o continuar." : "Ofertas con información clara para que puedas decidir con confianza."}</p></div><label className="sort-control"><span>Ordenar por</span><select value={sort} onChange={(event) => setSort(event.target.value)}><option>Compatibilidad</option><option>Más recientes</option><option>Cierre más próximo</option></select><Icon name="down" size={14} /></label></div>
        <div className="search-panel">
          <label className="main-search"><Icon name="search" size={19} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Cargo, empresa, tecnología..." aria-label="Buscar prácticas" /></label>
          <label className="filter-select"><span>Área</span><select value={area} onChange={(event) => setArea(event.target.value)}><option>Todas las áreas</option><option>Desarrollo de software</option><option>Datos y analítica</option><option>Calidad de software</option><option>Infraestructura y sistemas</option><option>Ciberseguridad</option></select><Icon name="down" size={14} /></label>
          <label className="filter-select"><span>Ubicación</span><select value={location} onChange={(event) => setLocation(event.target.value)}><option>Todas las comunas</option><option>Las Condes</option><option>Providencia</option><option>Santiago Centro</option><option>Viña del Mar</option></select><Icon name="down" size={14} /></label>
          <button className="filter-button" onClick={onReset}><span className="filter-glyph">☷</span> Limpiar</button>
        </div>
        <div className="result-meta"><span>{visibleOffers.length === 1 ? "1 resultado" : visibleOffers.length + " resultados"}{hasFilters && <span> para <strong>“{query || area !== "Todas las áreas" ? query || area : location}”</strong></span>}</span><span className="freshness">Oportunidades abiertas</span></div>
        {visibleOffers.length ? <div className="offer-grid">{visibleOffers.map((offer) => <OfferCard key={offer.id} offer={offer} saved={savedIds.includes(offer.id)} onSave={() => onToggleSaved(offer.id)} onOpen={() => onOpenOffer(offer)} />)}</div> : <EmptyState title={savedPage ? "Todavía no guardaste prácticas" : "No encontramos resultados"} description={savedPage ? "Guarda una oportunidad con el marcador para tenerla a mano." : "Prueba otra palabra o limpia los filtros para ver más oportunidades."} action={savedPage ? "Explorar prácticas" : "Limpiar búsqueda"} onAction={savedPage ? onGoOffers : onReset} />}
      </section>
    </>
  );
}

export default OffersPage;
