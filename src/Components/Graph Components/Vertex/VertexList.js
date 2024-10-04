import Vertex from './Vertex';

const VertexList = ({vertices, updateVertex, addEdgeIsChecked, handleSelectVertex}) => {

    return (
        <>
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
        </>
    );
};

export default VertexList;