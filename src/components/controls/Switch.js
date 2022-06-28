import React from 'react'
import { FormControl, FormControlLabel, Switch as MuiSwitch } from '@material-ui/core';

export default function Switch(props) {

    const { name, label, value, onChange } = props;


    const convertToDefEventPara = (name, value) => ({
        target: {
            name, value
        }
    })

    return (
        <FormControl>
            <FormControlLabel
                control={<MuiSwitch
                    name={name}
                    color="primary"
                    checked={value}
                    onChange={e => onChange(convertToDefEventPara(name, e.target.checked))}
                />}
                label={label}
            />
        </FormControl>
    )
}
