import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { DialogClose } from "@radix-ui/react-dialog";
import { Loader, Trash2Icon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDeleteInvoiceMutation } from "./invoiceMutations";
import { toast } from "sonner";
import { AxiosApiResponse } from "@/types/axiosApiResponse";

import { useRouter, useParams } from "next/navigation";

const DeleteInvoiceModal = () => {
  const { id } = useParams();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true); // Open modal
  const closeModal = () => setIsOpen(false);
  const {
    mutateAsync: deleteInvoice,
    isPending,
    isError,
    error,
    isSuccess,
  } = useDeleteInvoiceMutation();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await deleteInvoice(id);
    closeModal();
    router.back();
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Success", {
        description: "invoice updated",
      });
    }
    if (isError) {
      toast.error("Error", {
        description:
          (error as AxiosApiResponse).response?.data?.message ?? error.message,
      });
    }
  }, [isSuccess, isError]);

  return (
    <Dialog open={isOpen} onOpenChange={openModal}>
      <DialogTrigger asChild>
        <Button variant={"ghost"}>
          <Trash2Icon />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Delete Invoice</DialogTitle>
        </DialogHeader>
        <div className="flex items-center ">
          are you sure on deleting the invoice? this action cannot be undo.
        </div>
        <DialogFooter className="justify-end">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Cancel
            </Button>
          </DialogClose>

          <Button
            onClick={onSubmit}
            disabled={isPending}
            type="button"
            variant="ghost"
          >
            {isPending ? (
              <>
                <Loader /> Deleting...
              </>
            ) : (
              "Delete"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteInvoiceModal;
