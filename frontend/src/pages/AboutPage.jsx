import {
  Check, Package, Sparkles, Truck,
  Gauge, Users, Boxes, Timer, Trash2, ChefHat,
} from 'lucide-react';
import { TESTIMONIALS } from '../data/siteData';
import { Feature, SectionHeader, Stat } from '../components/ui';
import { WhyChooseSection } from '../components/WhyChooseSection';

const CHALLENGES = [
  { icon: <Gauge size={20} />, title: 'Inconsistent taste across shifts', text: 'Professionally balanced gravies deliver uniform taste, colour and texture in every service — regardless of who is cooking or when.' },
  { icon: <Users size={20} />, title: 'High labour dependency', text: 'Hours of slow-cooking are already done, cutting manpower and training load without leaning on a single star chef.' },
  { icon: <Boxes size={20} />, title: 'Storage complexity', text: 'Retort-sealed, shelf-stable bases simplify inventory and free up cold-storage for fresh produce.' },
  { icon: <Timer size={20} />, title: 'Time constraints at peak hours', text: 'Open, heat and plate in minutes — service keeps moving even when orders pile up faster than the line can prep.' },
  { icon: <Trash2 size={20} />, title: 'Raw material waste', text: 'Predictable portion control and zero waste protect both food cost and the bottom line.' },
  { icon: <ChefHat size={20} />, title: 'Loss of kitchen control', text: 'Kitchens keep full control over final execution while gaining speed, efficiency and food-cost stability.' },
];

const RANGE = [
  { icon: <Sparkles size={20} />, title: 'Indian base gravies', text: 'Makhani, kadhai, malabari, onion-tomato and more — the backbone of a high-volume Indian menu.' },
  { icon: <Package size={20} />, title: 'Signature sauces & dips', text: 'Chef-developed sauces and dips that add finish and character without extra prep.' },
  { icon: <Truck size={20} />, title: 'Ready-to-pour cooking bases', text: 'Versatile bases that help kitchens cook smarter, serve faster and stay consistent service to service.' },
];

export function AboutPage() {
  return (
    <main className="pageSurface aboutPage">
      {/* ── Story / intro ───────────────────────────── */}
      <section className="storySection aboutStory">
        <div className="storyBgWord" aria-hidden="true">MICKY'S</div>
        <div className="storyImage">
          <img src="https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?w=1100&q=80" alt="Fresh Indian cooking ingredients" />
          <div className="storyBadge">100%<span>Natural Ingredients</span></div>
        </div>
        <div className="storyCopy">
          <p className="tag">About Micky’s</p>
          <h2>Chef-crafted reliability for commercial kitchens.</h2>
          <p>
            Micky’s by CP Foods is a professional Ready-to-Cook gravy range born in
            the kitchens of Centre Point Hospitality, backed by over four decades of
            hands-on experience in food and hospitality.
          </p>
          <p>
            Designed for hotels, restaurants, cloud kitchens, caterers and QSRs,
            Micky’s brings chef-crafted reliability to commercial kitchens where
            consistency, speed and cost control matter most.
          </p>
        </div>
        <div className="featuresGrid aboutStoryFeatures">
          <Feature icon={<Sparkles size={20} />} title="100% Natural" text="No artificial colours, flavours or additives." />
          <Feature icon={<Package size={20} />} title="Ready to Cook" text="Reduce mise-en-place time, training load and inventory pressure." />
          <Feature icon={<Truck size={20} />} title="No Preservatives" text="Service-tested products with dependable long shelf life." />
          <Feature icon={<Check size={20} />} title="Advanced Retort Technology" text="Uniform taste, colour and texture from service to service." />
        </div>
      </section>

      {/* ── Stats ───────────────────────────────────── */}
      <section className="statsSection homeStatsSection">
        <Stat number="1985" label="Serving Guests Since" />
        <Stat number="40+" label="Years In Hospitality" />
        <Stat number="100%" label="Kitchen Control" />
        <Stat number="0" label="Wastage In Service" />
      </section>

      {/* ── Challenges Micky's solves ───────────────── */}
      <section className="section">
        <SectionHeader
          label="Built for pressure"
          title="The problems professional kitchens face"
          text="In high-pressure food operations, inconsistent taste, labour dependency, storage complexity, peak-hour time constraints and raw material waste directly impact profitability and the guest experience. Micky’s is built to solve each one."
        />
        <div className="featuresGrid aboutChallengeGrid">
          {CHALLENGES.map((c) => (
            <Feature key={c.title} icon={c.icon} title={c.title} text={c.text} />
          ))}
        </div>
      </section>

      {/* ── How it works in the kitchen ─────────────── */}
      <section className="section">
        <SectionHeader
          label="Refined in live kitchens"
          title="Built to make every service easier"
          text="Developed and refined in live hotel kitchens, Micky’s gravies significantly reduce mise-en-place time, manpower and training load, and inventory requirements — while offering predictable portion control and zero waste. Kitchens retain full control over final execution while gaining speed, operational efficiency and food-cost stability."
        />
      </section>

      <WhyChooseSection />

      {/* ── Credibility / Mickey Sir ────────────────── */}
      <section className="storySection aboutStory aboutCredibility">
        <div className="storyBgWord" aria-hidden="true">SINCE '85</div>
        <div className="storyCopy">
          <p className="tag">Our credibility</p>
          <h2>Not lab-designed food. Performance-tested in real kitchens.</h2>
          <p>
            Since 1985, our kitchens have served thousands of guests daily, and every
            product reflects this service-tested expertise. Micky’s gravies were
            developed and refined in live hotel kitchens — performance-driven solutions
            built for scale and reliability.
          </p>
          <p>
            Named after our Managing Director, fondly known as Mickey Sir, the brand
            stands for discipline, authenticity and innovation rooted in tradition.
          </p>
        </div>
        <div className="storyImage">
          <img src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=1100&q=80" alt="Professional kitchen in service" />
          <div className="storyBadge">Est.<span>1985</span></div>
        </div>
      </section>

      {/* ── Product range ───────────────────────────── */}
      <section className="section">
        <SectionHeader
          label="The range"
          title="Everything a professional kitchen needs"
          text="Micky’s product range is designed to help professional kitchens cook smarter, serve faster and maintain consistency from service to service."
        />
        <div className="featuresGrid">
          {RANGE.map((r) => (
            <Feature key={r.title} icon={r.icon} title={r.title} text={r.text} />
          ))}
        </div>
      </section>

      {/* ── Testimonials ────────────────────────────── */}
      <section className="section testimonialsSection">
        <SectionHeader label="Credibility" title="Service-tested expertise from real kitchens" />
        <div className="testimonialsGrid">
          {TESTIMONIALS.map(([name, city, quote]) => (
            <article className="testimonialCard" key={name}>
              <div className="stars">★★★★★</div>
              <p>"{quote}"</p>
              <strong>{name}</strong>
              <span>{city}</span>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
