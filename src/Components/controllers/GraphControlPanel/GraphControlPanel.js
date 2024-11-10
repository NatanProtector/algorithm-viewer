import { Button, Checkbox, FormControlLabel } from '@mui/material';
import { ContextProvider } from './ContextProvider';
import {useContext} from 'react';

const style = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '100%',
  height: '100%'
};

const GraphControlPanel = () => {
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

  const {
    addVertex,
    addEdgeIsChecked,
    toggleAddEdgeChange
  } = useContext(ContextProvider);

  return (
    <div className="control-panel" style={style}>
      {/* Button and Checkbox */}
      <Button variant="contained" onClick={addVertex}>
        New Vertex
      </Button>

      <FormControlLabel
        control={<Checkbox {...label} checked={addEdgeIsChecked} onChange={toggleAddEdgeChange} />}
        label="Add Edge"
      />
{/* 
      <FormControlLabel
        control={<Checkbox {...label} checked={removeEdge} onChange={removeEdgeChange} />}
        label="Remove Edge"
      />


      <FormControlLabel
        control={<Checkbox {...label} checked={removeVertex} onChange={removeVertexChange} />}
        label="Remove Vertex"
      /> */}


    </div>
  );
};

export default GraphControlPanel;
