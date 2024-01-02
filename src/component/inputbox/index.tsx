import { FC, useState } from "react";
import styles from "./index.module.css";
import { Input } from "@/components/ui/input";
import { IoIosSend } from "react-icons/io";
import { Button } from "@/components/ui/button";
import { ImageInput } from "../imageinput";

interface Iprops {
  onSubmit: (val: any) => void;
  disabled: boolean;
  hopImage: (val: any) => void;
}

export const InputBox: FC<Iprops> = (props) => {
  const [input, setinput] = useState("");

  return (
    <div className={styles.container}>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          props.onSubmit(input);
          setinput("");
        }}
      >
        {props.disabled === false && (
          <span style={{ display: "flex", alignItems: "center" }}>
            <ImageInput
              hopImages={(val) => {
                const imageFileList: FileList = val;
                props.hopImage(imageFileList);
              }}
            />
          </span>
        )}
        <Input
          placeholder="if you leave me empty i will generate the most random thing..."
          value={input}
          className={styles.input}
          onChange={(event) => {
            setinput(event.target.value);
          }}
        />
        <Button className={styles.button} variant={"outline"} type="submit">
          <IoIosSend size={30} fill="grey" />
        </Button>
      </form>
    </div>
  );
};
