"use client";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";

export default function Home() {
  const isLoading = true;
  return (
    <Button>
      {isLoading ? (
        <>
          <Loader /> Submitting...
        </>
      ) : (
        "Submit"
      )}
    </Button>
  );
}
