import React from "react";
import { menuContainer } from "@/components/Menu/Menu.styles";

interface MenuProps {
  children: React.ReactNode;
}

export function Menu({ children }: MenuProps) {
  return (
    <ul className={menuContainer}>
      {children}
    </ul>
  );
}
