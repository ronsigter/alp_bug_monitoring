"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { useFormSheetStore } from "./useFormSheetStore";

type FormSheetProps = {
  name: string;
  children?: React.ReactNode;
  sheetTrigger?: React.ReactNode;
  title: string;
  side?: "top" | "bottom" | "left" | "right" | null | undefined;
};

export default function FormSheet(props: FormSheetProps) {
  const formSheetStore = useFormSheetStore();
  const isOpen = formSheetStore.openedSheets.has(props.name);

  return (
    <Sheet
      open={isOpen}
      onOpenChange={() => {
        formSheetStore.toggleSheet(props.name);
      }}
    >
      <SheetTrigger asChild>{props.sheetTrigger}</SheetTrigger>
      <SheetContent
        className="w-screen !max-w-none overflow-auto md:w-[540px]"
        side={props.side}
      >
        <SheetHeader>
          <SheetTitle>
            <h3>{props.title}</h3>
          </SheetTitle>
        </SheetHeader>
        {props.children}
      </SheetContent>
    </Sheet>
  );
}
