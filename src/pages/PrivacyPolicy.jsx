import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="privacy_page py-4">
      <div className="container">
        <div className="col-lg-10 mx-auto">
          <div className="card border-0 rounded-3">
            <div className="card-body">
              <h1 className="mb-4 sec-title text-center">Privacy Policy</h1>

              <p>
                At <strong>College Room Finder</strong>, we value your privacy
                and are committed to protecting your personal information. This
                Privacy Policy explains how we collect, use, and safeguard your
                information when you use our website and services.
              </p>

              <h4 className="mt-4">1. Information We Collect</h4>
              <p>
                We may collect personal information such as your name, email
                address, phone number, and account details when you register on
                our platform or contact property owners through our website.
              </p>

              <h4 className="mt-4">2. How We Use Your Information</h4>
              <p>
                The information we collect may be used to improve our services,
                connect students with property providers, process bookings,
                respond to inquiries, and provide important updates regarding
                your account or listings.
              </p>

              <h4 className="mt-4">3. Sharing of Information</h4>
              <p>
                We may share your information with property owners or managers
                when you inquire about or book a property. We do not sell or
                rent your personal information to third parties.
              </p>

              <h4 className="mt-4">4. Cookies and Tracking Technologies</h4>
              <p>
                Our website may use cookies and similar technologies to enhance
                user experience, analyze website traffic, and remember user
                preferences. You can control cookie settings through your
                browser.
              </p>

              <h4 className="mt-4">5. Data Security</h4>
              <p>
                We implement reasonable security measures to protect your
                personal information from unauthorized access, disclosure, or
                misuse. However, no internet transmission is completely secure.
              </p>

              <h4 className="mt-4">6. Third-Party Links</h4>
              <p>
                Our website may contain links to third-party websites or
                services. We are not responsible for the privacy practices or
                content of those external websites.
              </p>

              <h4 className="mt-4">7. Your Rights</h4>
              <p>
                You may request access to, update, or delete your personal
                information by contacting us. We will make reasonable efforts to
                respond to such requests in accordance with applicable laws.
              </p>

              <h4 className="mt-4">8. Changes to This Privacy Policy</h4>
              <p>
                We may update this Privacy Policy from time to time. Any changes
                will be posted on this page, and continued use of the platform
                indicates acceptance of the updated policy.
              </p>

              <h4 className="mt-4">9. Contact Us</h4>
              <p>
                If you have any questions about this Privacy Policy or how your
                data is handled, please contact us through our website support
                page.
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

export default PrivacyPolicy;
