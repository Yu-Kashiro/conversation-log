"use client";

import { debounce, useQueryState } from "nuqs";
import { Input } from "./ui/input";

export function ConversationSearchForm() {
  const [name, setName] = useQueryState("name", {
    defaultValue: "",
    shallow: false,
  });

  return (
    <Input
      value={name}
      onChange={(e) =>
        setName(e.target.value, {
          limitUrlUpdates: e.target.value === "" ? undefined : debounce(200),
        })
      }
    />
  );
}
