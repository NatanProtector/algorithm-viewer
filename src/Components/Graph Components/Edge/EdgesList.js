import Xarrow from "react-xarrows";

const EdgesList = ({edges}) => {

    return (
        <>
            {
                /* Xarrow for edges */
                edges.map((edge) => (

                    <Xarrow
                        key={edge.id}
                        start={edge.from}
                        end={edge.to}
                        showTail={edge.twoWay}
                        startAnchor="auto"
                        endAnchor="auto"
                    />
                ))
            }
        </>
    );
};

export default EdgesList;