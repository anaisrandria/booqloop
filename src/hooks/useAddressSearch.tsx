import { useEffect, useState } from "react";
import { ApiAddress } from "@/app/components/AddressAutocomplete/AddressAutocomplete.types";
import { AddressOption } from "@/app/types";

const fetchAddresses = async (query: string): Promise<AddressOption[]> => {
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

export const useAddressSearch = () => {
  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState<AddressOption[]>([]);
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

  return { inputValue, setInputValue, options, isLoading, isTyping };
};
