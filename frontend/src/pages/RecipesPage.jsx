import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { APPLICATIONS } from '../data/siteData';
import './home-cinematic.css';

function ApplicationCard({ app, open, onToggle }) {
  const hasMethod = Array.isArray(app.method) && app.method.length > 0;

  return (
    <article className={`appCard ${open ? 'open' : ''}`}>
      <div className="appCard-head">
        <div className="appCard-title">
          <h3>{app.title}</h3>
          <span className="appCard-count">{app.dishes.length} dishes</span>
        </div>
        <p className="appCard-summary">{app.summary}</p>
      </div>

      {/* Fixed-height scroll area keeps every card the same size, whether it
          has 2 dishes or 20, open or closed. */}
      <div className="appCard-body">
        <div className="appCard-dishes">
          {app.dishes.map((dish) => (
            <span key={dish} className="dishChip">{dish}</span>
          ))}
        </div>

        {open && hasMethod && (
          <ol className="appCard-steps">
            {app.method.map((step, i) => (
              <li key={i}>{step}</li>
            ))}
          </ol>
        )}
      </div>

      {hasMethod && (
        <button
          type="button"
          className="appCard-toggle"
          onClick={onToggle}
          aria-expanded={open}
        >
          {open ? 'Hide cooking method' : 'View cooking method'}
          <ChevronDown size={18} aria-hidden="true" />
        </button>
      )}
    </article>
  );
}

export function RecipesPage() {
  const [openId, setOpenId] = useState(null);

  return (
    <main className="appsPage">
      <section className="cn-section appsStepsSection">
        <div className="appsHead">
          <span className="cn-kicker">Simple Process</span>
          <h2 className="cn-h2">Ready in <em>3 easy steps</em></h2>
        </div>
        <div className="appsStepsGrid">
          <div className="appsStep">
            <span>01</span>
            <h3>Open the Pouch</h3>
            <p>Tear open the retort pouch with no refrigeration or prep mess.</p>
          </div>
          <div className="appsStep">
            <span>02</span>
            <h3>Temper and Finish</h3>
            <p>Your chef adds fresh tadka, cream, regional spicing and finishing technique.</p>
          </div>
          <div className="appsStep">
            <span>03</span>
            <h3>Plate and Serve</h3>
            <p>Same dish, same taste, restaurant-grade quality your customers recognise.</p>
          </div>
        </div>
      </section>

      <section className="cn-section applicationsSection">
        <div className="appsHead">
          <span className="cn-kicker">One Base, Endless Dishes</span>
          <h2 className="cn-h2">What you can <em>make</em></h2>
          <p className="appsLede">
            Every chef-crafted base is built for versatility. Pick a base, follow the method, and run
            an entire section of your menu from a single pouch.
          </p>
        </div>
        <div className="applicationsGrid">
          {APPLICATIONS.map((app) => (
            <ApplicationCard
              key={app.id}
              app={app}
              open={openId === app.id}
              onToggle={() => setOpenId((cur) => (cur === app.id ? null : app.id))}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
