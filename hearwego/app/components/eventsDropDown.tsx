"use client";
import * as React from "react";
import FormControl from "@mui/material/FormControl";

import { InputLabel, Select, MenuItem } from "@mui/material";
interface Option {
  value: string;
  label: string;
}

interface CustomSelectProps {
  labelId: string;
  id: string;
  value: string;
  onChange: (event: React.ChangeEvent<{ value: unknown }>) => void;
  label: string;
  options: Option[];
  placeholder?: string;
}

export const CustomSelect: React.FC<CustomSelectProps> = ({
  labelId,
  id,
  value,
  onChange,
  label,
  options,
}) => {
  return (
    <div>
      <FormControl sx={{ m: 1 }} size="small">
        <InputLabel id={labelId}>{label}</InputLabel>
        <Select
          labelId={labelId}
          id={id}
          value={value}
          onChange={(event: React.ChangeEvent<{ value: string }>) =>
            onChange(event)
          }
          label={label}
          sx={{
            // maxWidth: '180px',
            // minHeight:'10px',
            width: "150px",
            height: "40px",
            display: "flex",
            position: "relative",
            backgroundColor: "primary.light",
            color: "primary.default",
            borderRadius: "15px",
          }}
        >
          {options.map((option, index) => (
            <MenuItem key={index} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};
