import { useState } from 'react';

const useEdges = (initialEdges) => {

    const [edges, setEdges] = useState(initialEdges);

    const addEdge = (from, to, twoWay = false) => {
        const size = edges.length;
        const newEdge = { id: `edge${size + 1}`, from, to, twoWay };
        setEdges([...edges, newEdge]);
      };
    
      const updateEdge = (from, to, twoWay) => {
        const edgeExistsIndex = edges.findIndex(
          (edge) => edge.from === from && edge.to === to
        );
        if (edgeExistsIndex > -1) {
          const updatedEdges = [...edges];
          updatedEdges[edgeExistsIndex].twoWay = twoWay;
          setEdges(updatedEdges);
        }
      };


    return {edges, addEdge, updateEdge};
    
}


export default useEdges