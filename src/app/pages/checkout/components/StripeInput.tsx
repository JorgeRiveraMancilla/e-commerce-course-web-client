import { InputBaseComponentProps } from "@mui/material";
import React, { forwardRef, useImperativeHandle, useRef } from "react";

interface Props extends InputBaseComponentProps {}

export const StripeInput = forwardRef(function StripeInput(
  { component: Component, ...props }: Props,
  ref: React.Ref<unknown>
) {
  const elementRef = useRef<HTMLElement | null>(null);

  useImperativeHandle(ref, () => ({
    focus: () => elementRef.current?.focus,
  }));

  return (
    <Component
      onReady={(element: HTMLElement) => (elementRef.current = element)}
      {...props}
    />
  );
});
