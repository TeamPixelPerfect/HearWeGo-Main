// CategorySelect.tsx
import React from 'react';
import { FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from '@mui/material';

interface CategorySelectProps {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const CategorySelect: React.FC<CategorySelectProps> = ({ categories, selectedCategory, onCategoryChange }) => {
  const handleChange = (event: SelectChangeEvent<string>) => {
    onCategoryChange(event.target.value as string);
  };

  return (
    <FormControl fullWidth variant="outlined" margin="normal">
      <InputLabel id="category-select-label">Category</InputLabel>
      <Select
        labelId="category-select-label"
        id="category-select"
        value={selectedCategory}
        onChange={handleChange}
        label="Category"
      >
        {categories.map((category) => (
          <MenuItem key={category} value={category}>
            {category}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default CategorySelect;
