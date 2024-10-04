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
        set_vertex_x_y(e.clientX - 15, e.clientY - 15);
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
    <div
      style={{
        width: '30px',
        height: '30px',
        backgroundColor: color,
        position: 'fixed',
        top: `${vertex_y}px`,
        left: `${vertex_x}px`,
        borderRadius: '50%',
        cursor: isHighlighted ? 'pointer' : 'move',
        border: isHighlighted ? '2px solid black' : null,
      }}
      id={vertex_id}
      onMouseDown={handleDragStart}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    />
  );
};

export default Vertex;
