const Pricing = () => {
  return (
    <section className="pricing-section">
      <div className="container">
        <div className="text-center mb-5">
          <h2 className="heading">
            Simple, Transparent <span className="text_blue fw-bold">Pricing</span>
          </h2>
          <p className="pricing-subtitle">
            List your property, connect with students, and upgrade only when you need more visibility.
          </p>
        </div>

        <div className="row justify-content-center g-4">
          {/* Free Trial */}
          <div className="col-md-6 col-lg-4">
            <div className="pricing-card">
              <h5 className="plan-name">Host Starter</h5>
              <p className="plan-price">Free</p>
              <p className="plan-duration">1-Month Trial</p>

              <ul className="plan-features">
                <li>In-platform inquiry system</li>
                <li>Email notifications</li>
                <li>Admin-visible inquiries</li>
                <li>Basic property listing</li>
              </ul>

              <button className="theme_outline_btn w-100">
                Start Free Trial
              </button>
            </div>
          </div>

          {/* Paid Plan */}
          <div className="col-md-6 col-lg-4">
            <div className="pricing-card featured">
              <span className="badge-featured">Most Popular</span>

              <h5 className="plan-name">Host Pro</h5>
              <p className="plan-price">$9.97</p>
              <p className="plan-duration">Per month</p>

              <ul className="plan-features">
                <li>Unlimited student inquiries</li>
                <li>Instant host notifications</li>
                <li>Full inquiry visibility</li>
                <li>Auto-unpublish if unpaid</li>
                <li>Priority support</li>
              </ul>

              <button className="light_btn w-100">
                Subscribe Now
              </button>

              <div className="addon-box">
                <h6>Optional Featured Listing</h6>
                <p>
                  <strong>$150</strong> for 2 months <br />
                  <small>One-time, non-recurring upgrade</small>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
