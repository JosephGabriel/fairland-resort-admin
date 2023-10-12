type Unpacked<T> = T extends (infer U)[] ? U : T;

type MutationResult<T> = T | null | undefined;

type CustomFieldConfig = {
  label: string;
  multiline?: boolean;
  minContent?: boolean;
};

type MappedCustomField<T> = {
  [key in keyof T]: CustomFieldConfig;
};

type MappedImageField<T> = {
  [key in keyof T]: string | string[];
};
