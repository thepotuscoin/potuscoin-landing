import React from "react";
import "./style.css";
import { Link } from "react-router-dom";


function PrivacyPolicy() {
  return (
    <div className="privacy-policy">
      <Link to="/" className="home-link">🏠 Home</Link>

      <header>
        <h1>Privacy Policy</h1>
      </header>

      <main>
        <section>
          <p>
            This Privacy Policy describes how POTUS Coin collects, uses, and protects your information when you use our website.
          </p>

          <h2>1. Information We Collect</h2>
          <p>
            We do not collect personal information such as your name, address, or email. However, we may collect non-personally identifiable information such as:
          </p>
          <ul>
            <li>Public blockchain wallet addresses</li>
            <li>Voting activity recorded on-chain</li>
            <li>Basic analytics (page views, clicks)</li>
          </ul>

          <h2>2. Use of Information</h2>
          <p>
            Your information is used to provide you with access to on-chain voting and sentiment display. Data is never sold, rented, or shared with third parties without your consent.
          </p>

          <h2>3. Cookies</h2>
          <p>
            This site does not use cookies or local storage at this time. If this changes in the future, this policy will be updated accordingly.
          </p>

          <h2>4. Blockchain Disclosure</h2>
          <p>
            All votes are stored publicly on the blockchain and are immutable. While we do not directly associate wallet addresses with personal identities, your voting activity is publicly accessible.
          </p>

          <h2>5. Trademark & Disclaimer</h2>
          <p>
            POTUS Coin is a trademark of Purely Adaptive LC. It is not affiliated with any government agency. $POTUS is a meme coin created for entertainment and public sentiment tracking purposes only.
          </p>

          <h2>6. Contact</h2>
          <p>
            For privacy-related inquiries, please contact: thepotuscoin@gmail.com
          </p>
        </section>
      </main>

      <footer>
        <p>&copy; 2025 POTUS Coin. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default PrivacyPolicy;