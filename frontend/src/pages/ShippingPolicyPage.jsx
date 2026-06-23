import { Mail, Globe } from 'lucide-react';

const SECTIONS = [
  {
    title: 'Order Processing',
    body: [
      'Orders are processed within 1–3 business days after payment confirmation. Orders are not processed on weekends or public holidays.',
      'During peak seasons or promotional periods, processing times may be slightly longer.',
    ],
  },
  {
    title: 'Shipping Locations',
    body: [
      'We currently ship across India. Delivery availability may vary depending on the courier service and location.',
    ],
  },
  {
    title: 'Delivery Time',
    list: [
      'Standard Delivery: 4–7 business days.',
      'Remote Locations: 6–10 business days.',
      'Delivery times may vary due to external factors such as weather or courier delays.',
    ],
  },
  {
    title: 'Shipping Charges',
    body: [
      'Shipping charges are calculated at checkout depending on the delivery location and order value. Occasionally, we may offer promotional free shipping offers.',
    ],
  },
  {
    title: 'Order Tracking',
    body: [
      'Once your order has been shipped, you will receive a tracking number via email or SMS which can be used to track your order status.',
    ],
  },
  {
    title: 'Incorrect Address',
    body: [
      'Please ensure that your shipping address is correct when placing the order. We are not responsible for delivery delays caused by incorrect or incomplete addresses.',
    ],
  },
];

export function ShippingPolicyPage() {
  return (
    <main className="pageSurface noPad legalPage">
      <section className="legalHero">
        <p className="tag">Shipping</p>
        <h1>Shipping Policy</h1>
        <p className="legalUpdated">Last Updated: June 2026</p>
        <p className="legalIntro">
          At Micky’s by CP Foods, we strive to deliver your orders quickly and safely. This Shipping
          Policy outlines how orders are processed, shipped and delivered to customers.
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
