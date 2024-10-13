import Arrow from "./Arrow";

const EdgesList = ({ graph, radius }) => {
  // Check if the graph is available and has vertices
  if (!graph || graph.length === 0) {    
    return null; // Don't render anything if graph is empty or not ready
  }

  return (
    <svg width="100%" height="100%">
      {graph.map((vertex) => (
        vertex.adjacent.map((edge_index) => {
          const vertex_start = vertex;
          const vertex_end = graph[edge_index];

          // Ensure vertex_start and vertex_end are defined before rendering
          if (!vertex_start || !vertex_end)
            return null; // Skip rendering if data is missing

          // Extract coordinates
          const x1 = vertex_start.x;
          const y1 = vertex_start.y;
          const x2 = vertex_end.x;
          const y2 = vertex_end.y;

          // Calculate the vector length
          const length = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);

          // If the vector length is less than or equal to 15, return the start point
          if (length <= radius) {
            return null; // Avoid rendering an arrow that's too short
          }

          // Normalize the vector
          const normalizedX = (x2 - x1) / length;
          const normalizedY = (y2 - y1) / length;

          // Calculate new end coordinates
          const new_x_end = x2 - normalizedX * radius; // Shorten by 15 pixels
          const new_y_end = y2 - normalizedY * radius; // Shorten by 15 pixels

          return (
            <Arrow
              key={`${vertex_start.id}-${vertex_end.id}`}
              startX={x1}
              startY={y1}
              endX={new_x_end}
              endY={new_y_end}
            />
          );
        })
      ))}
    </svg>
  );
};

export default EdgesList;
