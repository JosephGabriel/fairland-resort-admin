import { CustomInput } from "../custom-input";

import * as Material from "./styles";

// interface Props {
//   formik: FormikProps<InitialValues>;
// }

export const BasicInformationStepModal = () => {
  return (
    <Material.Container>
      <CustomInput label="Nome" name="name" />

      <CustomInput name="summary" label="Súmario" />

      <CustomInput name="description" label="Descrição" multiline minRows={4} />
    </Material.Container>
  );
};
