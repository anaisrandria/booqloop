"use client";

import { Autocomplete, TextField } from "@mui/material";
import { AddressAutocompleteProps } from "./AddressAutocomplete.types";
import { AddressOption } from "@/app/types";
import { useAddressSearch } from "@/hooks/useAddressSearch";
import { useState } from "react";

const AddressAutocomplete = ({ onChange }: AddressAutocompleteProps) => {
  const { inputValue, setInputValue, options, isLoading, isTyping } =
    useAddressSearch();
  const [isSelected, setIsSelected] = useState(false);

  return (
    <Autocomplete
      options={options}
      getOptionLabel={(option: AddressOption) => option.label}
      filterOptions={(x) => x}
      value={isSelected ? ({ label: inputValue } as AddressOption) : null}
      inputValue={inputValue}
      clearOnBlur={false}
      open={
        inputValue.length > 0 &&
        !isSelected &&
        (options.length > 0 || isTyping || isLoading)
      }
      onInputChange={(_, value) => {
        setInputValue(value);
        setIsSelected(false);
      }}
      onClose={() => {}}
      onChange={(_, value) => {
        if (value) {
          onChange(
            (value as AddressOption).name,
            (value as AddressOption).postalCode,
          );
          setInputValue((value as AddressOption).label);
          setIsSelected(true);
        } else {
          setInputValue("");
          setIsSelected(false);
        }
      }}
      noOptionsText={
        isTyping || isLoading ? "Recherche en cours..." : "Aucune ville trouvée"
      }
      renderInput={(params) => (
        <TextField {...params} label="Ville" variant="standard" size="small" />
      )}
    />
  );
};

export default AddressAutocomplete;
