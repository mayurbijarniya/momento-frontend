"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useToast } from "../ui/use-toast";

type DeleteAccountDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isLoading?: boolean;
};

const DeleteAccountDialog = ({
  isOpen,
  onClose,
  onConfirm,
  isLoading = false,
}: DeleteAccountDialogProps) => {
  const [confirmText, setConfirmText] = useState("");
  const { toast } = useToast();
  const CONFIRM_TEXT = "delete";

  if (!isOpen) return null;

  const handleConfirm = () => {
    if (confirmText.toLowerCase() !== CONFIRM_TEXT) {
      toast({
        title: "Confirmation text doesn't match",
        description: `Please type "${CONFIRM_TEXT}" to confirm account deletion.`,
      });
      return;
    }
    onConfirm();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-dark-2 rounded-lg p-6 w-full max-w-md mx-4 border border-dark-4">
        <h2 className="text-xl font-bold text-white mb-2">Delete Account</h2>
        <p className="text-light-2 mb-4">
          This action cannot be undone. This will permanently delete your
          account and remove all your data from our servers.
        </p>
        <p className="text-light-3 text-sm mb-4">
          Type <span className="font-bold text-white">"{CONFIRM_TEXT}"</span> to
          confirm:
        </p>
        <Input
          type="text"
          value={confirmText}
          onChange={(e) => setConfirmText(e.target.value)}
          placeholder={CONFIRM_TEXT}
          className="mb-4 bg-dark-4 border-dark-4 text-white"
          disabled={isLoading}
          onKeyDown={(e) => {
            if (
              e.key === "Enter" &&
              confirmText.toLowerCase() === CONFIRM_TEXT
            ) {
              handleConfirm();
            }
          }}
        />
        <div className="flex gap-3 justify-end">
          <Button
            variant="ghost"
            onClick={onClose}
            disabled={isLoading}
            className="hover:bg-dark-4"
          >
            Cancel
          </Button>
          <Button
            onClick={handleConfirm}
            disabled={isLoading || confirmText.toLowerCase() !== CONFIRM_TEXT}
            className="bg-red-600 hover:bg-red-700 text-white"
          >
            {isLoading ? "Deleting..." : "Delete Account"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DeleteAccountDialog;
