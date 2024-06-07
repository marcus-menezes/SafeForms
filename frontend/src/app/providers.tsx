"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";
import queryClient from "@/lib/tankstack";
import { AuthProvider } from "@/context/authContext";
import { ThemeProvider } from "@/components/theme-provider";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}
