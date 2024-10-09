import { useState, useEffect } from 'react';

const useLineDrawing = (addEdge, edges, updateEdge) => {
    const [x1, setX1] = useState(null);
    const [y1, setY1] = useState(null);
    const [x2, setX2] = useState(null);
    const [y2, setY2] = useState(null);
    const [firstNodeId, setFirstNodeId] = useState(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [addEdgeIsChecked, setAddEdgeIsChecked] = useState(false);
  
    const handleMouseMove = (e) => {
      if (isDrawing && addEdgeIsChecked) {
        setX2(e.clientX);
        setY2(e.clientY);
      }
    };
  
    useEffect(() => {
      if (isDrawing) {
        document.addEventListener('mousemove', handleMouseMove);
      }
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
      };
    }, [isDrawing, addEdgeIsChecked]);
  
    const handleSelectVertex = (e, nodeId) => {
      if (addEdgeIsChecked) {
        if (firstNodeId == null) {
          const { centerX, centerY } = getDivCenterCoordinates(e.target);
          setX1(centerX);
          setY1(centerY);
          setX2(centerX);
          setY2(centerY);
          setIsDrawing(true);
          setFirstNodeId(nodeId);
        } else {
          // Handle edge addition logic
          if (firstNodeId !== nodeId) {
            const edgeExistsIndex = edges.findIndex(edge => edge.from === nodeId && edge.to === firstNodeId);
            const edgeExistsIndexTargetDirection = edges.findIndex(edge => edge.from === firstNodeId && edge.to === nodeId);
            if (edgeExistsIndex > -1) {
              updateEdge(nodeId, firstNodeId, true);
            } else if (edgeExistsIndexTargetDirection === -1) {
              addEdge(firstNodeId, nodeId);
            }
          }
          cancelDrawing();
        }
      }
    };
  
    const cancelDrawing = () => {
      setX1(null);
      setY1(null);
      setX2(null);
      setY2(null);
      setIsDrawing(false);
      setFirstNodeId(null);
    };
  
    return {
      x1,
      y1,
      x2,
      y2,
      isDrawing,
      handleSelectVertex,
      setAddEdgeIsChecked: (value) => setAddEdgeIsChecked(value),
      addEdgeIsChecked,
      cancelDrawing,
    };
  };
  
  function getDivCenterCoordinates(div) {
    const rect = div.getBoundingClientRect();
    return { centerX: rect.left, centerY: rect.top };
  }  

  export default useLineDrawing;