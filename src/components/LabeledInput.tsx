import React from "react";
import { Input } from "./ui/input";
import { Label } from "@/components/ui/label";

type LabeledInputProps = {
  label: string;
  onChange: React.ChangeEventHandler<HTMLInputElement> | undefined;
  value: any;
  type?: string;
};

const LabeledInput = ({ label, onChange, value, type }: LabeledInputProps) => {
  return (
    <div>
      <Label htmlFor={label.toLowerCase()}>{label}</Label>
      <Input
        type={type ?? "text"}
        id={label.toLowerCase()}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default LabeledInput;
