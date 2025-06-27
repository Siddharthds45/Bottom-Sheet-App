import React from 'react';
import './BottomSheet.css';
import useBottomSheet from './useBottomSheet';

const BottomSheet = ({ children }) => {
  const {
    sheetRef,
    contentRef,
    isDragging,
    currentSnap,
    startY,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    snapTo
  } = useBottomSheet();

  return (
    <div className="bottom-sheet-container">
      <div 
        ref={sheetRef}
        className={`bottom-sheet ${isDragging ? 'dragging' : ''}`}
        style={{ 
          transform: `translateY(${currentSnap}px)`,
          transition: isDragging ? 'none' : 'transform 0.3s cubic-bezier(0.17, 0.67, 0.12, 0.99)'
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="bottom-sheet-header">
          <div className="bottom-sheet-handle" />
        </div>
        <div ref={contentRef} className="bottom-sheet-content">
          {children}
        </div>
      </div>
      
      <div className="bottom-sheet-controls">
        <button onClick={() => snapTo('closed')}>Close</button>
        <button onClick={() => snapTo('half')}>Half Open</button>
        <button onClick={() => snapTo('full')}>Full Open</button>
      </div>
    </div>
  );
};

export default BottomSheet;