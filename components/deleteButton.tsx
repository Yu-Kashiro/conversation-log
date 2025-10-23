import { Button } from "./ui/button";

export const DeleteButton = ({
  children,
  onClick,
}: {
  children: string;
  onClick: () => void;
}) => {
  return (
    <Button variant="destructive" type="button" onClick={onClick}>
      {children}
    </Button>
  );
};
