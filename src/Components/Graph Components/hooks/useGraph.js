import { useState } from "react";

// The useGraph hook manages the state of a graph
const useGraph = (initialGraph) => {
  const [graph, setGraph] = useState(initialGraph);

  // Add an edge between two vertices
  // Add a directed edge from one vertex to another
    const addEdge = (from, to) => {
        setGraph((prevGraph) => {
        const updatedGraph = [...prevGraph];
        const fromVertex = updatedGraph.find((v) => v.index === from);
        
        if (fromVertex && !fromVertex.adjacent.includes(to)) {
            fromVertex.adjacent.push(to);
        }

        return updatedGraph;
        });
    };
  
// Add a new vertex with a color selected from a list or randomly if the list is exceeded
const addVertex = () => {
    const colors = [
      "red", "blue", "green", "orange", "purple", "yellow", "pink", "cyan", "magenta", "lime", "teal", "brown", "black"
    ]; // Longer list of colors
    
    setGraph((prevGraph) => {
      const newVertexIndex = prevGraph.length;
  
      // If we exceed the list length, generate a random color
      const generateRandomColor = () => {
        const randomColor = '#' + Math.floor(Math.random()*16777215).toString(16);
        return randomColor;
      };
  
      // Select color based on the index or generate a random color if exceeding the list
      const color = newVertexIndex < colors.length
        ? colors[newVertexIndex]
        : generateRandomColor();
  
      const newVertex = {
        index: newVertexIndex,
        id: `vertex${newVertexIndex}`,
        x: 50 * (newVertexIndex+1), // Example placement
        y: 50,
        color: color, // Use predefined or random color
        adjacent: [],
      };
      
      return [...prevGraph, newVertex];
    });
  };
  

  // Remove a vertex and its edges
  const removeVertex = (vertex_index) => {
    setGraph((prevGraph) => {
      // Remove vertex from graph
      const updatedGraph = prevGraph.filter((v) => v.index !== vertex_index);

      // Remove the vertex from adjacency lists
      updatedGraph.forEach((v) => {
        v.adjacent = v.adjacent.filter((adj) => adj !== vertex_index);
      });

      return updatedGraph;
    });
  };

  // Remove an edge between two vertices
  const removeEdge = (from, to) => {
    setGraph((prevGraph) => {
      const updatedGraph = [...prevGraph];
      const fromVertex = updatedGraph.find((v) => v.index === from);
      const toVertex = updatedGraph.find((v) => v.index === to);

      if (fromVertex && toVertex) {
        fromVertex.adjacent = fromVertex.adjacent.filter((adj) => adj !== to);

      }
      return updatedGraph;
    });
  };

  // Update the location of a vertex
  const updateVertexLocation = (vertex_index, x, y) => {
    setGraph((prevGraph) => {
      const updatedGraph = [...prevGraph];
      const vertex = updatedGraph.find((v) => v.index === vertex_index);

      if (vertex) {
        vertex.x = x;
        vertex.y = y;
      }
      return updatedGraph;
    });
  };

  return {
    graph,
    addEdge,
    addVertex,
    removeVertex,
    removeEdge,
    updateVertexLocation,
  };
};

export default useGraph;
