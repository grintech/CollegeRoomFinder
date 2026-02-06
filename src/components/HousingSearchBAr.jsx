import { useState } from "react";

const universities = [
  { name: "University of Alabama", city: "Tuscaloosa, AL" },
  { name: "Texas A&M University", city: "College Station, TX" },
  { name: "Harvard University", city: "Cambridge, MA" },

  { name: "University of Notre Dame", city: "Notre Dame, IN" },
  { name: "University of Michigan", city: "Ann Arbor, MI" },
  { name: "University of Southern California (USC)", city: "Los Angeles, CA" },

  { name: "Penn State University", city: "University Park, PA" },
  { name: "University of Florida", city: "Gainesville, FL" },
  { name: "Florida State University", city: "Tallahassee, FL" },
  { name: "University of Miami", city: "Coral Gables, FL" },

  { name: "University of Maryland, College Park", city: "College Park, MD" },
  { name: "University of Maryland, Baltimore County (UMBC)", city: "Baltimore, MD" },
  { name: "Towson University", city: "Towson, MD" },
  { name: "Bowie State University", city: "Bowie, MD" },
  { name: "Morgan State University", city: "Baltimore, MD" },
];


const HousingSearchBar = ({ onSearch }) => {
 const [price, setPrice] = useState(5000);
  const [query, setQuery] = useState("");
  const [minBeds, setMinBeds] = useState("Any");
  const [showSuggestions, setShowSuggestions] = useState(false);

  const filteredUniversities = universities.filter((u) =>
    u.name.toLowerCase().includes(query.toLowerCase())
  );

  const handleSearch = () => {
    onSearch({
      university: query.trim(),
      maxPrice: price,
      minBeds: minBeds === "Any" ? 0 : Number(minBeds),
    });
  };

  return (
    <div className="search-wrapper">
      <div className="container">
      <div className="search-box">

        {/* University – double width */}
        <div className="search-field university-field suggestion-wrapper">
          <label>University</label>
          <input
            type="text"
            placeholder="Search for your university.."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setShowSuggestions(true);
            }}
            onFocus={() => query && setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
          />

          {/* Suggestions */}
          {showSuggestions && query && (
            <div className="suggestion-box">
              {filteredUniversities.length ? (
                filteredUniversities.map((u, i) => (
                  <div
                    key={i}
                    className="suggestion-item"
                    onClick={() => {
                      setQuery(u.name);
                      setShowSuggestions(false);
                    }}
                  >
                    <strong>{u.name}</strong>
                    <span>{u.city}</span>
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

        {/* Select Seasom */}
        <div className="search-field">
          <label>Lease Duration</label>
         {/* <select value={minBeds} onChange={(e) => setMinBeds(e.target.value)}> */}
         <select >
          <option >Select</option>
          <option value="academic-year">Academic Year</option>
          <option value="fall-semester">Fall Semester</option>
          <option value="spring-semester">Spring Semester</option>
          <option value="summer-semester">Summer Semester</option>
          <option value="winter-semester">Winter Semester</option>
        </select>

        </div>

        {/* Price Slider */}
        <div className="search-field price_wrapper">
          <div className=" d-flex flex-column">
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
              onChange={(e) => setPrice(e.target.value)}
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

      </div>
    </div>
  );
};

export default HousingSearchBar;
