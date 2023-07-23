import { Fragment, useRef } from "react";
import { Photo, Close } from "@mui/icons-material";

import { MultipleImageItem } from "../multiple-image-item";
import { ImageUpload } from "../room-image-step";

import { uploadImages } from "../../services/api";

import * as Material from "./styles";

interface Props {
  images: ImageUpload;
  name: string;
  isMultiple: boolean;
  onRemoveImage: (name: string) => void;
  onImageUploaded: (url: string, name: string) => void;
}

export const RoomImageInputButton = ({
  name,
  images,
  isMultiple,
  onRemoveImage,
  onImageUploaded,
}: Props) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const onClick = () => {
    inputRef.current?.click();
  };

  const onChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }

    const { url } = (await uploadImages(e.target.files)) as { url: string };

    onImageUploaded(url, name);
  };

  const _onRemoveImage = () => {
    onRemoveImage(name);
  };

  return (
    <Material.GridItem item md={4}>
      <Material.UploadItem>
        {images[name as keyof ImageUpload].length ? (
          <Fragment>
            {name === "images" ? (
              <MultipleImageItem images={images["images"]} />
            ) : (
              <Fragment>
                <Material.RemoveImageButton onClick={_onRemoveImage}>
                  <Close />
                </Material.RemoveImageButton>

                <Material.Image
                  // @ts-expect-error ...
                  src={images[name as keyof ImageUpload]}
                />
              </Fragment>
            )}
          </Fragment>
        ) : (
          <Material.UploadButton onClick={onClick}>
            <input
              type="file"
              hidden
              multiple={isMultiple}
              accept="image/*"
              name={name}
              ref={(ref) => (inputRef.current = ref)}
              onChange={onChange}
            />
            <Photo />
          </Material.UploadButton>
        )}
      </Material.UploadItem>

      <Material.LabelText variant="body2" color="textSecondary">
        {name}
      </Material.LabelText>
    </Material.GridItem>
  );
};
