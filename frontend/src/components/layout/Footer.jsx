import mickysLogo from '../../assets/mickys-logo-brand.png';

export function Footer({ onNavigate }) {
  return (
    <footer className="footer">
      <div>
        <img className="footerLogo" src={mickysLogo} alt="Micky's by CP Food" />
        <p>Micky’s by CP Foods. Professional ready-to-cook solutions for hotels, restaurants, cloud kitchens, caterers and QSRs.</p>
      </div>
      <nav>
        <button type="button" onClick={() => onNavigate({ name: 'products' })}>Bundle Paste And Sauces</button>
        <button type="button" onClick={() => onNavigate({ name: 'products' })}>Bundle Gravies</button>
        <button type="button" onClick={() => onNavigate({ name: 'products' })}>Bundle Grains and Pulses</button>
      </nav>
      <div>
        <strong className="footerHeading">Location</strong>
        <p>FP- 55 & FP- 56,<br />Five Star Industrial Area,<br />Butibori MIDC, Nagpur (Rural),<br />Maharashtra – 441122</p>
      </div>
      <div>
        <strong className="footerHeading">Company</strong>
        <nav className="footerLinks">
          <button type="button" onClick={() => onNavigate({ name: 'about' })}>About Us</button>
          <button type="button" onClick={() => onNavigate({ name: 'contact' })}>Contact Us</button>
          <button type="button" onClick={() => onNavigate({ name: 'shipping' })}>Shipping Policy</button>
          <button type="button" onClick={() => onNavigate({ name: 'returns' })}>Returns &amp; Exchanges</button>
          <button type="button" onClick={() => onNavigate({ name: 'terms' })}>Terms of Use</button>
          <button type="button" onClick={() => onNavigate({ name: 'privacy' })}>Privacy Policy</button>
          <button type="button" onClick={() => onNavigate({ name: 'cookies' })}>Cookies Policy</button>
          <button type="button" onClick={() => onNavigate({ name: 'planb' })}>Plan B Kitchens (B2B)</button>
        </nav>
      </div>
    </footer>
  );
}
