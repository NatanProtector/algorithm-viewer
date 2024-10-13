import { useState } from 'react';

const useEdges = (initialEdges) => {

    const [edges, setEdges] = useState(initialEdges);

    const addEdge = (from, to, twoWay = false) => {
        console.log("Adding new edge");
      };
    
      const updateEdge = (from, to, twoWay) => {
       console.log("Updating edge");
      };


    return {edges, addEdge, updateEdge};
    
}


export default useEdges