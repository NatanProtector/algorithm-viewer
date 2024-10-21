import React from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const style = {
  backgroundColor: 'white',
  borderRadius: 1
}

const SelectComponent = ({ label, selectId, options, selectedValue, handleChange }) => {

  return (
    <FormControl fullWidth
      sx={style}
    >
      <InputLabel id={`${selectId}-label`}>{label}</InputLabel>
      <Select
        labelId={`${selectId}-label`}
        id={selectId}
        value={selectedValue}
        onChange={handleChange}
        label={label}
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SelectComponent;
