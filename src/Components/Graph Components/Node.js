import React, { useState, useEffect } from 'react';

const Node = ({ node_x, node_y, set_node_x, set_node_y, node_id, color }) => {
    const [nodeIsMoving, setNodeIsMoving] = useState(false);

    const handleDragStart = () => {
        setNodeIsMoving(true);
    };

    useEffect(() => {
        const handleMouseMove = (e) => {
            if (nodeIsMoving) {
                set_node_x(e.clientX);
                set_node_y(e.clientY);
            }
        };

        const handleMouseUp = () => {
            setNodeIsMoving(false);
        };

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, [nodeIsMoving, set_node_x, set_node_y]);

    return (
        <div
            style={{
                width: '30px',
                height: '30px',
                backgroundColor: color,
                position: 'fixed',
                top: `${node_y}px`,
                left: `${node_x}px`,
                borderRadius: '50%',
                cursor: 'move',
            }}
            id={node_id}
            onMouseDown={handleDragStart}
        />
    );
};

export default Node;
