import { CustomInput } from "../custom-input";

import * as Material from "./styles";

interface Props {
  fields: {
    [key: string]: {
      label: string;
      multiline?: boolean;
    };
  };
}

export const BasicInformationStepModal = ({ fields }: Props) => {
  return (
    <Material.Container>
      {Object.keys(fields).map((key) => (
        <CustomInput
          key={key}
          label={fields[key].label}
          multiline={fields[key].multiline}
          minRows={fields[key].multiline ? 4 : 0}
          name={key}
        />
      ))}
    </Material.Container>
  );
};
