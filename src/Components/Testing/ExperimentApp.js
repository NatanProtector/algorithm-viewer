import React from 'react';
import ControlPanel from '../Graph Components/ControlPanel';
import useLineDrawing from '../Graph Components/hooks/useLineDrawing';
import VertexList from '../Graph Components/Vertex/VertexList';
import EdgesList from '../Graph Components/Edge/EdgesList';
import Arrow from '../Graph Components/Edge/Arrow';
import useGraph from '../Graph Components/hooks/useGraph';

const ExperimentApp = () => {

  const graph_initial = [
    { index: 0, x: 300, y: 300, color: 'red', adjacent: [1] },
    { index: 1, x: 300, y: 400, color: 'blue', adjacent: [0] },
    { index: 2, x: 400, y: 300, color: 'green', adjacent: [1] },
  ]

const {graph,addEdge,addVertex,removeVertex, removeEdge,updateVertexLocation} = useGraph(graph_initial);
  

  const {
    x1,
    y1,
    x2,
    y2,
    handleSelectVertex,
    setAddEdgeIsChecked,
    addEdgeIsChecked,
    cancelDrawing
  } = useLineDrawing(addEdge);


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
        updateVertex={updateVertexLocation}
        addEdgeIsChecked={addEdgeIsChecked}
        addEdge={addEdge}
        handleSelectVertex={handleSelectVertex}
      />      

      </svg>
      
      <ControlPanel
        addVertex={addVertex}
        addEdgeIsChecked={addEdgeIsChecked}
        onAddEdgeChange={handleAddEdgeSelected}
        onReset={() => {console.log('Reset Clicked')}}
      />    

    </div>
  );
};

export default ExperimentApp;