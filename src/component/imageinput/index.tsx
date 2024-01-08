import { Input } from "@/components/ui/input";
import { FaRegImage } from "react-icons/fa6";
import { IoIosCloseCircle } from "react-icons/io";
import styles from "./index.module.css";
import Image from "next/image";

import { FC, useEffect, useState } from "react";

interface Iprops {
  hopImages: (val: any) => void;
}
export const ImageInput: FC<Iprops> = (props) => {
  const [images, setImages] = useState<any>([]);
  useEffect(() => {
    console.log({ images });
    props.hopImages(images);
  }, [images]);

  const removeAtIndex = (array: [], index: number) => {
    let tempArray = array.filter((_, insideIndex) => {
      if (insideIndex !== index) {
        return true;
      }
    });
    return tempArray;
  };

  const showImages =
    images && images.length !== 0
      ? images.map((image: any, index: number) => {
          return (
            <span key={index}>
              <span
                style={{
                  position: "absolute",
                  border: "solid white 1px",
                  borderRadius: "50%",
                  backgroundColor: "white",
                }}
                onClick={(event) => {
                  event.preventDefault();
                  setImages((images: any) => {
                    let tempImages = images;
                    return removeAtIndex(tempImages, index);
                  });
                  console.log("clicked");
                }}
              >
                <IoIosCloseCircle fill="grey" />
              </span>
              <Image
                width={70}
                height={60}
                src={image ? URL.createObjectURL(image) : ""}
                alt="image"
              />
            </span>
          );
        })
      : "none";

  return (
    <div>
      <label htmlFor="input">
        <span className={styles.clickable}>
          {images && images.length !== 0 && (
            <div
              className={styles.showImages}
              style={{
                left: 0,
                height: "70px",
                // width: "200px",
                overflow: "auto",
                display: "flex",
                alignItems: "center",
                gap: 4,
              }}
            >
              {showImages}
            </div>
          )}
          {(!images || images.length === 0) && <FaRegImage fill="grey" />}
        </span>
      </label>
      <Input
        multiple
        type="file"
        className={styles.input}
        id="input"
        onChange={(val) => {
          const fileList = val.target.files;
          const newFileList = [];
          for (let i = 0; i <= fileList!.length; i++) {
            if (fileList && fileList[i] !== undefined) {
              newFileList.push(fileList![i]);
            }
          }
          setImages([...images, ...newFileList]);
        }}
      />
    </div>
  );
};
