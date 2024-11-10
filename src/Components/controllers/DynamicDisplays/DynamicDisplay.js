import GraphDisplay from '../../Graph Components/components/GraphDisplay'

const DynamicDisplay = ({algorithem,dataType}) => {
    
    switch (dataType) {
        case 'graph':

            switch (algorithem) {
                case 'BFS':
                    return (
                        <GraphDisplay
                        />  
                    );
                case 'DFS':
                    return (
                        <p>TODO: implement the display for DFS</p>
                    )
                default:
                    return null
            }

        case 'string':
            return (
                <p>TODO: implement the display for string</p>
            );
        default:
            return null;
    }
}

export default DynamicDisplay;