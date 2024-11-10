import React, { useState, useEffect } from 'react';

const Vertex = ({ vertex_x, vertex_y, set_vertex_x_y, vertex_index, addEdgeIsChecked, onClick, radius }) => {
  const [isHighlighted, setIsHighlighted] = useState(false);
  const [vertexIsMoving, setVertexIsMoving] = useState(false);

  const handleDragStart = (e) => {
    if (!addEdgeIsChecked) setVertexIsMoving(true);
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (vertexIsMoving) {
        const containerRect = document.querySelector('#svg-container').getBoundingClientRect();

        // Calculating relative positions of x and y based on the offset of the SVG container and scrolling position.
        const x = e.clientX - containerRect.left;
        const y = e.clientY - containerRect.top;

        set_vertex_x_y(x, y);
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
    <g>
      <circle
        cx={vertex_x}
        cy={vertex_y}
        r={`${radius}`}  // Circle radius
        fill="blue"  // Always blue
        stroke={isHighlighted ? 'black' : 'none'}
        strokeWidth={isHighlighted ? '2' : '0'}
        style={{ cursor: isHighlighted ? 'pointer' : 'move', pointerEvents: 'auto' }} // Allow interaction with the circle
        id={vertex_index}
        onMouseDown={handleDragStart}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={onClick}
      />
      <text
        x={vertex_x}
        y={vertex_y}
        textAnchor="middle"  // Center the text horizontally
        dominantBaseline="middle"  // Center the text vertically
        fill="white"
        fontSize="16"
        pointerEvents="none"  // Prevent the text from interfering with interactions
      >
        {vertex_index + 1}
      </text>
    </g>
  );
};

export default Vertex;
