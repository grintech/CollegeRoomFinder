import { useState } from "react";
import {
  Car,
  Bike,
  Bus,
  GraduationCap,
  RotateCcw,
  NavigationIcon,
  Footprints,
  Clock
} from "lucide-react";

const commuteOptions = [
  {
    id: "drive",
    label: "Drive",
    time: 8,
    distance: "2.9 mi",
    icon: Car,
  },
  {
    id: "bike",
    label: "Bike",
    time: 15,
    distance: "2.2 mi",
    icon: Bike,
  },
  {
    id: "transit",
    label: "Transit",
    time: 25,
    distance: "2.1 mi",
    icon: Bus,
  },
  {
    id: "walk",
    label: "Walk",
    time: 35,
    distance: "2.1 mi",
    icon: Footprints,
  },
];

const CommuteCard = () => {
  const [calculated, setCalculated] = useState(false);

  const fastestTime = Math.min(...commuteOptions.map(o => o.time));

  return (
    <div className="card commute-card">
      <div className="card-body">
        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h6 className="fw-bold m-0 d-flex align-items-center gap-2">
            <GraduationCap size={18} />
            Commute to UMBC
          </h6>
          <span className="badge rounded-pill bg-light text-dark">
           2.5 km away
          </span>
        </div>

        {/* University Info */}
        <div className="commute-university mb-3">
          <GraduationCap size={18} />
          <div>
            <strong>University of Maryland, Baltimore County</strong>
            <p className="m-0 small text-muted">
              1000 Hilltop Cir, Baltimore, MD 21250
            </p>
          </div>
        </div>

        {/* Calculate Button */}
        {!calculated && (
          <button
            className="blue_btn w-100"
            onClick={() => setCalculated(true)}
          >
            <NavigationIcon size={16} className="me-2" />
            Calculate Commute Times
          </button>
        )}

        {/* Commute Results */}
        {calculated && (
          <>
            <div className="row g-2 mt-4">
              {commuteOptions.map((item) => {
                const Icon = item.icon;
                const isFastest = item.time === fastestTime;

                return (
                  <div className="col-6" key={item.id}>
                    <div
                      className={`commute-option ${
                        isFastest ? "fastest" : ""
                      }`}
                    >
                      {isFastest && <span className="fastest-badge">Fastest</span>}

                      <div className="d-flex align-items-center gap-2">
                        <Icon size={18} />
                        <strong>{item.label}</strong>
                      </div>

                      <div className="mt-1">
                        <div className="fw-bold"><Clock size={12} /> {item.time} mins</div>
                        <small className="text-muted">{item.distance}</small>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <button
              className="btn btn-light text-dark w-100 mt-4 text-decoration-none"
              onClick={() => setCalculated(false)}
            >
              <RotateCcw size={16} className="me-1" />
              Refresh
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default CommuteCard;
