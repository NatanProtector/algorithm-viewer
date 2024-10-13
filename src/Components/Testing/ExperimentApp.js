import React from 'react';
import ControlPanel from '../Graph Components/ControlPanel';
import useEdges from '../Graph Components/hooks/useEdges';
import useVertices from '../Graph Components/hooks/useVertices';
import useLineDrawing from '../Graph Components/hooks/useLineDrawing';
import VertexList from '../Graph Components/Vertex/VertexList';
import EdgesList from '../Graph Components/Edge/EdgesList';
import Arrow from '../Graph Components/Edge/Arrow';


const ExperimentApp = () => {

  const graph = [
    { index: 0, id: 'vertex0', x: 300, y: 300, color: 'red', adjacent: [1] },
    { index: 1, id: 'vertex1', x: 300, y: 400, color: 'blue', adjacent: [0] },
    { index: 2, id: 'vertex2', x: 400, y: 300, color: 'green', adjacent: [1] },
  ]  

  const {
    x1,
    y1,
    x2,
    y2,
    handleSelectVertex,
    setAddEdgeIsChecked,
    addEdgeIsChecked,
    cancelDrawing
  } = useLineDrawing();


  const handleAddEdgeSelected = () => {
    if (addEdgeIsChecked) {
      cancelDrawing();
    }
    setAddEdgeIsChecked(!addEdgeIsChecked);
  };

  return (
    <div>
      
      {/* SVG container for drawing lines */}
      <svg width="800" height="600" style={{ border: '1px solid black' }}>
        <Arrow
          startX={x1}
          startY={y1}
          endX={x2}
          endY={y2}
        />

      <EdgesList
        graph={graph}
        radius={25}
      /> 
      

      <VertexList
        graph={graph}
        updateVertex={(id, x, y)=>{console.log("Updating vertex", id,"to", x, y);}}
        addEdgeIsChecked={addEdgeIsChecked}
        handleSelectVertex={handleSelectVertex}
      />      

      </svg>
      
      <ControlPanel
        addVertex={(e)=>{console.log("Adding vertex")}}
        addEdgeIsChecked={addEdgeIsChecked}
        onAddEdgeChange={handleAddEdgeSelected}
        onReset={() => {console.log('Reset Clicked')}}
      />    

    </div>
  );
};

export default ExperimentApp;