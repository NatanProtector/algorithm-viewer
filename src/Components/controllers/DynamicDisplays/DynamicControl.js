import GraphControlPanel from "../GraphControlPanel/GraphControlPanel";

const DynamicControl = ({dataType, algorithem}) => {

    switch (dataType) {
        case 'graph':
            switch (algorithem) {
                case 'BFS':
                    return (
                        <GraphControlPanel/>
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