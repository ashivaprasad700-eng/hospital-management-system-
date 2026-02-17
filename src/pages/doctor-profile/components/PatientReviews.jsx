import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const PatientReviews = ({ reviews, overallRating, totalReviews }) => {
  const [showAllReviews, setShowAllReviews] = useState(false);
  const displayedReviews = showAllReviews ? reviews : reviews?.slice(0, 3);

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Icon
        key={index}
        name="Star"
        size={16}
        className={index < rating ? 'text-warning fill-current' : 'text-muted-foreground'}
      />
    ));
  };

  const getRatingDistribution = () => {
    const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    reviews?.forEach(review => {
      distribution[review.rating]++;
    });
    return distribution;
  };

  const ratingDistribution = getRatingDistribution();

  return (
    <div className="bg-surface border border-border rounded-lg healthcare-shadow">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Patient Reviews</h3>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              {renderStars(Math.floor(overallRating))}
            </div>
            <span className="text-sm text-muted-foreground">
              {overallRating} ({totalReviews} reviews)
            </span>
          </div>
        </div>

        {/* Rating Distribution */}
        <div className="space-y-2">
          {[5, 4, 3, 2, 1]?.map((rating) => (
            <div key={rating} className="flex items-center gap-3">
              <span className="text-sm text-muted-foreground w-8">{rating}</span>
              <Icon name="Star" size={14} className="text-warning fill-current" />
              <div className="flex-1 bg-muted rounded-full h-2">
                <div
                  className="bg-warning h-2 rounded-full"
                  style={{
                    width: `${totalReviews > 0 ? (ratingDistribution?.[rating] / totalReviews) * 100 : 0}%`
                  }}
                />
              </div>
              <span className="text-sm text-muted-foreground w-8">
                {ratingDistribution?.[rating]}
              </span>
            </div>
          ))}
        </div>
      </div>
      {/* Individual Reviews */}
      <div className="p-6">
        <div className="space-y-6">
          {displayedReviews?.map((review, index) => (
            <div key={index} className="border-b border-border last:border-b-0 pb-6 last:pb-0">
              <div className="flex items-start gap-4">
                <Image
                  src={review?.patientAvatar}
                  alt={review?.patientName}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <div className="font-medium text-foreground">{review?.patientName}</div>
                      <div className="text-sm text-muted-foreground">{review?.date}</div>
                    </div>
                    <div className="flex items-center gap-1">
                      {renderStars(review?.rating)}
                    </div>
                  </div>
                  
                  <p className="text-muted-foreground text-sm leading-relaxed mb-3">
                    {review?.comment}
                  </p>
                  
                  {review?.treatmentType && (
                    <div className="flex items-center gap-2">
                      <Icon name="Stethoscope" size={14} className="text-primary" />
                      <span className="text-xs text-primary bg-primary/10 px-2 py-1 rounded-full">
                        {review?.treatmentType}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {reviews?.length > 3 && (
          <div className="mt-6 text-center">
            <button
              onClick={() => setShowAllReviews(!showAllReviews)}
              className="text-primary hover:text-primary/80 text-sm font-medium healthcare-transition"
            >
              {showAllReviews ? 'Show Less Reviews' : `View All ${totalReviews} Reviews`}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientReviews;