import React from "react";
import { Toaster } from "sonner";

const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {children} <Toaster position="bottom-center" richColors={true} />
    </>
  );
};

export default ToastProvider;
