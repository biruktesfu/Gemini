import { FC, useState } from "react";
import styles from "./index.module.css";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Iprops {
  onChange: (val: string) => void;
}

export const GeminiSelect: FC<Iprops> = (props) => {
  const [option, setOption] = useState("Gemini Pro");
  return (
    <Select
      onValueChange={(val) => {
        setOption(val);
        props.onChange(val);
      }}
      defaultValue="Gemini Pro"
    >
      <SelectTrigger className={styles.selectTrigger}>{option}</SelectTrigger>
      <SelectContent className={styles.selectContent}>
        <SelectGroup>
          <SelectItem value="Gemini Pro" className={styles.selectItem}>
            Gemini Pro
          </SelectItem>
          <SelectItem
            value="Gemini Pro Visual"
            className={styles.selectItem}
            disabled
          >
            Gemini Pro Visual
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
