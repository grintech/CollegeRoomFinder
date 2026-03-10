import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ContactedHostsSkeleton = ({ count = 3 }) => {
  return (
    <>
      {[...Array(count)].map((_, index) => (
        <div className="col-12" key={index}>
          <div className="contact-card p-3 shadow-sm rounded-3 bg-white mb-3">
            <div className="row align-items-start">

              {/* Image */}
              <div className="col-md-3 mb-3 mb-md-0">
                <Skeleton height={130} className="rounded-3" />
              </div>

              {/* Content */}
              <div className="col-md-6">
                <h5 className="mb-1">
                  <Skeleton width="70%" height={20} />
                </h5>

                <p className="mb-1">
                  <Skeleton width="40%" height={10} />
                </p>

                <p className="mb-1">
                  <Skeleton width="35%" height={10} />
                </p>

                <p className="mb-1">
                  <Skeleton width="40%" height={10} />
                </p>
                <p className="mb-1">
                  <Skeleton width="50%" height={10} />
                </p>

               
              </div>

              {/* Right side buttons */}
              <div className="col-md-3 text-md-end mt-3 mt-md-0">
                <div className="mb-3">
                  <Skeleton width={70} height={25} />
                </div>

                <Skeleton width={120} height={35} />
              </div>

            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default ContactedHostsSkeleton;