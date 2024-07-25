import { ChangeEvent, FC, useState } from "react";
import styles from "./index.module.css";
import { Input } from "@/components/ui/input";
import { IoIosSend } from "react-icons/io";
import { Button } from "@/components/ui/button";
import { ImageInput } from "../imageinput";
import { PlaceholdersAndVanishInput } from "@/components";

interface Iprops {
  onSubmit: (val: any) => void;
  disabled: boolean;
  hopImage: (val: any) => void;
}

export const InputBox: FC<Iprops> = (props) => {
  const [input, setinput] = useState("");
  const placeholders = ["What is on your mind?", "Enter your prompt here"];

  return (
    <div className={styles.container}>
      {props.disabled === false && (
        <span
          style={{
            display: "flex",
            alignItems: "center",
            marginLeft: "10px",
          }}
        >
          <ImageInput
            hopImages={(val) => {
              const imageFileList: FileList = val;
              props.hopImage(imageFileList);
            }}
          />
        </span>
      )}
      <PlaceholdersAndVanishInput
        onSubmit={(event) => {
          event.preventDefault();
          props.onSubmit(input);
          setinput("");
        }}
        placeholders={placeholders}
        onChange={(event) => {
          setinput(event.target.value);
        }}
      />
    </div>
  );
};
