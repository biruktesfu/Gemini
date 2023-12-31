import { Button } from "@/components/ui/button";
import styles from "./index.module.css";
import { IoIosChatbubbles } from "react-icons/io";
import { IoIosClose } from "react-icons/io";
import { IoMdSend } from "react-icons/io";
import { RxAvatar } from "react-icons/rx";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export const FloatingAction = () => {
  const [isOpen, setisOpen] = useState(false);
  const [input, setinput] = useState("");
  const conversation = [
    {
      speaker: "customer",
      message: "Hello, I need help with my order.",
    },
    {
      speaker: "agent",
      message:
        "Hi there, I'm happy to assist you with that. Can you please provide me with your order number?",
    },
    {
      speaker: "customer",
      message: "Sure, it's 123456.",
    },
    {
      speaker: "agent",
      message:
        "Thank you. I'm looking into your order now. It seems there's a slight delay in processing. I apologize for the inconvenience.",
    },
    {
      speaker: "customer",
      message: "Oh, I see. Can you please provide an estimated delivery time?",
    },
    {
      speaker: "agent",
      message:
        "Yes, I can. Your order is expected to arrive within 2-3 business days. I'll send you a tracking link as soon as it's shipped.",
    },
    {
      speaker: "customer",
      message: "Great, thank you so much for your help!",
    },
    {
      speaker: "agent",
      message:
        "You're welcome! Is there anything else I can assist you with today?",
    },
    {
      speaker: "customer",
      message: "No, that's all for now. Thank you again.",
    },
    {
      speaker: "agent",
      message: "You're very welcome. Have a great day!",
    },
  ];

  const DisplayConvo = conversation.map((message, index: number) => {
    return (
      <div style={{ display: "flex", flexDirection: "column" }} key={index}>
        <div
          style={{
            width: "100%",
            display: "flex",
            margin: "1rem 0",
            fontSize: "12px",
            justifyContent:
              message.speaker === "agent" ? "flex-start" : "flex-end",
          }}
        >
          <span
            style={{
              backgroundColor:
                message.speaker === "agent" ? "#b6b8b6" : "#9ad6a4",
              margin: message.speaker === "agent" ? "0 3rem 0 0" : "0 0 0 3rem",
              padding: "10px",
              borderRadius: "10px",
              color: message.speaker === "agent" ? "black" : "black",
            }}
          >
            {message.message}
          </span>
        </div>
      </div>
    );
  });
  const oninputChange = (event: any) => {
    setinput(event.target.value);
  };
  const onButtonClick = () => {
    setisOpen(!isOpen);
  };
  return (
    <Popover open={isOpen}>
      <PopoverTrigger asChild>
        <Button className={styles.button} onClick={onButtonClick}>
          <span
            className={styles.open}
            style={{ color: isOpen ? "transparent" : "", transition: "0.4s" }}
          >
            <IoIosChatbubbles size={30} />
          </span>

          <span
            className={styles.close}
            style={{ color: !isOpen ? "transparent" : "", transition: "0.4s" }}
          >
            <IoIosClose size={30} />
          </span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className={styles.popoverContent}>
        <div className="grid gap-4">
          {/* <div className="space-y-2">
            <h4 className="font-medium leading-none flex">
              <span>Guzogo agent</span>
            </h4>
          </div> */}
          <div className={styles.conversation}>{DisplayConvo}</div>
          <div className={styles.inputContainer}>
            <Input className={styles.input} onChange={oninputChange} />
            <span className={styles.messageIcon}>
              <Button
                className={styles.messageButton}
                variant={"outline"}
                style={{ border: "none", padding: 0 }}
              >
                <IoMdSend size={24} />
              </Button>
            </span>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};
