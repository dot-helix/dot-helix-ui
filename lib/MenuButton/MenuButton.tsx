import * as React from "react";
import type { ButtonProps } from "../Button";
import Menu, { type MenuProps } from "../Menu";
import { SystemError } from "../internals";
import { forkCallbacks, isFragment, useDeterministicId } from "../utils";

export type Props = {
  /**
   * The button element used as an anchor for the menu.
   */
  button: React.ReactElement;
  /**
   * The props used to render menu component.
   */
  menuProps: Pick<MenuProps, "alignment" | "label" | "items">;
};

const MenuButton = (props: Props) => {
  const { button, menuProps } = props;

  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const scopeId = useDeterministicId(undefined, "hui-menubutton-scope");
  const menuId = `${scopeId}__menu`;

  let buttonJSX: React.ReactElement<
    ButtonProps<"button"> & Partial<Record<`data-${string}`, string>>
  >;

  try {
    if (!React.isValidElement(button)) throw 0;
    if (isFragment(button)) throw 0;

    buttonJSX = React.Children.only(button) as typeof buttonJSX;
  } catch {
    throw new SystemError(
      "The `button` prop has to be a single valid non-fragment element.",
      "MenuButton",
    );
  }

  const buttonId = buttonJSX.props.id ?? `${scopeId}__button`;

  const handleButtonClick = forkCallbacks(buttonJSX.props.onClick, () => {
    setIsMenuOpen(o => !o);
  });

  buttonJSX = React.cloneElement(buttonJSX, {
    id: buttonId,
    onClick: handleButtonClick,
    "aria-haspopup": "true",
    "aria-controls": menuId,
    "aria-expanded": isMenuOpen,
    "data-expanded": isMenuOpen ? "" : undefined,
  });

  return (
    <>
      {buttonJSX}
      <Menu
        {...menuProps}
        open={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        resolveAnchor={() => document.getElementById(buttonId)}
        id={menuId}
      />
    </>
  );
};

export default MenuButton;
