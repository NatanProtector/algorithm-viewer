import React, { useState, useEffect } from 'react';

const Vertex = ({ vertex_x, vertex_y, set_vertex_x_y, vertex_id, color, addEdgeIsChecked, onClick }) => {
  const [isHighlighted, setIsHighlighted] = useState(false);
  const [vertexIsMoving, setVertexIsMoving] = useState(false);

  const handleDragStart = (e) => {
    if (!addEdgeIsChecked) setVertexIsMoving(true);
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (vertexIsMoving) {
        set_vertex_x_y(e.clientX, e.clientY);  // Adjust for the center of the circle
      }
    };

    const handleMouseUp = () => {
      setVertexIsMoving(false);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [vertexIsMoving, set_vertex_x_y]);

  const handleMouseEnter = () => {
    if (addEdgeIsChecked) setIsHighlighted(true);
  };

  const handleMouseLeave = () => {
    setIsHighlighted(false);
  };

  return (
    <svg
      width="100vw"
      height="100vh"
      style={{ position: 'fixed', top: 0, left: 0, pointerEvents: 'none' }} // Full-screen, fixed background
    >
      <circle
        cx={vertex_x}
        cy={vertex_y}
        r="15"  // Circle radius
        fill={color}
        stroke={isHighlighted ? 'black' : 'none'}
        strokeWidth={isHighlighted ? '2' : '0'}
        style={{ cursor: isHighlighted ? 'pointer' : 'move', pointerEvents: 'auto' }} // Allow interaction with the circle
        id={vertex_id}
        onMouseDown={handleDragStart}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={onClick}
      />
    </svg>
  );
};

export default Vertex;
