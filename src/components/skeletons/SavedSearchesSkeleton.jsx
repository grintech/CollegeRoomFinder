import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const SavedSearchesSkeleton = () => {
  return (
    <div className="row">
      {[...Array(6)].map((_, i) => (
        <div className="col-sm-6 col-xxl-4 mb-4" key={i}>
          <div className="saved-search-card">

            <h5 className="uni-name">
              <Skeleton height={20} width="70%" />
            </h5>

            <div className="search-meta">
              <p>
                <Skeleton width="80%" />
              </p>
              <p>
                <Skeleton width="60%" />
              </p>
            </div>

            <p className="mt-2">
              <Skeleton width="50%" height={12} />
            </p>

            <div className="search-actions d-flex gap-2 mt-3">
              <Skeleton height={30} width={90} />
              <Skeleton height={30} width={35} />
            </div>

          </div>
        </div>
      ))}
    </div>
  );
};

export default SavedSearchesSkeleton;