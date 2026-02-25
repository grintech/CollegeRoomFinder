const Pricing = () => {
  return (
    <section className="pricing-section">
      <div className="container">
        <div className="text-center mb-5">
          <h2 className="heading text_theme">
            Simple, Transparent <span className="text_blue fw-bold">Pricing</span>
          </h2>
          <p className="pricing-subtitle">
            List your student-friendly property, connect with verified students,
            and choose a plan that fits your hosting needs.
          </p>
        </div>

        <div className="row justify-content-center g-4">

          {/* 7 Day Free Trial */}
          <div className="col-md-6 col-xxl-3">
            <div className="pricing-card">
              <h5 className="plan-name">Starter Trial</h5>
              <p className="plan-price">Free</p>
              <p className="plan-duration">7-Day Free Trial</p>

              <ul className="plan-features">
                <li>List 1 student-friendly property</li>
                <li>Receive verified student inquiries</li>
                <li>Email notifications</li>
                <li>Full dashboard access</li>
              </ul>

              <button className="theme_outline_btn w-100">
                Start Free Trial
              </button>
            </div>
          </div>

          {/* 1 Month Plan */}
          <div className="col-md-6 col-xxl-3">
            <div className="pricing-card featured">
              <span className="badge-featured">Most Popular</span>

              <h5 className="plan-name">Standard Plan</h5>
              <p className="plan-price">$67</p>
              <p className="plan-duration">Per Month</p>

              <ul className="plan-features">
                <li>List 1 property</li>
                <li>Unlimited student inquiries</li>
                <li>Instant host notifications</li>
                <li>Manage availability anytime</li>
                <li>Priority email support</li>
              </ul>

              <button className="light_btn w-100">
                Subscribe Now
              </button>
            </div>
          </div>

          {/* Pro Plan */}
          <div className="col-md-6 col-xxl-3">
            <div className="pricing-card">
              <h5 className="plan-name">Pro Plan</h5>
              <p className="plan-price">$97</p>
              <p className="plan-duration">Per Month</p>

              <ul className="plan-features">
                <li>List up to 2 properties</li>
                <li>Unlimited inquiries</li>
                <li>Priority listing visibility</li>
                <li>Advanced dashboard controls</li>
                <li>Dedicated support</li>
              </ul>

              <button className="theme_outline_btn w-100">
                Upgrade to Pro
              </button>
            </div>
          </div>

          {/* Enterprise */}
          <div className="col-md-6 col-xxl-3">
            <div className="pricing-card">
              <h5 className="plan-name">Enterprise</h5>
              <p className="plan-price">Custom</p>
              <p className="plan-duration">For Multiple Properties</p>

              <ul className="plan-features">
                <li>List unlimited student-friendly properties</li>
                <li>Bulk property management</li>
                <li>Featured placement options</li>
                <li>Account manager support</li>
              </ul>

              <button className="theme_outline_btn w-100">
                Contact Us
              </button>
            </div>
          </div>

        </div>

        {/* Featured Posting Add-On */}
        <div className="text-center mt-5">
          <div className="addon-box mx-auto">
            <h5>Featured Property Posting</h5>
            <div>
              <strong className="fs-5 text_dark">$97</strong> for 1 Month <br />
              <p className="m-0">Boost visibility and appear at the top of search results for students.</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Pricing;