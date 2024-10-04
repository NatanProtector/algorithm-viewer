import React, { useState, useEffect } from 'react';
import Xarrow from "react-xarrows";
import Vertex from '../Graph Components/Vertex';  // Updated import
import { Button, Checkbox, FormControlLabel } from '@mui/material';

const colors = [
  "red", "blue", "green", "yellow", "orange", "purple", "pink", "brown",
  "gray", "black", "white", "cyan", "magenta", "lime", "indigo", "violet",
  "gold", "silver", "teal", "maroon"
];

const ExperimentApp = () => {
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

  const [x1, setX1] = useState(null);
  const [y1, setY1] = useState(null);
  const [x2, setX2] = useState(null);
  const [y2, setY2] = useState(null);
  const [firstNodeId, setFirstNodeId] = useState(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [addEdgeIsChecked, setAddEdgeIsChecked] = useState(false);
  const [edges, setEdges] = useState([
    { id: 'edge1', from: 'node1', to: 'node2', twoWay: true },
    { id: 'edge2', from: 'node2', to: 'node3', twoWay: false},
  ]);

  const [vertices, setVertices] = useState([
    { id: 'node1', x: 300, y: 300, color: 'red' },
    { id: 'node2', x: 400, y: 400, color: 'blue' },
    { id: 'node3', x: 500, y: 500, color: 'green' },
  ]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (isDrawing && addEdgeIsChecked) {
        setX2(e.clientX);
        setY2(e.clientY);
      }
    };

    if (isDrawing) {
      document.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isDrawing, addEdgeIsChecked]);

  const updateVertex = (id, newX, newY) => {
    setVertices((prevVertices) =>
      prevVertices.map((vertex) =>
        vertex.id === id ? { ...vertex, x: newX, y: newY } : vertex
      )
    );
  };

  const addVertex = () => {
    let size = vertices.length;
    if (size < 20) {
      const newVertex = { id: `node${vertices.length + 1}`, x: 100, y: 100, color: colors[size] };
      setVertices([...vertices, newVertex]);
    }
  };

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
        if (firstNodeId !== nodeId) {
          let edgeExistsIndex = edges.findIndex(edge => edge.from === nodeId && edge.to === firstNodeId);
          let edgeExistsIndexTargetDirection = edges.findIndex(edge => edge.from === firstNodeId && edge.to === nodeId);

          if (edgeExistsIndex > -1) {
            edges[edgeExistsIndex].twoWay = true;
          } else if (edgeExistsIndexTargetDirection === -1) {
            let size = edges.length;
            let newEdge = { id: `edge${size + 1}`, from: firstNodeId, to: nodeId, twoWay: false };
            setEdges([...edges, newEdge]);
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

  const handleAddEdgeSelected = () => {
    if (addEdgeIsChecked) {
      cancelDrawing();
    }
    setAddEdgeIsChecked(!addEdgeIsChecked);
  };

  function getDivCenterCoordinates(div) {
    const rect = div.getBoundingClientRect();
    return { centerX: rect.left, centerY: rect.top };
  }

  return (
    <div>
      {/* SVG container for drawing lines */}
      <svg width="800" height="600" style={{ border: '1px solid black' }}>
        <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="black" strokeWidth={2} />
      </svg>

      {/* Button and Checkbox */}
      <Button variant="contained" onClick={addVertex}>
        New Vertex
      </Button>

      <FormControlLabel
        control={<Checkbox {...label} checked={addEdgeIsChecked} onChange={handleAddEdgeSelected} />}
        label="Add Edge"
      />

      {/* Vertices and Edges */}
      {
        vertices.map((vertex) => {
          const setVertexXY = (x, y) => updateVertex(vertex.id, x, y);
          return (
            <Vertex
              key={vertex.id}
              vertex_x={vertex.x}
              vertex_y={vertex.y}
              set_vertex_x_y={setVertexXY}
              color={vertex.color}
              vertex_id={vertex.id}
              addEdgeIsChecked={addEdgeIsChecked}
              onClick={(e) => handleSelectVertex(e, vertex.id)}
            />
          );
        })
      }

      {/* Xarrow for edges */}
      {
        edges.map((edge) => (
          <Xarrow
            key={edge.id}
            start={edge.from}
            end={edge.to}
            showTail={edge.twoWay}
            startAnchor="auto"
            endAnchor="auto"
          />
        ))
      }
    </div>
  );
};

export default ExperimentApp;