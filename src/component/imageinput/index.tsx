import { Input } from "@/components/ui/input";
import { FaRegImage } from "react-icons/fa6";
import styles from "./index.module.css";
export const ImageInput = () => {
  return (
    <div>
      {/* <Input type="file" className={styles.input} /> */}
      <span className={styles.clickable}>
        <FaRegImage fill="grey" />
      </span>
    </div>
  );
};
