import React from "react";
import {
    Box,
    FormControl,
    InputLabel,
    MenuItem,
    SelectChangeEvent,
    Select as SelectMUI,
  } from "@mui/material";
import { SelectDataI } from "../../../data/SelectData";

interface SelectProps {
    label: string
    value: string
    onChange: (event: SelectChangeEvent) => void
    selectData: SelectDataI[]
}


const Select: React.FC<SelectProps> = ({label, value, onChange, selectData}) => {
  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">{label}</InputLabel>
        <SelectMUI
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={value}
          label="Age"
          onChange={onChange}
        >
            {selectData.map(({id, value, title}) => <MenuItem key={id} value={value}>{title}</MenuItem>)}
        </SelectMUI>
      </FormControl>
    </Box>
  );
};

export default Select;
