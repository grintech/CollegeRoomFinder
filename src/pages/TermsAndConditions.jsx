const TermsAndConditions = () => {
  return (
    <div className="terms_page py-4">
      <div className="container">
        <div className="col-lg-10 mx-auto">
          <div className="card rounded-4 border-0">
            <div className="card-body p-4">
              <h1 className="mb-4 sec-title text-center">Terms & Conditions </h1>

              <p>
                Welcome to <strong>College Room Finder</strong>. By accessing or
                using our website, you agree to comply with and be bound by the
                following Terms and Conditions. Please read them carefully
                before using the platform.
              </p>

              <h4 className="mt-4">1. Acceptance of Terms</h4>
              <p>
                By accessing this website, creating an account, or using our
                services, you agree to these Terms & Conditions. If you do not
                agree with any part of these terms, please do not use our
                platform.
              </p>

              <h4 className="mt-4">2. Platform Purpose</h4>
              <p>
                College Room Finder is an online platform that helps students
                find accommodation near universities and colleges. We connect
                students with property owners or property managers but do not
                own or manage the listed properties.
              </p>

              <h4 className="mt-4">3. User Accounts</h4>
              <p>
                Users may need to create an account to access certain features.
                You are responsible for maintaining the confidentiality of your
                account credentials and for all activities that occur under your
                account.
              </p>

              <h4 className="mt-4">4. Property Listings</h4>
              <p>
                Property owners or managers are responsible for providing
                accurate information regarding their listings including price,
                availability, amenities, and policies. College Room Finder does
                not guarantee the accuracy or completeness of listing
                information.
              </p>

              <h4 className="mt-4">5. Bookings and Payments</h4>
              <p>
                Any booking agreements are made directly between the student and
                the property provider. College Room Finder may facilitate the
                booking process but is not responsible for disputes,
                cancellations, or payment issues between users and property
                providers.
              </p>

              <h4 className="mt-4">6. User Responsibilities</h4>
              <p>
                Users agree to use the platform responsibly and not to post
                false, misleading, or fraudulent information. Any misuse of the
                platform may result in suspension or termination of your
                account.
              </p>

              <h4 className="mt-4">7. Limitation of Liability</h4>
              <p>
                College Room Finder is not responsible for any damages, losses,
                or disputes arising from property listings, bookings, or
                interactions between users and property owners.
              </p>

              <h4 className="mt-4">8. Intellectual Property</h4>
              <p>
                All content on this website including text, graphics, logos, and
                design elements are the property of College Room Finder and may
                not be copied, reproduced, or distributed without permission.
              </p>

              <h4 className="mt-4">9. Changes to Terms</h4>
              <p>
                We reserve the right to modify these Terms & Conditions at any
                time. Updates will be posted on this page and continued use of
                the platform constitutes acceptance of the revised terms.
              </p>

              <h4 className="mt-4">10. Contact Us</h4>
              <p>
                If you have any questions regarding these Terms & Conditions,
                please contact us through our website support page.
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

export default TermsAndConditions;
