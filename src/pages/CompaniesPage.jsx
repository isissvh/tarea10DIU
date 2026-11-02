import MultiSelectFilter from "../components/MultiSelectFilter.jsx";
import Icon from "../components/Icon.jsx";
import CompanyMark from "../components/CompanyMark.jsx";
import EmptyState from "../components/EmptyState.jsx";

function CompaniesPage({ query, setQuery, industry, setIndustry, industries, companies: visibleCompanies, onOpenCompany, onViewOffers }) {
  const resetFilters = () => { setQuery(""); setIndustry([]); };
  return (
    <>
      <section className="welcome-row compact-welcome"><div><div className="eyebrow">DIRECTORIO</div><h1>Empresas con prácticas</h1><p>Revisa las organizaciones y las oportunidades disponibles.</p></div></section>
      <section className="company-directory">
        <div className="section-title-row"><div><h2>Directorio de empresas <span className="count-pill">{visibleCompanies.length}</span></h2><p>Información organizada para comparar oportunidades.</p></div></div>
        <div className="search-panel">
          <label className="main-search"><Icon name="search" size={19} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Buscar por nombre o industria..." aria-label="Buscar empresas" /></label>
          <MultiSelectFilter label="Industria" allLabel="Todas las industrias" options={industries} value={industry} onChange={setIndustry} />
          <button className="filter-button" onClick={resetFilters}><span className="filter-glyph">☷</span> Limpiar</button>
        </div>
        {visibleCompanies.length ? <div className="company-list">{visibleCompanies.map((company) => {
          const sampleOffer = company.offers[0];
          return <article className="company-row-card clickable-card" key={company.name} role="link" tabIndex={0} aria-label={`Ver detalles de ${company.name}`} onClick={() => onOpenCompany(company)} onKeyDown={(event) => { if (event.target === event.currentTarget && (event.key === "Enter" || event.key === " ")) { event.preventDefault(); onOpenCompany(company); } }}>
            <CompanyMark {...(sampleOffer || { company: company.name, initials: company.name.slice(0, 2), color: "blue" })} size="large" />
            <div className="company-row-main"><div className="company-row-heading"><h3>{company.name}</h3><span className="industry-label">{company.details.industry}</span></div><p>{company.details.description}</p></div>
            <div className="company-row-actions"><span className="openings-pill">{company.offers.length} {company.offers.length === 1 ? "vacante" : "vacantes"}</span><button className="details-button" onClick={(event) => { event.stopPropagation(); onOpenCompany(company); }}>Ver detalles <Icon name="arrow" size={15} /></button><button className="outline-button" onClick={(event) => { event.stopPropagation(); onViewOffers(company.name); }}>Ver prácticas</button></div>
          </article>;
        })}</div> : <EmptyState title="No encontramos esa empresa" description="Prueba con otro nombre o industria, o limpia los filtros para ver todas las empresas." action="Limpiar filtros" onAction={resetFilters} />}
      </section>
    </>
  );
}

export default CompaniesPage;
