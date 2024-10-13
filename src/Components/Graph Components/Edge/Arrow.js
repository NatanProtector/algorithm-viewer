import React from 'react';
import Xarrow from 'react-xarrows';

const markerId = "arrowhead";

const Arrow = ({ startX, startY, endX, endY }) => {


  return (
    <>
      <defs>
        <marker id={markerId} markerWidth="10" markerHeight="10" refX="5" refY="3" orient="auto">
          <polygon points="0 0, 10 3, 0 6" fill="black" />
        </marker>
      </defs>
      <line 
        x1={startX} 
        y1={startY} 
        x2={endX} 
        y2={endY} 
        stroke="black" 
        strokeWidth="2" 
        markerEnd={`url(#${markerId})`} 
      />
    </>
  )

};

export default Arrow;
