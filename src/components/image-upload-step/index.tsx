import { FormikProps } from "formik";

import { ImageInputUpload } from "@components/image-input-upload";
import { InitialValues } from "@components/add-hotel-modal/utils";

import * as Material from "./styles";

interface Props {
  formik: FormikProps<InitialValues>;
  fields: { [name: string]: string | string[] };
  onRemoveImage: (name: string) => void;
  onImageUploaded: (url: string, name: string) => void;
}

export const ImageUploadStep = ({
  fields,
  formik,
  onRemoveImage,
  onImageUploaded,
}: Props) => {
  const onImageUpload = (url: string, name: string) => {
    onImageUploaded(url, name);
  };

  const onRemovedImage = (name: string) => {
    onRemoveImage(name);
  };

  return (
    <Material.Container container spacing={2} alignItems={"stretch"}>
      {Object.keys(fields).map((name) => (
        <ImageInputUpload
          name={name}
          // @ts-expect-error ...
          value={formik.values[name]}
          onRemoveImage={onRemovedImage}
          onImageUploaded={onImageUpload}
        />
      ))}
    </Material.Container>
  );
};
