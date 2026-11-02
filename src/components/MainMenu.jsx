import Icon from "./Icon.jsx";
import { navItems } from "../data/practices.js";

function MainMenu({ activeNavView, changeView, postulations, enrollments }) {
  return (
    <aside className="sidebar">
        <button className="brand" onClick={() => changeView("offers")} aria-label="Ir al inicio">
          <span className="brand-symbol"><span>p</span></span>
          <span className="brand-copy"><strong>prácticas<span>DI</span></strong><small>Departamento de Informática</small></span>
        </button>
        <div className="sidebar-rule" />
        <div className="nav-caption">MENÚ PRINCIPAL</div>
        <nav className="main-nav" aria-label="Navegación principal">
          {navItems.map((item) => (
            <button key={item.id} className={"nav-link " + (activeNavView === item.id ? "active" : "")} onClick={() => changeView(item.id)} aria-label={item.label} title={item.label} aria-current={activeNavView === item.id ? "page" : undefined}>
              <Icon name={item.icon} /><span>{item.label}</span>
              {item.id === "applications" && postulations.length > 0 && <span className="nav-count">{postulations.length}</span>}
              {item.id === "enrollments" && enrollments.length > 0 && <span className="nav-count">{enrollments.length}</span>}
            </button>
          ))}
        </nav>
        <div className="sidebar-bottom"><div className="sidebar-foot"><span className="status-dot" /> Portal de prácticas <span>·</span> UTFSM</div></div>
      </aside>
  );
}

export default MainMenu;
