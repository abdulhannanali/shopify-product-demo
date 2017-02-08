import React, { Component } from 'react'
import Select from 'react-select'

/**
 * VariantsSelector
 */
export default class VariantsSelector extends Component {
   /**
    * onSelect
    * function called when we select some other option
    * @param {String} selectName name of the selector
    * @param {Object} option object of the value selected
    */
   onSelect = (selectName, index, option) => {
       const { value } = option
       const { onSelect } = this.props
       
       if (onSelect) {
           onSelect(index, selectName, value)
       }
   }

   /**
     * render
     * function renders the component
     */
    render () {
        const { options = [], selections = [] } = this.props        
        const optionsSelectors = options.map((option, index) => {
            const parsedValues = option.values.map((value) => {
                return ({
                    value,
                    label: value
                })
            })

            return (
                <div className="OptionsSelect">
                    <h5 className="OptionsSelect-label">{option.name}</h5>
                    <Select onChange={this.onSelect.bind(this, option.name, index)} 
                            value={selections[index]} 
                            options={parsedValues}
                            name={option.name}
                    />
                </div>
            )
        })

        return (
            <div className="VariantsSelectors">
                {optionsSelectors}
            </div>
        )

    }
}