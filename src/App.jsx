import { useEffect, useLayoutEffect, useMemo, useState } from "react";
import Icon from "./components/Icon.jsx";
import OffersPage from "./pages/OffersPage.jsx";
import OfferDetailPage from "./pages/OfferDetailPage.jsx";
import EnrollmentPage from "./pages/EnrollmentPage.jsx";
import CompaniesPage from "./pages/CompaniesPage.jsx";
import CompanyDetailPage from "./pages/CompanyDetailPage.jsx";
import TrackingPage from "./pages/TrackingPage.jsx";
import EnrollmentsPage from "./pages/EnrollmentsPage.jsx";
import LogbookPage from "./pages/LogbookPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import usePersistentState from "./hooks/usePersistentState.js";
import MainMenu from "./components/MainMenu.jsx";
import Topbar from "./components/Topbar.jsx";
import { offers, companyDetails } from "./data/practices.js";

function App() {
  const [activeView, setActiveView] = useState("offers");

  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [activeView]);

  const [query, setQuery] = useState("");
  const [industry, setIndustry] = useState("");
  const [area, setArea] = useState("Todas las áreas");
  const [location, setLocation] = useState("Todas las comunas");
  const [sort, setSort] = useState("Compatibilidad");
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [detailReturnView, setDetailReturnView] = useState("offers");
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [savedIds, setSavedIds] = usePersistentState("practicas-di-saved", []);
  const [postulations, setPostulations] = usePersistentState("practicas-di-postulations", []);
  const [enrollments, setEnrollments] = usePersistentState("practicas-di-enrollments", []);
  const [logEntries, setLogEntries] = usePersistentState("practicas-di-logbook", []);
  const [logbookSelectedId, setLogbookSelectedId] = useState(null);
  const [noticeOpen, setNoticeOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [toast, setToast] = useState("");
  const [profile, setProfile] = usePersistentState("practicas-di-profile", {
    name: "John Python",
    email: "john.python@usm.cl",
    career: "Ingeniería Civil Informática",
    institution: "Universidad Técnica Federico Santa María",
    interests: ["Desarrollo de software", "Datos y analítica"],
    skills: ["Python", "SQL", "React"],
    cvName: "",
  });
  const [editingProfile, setEditingProfile] = useState(false);
  useEffect(() => {
    if (postulations.some((item) => item.status !== "Enviada")) {
      setPostulations((previous) => previous.map((item) => ({ ...item, status: "Enviada" })));
    }
  }, [postulations, setPostulations]);

  const filteredOffers = useMemo(() => {
    const needle = query.trim().toLocaleLowerCase("es");
    let result = offers.filter((offer) => {
      const searchable = [offer.title, offer.company, offer.area, offer.location, offer.region, offer.modality, ...offer.tags]
        .join(" ")
        .toLocaleLowerCase("es");
      const matchesQuery = !needle || searchable.includes(needle);
      const matchesArea = area === "Todas las áreas" || offer.area === area;
      const matchesLocation = location === "Todas las comunas" || offer.location === location;
      const matchesSaved = activeView !== "saved" || savedIds.includes(offer.id);
      return matchesQuery && matchesArea && matchesLocation && matchesSaved;
    });
    if (sort === "Compatibilidad") result = [...result].sort((a, b) => b.match - a.match);
    if (sort === "Más recientes") result = [...result].sort((a, b) => b.posted.localeCompare(a.posted));
    if (sort === "Cierre más próximo") result = [...result].sort((a, b) => a.closing.localeCompare(b.closing));
    return result;
  }, [query, area, location, sort, activeView, savedIds]);

  const companies = useMemo(() => {
    const needle = query.trim().toLocaleLowerCase("es");
    return Object.keys(companyDetails)
      .map((name) => {
        const companyOffers = offers.filter((offer) => offer.company === name);
        return { name, details: companyDetails[name], offers: companyOffers };
      })
      .filter((company) => !industry || company.details.industry === industry)
      .filter((company) => !needle || (company.name + " " + company.details.industry).toLocaleLowerCase("es").includes(needle));
  }, [query, industry]);

  const showToast = (message) => {
    setToast(message);
    window.setTimeout(() => setToast(""), 2800);
  };

  const changeView = (view) => {
    if (view === activeView) {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }
    setActiveView(view);
    setSelectedOffer(null);
    setSelectedCompany(null);
    setNoticeOpen(false);
    setProfileMenuOpen(false);
    setQuery("");
    setArea("Todas las áreas");
    setLocation("Todas las comunas");
    setSort("Compatibilidad");
  };

  const runQuickSearch = (term) => {
    setActiveView("offers");
    setArea("Todas las áreas");
    setLocation("Todas las comunas");
    setQuery(term);
  };

  const toggleSaved = (id) => {
    const alreadySaved = savedIds.includes(id);
    setSavedIds(alreadySaved ? savedIds.filter((savedId) => savedId !== id) : [...savedIds, id]);
    showToast(alreadySaved ? "Práctica quitada de guardadas" : "Práctica guardada");
  };

  const openOffer = (offer) => {
    if (activeView !== "offerDetail" && activeView !== "enrollment") setDetailReturnView(activeView);
    setSelectedOffer(offer);
    setActiveView("offerDetail");
  };

  const openCompany = (company) => {
    setSelectedCompany(company);
    setActiveView("companyDetail");
    setProfileMenuOpen(false);
  };

  const postulate = () => {
    if (!selectedOffer) return;
    if (postulations.some((item) => item.id === selectedOffer.id)) {
      setSelectedOffer(null);
      setActiveView("applications");
      showToast("Ya postulaste a esta práctica");
      return;
    }
    setPostulations((previous) => [{ ...selectedOffer, submittedAt: "Hoy", status: "Enviada" }, ...previous]);
    setSelectedOffer(null);
    setActiveView("applications");
    showToast("Postulación enviada");
  };

  const openEnrollment = (offer = null) => {
    setSelectedOffer(offer);
    setDetailReturnView("enrollments");
    setActiveView("enrollment");
  };

  const openLogbook = (enrollmentId) => {
    setLogbookSelectedId(enrollmentId ?? null);
    setActiveView("logbook");
    setSelectedOffer(null);
    setSelectedCompany(null);
  };

  const submitEnrollment = (enrollment) => {
    const enrollmentId = `${selectedOffer ? `offer-${selectedOffer.id}` : "external"}-${Date.now()}`;
    const companyName = enrollment.company?.trim() || selectedOffer?.company || "Empresa";
    const record = {
      ...(selectedOffer || {}),
      ...enrollment,
      id: enrollmentId,
      offerId: selectedOffer?.id ?? null,
      title: enrollment.title?.trim() || selectedOffer?.title || "Práctica profesional",
      company: companyName,
      initials: selectedOffer?.initials || companyName.slice(0, 2).toUpperCase(),
      color: selectedOffer?.color || "blue",
      isExternal: !selectedOffer,
      submittedAt: "Hoy",
      status: "Inscripción enviada",
    };
    setEnrollments((previous) => [record, ...previous]);
    setSelectedOffer(null);
    setActiveView("enrollments");
    showToast("Inscripción registrada");
  };

  const titleByView = {
    offers: "Explorar prácticas",
    companies: "Empresas",
    saved: "Prácticas guardadas",
    applications: "Seguimiento",
    enrollments: "Inscripciones de práctica",
    profile: "Mi perfil",
    offerDetail: "Detalle de práctica",
    enrollment: "Inscripción de práctica",
    companyDetail: selectedCompany?.name || "Detalle de empresa",
    logbook: "Bitácora",
  };

  const activeNavView = activeView === "companyDetail"
    ? "companies"
    : activeView === "offerDetail"
      ? (detailReturnView === "companyDetail" ? "companies" : detailReturnView)
      : activeView === "enrollment"
        ? "enrollments"
        : activeView;
  const breadcrumbItems = (() => {
    const portal = { label: "Portal", view: "offers" };
    const crumbs = [portal];
    if (activeView === "offerDetail") {
      if (detailReturnView === "companyDetail") {
        crumbs.push({ label: "Empresas", view: "companies" });
        if (selectedCompany) crumbs.push({ label: selectedCompany.name, view: "companyDetail" });
      } else {
        const parent = detailReturnView === "saved" ? "saved" : detailReturnView === "applications" ? "applications" : "offers";
        crumbs.push({ label: titleByView[parent], view: parent });
      }
      crumbs.push({ label: titleByView.offerDetail });
    } else if (activeView === "companyDetail") {
      crumbs.push({ label: "Empresas", view: "companies" }, { label: selectedCompany?.name || "Empresa" });
    } else if (activeView === "enrollment") {
      crumbs.push({ label: "Inscripciones", view: "enrollments" }, { label: titleByView.enrollment });
    } else if (activeView === "logbook") {
      crumbs.push({ label: "Inscripciones", view: "enrollments" }, { label: titleByView.logbook });
    } else {
      crumbs.push({ label: titleByView[activeView] || "Prácticas" });
    }
    return crumbs;
  })();

  const navigateFromBreadcrumb = (view) => {
    if (view === "companyDetail" && selectedCompany) {
      setActiveView("companyDetail");
      setSelectedOffer(null);
      return;
    }
    changeView(view);
  };

  const resetFilters = () => {
    setQuery("");
    setArea("Todas las áreas");
    setLocation("Todas las comunas");
    setSort("Compatibilidad");
  };

  return (
    <div className="app-shell">
      <MainMenu activeNavView={activeNavView} changeView={changeView} postulations={postulations} enrollments={enrollments} />

      <div className="main-column">
        <Topbar breadcrumbItems={breadcrumbItems} navigateFromBreadcrumb={navigateFromBreadcrumb} noticeOpen={noticeOpen} setNoticeOpen={setNoticeOpen} profileMenuOpen={profileMenuOpen} setProfileMenuOpen={setProfileMenuOpen} profile={profile} changeView={changeView} />

        <main className="page-content">
          {activeView === "offers" && (
            <OffersPage
              query={query}
              setQuery={setQuery}
              area={area}
              setArea={setArea}
              location={location}
              setLocation={setLocation}
              sort={sort}
              setSort={setSort}
              offers={filteredOffers}
              savedIds={savedIds}
              onToggleSaved={toggleSaved}
              onOpenOffer={openOffer}
              onQuickSearch={runQuickSearch}
              onReset={resetFilters}
              onGoCompanies={() => changeView("companies")}
              onGoOffers={() => changeView("offers")}
            />
          )}
          {activeView === "saved" && (
            <OffersPage
              savedPage
              query={query}
              setQuery={setQuery}
              area={area}
              setArea={setArea}
              location={location}
              setLocation={setLocation}
              sort={sort}
              setSort={setSort}
              offers={filteredOffers}
              savedIds={savedIds}
              onToggleSaved={toggleSaved}
              onOpenOffer={openOffer}
              onQuickSearch={runQuickSearch}
              onReset={resetFilters}
              onGoCompanies={() => changeView("companies")}
              onGoOffers={() => changeView("offers")}
            />
          )}
          {activeView === "companies" && (
            <CompaniesPage
              query={query}
              setQuery={setQuery}
              industry={industry}
              setIndustry={setIndustry}
              industries={[...new Set(Object.values(companyDetails).map((company) => company.industry))].sort((a, b) => a.localeCompare(b, "es"))}
              companies={companies}
              onOpenCompany={openCompany}
              onViewOffers={(name) => { setSelectedCompany(null); setQuery(name); setActiveView("offers"); }}
            />
          )}
          {activeView === "companyDetail" && selectedCompany && <CompanyDetailPage company={selectedCompany} savedIds={savedIds} onToggleSaved={toggleSaved} onBack={() => changeView("companies")} onOpenOffer={openOffer} onViewOffers={() => { setSelectedCompany(null); setQuery(selectedCompany.name); setActiveView("offers"); }} />}
          {activeView === "offerDetail" && selectedOffer && <OfferDetailPage offer={selectedOffer} saved={savedIds.includes(selectedOffer.id)} postulation={postulations.find((item) => item.id === selectedOffer.id)} onSave={() => toggleSaved(selectedOffer.id)} onBack={() => { setSelectedOffer(null); setActiveView(detailReturnView); }} onPostulate={postulate} onGoTracking={() => changeView("applications")} />}
          {activeView === "enrollment" && <EnrollmentPage offer={selectedOffer} profile={profile} onBack={() => { setSelectedOffer(null); setActiveView("enrollments"); }} onSubmit={submitEnrollment} />}
          {activeView === "applications" && <TrackingPage postulations={postulations} enrollments={enrollments} onOpenOffer={openOffer} onOpenLogbook={openLogbook} onExplore={() => changeView("offers")} />}
          {activeView === "enrollments" && <EnrollmentsPage enrollments={enrollments} onStartEnrollment={() => openEnrollment()} onOpenLogbook={openLogbook} />}
          {activeView === "logbook" && <LogbookPage applications={enrollments} selectedId={logbookSelectedId} entries={logEntries} setEntries={setLogEntries} onExplore={() => changeView("offers")} />}
          {activeView === "profile" && (
            <ProfilePage
              profile={profile}
              setProfile={setProfile}
              editing={editingProfile}
              setEditing={setEditingProfile}
              onExplore={() => changeView("offers")}
            />
          )}
        </main>
        <footer className="page-footer"><span>Prácticas DI <span className="footer-dot">·</span> Departamento de Informática UTFSM</span></footer>
      </div>
      {toast && <div className="toast"><span className="toast-icon"><Icon name="check" size={15} /></span>{toast}</div>}
    </div>
  );
}

export default App;
