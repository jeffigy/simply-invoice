import React from "react";
import { Toaster } from "sonner";

const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {children}
      <Toaster closeButton={true} position="bottom-center" />
    </>
  );
};

export default ToastProvider;
