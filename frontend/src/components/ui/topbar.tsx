"use client";
import { FileSliders } from "lucide-react";
import SettingsToggle from "./settings-toggle";

const Topbar: React.FC = () => {
  return (
    <header className="bg-card py-2 text-primary mb-0.5">
      <div className="container mx-auto flex justify-between items-center p-4">
        <div className="flex flex-row gap-5 items-center">
          <FileSliders />
          <h1 className="text-2xl font-bold">Manage Forms</h1>
        </div>
        <SettingsToggle />
      </div>
    </header>
  );
};

export default Topbar;
