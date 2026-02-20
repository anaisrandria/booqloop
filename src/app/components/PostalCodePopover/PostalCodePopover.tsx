import { Autocomplete, Box, Popover, TextField } from "@mui/material";
import { PostalCodePopoverProps } from "./PostalCodePopover.types";

const PostalCodePopover = ({
  anchorEl,
  setAnchorEl,
  postalCodes,
  postalCode,
  setPostalCode,
}: PostalCodePopoverProps) => {
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
      <Box sx={{ p: 2, width: 200 }}>
        <Autocomplete
          options={postalCodes}
          value={postalCode ?? null}
          getOptionLabel={(option) => option.toString()}
          onChange={(event, value) => {
            setPostalCode(value ?? null);
            setAnchorEl(null);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="standard"
              placeholder="Code postal"
            />
          )}
        />
      </Box>
    </Popover>
  );
};

export default PostalCodePopover;
