import React from "react";
import SentionTitle from "../../components/SentionTitle";

const BusinessSummary = () => {
  return (
    <div>
      <SentionTitle>We served hundreds</SentionTitle>
      <div className="w-full  flex justify-center my-10">
        <div class="stats stats-vertical lg:stats-horizontal shadow text-center">
          <div class="stat">
            <div class="stat-title">Customer Served</div>
            <div class="stat-value">31K</div>
            <div class="stat-desc">Jan 1st - Feb 1st</div>
          </div>

          <div class="stat">
            <div class="stat-title">Reviews</div>
            <div class="stat-value">4,200</div>
            <div class="stat-desc">↗︎ 400 (22%)</div>
          </div>

          <div class="stat">
            <div class="stat-title">Annual Revenue</div>
            <div class="stat-value">$120M+</div>
            <div class="stat-desc">↗︎ 90 (14%)</div>
          </div>
          <div class="stat">
            <div class="stat-title">Products</div>
            <div class="stat-value">20+</div>
            <div class="stat-desc">↗︎ 90 (14%)</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessSummary;
