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
  const [option, setOption] = useState("Gemini Pro Vision");
  return (
    <Select
      onValueChange={(val: any) => {
        setOption(val);
        props.onChange(val);
      }}
      defaultValue="Gemini Pro"
    >
      <SelectTrigger className={styles.selectTrigger}>{option}</SelectTrigger>
      <SelectContent className={styles.selectContent}>
        <SelectGroup>
          <SelectItem value="Gemini Pro Vision" className={styles.selectItem}>
            Gemini Pro Vision
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
