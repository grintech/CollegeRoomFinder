import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const SimilarListingSkeleton = () => {
  return (
    <div className="col-xxl-3 col-lg-4 col-md-6">
      <div className="listing-card">

        {/* Image */}
        <div className="listing-image">
          <Skeleton height={220} style={{top:"-4px"}} className="rounded-top"  />
        </div>

        <div className="listing-body">

          {/* Title */}
          <h5>
            <Skeleton width="80%" height={20} />
          </h5>

          {/* University */}
          <p>
            <Skeleton width="60%" height={14} />
          </p>

          {/* Features */}
          <div className="listing-features d-flex gap-3 mb-2">
            <Skeleton width={60} height={14} />
            <Skeleton width={60} height={14} />
            <Skeleton width={60} height={14} />
          </div>

          {/* Price */}
          <div className="listing-price">
            <Skeleton width={120} height={25} />
          </div>

        </div>
      </div>
    </div>
  );
};

export default SimilarListingSkeleton;