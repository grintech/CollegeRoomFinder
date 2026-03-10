import { useState, useEffect } from "react";
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

// Map API commute methods to icons
const getCommuteIcon = (method) => {
  const iconMap = {
    'driving': Car,
    'bicycling': Bike,
    'transit': Bus,
    'walking': Footprints,
    'car': Car,
    'bike': Bike,
    'bus': Bus,
    'foot': Footprints
  };
  
  return iconMap[method.toLowerCase()] || Car;
};

// Format commute data from API
const formatCommuteOptions = (commuteTimes) => {
  if (!commuteTimes) return [];
  
  return Object.entries(commuteTimes).map(([key, value]) => ({
    id: key,
    label: value.label || key.charAt(0).toUpperCase() + key.slice(1),
    time: Math.ceil(value.duration_seconds / 60), // Convert seconds to minutes
    distance: value.distance_text || 'N/A',
    icon: getCommuteIcon(value.icon || key),
    duration_text: value.duration_text,
    is_fastest: value.is_fastest || false
  }));
};

const CommuteCard = ({ commuteData, campus, distance }) => {
  const [calculated, setCalculated] = useState(false);
  const [commuteOptions, setCommuteOptions] = useState([]);
  const [fastestTime, setFastestTime] = useState(null);

  useEffect(() => {
    if (commuteData) {
      const options = formatCommuteOptions(commuteData);
      setCommuteOptions(options);
      
      // Find fastest time
      const fastest = Math.min(...options.map(o => o.time));
      setFastestTime(fastest);
    }
  }, [commuteData]);

  // If no commute data, show placeholder
  if (!commuteData) {
    return (
      <div className="card commute-card">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h6 className="fw-bold m-0 d-flex align-items-center gap-2">
              <GraduationCap size={18} />
              Commute to Campus
            </h6>
          </div>
          
          <div className="commute-university mb-3">
            <GraduationCap size={18} />
            <div>
              <strong>{campus.name || 'University'}</strong>
              <p className="m-0 small text-muted">
                {campus.address || 'Address not available'}
              </p>
            </div>
          </div>

          <button
            className="blue_btn w-100"
            onClick={() => setCalculated(true)}
            disabled
          >
            <NavigationIcon size={16} className="me-2" />
            Commute data not available
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="card commute-card">
      <div className="card-body">
        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h6 className="fw-bold m-0 d-flex align-items-center gap-2">
            <GraduationCap size={18} />
            Commute to {campus?.name || 'Campus'}
          </h6>
          {distance && (
            <span className="badge rounded-pill bg-light text-dark">
              {distance}
            </span>
          )}
        </div>

        {/* University Info */}
        <div className="commute-university mb-3">
          <GraduationCap size={18} />
          <div>
            <strong>{campus?.name || 'University'}</strong>
            <p className="m-0 small text-muted">
              {campus?.address || 'Address not available'}
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
        {calculated && commuteOptions.length > 0 && (
          <>
            <div className="row g-2 mt-4">
              {commuteOptions.map((item) => {
                const Icon = item.icon;
                const isFastest = item.time === fastestTime || item.is_fastest;

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
                        <div className="fw-bold d-flex align-items-center gap-1">
                          <Clock size={12} /> {item.duration_text || `${item.time} mins`}
                        </div>
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