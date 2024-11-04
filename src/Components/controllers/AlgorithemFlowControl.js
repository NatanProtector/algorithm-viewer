import React, { useState } from 'react';
import { Button, Slider, FormControl, FormLabel, Stack, Box, Typography } from '@mui/material';

const AlgorithemFlowControlStyle = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    gap: '16px'
};

const AlgorithemFlowControl = () => {
    const [speed, setSpeed] = useState(50);

    const handleSpeedChange = (event, newValue) => {
        setSpeed(newValue);
    };

    return (
        <Box style={AlgorithemFlowControlStyle}>
            <FormLabel component="legend">Algorithm Control</FormLabel>
            
            {/* Control buttons */}
            <Stack direction="row" spacing={2} justifyContent="center" width="100%">
                <Button variant="contained" color="primary">Start</Button>
                <Button variant="contained" color="secondary">Stop</Button>
                <Button variant="contained">Next Step</Button>
                <Button variant="contained">Previous Step</Button>
            </Stack>

            {/* Speed slider */}
            <FormControl component="fieldset" sx={{ width: '100%' }}>
                <FormLabel component="legend" sx={{ textAlign: 'center', mb: 1 }}>Speed</FormLabel>
                <Box px={3}>
                    <Slider
                        value={speed}
                        onChange={handleSpeedChange}
                        aria-label="Speed"
                        valueLabelDisplay="auto"
                        step={10}
                        marks={[
                            { value: 0, label: 'Slow' },
                            { value: 50, label: 'Medium' },
                            { value: 100, label: 'Fast' }
                        ]}
                        min={0}
                        max={100}
                    />
                </Box>
            </FormControl>
        </Box>
    );
};

export default AlgorithemFlowControl;
