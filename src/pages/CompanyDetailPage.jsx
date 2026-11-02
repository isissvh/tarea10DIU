import Icon from "../components/Icon.jsx";
import CompanyMark from "../components/CompanyMark.jsx";
import OfferCard from "../components/OfferCard.jsx";

function CompanyDetailPage({ company, savedIds, onToggleSaved, onBack, onOpenOffer, onViewOffers }) {
  return (
    <section className="company-detail-page">
      <button className="back-link" onClick={onBack}><Icon name="arrow" size={16} /> Volver a empresas</button>
      <div className="company-detail-main">
        <CompanyMark {...(company.offers[0] || { company: company.name, initials: company.name.slice(0, 2), color: "blue" })} size="large" />
        <div><div className="eyebrow">EMPRESA</div><h1>{company.name}</h1><div className="company-industry"><Icon name="building" size={16} />{company.details.industry}</div><p className="company-description">{company.details.description}</p></div>
        <button className="outline-button" onClick={onViewOffers}>Ver todas sus prácticas</button>
      </div>
      <div className="company-info-grid"><div className="company-info-box"><span>Sitio web</span><strong>{company.details.website}</strong></div><div className="company-info-box"><span>Prácticas disponibles</span><strong>{company.offers.length}</strong></div></div>
      <section className="company-offers-section"><div className="section-title-row"><div><h2>Prácticas en {company.name}</h2><p>Abre una oportunidad para revisar sus detalles y postular.</p></div></div>
        {company.offers.length ? <div className="offer-grid">{company.offers.map((offer) => <OfferCard key={offer.id} offer={offer} saved={savedIds.includes(offer.id)} onSave={() => onToggleSaved(offer.id)} onOpen={() => onOpenOffer(offer)} />)}</div> : <p>No hay prácticas disponibles por ahora.</p>}
      </section>
    </section>
  );
}

export default CompanyDetailPage;
