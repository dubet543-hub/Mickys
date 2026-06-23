import { Mail, Globe } from 'lucide-react';

const SECTIONS = [
  {
    title: 'Acceptance of Terms',
    body: [
      'By accessing this website, you confirm that you accept these Terms of Use and agree to follow them. If you do not agree with any part of these terms, please discontinue use of the website.',
    ],
  },
  {
    title: 'Use of Website',
    list: [
      'You agree to use the website only for lawful purposes.',
      'You must not introduce malicious software or attempt unauthorized access.',
      'You must not misuse any services or features of the website.',
    ],
  },
  {
    title: 'Product Information',
    body: [
      'We strive to ensure that product descriptions, images, and pricing are accurate. However, slight variations may occur due to updates or display differences.',
    ],
  },
  {
    title: 'Pricing & Availability',
    list: [
      'Prices may change without prior notice.',
      'Product availability may change at any time.',
      'We reserve the right to cancel or refuse orders when necessary.',
    ],
  },
  {
    title: 'Intellectual Property',
    body: [
      'All website content including logos, text, images, and graphics belong to Micky’s by CP Foods and may not be copied or used without permission.',
    ],
  },
  {
    title: 'Limitation of Liability',
    body: [
      'Micky’s by CP Foods is not responsible for any damages arising from the use or inability to use this website.',
    ],
  },
  {
    title: 'Changes to Terms',
    body: [
      'We may update these Terms of Use at any time. Continued use of the website indicates acceptance of the updated terms.',
    ],
  },
];

export function TermsPage() {
  return (
    <main className="pageSurface noPad legalPage">
      <section className="legalHero">
        <p className="tag">Legal</p>
        <h1>Terms of Use</h1>
        <p className="legalUpdated">Last Updated: June 2026</p>
        <p className="legalIntro">
          Welcome to Micky’s by CP Foods. By accessing and using our website, you agree to comply
          with and be bound by the following Terms of Use. Please read them carefully before using
          our website.
        </p>
      </section>

      <section className="legalBody">
        {SECTIONS.map(({ title, body, list }) => (
          <article className="legalBlock" key={title}>
            <h2>{title}</h2>
            {body?.map((p) => <p key={p}>{p}</p>)}
            {list && (
              <ul>
                {list.map((item) => <li key={item}>{item}</li>)}
              </ul>
            )}
          </article>
        ))}

        <article className="legalBlock">
          <h2>Contact Us</h2>
          <div className="legalContact">
            <a href="mailto:support@mickys.in"><Mail size={17} /> support@mickys.in</a>
            <a href="https://mickys.in" target="_blank" rel="noreferrer"><Globe size={17} /> https://mickys.in</a>
          </div>
        </article>
      </section>
    </main>
  );
}
