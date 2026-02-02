const FAQ = () => {
  const faqs = [
  {
    id: "1",
    question: "Who can use CollegeRoomFinder?",
    answer:
      "CollegeRoomFinder is designed for college students looking for campus-approved rooms or housing units near supported universities, and for hosts who want to list student housing near those campuses.",
  },
  {
    id: "2",
    question: "Does CollegeRoomFinder offer roommate or room-sharing matching?",
    answer:
      "No. CollegeRoomFinder does not offer roommate matching or room-sharing services. Students browse and inquire about available rooms or units directly from hosts.",
  },
  {
    id: "3",
    question: "Is CollegeRoomFinder free for students?",
    answer:
      "Yes. Students can search listings, view property details, save favorites, and send inquiries to hosts completely free of charge.",
  },
  {
    id: "4",
    question: "Who can list properties on CollegeRoomFinder?",
    answer:
      "Property owners and managers with rooms or housing units located near approved college campuses can create and manage listings on CollegeRoomFinder.",
  },
  {
    id: "5",
    question: "Is there a free trial for hosts?",
    answer:
      "Yes. Hosts receive a 1-month free trial to publish listings. After the trial, an active subscription is required to keep listings live.",
  },
  {
    id: "6",
    question: "What if my university is not listed?",
    answer:
      "Students and hosts can submit a request to add a new university. Once approved by the admin team, listings for that campus will become available.",
  },
];


  return (
    <section className="faq-section ">
      <div className="container">
        <div className="row align-items-center gy-4">

          {/* LEFT FAQ */}
          <div className="col-lg-6 pb-5">
            <h2 className="faq-title heading text_dark mb-4">
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
          <div className="col-lg-6 text-center position-relative">
            <div className="faq-image-wrapper">
              <span className="circle-bg"></span>
              <img
                // src="/images/faq.png"
                src="/images/faq1.png"
                alt="Student asking question"
                className="w-100 faq-image"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default FAQ;
