import GraphDisplay from '../Graph Components/components/GraphDisplay'

const DynamicDisplay = ({dataType,algorithem,x1,y1,x2,y2,graph,radius,updateVertexLocation,handleSelectVertex ,addEdgeIsChecked,addEdge}) => {
    
    switch (dataType) {
        case 'graph':
            return (
                <GraphDisplay
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    graph={graph}
                    radius={radius}
                    updateVertexLocation={updateVertexLocation}
                    handleSelectVertex={handleSelectVertex}
                    addEdgeIsChecked={addEdgeIsChecked}
                    addEdge={addEdge}
                />
                
            );
        case 'string':
            return (
                <p>TODO: implement the display for string</p>
            );
        default:
            return null;
    }
}

export default DynamicDisplay;