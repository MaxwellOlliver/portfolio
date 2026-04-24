"use client";

import { createContext, useContext } from "react";

export type DropdownContextValue = {
  isOpen: boolean;
  toggle: () => void;
  open: () => void;
  close: () => void;
};

export const DropdownContext = createContext<DropdownContextValue | null>(null);

export function useDropdownContext() {
  const ctx = useContext(DropdownContext);
  if (!ctx) {
    throw new Error(
      "Dropdown subcomponents must be rendered inside <Dropdown>",
    );
  }
  return ctx;
}
