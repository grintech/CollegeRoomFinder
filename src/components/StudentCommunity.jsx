import { MessageCircle } from "lucide-react";

const StudentCommunity = () => {
  return (
    <section className="community-section">
      <div className="container community-container">

        {/* LEFT CONTENT */}
        <div className="community-content">
          <h2 className="heading">
            Not just matches, a real <br />
            <span>Student <br /> Community</span>
          </h2>

          <p>
            Ask housing questions, find sublets, and meet people before you move.
            International students welcome — get help with banking, SIM cards,
            transport, and more.
          </p>

          <button className="blue_btn d-flex align-items-center">
            <MessageCircle size={18} className="me-2" />
            Join Study Groups
          </button>
        </div>

        {/* RIGHT IMAGE */}
        <div className="community-image-wrap">
          <img
            src="/images/community.png"
            alt="Student community"
            className="community-image"
          />

          {/* doodles */}
          <span className="doodle arrow"></span>
          <span className="doodle dots"></span>
        </div>

      </div>
    </section>
  );
};

export default StudentCommunity;
