import React from "react";
import { ModeToggle } from "../ui/mode-toggle";

const AuthLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div>
      {children}
      <div className="absolute top-4 right-4">
        <ModeToggle />
      </div>
    </div>
  );
};

export default AuthLayout;
