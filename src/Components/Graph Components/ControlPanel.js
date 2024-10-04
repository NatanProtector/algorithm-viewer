import { Button, Checkbox, FormControlLabel } from '@mui/material';

const ControlPanel = ({addVertex, addEdgeIsChecked, onAddEdgeChange, onReset}) => {

  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

    return (
      <div className="control-panel">
        
        {/* Button and Checkbox */}
        <Button variant="contained" onClick={addVertex}>
            New Vertex
        </Button>

        <FormControlLabel
            control={<Checkbox {...label} checked={addEdgeIsChecked} onChange={onAddEdgeChange} />}
            label="Add Edge"
        />
      </div>
    );
  };
  
  export default ControlPanel;
  