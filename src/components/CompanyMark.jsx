

function CompanyMark({ company, initials, color, size = "normal" }) {
  return <span className={"company-mark " + color + " " + size} aria-hidden="true">{initials || company.slice(0, 2).toUpperCase()}</span>;
}

export default CompanyMark;
