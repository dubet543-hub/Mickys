import { useId } from 'react';
import { ChevronDown } from 'lucide-react';

export function SectionHeader({ label, title, text }) {
  return (
    <div className="sectionHeader">
      <p className="tag">{label}</p>
      <h2>{title}</h2>
      {text && <p>{text}</p>}
    </div>
  );
}

export function Feature({ icon, title, text }) {
  return (
    <article className="featureCard">
      {icon}
      <h3>{title}</h3>
      <p>{text}</p>
    </article>
  );
}

export function Stat({ number, label }) {
  return (
    <div className="statCard">
      <strong>{number}</strong>
      <span>{label}</span>
    </div>
  );
}

export function Step({ number, title, text }) {
  return (
    <article className="stepCard">
      <span>{number}</span>
      <h3>{title}</h3>
      <p>{text}</p>
    </article>
  );
}

export function RecipeCard({ recipe }) {
  return (
    <article className="recipeCard">
      <img src={recipe.image} alt={recipe.title} />
      <div>
        <span>{recipe.time}</span>
        <h3>{recipe.title}</h3>
        <p>{recipe.text}</p>
      </div>
    </article>
  );
}

export function Accordion({ title, open, onToggle, children }) {
  const panelId = useId();

  return (
    <div className={`accordion ${open ? 'open' : ''}`}>
      <button type="button" onClick={onToggle} aria-expanded={open} aria-controls={panelId}>
        {title} <ChevronDown size={18} aria-hidden="true" />
      </button>
      {open && <p id={panelId}>{children}</p>}
    </div>
  );
}

export function CheckoutBlock({ title, children }) {
  return (
    <section className="checkoutBlock">
      <h2>{title}</h2>
      {children}
    </section>
  );
}
