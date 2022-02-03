import { FC } from "react";
import Button from "./button";

export interface BtnContainerProps {
  action: () => void;
  childrenProps: { label: string; icon?: string };
}

const BtnContainer: FC<BtnContainerProps> = ({ action, childrenProps }) => (
  <Button action={action} text={childrenProps} />
);

export default BtnContainer;
