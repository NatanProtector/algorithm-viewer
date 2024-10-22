import GraphControlPanel from "./GraphControlPanel";

const DynamicControl = ({dataType,addVertex, addEdgeIsChecked,onAddEdgeChange,onReset}) => {

    switch (dataType) {
        case 'graph':
            return (
                <GraphControlPanel
                    addVertex={addVertex}
                    addEdgeIsChecked={addEdgeIsChecked}
                    onAddEdgeChange={onAddEdgeChange}
                    onReset={onReset}
                />
            );
        case 'array':
            return (
                <p>TODO: implement the control panel for array</p>
            );
        case 'linked-list':
            return (
                <p>TODO: implement the control panel for linked list</p>
            );
        default:
            return null;
    }
}


export default DynamicControl