const HostFaq = () => {
const faqs = [
  {
    id: "1",
    question: "Who can list properties on CollegeRoomFinder?",
    answer:
      "Individual landlords, PG owners, property managers, and real estate companies can list student-friendly accommodations near colleges and universities.",
  },
  {
    id: "2",
    question: "How do I receive student inquiries?",
    answer:
      "Once your property is live, interested students can contact you directly through the platform. You’ll receive verified inquiries from students actively searching near your listed location.",
  },
  {
    id: "3",
    question: "Are students verified on the platform?",
    answer:
      "Yes. CollegeRoomFinder focuses on student housing, and we implement verification measures to ensure inquiries come from genuine students.",
  },
  {
    id: "4",
    question: "Is there a fee to list my property?",
    answer:
      "We offer flexible listing options. Basic listings may be free during launch, with optional premium visibility features available for higher exposure.",
  },
  {
    id: "5",
    question: "How can I update or manage my listings?",
    answer:
      "You can easily manage availability, pricing, photos, and property details from your host dashboard at any time.",
  },
];



  return (
    <section className="faq-section ">
      <div className="container">
        <div className="row align-items-center justify-content-center gy-4">

          {/* LEFT FAQ */}
          <div className="col-lg-8 pb-5">
            <h2 className="faq-title heading text_dark text-center mb-4">
              Frequently Asked <span>Questions</span>
            </h2>

            <div className="accordion custom-accordion" id="faqAccordion">
              {faqs.map((faq, index) => (
                <div className="accordion-item" key={faq.id}>
                  <h2 className="accordion-header">
                    <button
                      className={`accordion-button ${
                        index !== 0 ? "collapsed" : ""
                      }`}
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target={`#faq${faq.id}`}
                    >
                      {faq.question}
                    </button>
                  </h2>

                  <div
                    id={`faq${faq.id}`}
                    className={`accordion-collapse collapse ${
                      index === 0 ? "show" : ""
                    }`}
                    data-bs-parent="#faqAccordion"
                  >
                    <div className="accordion-body">{faq.answer}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT IMAGE */}
          {/* <div className="col-lg-6 text-center position-relative">
            <div className="faq-image-wrapper">
              <span className="circle-bg"></span>
              <img
                // src="/images/faq.png"
                src="/images/faq1.png"
                alt="Student asking question"
                className="w-100 faq-image"
              />
            </div>
          </div> */}

        </div>
      </div>
    </section>
  );
};

export default HostFaq;
