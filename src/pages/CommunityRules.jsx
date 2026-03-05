import React from "react";

const CommunityRules = () => {
  return (
    <div className="community_rules_page py-4">
      <div className="container">
        <div className="col-lg-10 mx-auto">
          <div className="card border-0 rounded-3">
            <div className="card-body">
              <h1 className="sec-title text-center mb-4">Community Rules</h1>

              <p>
                At <strong>College Room Finder</strong>, we aim to create a
                safe, respectful, and trustworthy platform for students and
                property providers. These Community Rules outline the expected
                behavior when using our platform.
              </p>

              <h4 className="mt-4">1. Respectful Communication</h4>
              <p>
                All users must communicate respectfully with others. Harassment,
                discrimination, abusive language, or offensive behavior toward
                other users is strictly prohibited.
              </p>

              <h4 className="mt-4">2. Honest Listings and Information</h4>
              <p>
                Property owners and managers must provide accurate details about
                their listings, including pricing, availability, amenities, and
                policies. Misleading or false listings may be removed from the
                platform.
              </p>

              <h4 className="mt-4">3. No Fraud or Scams</h4>
              <p>
                Any attempt to scam, defraud, or mislead users is strictly
                forbidden. Users should never request or send payments outside
                the official booking or contact process.
              </p>

              <h4 className="mt-4">4. Appropriate Content</h4>
              <p>
                Users must not upload or share content that is illegal,
                offensive, harmful, or unrelated to accommodation listings. This
                includes spam, fake reviews, or inappropriate images.
              </p>

              <h4 className="mt-4">5. Respect Property and Agreements</h4>
              <p>
                Students and tenants should respect property rules, agreements,
                and local regulations when renting or visiting listed
                accommodations.
              </p>

              <h4 className="mt-4">6. Account Responsibility</h4>
              <p>
                Users are responsible for maintaining the security of their
                accounts and must not share login credentials with others.
              </p>

              <h4 className="mt-4">7. Reporting Violations</h4>
              <p>
                If you encounter suspicious activity, abusive behavior, or rule
                violations, please report it to our support team so we can
                review and take appropriate action.
              </p>

              <h4 className="mt-4">8. Enforcement</h4>
              <p>
                College Room Finder reserves the right to remove content,
                suspend accounts, or take necessary actions if users violate
                these Community Rules.
              </p>

              <p className="mt-4 text-muted">
                Last Updated: {new Date().getFullYear()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityRules;
