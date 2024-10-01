import React, { useState, useEffect } from 'react';
import Xarrow from "react-xarrows";
import Node from '../Graph Components/Node';
import { Button, Checkbox, FormControlLabel } from '@mui/material';

const ExperimentApp = () => {

  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

  const [x1, setX1] = useState(null);
  const [y1, setY1] = useState(null);
  const [x2, setX2] = useState(null);
  const [y2, setY2] = useState(null);

  // To store the IDs of the first and second selected nodes
  const [firstNodeId, setFirstNodeId] = useState(null);

  const [isDrawing, setIsDrawing] = useState(false);
  const [addEdgeIsChecked, setAddEdgeIsChecked] = useState(false);
  const [edges, setEdges] = useState([
    { id: 'edge1', from: 'node1', to: 'node2', twoWay: true },
    { id: 'edge2', from: 'node2', to: 'node3', twoWay: false},
  ]);

  const [nodes, setNodes] = useState([
    { id: 'node1', x: 300, y: 300, color: 'red' },
    { id: 'node2', x: 400, y: 400, color: 'blue' },
    { id: 'node3', x: 500, y: 500, color: 'green' },

    { id: 'node4', x: 300, y: 500, color: 'purple' },

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

  const updateNode = (id, newX, newY) => {
    setNodes((prevNodes) =>
      prevNodes.map((node) =>
        node.id === id ? { ...node, x: newX, y: newY } : node
      )
    );
  };

  const handleSelectNode = (e, nodeId) => {
    if (addEdgeIsChecked) {
      if (firstNodeId == null) {
        const { centerX, centerY } = getDivCenterCoordinates(e.target);
        setX1(centerX);
        setY1(centerY);
        setX2(centerX);
        setY2(centerY);
        setIsDrawing(true);
        setFirstNodeId(nodeId);
      }
      else {

        // Both nodes selected, print the IDs
        console.log(`First node ID: ${firstNodeId}, Second node ID: ${nodeId}`);

        if (firstNodeId !== nodeId) {
          
          let edgeExistsIndex = edges.findIndex(edge => edge.from === nodeId && edge.to === firstNodeId)

          if (edgeExistsIndex > -1) {
            console.log("Edge exists");
            edges[edgeExistsIndex].twoWay = true;
          }
          else {
            let size = edges.length
            let newEdge = { id: `edge${size+1}`, from: firstNodeId, to: nodeId, twoWay: false }
            setEdges([...edges, newEdge]);
          }

          // let edgeExistsIndex = edges.indexOf(edge => edge.from === nodeId && edge.to === firstNodeId)

          // // Check if there exists an edge between the two nodes
          // if (edgeExistsIndex > -1) {
          //   edges[edgeExistsIndex].twoWay = true;
          // } 
          // else {
          //             let size = edges.length

          // let newEdge = { id: `edge${size+1}`, from: firstNodeId, to: nodeId, twoWay: false, id: 2 }

          // setEdges([...edges, newEdge]);

          // }
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
  }

  const handleAddEdgeSelected = () => {
    if (addEdgeIsChecked) {
      cancelDrawing();
    }
    setAddEdgeIsChecked(!addEdgeIsChecked)
  }



  function getDivCenterCoordinates(div) {
    const rect = div.getBoundingClientRect();
    return { centerX: rect.left  ,centerY: rect.top };
  }

  return (
    <div>
      {/* SVG container for drawing lines */}
      <svg width="800" height="600" style={{ border: '1px solid black' }}>
        <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="black" strokeWidth={2} />
      </svg>

      {/* Button and Checkbox outside of SVG */}
      <Button variant="contained">New Vertex</Button>

      <FormControlLabel
        control={<Checkbox {...label} checked={addEdgeIsChecked} onChange={handleAddEdgeSelected} />}
        label="Add Edge"
      />

      {/* Nodes and Edges */}
      {
        nodes.map((node) => {
          const set_node_x_y = (x, y) => updateNode(node.id, x, y);
          return (
            <Node
              key={node.id}
              node_x={node.x}
              node_y={node.y}
              set_node_x_y={set_node_x_y}
              color={node.color}
              node_id={node.id}
              addEdgeIsChecked={addEdgeIsChecked}
              onClick={(e) => handleSelectNode(e, node.id)}
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
