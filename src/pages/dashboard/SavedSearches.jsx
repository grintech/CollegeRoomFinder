import { Clock, Home } from "lucide-react";
import DashSidebar from "./DashSidebar";
import { redirect, useNavigate } from "react-router-dom";
import { useState } from "react";



const SavedSearches = () => {
    
    const [savedSearches, setSavedSearches] = useState([
        {
          id: 1,
          university: "University of Alabama",
          lease: "Academic Year",
          time: "Saved 3 days ago",
          price: 2000,
        },
        {
          id: 2,
          university: "Harvard University",
          lease: "Fall Semester",
          time: "Saved 5 days ago",
          price: 3000,
        },
        {
          id: 3,
          university: "University of Michigan",
          lease: "Spring Semester",
          time: "Saved 10 days ago",
          price: 2500,
        },
      ]);

    const navigate = useNavigate();

    const runSearch = (search) => {
    const params = new URLSearchParams({
        university: search.university,
        lease: search.lease,
        maxPrice: search.price
    });

     //   navigate(`/?${params.toString()}`);
     navigate(`/?${params}`);
    };

   const deleteSearch = (id) => {
    const updated = savedSearches.filter((search) => search.id !== id);
    setSavedSearches(updated);
   }

  return (
    <>
      <div className="my_account min_height">
        <div className="container py-4">
          <div className="row">
            <h1 className="mb-3 sec-title text-center">
              Saved Searches <span className="text_blue">({savedSearches.length})</span>
            </h1>

            <div className="col-lg-4 col-xl-3 mb-4 mb-lg-0">
              <DashSidebar />
            </div>

            <div className="col-lg-8 col-xl-9">

              {savedSearches.length === 0 ? (
               <div className="col-12 text-center bg-white p-5 shadow-sm rounded-3">
                    <Home size={40} className="text_theme" />
                    <h6 className="mt-3">
                       No saved searches yet.
                    </h6>
                  </div>
              ) : (
                <div className="row">
                  {savedSearches.map((search) => (
                    <div className="col-sm-6 col-xxl-4 mb-4" key={search.id}>
                      <div className="saved-search-card">

                        <h5 className="uni-name">{search.university}</h5>

                        <div className="search-meta">
                          <p>
                            <strong>Lease:</strong> {search.lease}
                          </p>

                          <p>
                            <strong>Max Budget:</strong> ${search.price}/mo
                          </p>
                        </div>
                        <p className="text-muted small mt-2 mb-0 d-flex align-items-center gap-1"> <Clock size={14} /> <span>{search.time}</span></p>

                        <div className="search-actions">
                          <button className="btn btn-primary btn-sm" 
                            onClick={() => runSearch(search)}
                           >
                            Run Search 
                          </button>

                          <button className="btn btn-outline-danger btn-sm" onClick={() => deleteSearch(search.id)}>
                            Remove
                          </button>
                        </div>

                      </div>
                    </div>
                  ))}
                </div>
              )}

            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SavedSearches;