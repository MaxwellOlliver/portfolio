"use client";

import { type ReactNode } from "react";

import { type DropdownContextValue, useDropdownContext } from "./context";

type DropdownTriggerProps = {
  children: (ctx: DropdownContextValue) => ReactNode;
};

export default function DropdownTrigger({ children }: DropdownTriggerProps) {
  const ctx = useDropdownContext();
  return <>{children(ctx)}</>;
}
