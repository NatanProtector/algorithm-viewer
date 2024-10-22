import SelectComponent from "./SelectComponent"

const style = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    height: '100%'
}

const TypeSelector = ({options, selectedValue, handleChangeToDataType, algorithem ,handleChangeToAlgorithem}) => {

    const getOptions = () => {
        const option = options.find((option) => option.value === selectedValue)
        if (option) {
            return option.options
        } else {
            return []
        }
    }

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
                options={getOptions()}
                label='Algorithem'
                selectId="algorithem"
                selectedValue={algorithem}
                handleChange={handleChangeToAlgorithem}
            />           

        </div>
    )
}

export default TypeSelector