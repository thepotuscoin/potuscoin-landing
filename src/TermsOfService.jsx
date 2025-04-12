import React from "react";
import { Link } from "react-router-dom";

function TermsOfService() {
  return (
    <div className="legal-page">
      <Link to="/" className="home-link">🏠 Home</Link>
      <h1>Terms of Service</h1>
      <p>Last updated: April 9, 2025</p>

      <section>
        <h2>1. Introduction</h2>
        <p>
          POTUS Coin ($POTUS) is a decentralized meme coin created for entertainment and community engagement. By accessing or using the POTUS Coin website or ecosystem, you agree to these Terms of Service.
        </p>
      </section>

      <section>
        <h2>2. Not Financial Advice</h2>
        <p>
          The content provided on this site, including approval ratings and token-related information, is for entertainment purposes only and does not constitute financial advice or recommendations.
        </p>
      </section>

      <section>
        <h2>3. No Government Affiliation</h2>
        <p>
          POTUS Coin is not affiliated with any government, political party, or official polling organization. All data and votes are user-generated and decentralized.
        </p>
      </section>

      <section>
        <h2>4. User Responsibilities</h2>
        <p>
          You are solely responsible for securing your wallet, understanding blockchain risks, and complying with local laws. Use the platform at your own risk.
        </p>
      </section>

      <section>
        <h2>5. Eligibility</h2>
        <p>
          You must be at least 18 years old or the age of majority in your jurisdiction to participate in POTUS Coin activities.
        </p>
      </section>

      <section>
        <h2>6. Changes to Terms</h2>
        <p>
          We may update these Terms from time to time. Continued use of the platform after changes implies acceptance.
        </p>
      </section>

      <section>
        <h2>7. Contact</h2>
        <p>
          For inquiries, contact us at <code>thepotuscoin@gmail.com</code> 
        </p>
      </section>
    </div>
  );
}

export default TermsOfService;
