import { useState, useEffect } from 'react';

const useLineDrawing = (functionOnSelectedVertices ) => {
    const [x1, setX1] = useState(null);
    const [y1, setY1] = useState(null);
    const [x2, setX2] = useState(null);
    const [y2, setY2] = useState(null);
    const [firstNodeIndex, setFirstNodeIndex] = useState(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [mayUseLine, setMayUseLine] = useState(false);
  
    const handleMouseMove = (e) => {
      if (isDrawing && mayUseLine) {
        const containerRect = document.querySelector('#svg-container').getBoundingClientRect();

        // Calculating relative positions of x and y based on the offset of the SVG container and scrolling position.
        const x = e.clientX  - containerRect.left;
        const y = e.clientY  - containerRect.top;
        
        setX2(x);
        setY2(y);
      }
    };
  
    useEffect(() => {
      if (isDrawing) {
        document.addEventListener('mousemove', handleMouseMove);
      }
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
      };
    }, [isDrawing, mayUseLine]);
  
    const handleSelectVertex = (e, vertex) => {
      if (mayUseLine) {
        if (firstNodeIndex == null) {
          const centerX = vertex.x;
          const centerY = vertex.y;
          const vertexIndex = vertex.index;

          setX1(centerX);
          setY1(centerY);
          setX2(centerX);
          setY2(centerY);
          setIsDrawing(true);
          setFirstNodeIndex(vertexIndex);
        } else {
          
          // Handle edge addition logic
          functionOnSelectedVertices(firstNodeIndex, vertex.index);
          
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
      setFirstNodeIndex(null);
    };
  
    return {
      x1,
      y1,
      x2,
      y2,
      isDrawing,
      handleSelectVertex,
      setMayUseLine,
      mayUseLine,
      cancelDrawing,
    };
  };  

  export default useLineDrawing;