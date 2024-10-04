import React from 'react';
import ControlPanel from '../Graph Components/ControlPanel';
import useEdges from '../Graph Components/hooks/useEdges';
import useVertices from '../Graph Components/hooks/useVertices';
import useLineDrawing from '../Graph Components/hooks/useLineDrawing';
import VertexList from '../Graph Components/Vertex/VertexList';
import EdgesList from '../Graph Components/Edge/EdgesList';


const ExperimentApp = () => {

  const {edges, addEdge, updateEdge} = useEdges([
    { id: 'edge1', from: 'node1', to: 'node2', twoWay: true },
    { id: 'edge2', from: 'node2', to: 'node3', twoWay: false}
  ]);

  const {vertices, addVertex, updateVertex} = useVertices(
    [
      { id: 'node1', x: 300, y: 300, color: 'red' },
      { id: 'node2', x: 400, y: 400, color: 'blue' },
      { id: 'node3', x: 500, y: 500, color: 'green' },
    ]
  );  

  const {
    x1,
    y1,
    x2,
    y2,
    handleSelectVertex,
    setAddEdgeIsChecked,
    addEdgeIsChecked,
    cancelDrawing,
  } = useLineDrawing(addEdge, edges, updateEdge);


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
        <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="black" strokeWidth={2} />
      </svg>


      <ControlPanel
        addVertex={addVertex}
        addEdgeIsChecked={addEdgeIsChecked}
        onAddEdgeChange={handleAddEdgeSelected}
        onReset={() => {console.log('Reset Clicked')}}
      />

      <VertexList
        vertices={vertices}
        updateVertex={updateVertex}
        addEdgeIsChecked={addEdgeIsChecked}
        handleSelectVertex={handleSelectVertex}
      />
      
      <EdgesList
        edges={edges}
      />
      
    </div>
  );
};

export default ExperimentApp;