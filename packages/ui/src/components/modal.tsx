import React from "react";
import Button from "./button";
import Card from "./card";
import { X } from "../lib";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex justify-center items-center bg-black/10 backdrop-blur-xs z-50"
      //onClick={onClose}
    >
      <Card scale={false} className="relative p-10">
        <Button
          scale={true}
          className="absolute top-2.5 right-2.5"
          onClick={onClose}
        >
          <X size={20}/>
        </Button>
        {children}
      </Card>
    </div>
  );
};

export default Modal;
