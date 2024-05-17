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
  const [generate, setGenerated] = useState<{ [key: string]: any } | undefined>(
    undefined
  );
  const [images, setImages] = useState<FileList>();
  const [loader, setLoader] = useState(<></>);
  const [disabled, setDisabled] = useState(true);
  const genAI = new GoogleGenerativeAI(process.env.API_KEY as string);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLDivElement>(null);
  const inputElement = inputRef.current;
  const containerElement = containerRef.current;

  const showPrevious = () => {
    return (
      previous.length > 0 &&
      previous.map((value: any, index: number) => {
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
            <span className={styles.prompt}>{value && value.prompt}</span>
            <span
              // style={{ fontSize: "14px", color: "#9c9c9c" }}
              className={styles.generated}
            >
              {value && value.generated}
              {/* {index === previous.length - 1 && <span>{loader}</span>} */}
            </span>
          </div>
        );
      })
    );
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
      try {
        let generated = "";
        // For text-and-images input (multimodal), use the gemini-pro-vision model
        const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });

        const fileInputEl: any = images;
        const imageParts: any = await Promise.all(
          [...fileInputEl].map(fileToGenerativePart)
        );

        const result = await model.generateContentStream([
          prompt,
          ...imageParts,
        ]);
        for await (const chunk of result.stream) {
          const chunkText = chunk.text();
          generated += chunkText;
          setGenerated({ prompt, generated });
        }
        setPrevious([...previous, { prompt, generated }]);
        setLoader(<></>);
      } catch (error: any) {
        // setGenerated({ prompt, generated: error.toString() });
        setGenerated({ prompt, generated: "An error occured" });
        setLoader(<></>);
      }
    }
    run(prompt);
  };
  useEffect(() => {
    setGenerated(undefined);
  }, [previous]);
  const onsubmit = async (prompt: string) => {
    setGenerated({ prompt, generated: "" });
    setLoader(<Loader />);
    let generated = ``;
    if (disabled) {
      try {
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        const result = await model.generateContentStream(prompt);
        for await (const chunk of result.stream) {
          const chunkText = chunk.text();
          let rawArray: any = chunkText.split("*");
          console.log({ rawArray });

          rawArray = rawArray
            .filter((val: any) => val !== "")
            .map((indivstring: any, index: number) => {
              generated += indivstring;
              return (
                <div key={index}>
                  <div>{generated}</div>
                </div>
              );
            });

          // generated += chunkText;
          setGenerated({ prompt, generated: rawArray });
        }
        setPrevious([...previous, { prompt, generated }]);
        setLoader(<></>);
      } catch (error: any) {
        // setGenerated({ prompt, generated: error.toString() });
        setGenerated({ prompt, generated: "An error occured" });
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
  useEffect(() => {
    containerElement?.scrollTo(0, containerElement.scrollHeight);
  }, [generate, previous]);

  return (
    <div>
      <div>
        <div className={styles.headerContainer}>
          <div className={styles.h1Container}>
            <h1 className={styles.h1}>
              <a>GI</a>
            </h1>

            <h1 className={styles.h1}>
              <GeminiSelect onChange={onSelectChange} />
            </h1>
          </div>
          <div className={styles.body} ref={containerRef}>
            {previous.length > 0 ? (
              showPrevious()
            ) : pr ? (
              <></>
            ) : (
              <div style={{ color: "white", paddingTop: "40px" }}>
                <h1
                  style={{
                    fontWeight: "bold",
                    marginBottom: "30px",
                  }}
                  className={styles.typewriter}
                >
                  Hello, I am Gemini.
                </h1>
              </div>
            )}
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "flex-start",
              }}
            >
              {/* <div
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
                  {!generate && (
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
                  )}
                </div>
              </div> */}
            </div>
            <div
              className={styles.initialGenerate}
              style={{
                color: "white",
              }}
            >
              {generate && (
                <div
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
                  <span className={styles.prompt}>{generate.prompt}</span>
                  <span
                    style={{
                      color: "#9c9c9c",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    {generate.generated}
                    {loader}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className={styles.inputContainer} ref={inputRef}>
        {/* <FloatingAction /> */}

        <InputBox
          hopImage={(val) => {
            setImages(val);
          }}
          disabled={disabled}
          onSubmit={(val) => {
            containerElement?.scrollIntoView({
              behavior: "smooth",
              block: "end",
            });
            setPr(val);
            onsubmit(val);
            setLoader(<Loader />);
          }}
        />
      </div>
    </div>
  );
}
