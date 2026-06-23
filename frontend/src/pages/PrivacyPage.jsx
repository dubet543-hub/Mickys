import { Mail, Globe } from 'lucide-react';

const SECTIONS = [
  {
    title: 'Information We Collect',
    body: ['We may collect certain information when you use our website, including but not limited to:'],
    list: [
      'Your name, email address, and contact details.',
      'Shipping and billing information for orders.',
      'Payment details required to process transactions.',
      'Technical information such as IP address, browser type, and device information.',
    ],
  },
  {
    title: 'How We Use Your Information',
    list: [
      'To process and fulfill orders placed on our website.',
      'To communicate with you regarding your orders or inquiries.',
      'To improve our website functionality and user experience.',
      'To send updates, promotions, or important notifications if you opt in.',
    ],
  },
  {
    title: 'Sharing of Information',
    body: [
      'We do not sell or rent your personal information. However, we may share necessary information with trusted third parties such as payment processors, delivery partners, and service providers in order to complete transactions and provide our services.',
    ],
  },
  {
    title: 'Cookies and Tracking Technologies',
    body: [
      'Our website may use cookies and similar technologies to improve your browsing experience, analyze website traffic, and remember your preferences.',
    ],
  },
  {
    title: 'Data Security',
    body: [
      'We implement appropriate security measures to protect your personal information from unauthorized access, disclosure, alteration, or destruction.',
    ],
  },
  {
    title: 'Your Rights',
    body: [
      'You may request access, correction, or deletion of your personal information at any time by contacting us.',
    ],
  },
  {
    title: 'Changes to This Policy',
    body: [
      'We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated revision date.',
    ],
  },
];

export function PrivacyPage() {
  return (
    <main className="pageSurface noPad legalPage">
      <section className="legalHero">
        <p className="tag">Privacy</p>
        <h1>Privacy Policy</h1>
        <p className="legalUpdated">Last Updated: June 2026</p>
        <p className="legalIntro">
          At Micky’s by CP Foods, we value your privacy and are committed to protecting your
          personal information. This Privacy Policy explains how we collect, use and safeguard your
          information when you visit or interact with our website.
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
          <p>If you have any questions regarding this Privacy Policy, please contact us at:</p>
          <div className="legalContact">
            <a href="mailto:support@mickys.in"><Mail size={17} /> support@mickys.in</a>
            <a href="https://mickys.in" target="_blank" rel="noreferrer"><Globe size={17} /> https://mickys.in</a>
          </div>
        </article>
      </section>
    </main>
  );
}
