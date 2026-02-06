import {  Users, CheckCircle, Home, Mail } from "lucide-react";
import { Link } from "react-router-dom";

const stepsData = [
  {
    id: 1,
    title: "List Your Property",
    description:
      "Add  student accommodation in just a few minutes. Upload photos, set pricing, define house rules, and make your listing visible to verified students near your property.",
    icon: <Home size={26} />,
    colorClass: "blue-step",
  },
  {
    id: 2,
    title: "Get Verified Leads",
    description:
      "Receive inquiries only from genuine, verified students. Chat directly, answer questions, and schedule visits without brokers or unnecessary middlemen.",
    icon: <Users size={26} />,
    colorClass: "red-step",
  },
  {
    id: 3,
    title: "Close Deals Faster",
    description:
      "Finalize bookings with confidence. Fill vacancies faster, reduce downtime, and manage your student tenants smoothly through a simple, host-friendly dashboard.",
    icon: <CheckCircle size={26} />,
    colorClass: "blue-step",
  },
];

const StepHosts = () => {
  return (
    <section className="finding_steps host_steps">
      <div className="container">
        
        {/* SECTION HEADER */}
        <div className="text-center mb-5">
          <h2 className="heading">
            Start Hosting In <span className="text_blue fw-bold">3 Simple Steps</span>
          </h2>
          <p className="subheading text-muted">
            Built to help property owners attract quality student tenants effortlessly.
          </p>
        </div>

        {/* STEPS */}
        <div className="steps-wrapper">
          {stepsData.map((step, index) => (
            <div className={`step-card-container ${step.colorClass}`} key={index}>
              <div className="step-outline">
                <div className="step-bg-layer"></div>

                <div className="step-card">
                  <div className="step-number-circle">
                    <span>{step.id}</span>
                  </div>

                  <div className="step-content">
                    <h5>{step.title}</h5>
                    <p>{step.description}</p>
                  </div>

                  <div className="step-icon-box">
                    {step.icon}
                  </div>
                </div>
              </div>

              {index < stepsData.length - 1 && (
                <div className="step-arrow"></div>
              )}
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="steps-cta d-flex justify-content-center gap-3 mt-5">
          <Link to="/list-property" className="theme_outline_btn d-flex align-items-center gap-2">
            <Home size={18} />
            List Your Property
          </Link>

          {/* <Link to="/contact" className="dark_btn d-flex align-items-center gap-2">
            <Mail size={18} />
            Talk to Our Team
          </Link> */}
        </div>
      </div>
    </section>
  );
};

export default StepHosts;
