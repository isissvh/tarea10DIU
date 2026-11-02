import Icon from "./Icon.jsx";

function Topbar({ breadcrumbItems, navigateFromBreadcrumb, noticeOpen, setNoticeOpen, profileMenuOpen, setProfileMenuOpen, profile, changeView }) {
  return (
    <header className="topbar">
          <nav className="breadcrumb" aria-label="Migas de pan">
            {breadcrumbItems.map((item, index) => <span className="breadcrumb-item" key={`${item.label}-${index}`}>
              {index > 0 && <Icon name="chevron" size={14} />}
              {item.view && index < breadcrumbItems.length - 1
                ? <button onClick={() => navigateFromBreadcrumb(item.view)}>{item.label}</button>
                : <strong aria-current="page">{item.label}</strong>}
            </span>)}
          </nav>
          <div className="topbar-actions">
            <div className="top-action-wrap">
              <button className={"icon-button " + (noticeOpen ? "pressed" : "")} aria-label="Notificaciones" onClick={() => { setNoticeOpen(!noticeOpen); setProfileMenuOpen(false); }}>
                <Icon name="bell" />
                <span className="notification-dot" />
              </button>
              {noticeOpen && <div className="floating-popover notification-popover"><div className="popover-title">Notificaciones</div><div className="empty-notice"><span className="notice-check"><Icon name="check" size={16} /></span><div><strong>Estás al día</strong><p>Te avisaremos cuando haya novedades sobre tus prácticas.</p></div></div></div>}
            </div>
            <div className="top-action-wrap">
              <button className="profile-trigger" onClick={() => { setProfileMenuOpen(!profileMenuOpen); setNoticeOpen(false); }} aria-expanded={profileMenuOpen}>
                <span className="avatar">JP</span><span className="profile-trigger-copy"><strong>{profile.name}</strong><small>Estudiante</small></span><Icon name="down" size={15} />
              </button>
              {profileMenuOpen && <div className="floating-popover profile-popover"><button onClick={() => { changeView("profile"); setProfileMenuOpen(false); }}><Icon name="home" size={16} /> Ver mi perfil</button></div>}
            </div>
          </div>
        </header>
  );
}

export default Topbar;
