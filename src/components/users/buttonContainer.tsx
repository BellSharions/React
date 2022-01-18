import { BtnContainerProps } from "@/types/types";
import { FC } from "react";
import Button from "./button";

const BtnContainer: FC<BtnContainerProps> = ({ action, childrenProps }) => (
  <Button action={action} text={childrenProps} />
);

export default BtnContainer;
