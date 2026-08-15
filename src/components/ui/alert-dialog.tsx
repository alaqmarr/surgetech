import React from "react";
import { Button } from "./button";

interface AlertDialogProps {
  isOpen: boolean;
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export function AlertDialog({
  isOpen,
  title,
  description,
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
}: AlertDialogProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-navy-950/80 backdrop-blur-md p-4 animate-in fade-in duration-200">
      <div className="glass-dark border border-white/10 rounded-3xl p-6 md:p-8 shadow-[0_0_50px_rgba(3,29,61,0.5)] max-w-md w-full animate-in zoom-in-95 duration-200">
        <h3 className="font-heading text-xl font-bold text-white mb-3">{title}</h3>
        <p className="text-surface-300 mb-8 leading-relaxed">{description}</p>
        <div className="flex flex-col sm:flex-row justify-end gap-3">
          <Button variant="ghost" onClick={onCancel} className="w-full sm:w-auto bg-white/5 hover:bg-white/10 border border-white/10 text-white">
            {cancelText}
          </Button>
          <Button variant="solar" onClick={onConfirm} className="w-full sm:w-auto">
            {confirmText}
          </Button>
        </div>
      </div>
    </div>
  );
}
