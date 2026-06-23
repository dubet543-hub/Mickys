import { Mail, Globe } from 'lucide-react';

const SECTIONS = [
  {
    title: 'Return Eligibility',
    list: [
      'Return requests must be made within 7 days of delivery.',
      'The product must be unused, unworn, and in its original condition.',
      'All original tags and packaging must be intact.',
      'Products damaged due to misuse will not be eligible for return.',
    ],
  },
  {
    title: 'Non-Returnable Items',
    list: [
      'Items that have been used or worn.',
      'Products without original tags or packaging.',
      'Items purchased during clearance or final sale.',
      'Gift cards or promotional items.',
    ],
  },
  {
    title: 'Exchange Policy',
    body: [
      'If you require a different size or product, you may request an exchange depending on product availability. Exchanges will be processed once the returned product is received and inspected.',
    ],
  },
  {
    title: 'Return Process',
    list: [
      'Contact our support team with your Order Number.',
      'Our team will guide you through the return procedure.',
      'Ensure the product is securely packed in its original packaging.',
      'Once received and inspected, the return or exchange will be processed.',
    ],
  },
  {
    title: 'Refunds',
    body: [
      'Refunds will be issued within 5–7 business days after the returned product has been received and approved. Refunds will be processed using the original payment method.',
    ],
  },
];

export function ReturnsPage() {
  return (
    <main className="pageSurface noPad legalPage">
      <section className="legalHero">
        <p className="tag">Returns</p>
        <h1>Returns &amp; Exchanges</h1>
        <p className="legalUpdated">Last Updated: June 2026</p>
        <p className="legalIntro">
          At Micky’s by CP Foods, we want our customers to be satisfied with their purchase. If you
          are not completely happy with your order, you may request a return or exchange according
          to the policy below.
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
