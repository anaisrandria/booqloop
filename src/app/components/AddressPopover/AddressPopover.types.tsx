import { Dispatch, SetStateAction } from "react";
import { AddressOption } from "@/app/types";

export type AddressPopoverProps = {
  anchorEl: HTMLElement | null;
  setAnchorEl: Dispatch<SetStateAction<HTMLElement | null>>;
  selectedAddresses: AddressOption[];
  setSelectedAddresses: Dispatch<SetStateAction<AddressOption[]>>;
};
