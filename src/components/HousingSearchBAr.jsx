import { useState, useEffect } from "react";
import api from '../services/api';

const HousingSearchBar = ({ onSearch }) => {
  const [price, setPrice] = useState(5000);
  const [query, setQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [universities, setUniversities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [leaseDuration, setLeaseDuration] = useState(""); // No default selection
  const [selectedUniversity, setSelectedUniversity] = useState(null);
  const [error, setError] = useState(""); // Add error state

  // Fetch universities from API
  useEffect(() => {
    const fetchUniversities = async () => {
      setLoading(true);
      try {
        const response = await api.get("/campus/list");
        
        if (response?.data?.status === true && response?.data?.data) {
          const mappedUniversities = response.data.data.map((uni) => ({
            id: uni.id,
            name: uni.name,
            city: uni.city || ""
          }));
          setUniversities(mappedUniversities);
        }
      } catch (error) {
        console.error("Error fetching universities:", error);
        setError("Failed to load universities");
      } finally {
        setLoading(false);
      }
    };

    fetchUniversities();
  }, []);

  const filteredUniversities = universities.filter((u) =>
    u.name.toLowerCase().includes(query.toLowerCase())
  );

  const handleSearch = () => {
    setError("");

    if (!query.trim()) {
      setError("Please select a university to see available rooms.");
      
      setTimeout(() => {
        setError("");
      }, 2000);

      return;
    }

    const selected = universities.find(
      (u) => u.name.toLowerCase() === query.toLowerCase()
    );

    if (!selected) {
      setError("Please select a valid university from the suggestions.");

      setTimeout(() => {
        setError("");
      }, 2000);

      return;
    }

    onSearch({
      university: query.trim(),
      campus_id: selected.id,
      maxPrice: price,
      leaseDuration: leaseDuration,
    });
  };

  const handleSelectUniversity = (university) => {
    setQuery(university.name);
    setSelectedUniversity(university);
    setShowSuggestions(false);
    setError(""); // Clear error when user selects a university
  };

  return (
    <div className="search-wrapper">
      <div className="container">
        <div className="search-box">

          {/* University – double width */}
          <div className="search-field university-field suggestion-wrapper">
            <label>University <span className="text-danger">*</span></label>
            <input
              type="text"
              placeholder="Search for your university.."
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setShowSuggestions(true);
                setSelectedUniversity(null);
                setError(""); // Clear error when user types
              }}
              onFocus={() => query && setShowSuggestions(true)}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
              className={error ? "is-invalid" : ""}
            />

            {/* Suggestions */}
            {showSuggestions && query && (
              <div className="suggestion-box">
                {loading ? (
                  <div className="suggestion-item muted">
                    Loading universities...
                  </div>
                ) : filteredUniversities.length ? (
                  filteredUniversities.map((u) => (
                    <div
                      key={u.id}
                      className="suggestion-item"
                      onMouseDown={() => handleSelectUniversity(u)}
                    >
                      <strong>{u.name}</strong>
                      {u.city && <span>{u.city}</span>}
                    </div>
                  ))
                ) : (
                  <div className="suggestion-item muted">
                    No universities found
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Select Lease Duration - No default selection */}
          <div className="search-field">
            <label>Lease Duration</label>
            <select 
              value={leaseDuration}
              onChange={(e) => setLeaseDuration(e.target.value)}
              className={leaseDuration ? "" : "text-muted"}
            >
              <option value="">Select</option>
              <option value="academic-year">Academic Year</option>
              <option value="fall-semester">Fall Semester</option>
              <option value="spring-semester">Spring Semester</option>
              <option value="summer-semester">Summer Semester</option>
              <option value="winter-semester">Winter Semester</option>
            </select>
          </div>

          {/* Price Slider */}
          <div className="search-field price_wrapper">
            <div className="d-flex flex-column">
              <label>Monthly Budget</label>

              <div className="d-flex justify-content-between mb-1">
                <span className="price-value text-dark">$ Max Price</span>
                <span className="price-value">${price}/mo</span>
              </div>

              <input
                type="range"
                min="500"
                max="5000"
                step="100"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                className="price-slider"
                style={{
                  "--fill-percent": `${((price - 500) / (5000 - 500)) * 100}%`,
                }}
              />
            </div>
          </div>

          <button className="search-btn" onClick={handleSearch}>
            Search
          </button>
        </div>

         {/* Display error message in red below the fields */}
        {error && (
          <div className="row mt-3">
            <div className="col-12">
              <div className="text-danger text-center fw-semibold" style={{ fontSize: "0.9rem" }}>
                <i className="bi bi-exclamation-circle me-1"></i>
                {error}
              </div>
            </div>
          </div>
        )}

       
      </div>
    </div>
  );
};

export default HousingSearchBar;