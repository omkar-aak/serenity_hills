import { Link } from "react-router-dom";

export default function CTAButton({ href, children, variant = "primary", className = "", ...props }) {
  const base =
    "inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full px-5 py-3 text-center text-sm font-semibold leading-5 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 sm:w-auto";
  const styles = {
    primary: "bg-forest text-white shadow-lg shadow-black/10 hover:bg-forest-700 focus-visible:outline-forest",
    secondary: "border border-forest/25 bg-white text-forest hover:border-forest hover:bg-sand",
    sand: "bg-sand text-forest hover:bg-sand-700",
    dark: "bg-charcoal text-white hover:bg-black"
  };
  const cls = `${base} ${styles[variant]} ${className}`;

  if (href?.startsWith("http") || href?.startsWith("tel:") || href?.startsWith("mailto:")) {
    return (
      <a className={cls} href={href} {...props}>
        {children}
      </a>
    );
  }
  return (
    <Link className={cls} to={href} {...props}>
      {children}
    </Link>
  );
}
