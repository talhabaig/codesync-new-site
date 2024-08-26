"use client";
import React, { useState } from "react";

import Icon from "../icon";
import { Caption1Semibold } from "../caption/CaptionSemibold";
import { Caption } from "../caption/Caption";

interface ReadMoreProps {
  maxLength: number;
  children: React.ReactNode;
  className?: string;
  readMore?: boolean;
}

export const FeedReadMore: React.FC<ReadMoreProps> = ({
  maxLength,
  children,
  className,
  readMore,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const text = String(children);

  const displayText = isExpanded ? text : text.slice(0, maxLength);

  const handleToggleReadMore = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="flex flex-col gap-2 justify-start items-start">
      <Caption className={`text-gray-900 ${className}`}>
        {displayText}
        {!isExpanded && text.length > maxLength && <span>...</span>}
      </Caption>
      {text.length > maxLength && (
        <button onClick={handleToggleReadMore}>
          <Caption1Semibold className="cursor-pointer text-[#0693EB] flex items-center">
            {isExpanded ? (readMore ? "Read Less" : "less") : (readMore ? "Read More" : "View more")}
            <Icon name="right-arrow" size="md" />
          </Caption1Semibold>
        </button>
      )}
    </div>
  );
};
