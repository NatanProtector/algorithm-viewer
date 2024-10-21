import Vertex from './Vertex';

const VertexList = ({graph, updateVertex,addEdgeIsChecked, handleSelectVertex }) => {

    return (
        <>
            {
                graph.map((vertex) => {
                const setVertexXY = (x, y) => updateVertex(vertex.index, x, y);
                return (
                    <Vertex
                        key={vertex.index}
                        vertex_x={vertex.x}
                        vertex_y={vertex.y}
                        set_vertex_x_y={setVertexXY}
                        color={vertex.color}
                        vertex_id={vertex.id}
                        addEdgeIsChecked={addEdgeIsChecked}
                        onClick={(e) => handleSelectVertex(e,vertex)}
                    />
                );
                })
            }
        </>
    );
};

export default VertexList;