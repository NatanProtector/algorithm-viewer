import { useState } from 'react';

const useSelect = () => {
    const options = [
        { value: 'graph', label: 'graph' , options: [
            {value: 'DFS', label: 'DFS'}, 
            {value: 'BFS', label: 'BFS'}
          ]
        },
        { value: 'string', label: 'string', options: [
            {value: 'Rabin Karp', label: 'Rabin Karp'},
            {value: 'KMP', label: 'KMP'}
          ]
        },
      ]
    
    const [selectDataType, setSelectDataType] = useState('graph');
    const [selectAlgorithem, setSelectAlgorithem] = useState('');

    const handleChangeToDataType = (e) => {
    if (e.target.value !== selectDataType)
        setSelectAlgorithem('');
    setSelectDataType(e.target.value);
    }

    const handleChangeToAlgorithem = (e) => {
        setSelectAlgorithem(e.target.value);
    }

    return {
        options,
        selectDataType,
        selectAlgorithem,
        handleChangeToDataType,
        handleChangeToAlgorithem
    }
}

export default useSelect