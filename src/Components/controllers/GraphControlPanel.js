import { Button, Checkbox, FormControlLabel } from '@mui/material';

const style = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '100%',
  height: '100%'
};

const GraphControlPanel = ({ addVertex, addEdgeIsChecked, onAddEdgeChange, onReset }) => {
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

  return (
    <div className="control-panel" style={style}>
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

export default GraphControlPanel;
