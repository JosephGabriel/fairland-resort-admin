import { useRef, useState } from "react";
import { Form, Formik, FormikProps } from "formik";

import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Step,
  StepLabel,
  Stepper,
} from "@mui/material";

import { BasicInformationStepModal } from "../basic-information-step-add-hotel-modal";
import { SearchAddressStep } from "../search-address-step-add-hotel-modal";
import { ImageUploadStep } from "../image-upload-step-add-hotel-modal";

import {
  InitialValues,
  fields,
  initialValues,
  validationSchema,
} from "./utils";

import { useCreateHotelMutation } from "@services/apollo/hooks";

import { HotelRepository } from "@repositories/hotel";

import * as Material from "./styles";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const steps = ["Informações básicas", "Localização", "Imagens"];

export const AddHotelModal = ({ isOpen, onClose }: Props) => {
  const [activeStep, setActiveStep] = useState(0);

  const [createHotel, { loading }] = useCreateHotelMutation();

  const repository = new HotelRepository();

  const formikRef = useRef<FormikProps<InitialValues> | null>(null);

  const nextStep = () => {
    setActiveStep((prev) => prev + 1);
  };

  const prevStep = () => {
    if (activeStep <= 0) {
      onClose();
      return;
    }

    setActiveStep((prev) => prev - 1);
  };

  const onCloseModal = () => {
    if (loading || activeStep === 3) {
      return;
    }

    onClose();
  };

  const onSubmit = async (values: InitialValues) => {
    await createHotel({
      variables: { data: values },
      update: (cache, { data }) => {
        repository.onCreateHotel(data, cache);
      },
      onError(error) {
        alert(JSON.stringify(error));
        setActiveStep(0);
        formikRef.current?.resetForm();
        onClose();
      },
      onCompleted() {
        formikRef.current?.resetForm();
        setActiveStep(0);
        onClose();
      },
    });
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      innerRef={(ref) => (formikRef.current = ref)}
      onSubmit={onSubmit}
    >
      {(formik) => (
        <Dialog open={isOpen} onClose={onCloseModal} fullWidth maxWidth={"md"}>
          <DialogTitle>Adicionar um hotel</DialogTitle>

          <DialogContent>
            <Material.DialogText>
              Preencha os campos abaixo para adicionar um hotel
            </Material.DialogText>

            <Stepper activeStep={activeStep} alternativeLabel>
              {steps.map((step) => (
                <Step key={step}>
                  <StepLabel>{step}</StepLabel>
                </Step>
              ))}
            </Stepper>

            <Form onSubmit={formik.handleSubmit}>
              {activeStep === 0 && (
                <BasicInformationStepModal fields={fields} />
              )}

              {activeStep === 1 && <SearchAddressStep formik={formik} />}

              {activeStep === 2 && <ImageUploadStep formik={formik} />}

              {activeStep === 3 && (
                <Material.LoadingContainer>
                  <CircularProgress />
                </Material.LoadingContainer>
              )}
            </Form>
          </DialogContent>

          <DialogActions>
            <Button onClick={prevStep}>
              {activeStep === 0 ? "Cancelar" : "Voltar"}
            </Button>

            <Button
              onClick={activeStep === 2 ? formik.submitForm : nextStep}
              disabled={activeStep === 3 || !formik.isValid}
            >
              {activeStep === 2 ? "Adicionar" : "Próximo"}
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </Formik>
  );
};
