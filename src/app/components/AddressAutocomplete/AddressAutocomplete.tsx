"use client";

import { Autocomplete, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import {
  ApiAddress,
  AddressAutocompleteProps,
  AddressOptions,
} from "./AddressAutocomplete.types";

const fetchAddresses = async (query: string): Promise<AddressOptions[]> => {
  const isNumeric = /^\d+$/.test(query);
  const param = isNumeric
    ? `codePostal=${query}`
    : `nom=${encodeURIComponent(query)}&boost=population`;
  const res = await fetch(
    `https://geo.api.gouv.fr/communes?${param}&fields=nom,codesPostaux&limit=10`,
  );
  const addresses: ApiAddress[] = await res.json();

  return addresses.flatMap((address) =>
    address.codesPostaux.map((cp) => ({
      name: address.nom,
      postalCode: cp,
      label: `${address.nom} (${cp})`,
    })),
  );
};

const CommuneAutocomplete = ({ onChange }: AddressAutocompleteProps) => {
  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState<AddressOptions[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    setIsTyping(true);

    const timeout = setTimeout(async () => {
      setIsTyping(false);
      setIsLoading(true);
      const results = await fetchAddresses(inputValue);
      setOptions(results);
      setIsLoading(false);
    }, 300);

    return () => clearTimeout(timeout);
  }, [inputValue]);

  return (
    <Autocomplete
      options={options}
      getOptionLabel={(option) => option.label}
      filterOptions={(x) => x}
      open={inputValue.length > 0}
      onInputChange={(_, value) => setInputValue(value)}
      onChange={(_, value) => {
        if (value) {
          onChange(value.name, value.postalCode);
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

export default CommuneAutocomplete;
