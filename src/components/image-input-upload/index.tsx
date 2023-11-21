import { Fragment, useRef } from "react";
import { Photo, Close } from "@mui/icons-material";

import { MultipleImageItem } from "@src/components/multiple-image-item";

import { uploadImages } from "@src/services/api";

import * as Material from "./styles";

interface Props {
  name: string;
  value: string | string[];
  onChange: (e: unknown) => void;
  onBlur: (e: unknown) => void;
}

export function ImageInputUpload(props: Props) {
  const { name, value, onBlur, onChange } = props;

  const inputRef = useRef<HTMLInputElement | null>(null);

  const onClick = () => {
    inputRef.current?.click();
  };

  const _onChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }

    const { url } = (await uploadImages(e.target.files)) as { url: string };

    onChange(url);
  };

  const _onRemoveImage = () => {
    onChange("");
  };

  const onRemoveImageItem = (index: number) => {
    if (value instanceof Array) {
      value.splice(index, 1);

      onChange(value);
    }
  };

  if (value instanceof Array) {
    return (
      <Material.GridItem item md={4}>
        <Material.UploadItem>
          {value.length && (
            <Fragment>
              <MultipleImageItem
                onRemoveItem={onRemoveImageItem}
                images={value}
              />
            </Fragment>
          )}
        </Material.UploadItem>

        <Material.LabelText variant="body2" color="textSecondary">
          {name}
        </Material.LabelText>
      </Material.GridItem>
    );
  }

  return (
    <Material.GridItem item md={4}>
      <Material.UploadItem>
        {value.length && (
          <Fragment>
            <Material.RemoveImageButton onClick={_onRemoveImage}>
              <Close />
            </Material.RemoveImageButton>

            <Material.Image src={value} />
          </Fragment>
        )}

        {!value.length && (
          <Material.UploadButton onClick={onClick}>
            <input
              type="file"
              hidden
              multiple={name !== "images"}
              accept="image/*"
              name={name}
              value={value}
              onChange={_onChange}
              onBlur={onBlur}
              ref={(ref) => (inputRef.current = ref)}
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
}
