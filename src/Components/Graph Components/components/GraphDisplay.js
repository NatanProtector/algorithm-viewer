import VertexList from '../Vertex/VertexList';
import EdgesList from '../Edge/EdgesList';
import Arrow from '../Edge/Arrow';

const svgStyle = { width: '100%', height: '100%' }

const GraphDisplay = ({x1,y1,x2,y2,graph,radius,updateVertexLocation,handleSelectVertex ,addEdgeIsChecked,addEdge }) => {
    
    return (
        <svg style={svgStyle}>
            <Arrow
                startX={x1}
                startY={y1}
                endX={x2}
                endY={y2}
            />

            <EdgesList
                graph={graph}
                radius={radius}
            /> 

            <VertexList
                graph={graph}
                updateVertex={updateVertexLocation}
                addEdgeIsChecked={addEdgeIsChecked}
                addEdge={addEdge}
                handleSelectVertex={handleSelectVertex}
            />      

        </svg>
    )
}

export default GraphDisplay;