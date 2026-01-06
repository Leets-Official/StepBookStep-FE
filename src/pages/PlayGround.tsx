import { useState } from "react";
import { DropDown } from "@/components/DropDown/DropDown";

export default function PlayGround() {
  const [value, setValue] = useState<string>();

  return (
    <div className="p-10">
      <DropDown
        options={["Label", "Label", "Label"]}
        value={value}
        placeholder="Label"
        onChange={setValue}
      />
    </div>
  );
}
