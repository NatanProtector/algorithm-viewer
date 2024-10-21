import SelectComponent from "./SelectComponent"

const style = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    height: '100%'
}

const TypeSelector = ({options, selectedValue, handleChangeToDataType, algorithem ,handleChangeToAlgorithem}) => {

    return (
        <div style={style}>
            <SelectComponent
                options={options}
                label='Data Type'
                selectId="data-type"
                selectedValue={selectedValue}
                handleChange={handleChangeToDataType}
            />
            
            <SelectComponent
                options={options.find((option) => option.value === selectedValue).options}
                label='Algorithem'
                selectId="algorithem"
                selectedValue={algorithem}
                handleChange={handleChangeToAlgorithem}
            />           

        </div>
    )
}

export default TypeSelector