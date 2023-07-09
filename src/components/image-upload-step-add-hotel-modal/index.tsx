import { FormikProps } from "formik";

import { ImageInputButton } from "../image-input-button";

import { InitialValues } from "../add-hotel-modal/utils";

import * as Material from "./styles";

interface Props {
  formik: FormikProps<InitialValues>;
}

export interface ImageUpload {
  images: string[];
  logo: string;
  thumbnail: string;
}

export const ImageUploadStep = ({ formik }: Props) => {
  const onImageUploaded = (url: string, name: string) => {
    formik.setFieldValue(name, url);
  };

  const onRemoveImage = (name: string) => {
    formik.setFieldValue(name, "");
  };

  return (
    <Material.Container container spacing={2} alignItems={"stretch"}>
      {["logo", "thumbnail", "images"].map((name) => (
        <ImageInputButton
          images={formik.values}
          name={name}
          isMultiple={name === "images"}
          onRemoveImage={onRemoveImage}
          onImageUploaded={onImageUploaded}
        />
      ))}
    </Material.Container>
  );
};
