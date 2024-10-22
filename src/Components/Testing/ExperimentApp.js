import React from 'react';
import useLineDrawing from '../Graph Components/hooks/useLineDrawing';
import useGraph from '../Graph Components/hooks/useGraph';
import TypeSelector from '../Graph Components/components/TypeSelector';
import useSelect from '../Graph Components/hooks/useSelect';
import DynamicControl from '../controllers/DynamicControl';
import DynamicDisplay from '../controllers/DynamicDisplay'

const headerStyles = {backgroundColor: 'red', width: '100%', height:'10%'}

const appContainerStyle = {
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  height: '97vh'
}

const containerForControlAndViewStyle = {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  height: '80%',
  width: '100%',
}

const ControlContainerStyle = {
  display: 'flex',
  flexDirection: 'column',
  border: '1px solid black',
  width: '10%',
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
  width: '100%',
  height: '100%'
}

const containerForAlgorithemControls = {
  border: '1px solid black',
  width: '100%',
  height: '10%'
}

const ExperimentApp = () => {

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
    setAddEdgeIsChecked,
    addEdgeIsChecked,
    cancelDrawing
  } = useLineDrawing(addEdge);

  const {
    options,
    selectDataType,
    selectAlgorithem,
    handleChangeToDataType,
    handleChangeToAlgorithem
  } = useSelect();

  const handleAddEdgeSelected = (e) => {
      
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
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
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
            <DynamicControl
              dataType={selectDataType}
              addVertex={addVertex}
              addEdgeIsChecked={addEdgeIsChecked}
              onAddEdgeChange={handleAddEdgeSelected}
              onReset={() => {console.log('reset')}}
            />
          </div>
          
        </div>    

      </div>


      {/** Section for controling the algorithem steps */}
      <div style={containerForAlgorithemControls}>
        
      </div>

    </div>
  );
};

export default ExperimentApp;