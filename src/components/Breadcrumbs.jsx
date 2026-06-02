import { Link } from "react-router-dom";

export default function Breadcrumbs({ items, light = false }) {
  return (
    <nav aria-label="Breadcrumb" className={`text-sm ${light ? "text-white/78" : "text-stone-600"}`}>
      <ol className="flex flex-wrap items-center gap-2">
        {items.map((item, index) => (
          <li key={item.href || item.label} className="flex items-center gap-2">
            {item.href && index !== items.length - 1 ? (
              <Link className={`font-semibold underline-offset-4 hover:underline ${light ? "text-white" : "text-forest"}`} to={item.href}>
                {item.label}
              </Link>
            ) : (
              <span aria-current={index === items.length - 1 ? "page" : undefined}>{item.label}</span>
            )}
            {index < items.length - 1 && <span aria-hidden="true">/</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}
