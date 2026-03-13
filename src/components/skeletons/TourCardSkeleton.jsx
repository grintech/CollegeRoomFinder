import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const TourCardSkeleton = () => {
  return (
    <div className="tour_card_v2 mb-4">
      <div className="tour_image">
        <Skeleton height={130} borderRadius={8} />
      </div>

      <div className="tour_content ">
        <div className="tour_header flex-wrap mb-0">
          <Skeleton height={15} width={200} />
          <Skeleton height={15} width={90} />
        </div>

        <div className="mb-2">
          <Skeleton height={10} width="50%" />
        </div>

        <div className="tour_meta d-flex gap-3 mb-3">
          <Skeleton height={14} width={80} />
          <Skeleton height={14} width={90} />
          <Skeleton height={14} width={70} />
        </div>

        <div className="d-flex flex-wrap gap-3 justify-content-between align-items-center">
          <Skeleton height={18} borderRadius={6} width={90} />
          <div className="d-flex flex-wrap gap-3">
            <Skeleton height={25} width={60} />
            <Skeleton height={25} width={60} />
            <Skeleton height={25} width={60} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TourCardSkeleton