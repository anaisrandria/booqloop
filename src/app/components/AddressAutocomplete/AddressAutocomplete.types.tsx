export type ApiAddress = {
  nom: string;
  codesPostaux: string[];
};

export type AddressAutocompleteProps = {
  onChange: (nom: string, codePostal: string) => void;
};
