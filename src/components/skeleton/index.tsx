import * as Material from "./styles";

interface Props {
  variant: "card";
}

export const CustomSkeleton = ({ variant = "card" }: Props) => {
  if (variant === "card") {
    return (
      <>
        <Material.ImageSkeleton variant="rounded" animation="wave" />

        <Material.TitleSkeleton variant="rounded" animation="wave" />
      </>
    );
  }
};
