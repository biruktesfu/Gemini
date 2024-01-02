import Image from "next/image";
import { Inter } from "next/font/google";
import { GoogleGenerativeAI } from "@google/generative-ai";
import {
  FloatingAction,
  GeminiSelect,
  ImageInput,
  InputBox,
  Loader,
} from "@/component";
const inter = Inter({ subsets: ["latin"] });
import styles from "../styles/index.module.css";

import { useEffect, useRef, useState } from "react";

export default function Home() {
  const [previous, setPrevious] = useState<any>([]);
  const [pr, setPr] = useState("");
  const [generated, setGenerated] = useState("");
  const [images, setImages] = useState<FileList>();
  const [loader, setLoader] = useState(<></>);
  const [disabled, setDisabled] = useState(true);
  const genAI = new GoogleGenerativeAI(process.env.API_KEY as string);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const showPrevious = () => {
    return previous.map((value: any, index: number) => {
      return (
        <div
          key={index}
          style={{
            margin: "10px",
            padding: "10px",
            borderRadius: "10px",
            color: "white",
            display: "flex",
            flexDirection: "column",
            gap: 4,
          }}
        >
          <span
            style={{
              marginBottom: "10px",
              backgroundColor: "#484848",
              width: "fit-content",
              padding: "4px 10px",
              borderRadius: "20px",
            }}
          >
            {value.prompt}
          </span>
          <span style={{ fontSize: "14px", color: "#9c9c9c" }}>
            {value.generated}
          </span>
        </div>
      );
    });
  };

  const geminiVision = async (prompt: string) => {
    async function fileToGenerativePart(file: any) {
      const base64EncodedDataPromise = new Promise((resolve) => {
        const reader: any = new FileReader();
        reader.onloadend = () => resolve(reader.result.split(",")[1]);
        reader.readAsDataURL(file);
      });
      return {
        inlineData: {
          data: await base64EncodedDataPromise,
          mimeType: file.type,
        },
      };
    }

    async function run(prompt: string) {
      // For text-and-images input (multimodal), use the gemini-pro-vision model
      const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });

      const fileInputEl: any = images;
      const imageParts: any = await Promise.all(
        [...fileInputEl].map(fileToGenerativePart)
      );

      const result = await model.generateContent([prompt, ...imageParts]);
      const response = await result.response;
      const text = response.text();
      console.log(text);
      setLoader(<></>);
      setPrevious([...previous, { prompt: prompt, generated: text }]);
      setPr("");
      setGenerated(text);
    }
    run(prompt);
  };
  const onsubmit = async (prompt: string) => {
    if (disabled) {
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      try {
        const result = await model.generateContent(prompt);
        const response = result.response;
        const text = response.text();
        console.log({ text });
        setLoader(<></>);
        setPrevious([...previous, { prompt: prompt, generated: text }]);
        setPr("");
        setGenerated(text);
      } catch (error) {
        console.log({ error });
        setGenerated("whoops an error occured");
        setPr("");
        setLoader(<></>);
      }
    } else {
      await geminiVision(prompt);
    }
  };
  const onSelectChange = (option: string) => {
    if (option === "Gemini Pro") {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  };

  return (
    <div>
      <div>
        <div className={styles.headerContainer}>
          <div className={styles.h1Container}>
            <h1 className={styles.h1}>GI</h1>
            <h1 className={styles.h1}>
              <GeminiSelect onChange={onSelectChange} />
            </h1>
          </div>
          <div className={styles.body}>
            {previous.length > 0 ? (
              showPrevious()
            ) : pr ? (
              <></>
            ) : (
              <div style={{ color: "white", paddingTop: "40px" }}>
                <h1
                  style={{ fontWeight: "bold", marginBottom: "30px" }}
                  className={styles.typewriter}
                >
                  Hello, I am Gemini.
                </h1>
                {/* <p>Tell me what is on your mind...</p> */}
              </div>
            )}
            <div
              ref={containerRef}
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "flex-start",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  padding: "20px 20px 20px 20px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    minWidth: "400px",
                    gap: 5,
                  }}
                >
                  <span
                    style={{
                      marginBottom: "10px",
                      backgroundColor: pr ? "grey" : "transparent",
                      width: "fit-content",
                      padding: "4px 10px",
                      borderRadius: "20px",
                    }}
                  >
                    {pr}
                  </span>
                  <span>{loader}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.inputContainer}>
        {/* <FloatingAction /> */}
        <InputBox
          hopImage={(val) => {
            setImages(val);
          }}
          disabled={disabled}
          onSubmit={(val) => {
            const containerElement = containerRef.current;
            if (containerElement) {
              containerElement.scrollTo(0, containerElement.scrollHeight);
            }
            setGenerated("");
            setPr(val);
            onsubmit(val);
            setLoader(<Loader />);
          }}
        />
      </div>
    </div>
  );
}
