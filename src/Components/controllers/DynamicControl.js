import GraphControlPanel from "./GraphControlPanel";

const DynamicControl = ({dataType, algorithem,addVertex, addEdgeIsChecked,onAddEdgeChange,onReset}) => {

    switch (dataType) {
        case 'graph':
            switch (algorithem) {
                case 'BFS':
                    return (
                        <GraphControlPanel
                            addVertex={addVertex}
                            addEdgeIsChecked={addEdgeIsChecked}
                            onAddEdgeChange={onAddEdgeChange}
                            onReset={onReset}
                        />
                    );
                case 'DFS':
                    return (
                        <p>TODO: implement the control panel for DFS</p>
                    )
                default:
                    return (
                        <p>Choose algorithem</p>
                    )
            }
        case 'string':
            switch (algorithem) {
                case 'Rabin Karp':
                    return (
                        <p>TODO: implement the control panel for Rabin Karp</p>
                    )
                case 'KMP':
                    return (
                        <p>TODO: implement the control panel for KMP</p>
                    )
                default:
                    return null
            }
        default:
            return null;
    }
}


export default DynamicControl