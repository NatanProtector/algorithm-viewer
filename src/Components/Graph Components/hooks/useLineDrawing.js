import { useState, useEffect } from 'react';

const useLineDrawing = () => {
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
  
    const handleSelectVertex = (e, vertex) => {
      if (addEdgeIsChecked) {
        if (firstNodeId == null) {
          const centerX = vertex.x;
          const centerY = vertex.y;
          const vertexId = vertex.id;

          setX1(centerX);
          setY1(centerY);
          setX2(centerX);
          setY2(centerY);
          setIsDrawing(true);
          setFirstNodeId(vertexId);
        } else {
          

          // Handle edge addition logic
          
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

  export default useLineDrawing;