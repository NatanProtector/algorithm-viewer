import React from 'react';
import useLineDrawing from '../Graph Components/hooks/useLineDrawing';
import useGraph from '../Graph Components/hooks/useGraph';
import TypeSelector from '../Graph Components/components/TypeSelector';
import useSelect from '../Graph Components/hooks/useSelect';
import DynamicControl from '../controllers/DynamicDisplays/DynamicControl';
import DynamicDisplay from '../controllers/DynamicDisplays/DynamicDisplay';
import AlgorithemFlowControl from '../controllers/AlgorithemFlowControl';
import { GraphControlContext } from "../controllers/GraphControlPanel/GraphControlContext";

const headerStyles = {
  backgroundColor: 'red',
  width: '100%',
  height:'15%'
}

const appContainerStyle = {
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  height: '97vh',
}

const containerForControlAndViewStyle = {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  height: '70%',
  width: '100%',
}

const ControlContainerStyle = {
  display: 'flex',
  flexDirection: 'column',
  border: '1px solid black',
  width: '20%',
  height: '100%'
}

const algorithemDataSelectContainer = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  border: '1px solid black',
  width: '100%'
}

const displayContainerStyle = {
  border: '1px solid black',
  width: '80%',
  height: '100%'
}

const containerForAlgorithemControls = {
  border: '1px solid black',
  width: '100%',
  height: '15%'
}

const AlgorithemViewerApp = () => {

  const graph_initial = [
    { index: 0, x: 300, y: 300, color: 'red', adjacent: [1] },
    { index: 1, x: 300, y: 400, color: 'blue', adjacent: [0] },
    { index: 2, x: 400, y: 300, color: 'green', adjacent: [1] },
  ]

  const {graph,addEdge,addVertex,removeVertex, removeEdge,updateVertexLocation} = useGraph(graph_initial);
  
  const {
    x1,
    y1,
    x2,
    y2,
    handleSelectVertex,
    setMayUseLine: setAddEdgeIsChecked,
    mayUseLine: addEdgeIsChecked,
    cancelDrawing
  } = useLineDrawing(addEdge);

  const {
    x1: x1_remove,
    y1: y1_remove,
    x2: x2_remove,
    y2: y2_remove,
    handleSelectVertex: handleSelectVertexForEdgeRemoval,
    setMayUseLine: setMayUseLineForEdgeRemoval,
    mayUseLine: mayUseLineForRemoval,
    cancelDrawing: cancelDrawingForEdgeRemoval
  } = useLineDrawing(removeEdge);

  const {
    options,
    selectDataType,
    selectAlgorithem,
    handleChangeToDataType,
    handleChangeToAlgorithem
  } = useSelect();

  const toggleAddEdgeChange = (e) => {
      
    setAddEdgeIsChecked((prevChecked) => {
      if (prevChecked) {
        cancelDrawing();
      }
      return !prevChecked;
    });
  };
  
  return (
    <div style={appContainerStyle}>
      
                  
      <header style={headerStyles}>

      </header>
    

      <div style={containerForControlAndViewStyle}>

        <div
          style={displayContainerStyle}
        >
          
          <DynamicDisplay
            algorithem={selectAlgorithem}
            dataType={selectDataType}
            x1={x1} y1={y1} x2={x2} y2={y2}
            graph={graph}
            radius={25}
            updateVertexLocation={updateVertexLocation}
            handleSelectVertex={handleSelectVertex}
            addEdgeIsChecked={addEdgeIsChecked}
            addEdge={addEdge}
          />

        </div>
        
        <div style={ControlContainerStyle}>

          <div style={algorithemDataSelectContainer}>

            <TypeSelector
              options={options}
              selectedValue={selectDataType}
              handleChangeToDataType={handleChangeToDataType}
              algorithem={selectAlgorithem}
              handleChangeToAlgorithem={handleChangeToAlgorithem}
            />

          </div>

          <div>
            <GraphControlContext.Provider
              value={{
                addVertex,
                addEdgeIsChecked,
                toggleAddEdgeChange
              }}
            >
              <DynamicControl
                algorithem={selectAlgorithem}
                dataType={selectDataType}
                // addVertex={addVertex}
                // addEdgeIsChecked={addEdgeIsChecked}
                // toggleAddEdgeChange={handleAddEdgeSelected}
              />
            </GraphControlContext.Provider>
          </div>
          
        </div>    

      </div>


      {/** Section for controling the algorithem steps */}
      <div style={containerForAlgorithemControls}>
        <AlgorithemFlowControl/>
      </div>

    </div>
  );
};

export default AlgorithemViewerApp;