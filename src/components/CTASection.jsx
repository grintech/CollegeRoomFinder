const CTASection = () => {
  return (
    <section className="cta-section">
      <div className="cta-overlay">
        <div className="container">
          <div className="row justify-content-center text-center">
            <div className="col-lg-9">
              <h2 className="cta-heading">
                Campus-Approved Housing,
                <br />
                <span>Built for Students & Hosts</span>
              </h2>

              <p className="cta-text">
                Students can find verified rooms and units near their campus.
                Hosts can reach trusted student renters — all in one platform.
              </p>

              <div className="cta-buttons">
                <button  className="theme_outline_btn ">
                  Find a Room
                </button>
                <button  className="light_btn">
                  List Your Property
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
