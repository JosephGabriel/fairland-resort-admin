import { FormikProps } from "formik";

import { ImageInputButton } from "../image-input-button";

import { InitialValues } from "../add-room-modal/utils";

import * as Material from "./styles";
import { RoomImageInputButton } from "../room-image-input-button";

interface Props {
  formik: FormikProps<InitialValues>;
}

export interface ImageUpload {
  images: string[];
  thumbnail: string;
}

export const RoomImageUploadStep = ({ formik }: Props) => {
  const onImageUploaded = (url: string, name: string) => {
    formik.setFieldValue(name, url);
  };

  const onRemoveImage = (name: string) => {
    formik.setFieldValue(name, "");
  };

  return (
    <Material.Container container spacing={2} alignItems={"stretch"}>
      {["thumbnail", "images"].map((name) => (
        <RoomImageInputButton
          images={formik.values}
          key={name}
          name={name}
          isMultiple={name === "images"}
          onRemoveImage={onRemoveImage}
          onImageUploaded={onImageUploaded}
        />
      ))}
    </Material.Container>
  );
};
