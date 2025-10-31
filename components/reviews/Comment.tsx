"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

function Comment({ comment = "" }: { comment: string }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const longComment = comment.length > 130;
  const displayComment =
    longComment && !isExpanded ? `${comment.slice(0, 130)}...` : comment;

  function toggleExpanded() {
    setIsExpanded((prev) => !prev);
  }

  return (
    <div>
      <p className="text-sm">{displayComment}</p>
      {longComment && (
        <Button
          variant="link"
          className="text-muted-foreground pl-0"
          onClick={toggleExpanded}
        >
          {isExpanded ? "Show less" : "Show more"}
        </Button>
      )}
    </div>
  );
}

export default Comment;
