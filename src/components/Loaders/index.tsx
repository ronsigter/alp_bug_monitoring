import { LoaderCircle } from "lucide-react";

type SpinnerProps = {
  message?: string;
};

export function Spinner(props: SpinnerProps) {
  return (
    <div className="flex h-full items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-2">
        <LoaderCircle className="h-12 w-12 animate-spin" />
        <p className="text-muted-foreground text-sm italic">{props.message}</p>
      </div>
    </div>
  );
}
