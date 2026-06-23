import { Mail, Globe } from 'lucide-react';

const SECTIONS = [
  {
    title: 'What Are Cookies?',
    body: [
      'Cookies are small data files that are placed on your device when you visit a website. They help websites function properly and improve the user experience by remembering preferences and analyzing website performance.',
    ],
  },
  {
    title: 'How We Use Cookies',
    list: [
      'To ensure the website functions properly.',
      'To remember your preferences and settings.',
      'To analyze website traffic and user interactions.',
      'To improve the performance and usability of our website.',
    ],
  },
  {
    title: 'Types of Cookies We Use',
    subs: [
      { name: 'Essential Cookies', text: 'These cookies are necessary for the website to function and cannot be switched off in our systems.' },
      { name: 'Performance Cookies', text: 'These cookies help us understand how visitors interact with our website so we can improve user experience.' },
      { name: 'Functional Cookies', text: 'These cookies allow the website to remember choices you make, such as language or preferences.' },
    ],
  },
  {
    title: 'Managing Cookies',
    body: [
      'You can control or delete cookies through your browser settings. Most browsers allow you to refuse cookies or delete them if you prefer.',
    ],
  },
  {
    title: 'Changes to This Cookies Policy',
    body: [
      'We may update this Cookies Policy from time to time. Any changes will be posted on this page with an updated revision date.',
    ],
  },
];

export function CookiesPage() {
  return (
    <main className="pageSurface noPad legalPage">
      <section className="legalHero">
        <p className="tag">Cookies</p>
        <h1>Cookies Policy</h1>
        <p className="legalUpdated">Last Updated: June 2026</p>
        <p className="legalIntro">
          This Cookies Policy explains how Micky’s by CP Foods uses cookies and similar technologies
          to recognize you when you visit our website. It explains what these technologies are and
          why we use them.
        </p>
      </section>

      <section className="legalBody">
        {SECTIONS.map(({ title, body, list, subs }) => (
          <article className="legalBlock" key={title}>
            <h2>{title}</h2>
            {body?.map((p) => <p key={p}>{p}</p>)}
            {list && (
              <ul>
                {list.map((item) => <li key={item}>{item}</li>)}
              </ul>
            )}
            {subs?.map(({ name, text }) => (
              <div className="legalSub" key={name}>
                <h3>{name}</h3>
                <p>{text}</p>
              </div>
            ))}
          </article>
        ))}

        <article className="legalBlock">
          <h2>Contact Us</h2>
          <p>If you have any questions about this Cookies Policy, please contact us at:</p>
          <div className="legalContact">
            <a href="mailto:support@mickys.in"><Mail size={17} /> support@mickys.in</a>
            <a href="https://mickys.in" target="_blank" rel="noreferrer"><Globe size={17} /> https://mickys.in</a>
          </div>
        </article>
      </section>
    </main>
  );
}
