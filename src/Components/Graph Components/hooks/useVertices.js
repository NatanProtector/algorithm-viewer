import { useState } from 'react';

const colors = [
    "red", "blue", "green", "yellow", "orange", "purple", "pink", "brown",
    "gray", "black", "white", "cyan", "magenta", "lime", "indigo", "violet",
    "gold", "silver", "teal", "maroon"
  ];

const useVertices = (initialVertices) => {
  const [vertices, setVertices] = useState(initialVertices);

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

  return { vertices, updateVertex, addVertex};
};

export default useVertices;
