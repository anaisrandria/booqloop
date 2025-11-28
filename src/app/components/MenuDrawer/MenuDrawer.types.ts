export type MenuDrawerProps = {
  isMenuOpen: boolean;
  toggleOpenMenu: (newState: boolean) => () => void;
};
