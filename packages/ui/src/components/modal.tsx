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
      className="fixed inset-0 flex justify-center items-center bg-black/50 backdrop-blur-xs z-50"
      //onClick={onClose}
    >
      <Button
        scale={true}
        className="absolute top-10 right-10"
        onClick={onClose}
      >
        <X size={20} />
      </Button>
      <div className="relative p-8 m-4 ">
        {children}
      </div>
    </div>
  );
};

export default Modal;
