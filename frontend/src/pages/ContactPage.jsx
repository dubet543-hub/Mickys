import { useState } from 'react';
import { Building2, Mail, MapPin, Phone, User } from 'lucide-react';
import { SectionHeader } from '../components/ui';

const CONTACT_CARDS = [
  { icon: <Phone size={22} />, value: '+91 92719 73474', label: 'Sales & general enquiries' },
  { icon: <Mail size={22} />, value: 'contact@mickys.in', label: 'Sales enquiry' },
  { icon: <Mail size={22} />, value: 'support@mickys.in', label: 'Customer support' },
  { icon: <User size={22} />, value: 'Manoj Yadav', label: 'Sales Manager · Centre Point Food Pvt Ltd' },
];

export function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [sent, setSent] = useState(false);

  function handleChange(e) {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <main className="pageSurface noPad contactPage">

      <section className="contactHeroSection">
        <div className="contactHeroInner">
          <p className="tag">Contact Us</p>
          <h2>Let's talk <span className="contactHeroAccent">business.</span></h2>
          <p>Sales enquiries, partnership discussions and bulk orders — we're here to help your kitchen run better.</p>
        </div>
        <div className="contactHeroStats">
          <div>
            <strong>+91 92719 73474</strong>
            <span>Call us directly</span>
          </div>
          <div className="contactStatsDivider" aria-hidden="true" />
          <div>
            <strong>contact@mickys.in</strong>
            <span>Sales enquiry</span>
          </div>
          <div className="contactStatsDivider" aria-hidden="true" />
          <div>
            <strong>Nagpur, Maharashtra</strong>
            <span>Based in India</span>
          </div>
        </div>
      </section>

      <section className="section contactInfoSection">
        <SectionHeader label="Get in Touch" title="Every way to reach us" />
        <div className="contactInfoGrid">
          {CONTACT_CARDS.map(card => (
            <article className="contactInfoCard" key={card.value}>
              <div className="contactInfoIcon">{card.icon}</div>
              <strong>{card.value}</strong>
              <span>{card.label}</span>
            </article>
          ))}
        </div>
      </section>

      <section className="section contactFormSection">
        <div className="contactFormGrid">
          <div className="contactFormSide">
            <p className="tag">Send a Message</p>
            <h2>Tell us about your kitchen.</h2>
            <p>We respond to all enquiries within one business day.</p>
            {sent ? (
              <div className="contactSuccessBox">
                <strong>Message sent!</strong>
                <p>Our sales team will get back to you shortly.</p>
              </div>
            ) : (
              <form className="contactForm" onSubmit={handleSubmit}>
                <div className="formRow">
                  <input name="name" value={form.name} onChange={handleChange} placeholder="Your name" required />
                  <input name="phone" type="tel" value={form.phone} onChange={handleChange} placeholder="Phone number" />
                </div>
                <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="Email address" required />
                <textarea name="message" value={form.message} onChange={handleChange} placeholder="Tell us about your kitchen and requirements..." rows={5} required />
                <button type="submit" className="primaryButton solid">Send Enquiry</button>
              </form>
            )}
          </div>

          <div className="contactAddressSide">
            <p className="tag">Our Locations</p>
            <h2>Find us in Nagpur.</h2>
            <div className="addressCards">
              <article className="addressCard">
                <div className="contactInfoIcon"><Building2 size={20} /></div>
                <div>
                  <strong>Corporate Office</strong>
                  <address>Hotel Centre Point, 24 Central Bazar Road,<br />Ramdaspeth, Nagpur, Maharashtra 440010</address>
                </div>
              </article>
              <article className="addressCard">
                <div className="contactInfoIcon"><MapPin size={20} /></div>
                <div>
                  <strong>Manufacturing Unit</strong>
                  <address>FP-55 & FP-56, Five Star Industrial Area,<br />Butibori MIDC, Nagpur (Rural), Maharashtra 441122</address>
                </div>
              </article>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
