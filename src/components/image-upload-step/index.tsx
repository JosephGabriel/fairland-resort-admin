import { FormikProps } from "formik";

import { ImageInputUpload } from "@components/image-input-upload";
import { InitialValues } from "@components/add-hotel-modal/utils";

import * as Material from "./styles";

interface Props {
  formik: FormikProps<InitialValues>;
  fields: Partial<InitialValues>;
}

export const ImageUploadStep = ({ fields, formik }: Props) => {
  const onRemoveImage = (name: string) => {
    formik.setFieldValue(name, "");
  };

  const onImageUploaded = (url: string, name: string) => {
    formik.setFieldValue(name, url);
  };

  return (
    <Material.Container container spacing={2} alignItems={"stretch"}>
      {Object.keys(fields).map((name, idx) => (
        <ImageInputUpload
          name={name}
          key={idx}
          // @ts-expect-error ...
          value={formik.values[name]}
          onRemoveImage={onRemoveImage}
          onImageUploaded={onImageUploaded}
        />
      ))}
    </Material.Container>
  );
};
