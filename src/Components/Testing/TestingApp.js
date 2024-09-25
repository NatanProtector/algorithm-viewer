import React, { useState, useRef } from 'react';
import { useSpring, animated } from '@react-spring/web';
import Xarrow from "react-xarrows";

const ExperimentApp = () => {
  // Define animation properties and set state
  const [props, set] = useSpring(() => ({
    from: { r: 20 },
    config: { tension: 170, friction: 12 },
  }));

  // States for drawing line
  const [x1, setX1] = useState(null);
  const [y1, setY1] = useState(null);
  const [x2, setX2] = useState(null);
  const [y2, setY2] = useState(null);
  const [isDrawing, setIsDrawing] = useState(false);

  // States for moving nodes
  const [nodeOneIsMoving, setNodeOneIsMoving] = useState(false);
  const [nodeTwoIsMoving, setNodeTwoIsMoving] = useState(false);
  const [node1_x, set_node1_x] = useState(500);
  const [node1_y, set_node1_y] = useState(400);
  const [node2_x, set_node2_x] = useState(500);
  const [node2_y, set_node2_y] = useState(500);

  const handleDragStart = (set_is_moving) => {
    set_is_moving(true);
  };

  const handleDragEnd = (set_is_moving) => {
    set_is_moving(false);
  };

  const handleDragMove = (e, set_node_x, set_node_y, isMoving) => {
    if (isMoving) {
      set_node_x(e.clientX);
      set_node_y(e.clientY);
    }
  };

  React.useEffect(() => {
    const handleMouseMove = (e) => {
      if (nodeOneIsMoving) {
        set_node1_x(e.clientX);
        set_node1_y(e.clientY);
      } else if (nodeTwoIsMoving) {
        set_node2_x(e.clientX);
        set_node2_y(e.clientY);
      }
    };

    const handleMouseUp = () => {
      setNodeOneIsMoving(false);
      setNodeTwoIsMoving(false);
    };

    // Attach event listeners to document
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    // Clean up event listeners
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [nodeOneIsMoving, nodeTwoIsMoving]);

  const handleMouseDown = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setX1(x);
    setY1(y);
    setX2(x);
    setY2(y);

    setIsDrawing(true);
  };

  const handleMouseMove = (e) => {
    if (!isDrawing) return; // Only draw when mouse is down

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setX2(x); // Update only the end coordinates
    setY2(y);
  };

  const handleMouseUp = () => {
    setIsDrawing(false); // Stop drawing
  };

  return (
    <>
      <svg width="400" height="400" style={{ border: '1px solid black' }}>
        {/* Clickable and Animated Circle */}
        <animated.circle
          cx="200"
          cy="200"
          r={props.r}
          fill="red"
          onClick={() => {
            let currentR = props.r.get();
            let new_r = { r: 20 };
            if (currentR === 20) new_r.r = 50;
            set(new_r);
          }}
        />
      </svg>

      <svg
        width="400"
        height="400"
        style={{ border: '1px solid black' }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        {/* Line being drawn */}
        <line
          x1={x1} y1={y1} x2={x2} y2={y2}
          stroke="black"
          strokeWidth={2}
        />
      </svg>

      <div
        style={{
          width: '30px',
          height: '30px',
          backgroundColor: 'red',
          position: 'fixed',
          top: `${node1_y}px`, // Corrected to match Y for top
          left: `${node1_x}px`, // Corrected to match X for left
          borderRadius: '50%',
          cursor: 'move',
        }}
        id='div1'
        onMouseDown={() => handleDragStart(setNodeOneIsMoving)}
      />

      <div
        style={{
          width: '30px',
          height: '30px',
          backgroundColor: 'blue',
          position: 'fixed',
          top: `${node2_y}px`,
          left: `${node2_x}px`,
          borderRadius: '50%',
          cursor: 'move',
        }}
        id='div2'
        onMouseDown={() => handleDragStart(setNodeTwoIsMoving)}
      />

      {/* Xarrow connecting the circles by their IDs */}
      <Xarrow
        start="div1"
        end="div2"
      />

    </>
  );
};

export default ExperimentApp;
