import { Dispatch, SetStateAction } from "react";

export type PostalCodePopoverProps = {
  anchorEl: HTMLElement | null;
  setAnchorEl: Dispatch<SetStateAction<HTMLElement | null>>;
  postalCodes: number[];
  postalCode: number | null;
  setPostalCode: Dispatch<SetStateAction<number | null>>;
};
