"use client";

import { Autocomplete, Box, Chip, Popover, TextField } from "@mui/material";
import { AddressPopoverProps } from "./AddressPopover.types";
import { useAddressSearch } from "@/hooks/useAddressSearch";
import { AddressOption } from "@/app/types";

const AddressPopover = ({
  anchorEl,
  setAnchorEl,
  selectedAddresses,
  setSelectedAddresses,
}: AddressPopoverProps) => {
  const { inputValue, setInputValue, options, isLoading, isTyping } =
    useAddressSearch();

  return (
    <Popover
      open={!!anchorEl}
      anchorEl={anchorEl}
      onClose={() => setAnchorEl(null)}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
    >
      <Box sx={{ p: 2, width: 300 }}>
        <Autocomplete
          multiple
          options={options}
          value={selectedAddresses}
          getOptionLabel={(option: AddressOption) => option.label}
          filterOptions={(x) => x}
          open={inputValue.length > 0}
          onInputChange={(_, value) => setInputValue(value)}
          onChange={(_, value) =>
            setSelectedAddresses(value as AddressOption[])
          }
          noOptionsText={
            isTyping || isLoading
              ? "Recherche en cours..."
              : "Aucune ville trouvée"
          }
          renderTags={(value, getTagProps) =>
            value.map((option, index) => (
              <Chip
                {...getTagProps({ index })}
                key={option.label}
                label={option.label}
                size="small"
              />
            ))
          }
          renderInput={(params) => (
            <TextField
              {...params}
              variant="standard"
              placeholder={
                selectedAddresses.length === 0 ? "Ville ou code postal" : ""
              }
            />
          )}
        />
      </Box>
    </Popover>
  );
};

export default AddressPopover;
