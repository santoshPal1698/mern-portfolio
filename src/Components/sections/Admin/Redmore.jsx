import React, { useState } from "react";

const ReadMoreText = ({
  text = "",
  maxLength = 70,
  moreLabel = "Read more...",
  lessLabel = "Read less",
  color = "#2575fc",
}) => {
  const [expanded, setExpanded] = useState(false);

  const isLong = text.length > maxLength;
  const displayText =
    expanded || !isLong ? text : text.slice(0, maxLength) + "...";

  return (
    <span>
      {displayText}
      {isLong && (
        <span
          onClick={() => setExpanded((prev) => !prev)}
          style={{
            color,
            cursor: "pointer",
            fontWeight: 600,
            marginLeft: 6,
            userSelect: "none",
          }}
        >
          {expanded ? lessLabel : moreLabel}
        </span>
      )}
    </span>
  );
};

export default ReadMoreText;
