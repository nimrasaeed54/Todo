import React, { useState, useRef } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

const SwipeToComplete = ({ onComplete }) => {
  const [dragging, setDragging] = useState(false);
  const [offset, setOffset] = useState(0);
  const sliderRef = useRef(null);
  const sliderBallWidth = 50;

  const handlePointerDown = () => {
    setDragging(true);
  };

  const handlePointerMove = (e) => {
    if (!dragging || !sliderRef.current) return;
    const rect = sliderRef.current.getBoundingClientRect();
   
    let newOffset = e.clientX - rect.left - sliderBallWidth / 2;
    const maxOffset = rect.width - sliderBallWidth;
    
    newOffset = Math.max(0, Math.min(newOffset, maxOffset));
    setOffset(newOffset);
  };

  const handlePointerUp = () => {
    if (!dragging || !sliderRef.current) return;
    setDragging(false);
    const rect = sliderRef.current.getBoundingClientRect();
    const maxOffset = rect.width - sliderBallWidth;
    
    if (offset >= maxOffset * 0.9) {
      setOffset(maxOffset);
      if (onComplete) onComplete(true);
    } else {
      setOffset(0);
    }
  };

  const isComplete =
    sliderRef.current &&
    offset >= (sliderRef.current.getBoundingClientRect().width - sliderBallWidth) * 0.9;

  return (
    <div
      ref={sliderRef}
      className="relative w-80 h-16 bg-[#111C2E] rounded-full flex items-center select-none"
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
    >
      <div className="absolute inset-0 flex justify-center items-center text-xl font-bold text-gray-700">
        {isComplete ? "Task Completed" : "Set As Done"}
      </div>
 
      <div
        onPointerDown={handlePointerDown}
        className="absolute w-12 h-12 bg-gray-300 rounded-full shadow-md flex items-center justify-center text-lg font-bold"
        style={{ transform: `translateX(${offset}px)`, touchAction: 'none' }}
      >
        {isComplete ? (
          <FontAwesomeIcon icon={faCheck} style={{ color: "#111C2E" }} />
        ) : (
          <FontAwesomeIcon icon={faCheck} style={{ color: "#111C2E" }} />
        )}
      </div>
    </div>
  );
};

export default SwipeToComplete;
