import React from "react";

const PropertySingleSkeleton = () => {
  return (
    <div className="container py-4">
      <div className="row g-4">

        {/* LEFT CONTENT */}
        <div className="col-lg-8">

          {/* Image Slider */}
          <div className="skeleton skeleton-img mb-3"></div>

          {/* Title + price */}
          <div className="card border-0 shadow-sm mb-3 p-3">
            <div className="skeleton skeleton-title mb-2"></div>
            <div className="skeleton skeleton-text w-50"></div>
          </div>

          {/* About Property */}
          <div className="card border-0 shadow-sm mb-3 p-3">
            <div className="skeleton skeleton-title mb-3"></div>
            <div className="skeleton skeleton-text"></div>
            <div className="skeleton skeleton-text"></div>
            <div className="skeleton skeleton-text w-75"></div>
          </div>

          {/* Amenities */}
          <div className="card border-0 shadow-sm mb-3 p-3">
            <div className="skeleton skeleton-title mb-3"></div>

            <div className="d-flex gap-2">
              <div className="skeleton skeleton-chip"></div>
              <div className="skeleton skeleton-chip"></div>
              <div className="skeleton skeleton-chip"></div>
            </div>
          </div>

          {/* Rental Details */}
          <div className="card border-0 shadow-sm mb-3 p-3">
            <div className="skeleton skeleton-title mb-3"></div>
            <div className="row">
              <div className="col-6">
                <div className="skeleton skeleton-text mb-2"></div>
                <div className="skeleton skeleton-text"></div>
              </div>
              <div className="col-6">
                <div className="skeleton skeleton-text mb-2"></div>
                <div className="skeleton skeleton-text"></div>
              </div>
            </div>
          </div>

        </div>

        {/* RIGHT SIDEBAR */}
        <div className="col-lg-4">

          {/* Owner Card */}
          <div className="card border-0 shadow-sm mb-3 p-3">
            <div className="skeleton skeleton-avatar mb-2"></div>
            <div className="skeleton skeleton-text mb-2"></div>
            <div className="skeleton skeleton-text w-75"></div>
          </div>

          {/* Buttons */}
          <div className="card border-0 shadow-sm mb-3 p-3">
            <div className="skeleton skeleton-btn mb-2"></div>
            <div className="skeleton skeleton-btn"></div>
          </div>

          {/* Sponsor */}
          <div className="card border-0 shadow-sm mb-3 p-3">
            <div className="skeleton skeleton-img-sm"></div>
          </div>

          {/* Quick Facts */}
          <div className="card border-0 shadow-sm mb-3 p-3">
            <div className="skeleton skeleton-title mb-3"></div>
            <div className="skeleton skeleton-text mb-2"></div>
            <div className="skeleton skeleton-text mb-2"></div>
            <div className="skeleton skeleton-text"></div>
          </div>

          {/* Map */}
          <div className="card border-0 shadow-sm p-3">
            <div className="skeleton skeleton-map"></div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default PropertySingleSkeleton;