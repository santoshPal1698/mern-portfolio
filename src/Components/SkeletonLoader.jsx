import React from "react";
import { Skeleton } from "boneyard-js";

/**
 * Reusable Skeleton Loader
 * Props:
 *  - variant: "text" | "circle" | "card"
 *  - count: number
 */

const SkeletonLoader = ({ variant = "text", count = 3 }) => {
  // TEXT SKELETON (for paragraphs, headings)
  if (variant === "text") {
    return (
      <>
        {Array(count)
          .fill(0)
          .map((_, i) => (
            <Skeleton key={i} height={20} width="100%" />
          ))}
      </>
    );
  }

  // CIRCLE SKELETON (for profile image)
  if (variant === "circle") {
    return (
      <Skeleton height={250} width={250} style={{ borderRadius: "50%" }} />
    );
  }

  // CARD SKELETON (for projects)
  if (variant === "card") {
    return (
      <>
        {Array(count)
          .fill(0)
          .map((_, i) => (
            <div key={i} style={{ marginBottom: "20px" }}>
              <Skeleton height={150} width="100%" />
              <Skeleton height={20} width="80%" />
              <Skeleton height={20} width="60%" />
            </div>
          ))}
      </>
    );
  }

  return null;
};

export default SkeletonLoader;
