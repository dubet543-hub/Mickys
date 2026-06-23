import { WHY_CHOOSE } from '../data/siteData';
import { SectionHeader } from './ui';
import { ChefHat, IndianRupee, PackageCheck, ShieldCheck, ShoppingBag, Zap } from 'lucide-react';

const WHY_ICONS = {
  'YOU ARE IN CHARGE': ChefHat,
  'SMART SAVINGS': IndianRupee,
  RELIABILITY: ShieldCheck,
  EFFICIENCY: Zap,
  'LOWER EQUIPMENT COST': PackageCheck,
  'REDUCED STORAGE': ShoppingBag,
};

export function WhyChooseSection() {
  return (
    <section className="section whySection">
      <span className="whyBgWord" aria-hidden="true">MICKY'S</span>
      <div className="whySectionInner">
        <div className="whyCopy">
          <SectionHeader
            label="Why Choose Micky's"
            title="Designed for kitchens that move fast."
            text="Micky's gives chefs a dependable ready-to-cook base, so daily prep becomes lighter without losing control over taste, plating or menu style."
          />
          <div className="whyCopyHighlights" aria-label="Micky's highlights">
            <span>Fast prep</span>
            <span>Cost control</span>
            <span>Chef-led finish</span>
          </div>
        </div>

        <div className="whyList">
          {WHY_CHOOSE.map((item, index) => (
            <WhyListItem item={item} index={index} key={item.title} />
          ))}
        </div>
      </div>
    </section>
  );
}

function WhyListItem({ item, index }) {
  const Icon = WHY_ICONS[item.title] || ShieldCheck;

  return (
    <article className="whyListItem">
      <span className="whyIndex">{String(index + 1).padStart(2, '0')}</span>
      <div className="whyListIcon" aria-hidden="true">
        <Icon size={34} strokeWidth={2.3} />
      </div>
      <div className="whyListText">
        <h3>{item.title}</h3>
        <p>{item.text}</p>
        <ul>
          {item.points.map((point) => <li key={point}>{point}</li>)}
        </ul>
      </div>
    </article>
  );
}
