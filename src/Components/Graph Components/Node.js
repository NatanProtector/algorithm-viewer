import React, { useState, useEffect } from 'react';

const Node = ({ node_x, node_y, set_node_x_y, node_id, color, addEdgeIsChecked, onClick}) => {

    const [isHighlighted, setIsHighlighted] = useState(false);
    
    const [nodeIsMoving, setNodeIsMoving] = useState(false);

    const handleDragStart = (e) => {
        if (!addEdgeIsChecked) setNodeIsMoving(true);
    };

    useEffect(() => {
        const handleMouseMove = (e) => {
            if (nodeIsMoving) {
                set_node_x_y(e.clientX - 15, e.clientY - 15);
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
    }, [nodeIsMoving, set_node_x_y]);

    const handleMouseEnter = () => {
        if (addEdgeIsChecked) setIsHighlighted(true);
    };

    const handleMouseLeave = () => {
        setIsHighlighted(false);
    };

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
                cursor: isHighlighted?  'pointer' : 'move',
                border: isHighlighted ? '2px solid black' : null,
            }}
            id={node_id}
            onMouseDown={handleDragStart}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={onClick}
        />
    );
};

export default Node;
