import { Dispatch, SetStateAction } from "react";

export interface PostalCodePopoverProps {
  anchorEl: HTMLElement | null;
  setAnchorEl: Dispatch<SetStateAction<HTMLElement | null>>;
  postalCodes: number[];
  postalCode: number | null;
  setPostalCode: Dispatch<SetStateAction<number | null>>;
}
