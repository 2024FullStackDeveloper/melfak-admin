"use client";

import { Button } from "@/components/ui/button";
import Spinner from "../spinner/Spinner.tsx";

interface Props extends React.ComponentProps<typeof Button> {
  isLoading?: boolean;
}

const LoadingButton = ({ isLoading, ...props }: Props) => {
  return (
    <Button disabled={isLoading} {...props}>
      {isLoading && <Spinner className="mx-1" />}
      {props.children}
    </Button>
  );
};

export default LoadingButton;
