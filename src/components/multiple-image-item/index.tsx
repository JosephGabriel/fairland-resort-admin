import { useState } from "react";
import { ChevronLeft, ChevronRight, Close } from "@mui/icons-material";

import * as Material from "./styles";

interface Props {
  images: string[];
  // onRemoveItems: (index: number) => void;
}

export const MultipleImageItem = ({ images }: Props) => {
  const [currentImage, setCurrentIndex] = useState(0);

  const nextImage = () => {
    setCurrentIndex((prev) => prev + 1);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => prev - 1);
  };

  return (
    <Material.ImageContainer>
      <Material.RemoveImageButton>
        <Close />
      </Material.RemoveImageButton>

      <Material.ImageBox>
        {images.length > 1 && (
          <Material.ButtonContainer>
            <Material.ChangeImageButton
              disabled={currentImage === 0}
              onClick={prevImage}
            >
              <ChevronLeft />
            </Material.ChangeImageButton>

            <Material.ChangeImageButton
              disabled={currentImage + 1 >= images.length}
              onClick={nextImage}
            >
              <ChevronRight />
            </Material.ChangeImageButton>
          </Material.ButtonContainer>
        )}

        <Material.ImageAbsolute src={images[currentImage]} />
      </Material.ImageBox>
    </Material.ImageContainer>
  );
};
