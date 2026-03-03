import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ListingSkeleton = ({ count = 6 }) => {
  return (
    <>
      {Array(count)
        .fill(0)
        .map((_, index) => (
          <div className="col-lg-4 col-md-6" key={index}>
            <div className="listing-card">

              {/* Image */}
              <div className="listing-image" style={{ marginTop: "-5px" }} >
                <Skeleton height={230} width="100%"  borderRadius={0} />
              </div>

              <div className="listing-body ">

                {/* Title */}
                <Skeleton height={20} width="80%" />

                {/* University */}
                <Skeleton height={15} width="60%" className="mt-2" />

                {/* Features */}
               <div className="d-flex gap-2 mt-2">
                <Skeleton height={20} width={60} />
                <Skeleton height={20} width={60} />
                <Skeleton height={20} width={60} />
                </div>

                {/* Price */}
                <Skeleton height={30} width="40%"  className="mt-3" />

              </div>
            </div>
          </div>
        ))}
    </>
  );
};

export default ListingSkeleton;