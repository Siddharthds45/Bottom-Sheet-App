import { useRef, useState, useEffect } from 'react';

const useBottomSheet = () => {
  const sheetRef = useRef(null);
  const contentRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startY, setStartY] = useState(0);
  const [startPosition, setStartPosition] = useState(0);
  const [currentSnap, setCurrentSnap] = useState(0);
  
  // Snap points (in pixels from top of screen)
  const snapPoints = {
    closed: window.innerHeight - 80, // Only header visible
    half: window.innerHeight / 2,
    full: 100 // Almost fully open
  };

  // Initialize to closed position
  useEffect(() => {
    setCurrentSnap(snapPoints.closed);
  }, []);

  const handleTouchStart = (e) => {
    setIsDragging(true);
    setStartY(e.touches[0].clientY);
    setStartPosition(currentSnap);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    
    const y = e.touches[0].clientY;
    const deltaY = y - startY;
    let newPosition = startPosition + deltaY;
    
    // Limit movement between full open and closed
    newPosition = Math.max(snapPoints.full, Math.min(snapPoints.closed, newPosition));
    
    setCurrentSnap(newPosition);
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    
    // Find closest snap point
    const distances = {
      closed: Math.abs(currentSnap - snapPoints.closed),
      half: Math.abs(currentSnap - snapPoints.half),
      full: Math.abs(currentSnap - snapPoints.full)
    };
    
    const closestSnap = Object.keys(distances).reduce((a, b) => 
      distances[a] < distances[b] ? a : b
    );
    
    snapTo(closestSnap);
  };

  const snapTo = (point) => {
    setCurrentSnap(snapPoints[point]);
  };

  return {
    sheetRef,
    contentRef,
    isDragging,
    currentSnap,
    startY,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    snapTo
  };
};

export default useBottomSheet;