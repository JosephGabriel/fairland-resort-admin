import { useState } from "react";
import { Form, Formik } from "formik";

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

import { BasicInformationStep } from "@components/basic-information-step";
import { RoomImageUploadStep } from "@components/room-image-step";

import {
  InitialValues,
  fields,
  initialValues,
  validationSchema,
} from "./utils";

import { useCreateRoomMutation } from "@services/apollo/hooks";
import { RoomRepository } from "@repositories/room";

import * as Material from "./styles";

interface Props {
  hotelId: string;
  isOpen: boolean;
  onClose: () => void;
}

const steps = ["Informações", "Imagens"];

export const AddRoomModal = ({ isOpen, onClose, hotelId }: Props) => {
  const [activeStep, setActiveStep] = useState(0);

  const [createRoom, { loading }] = useCreateRoomMutation();

  const repository = new RoomRepository();

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
    await createRoom({
      variables: {
        data: { ...values, hotel: hotelId },
      },
      onError(error) {
        alert(JSON.stringify(error));
        setActiveStep(0);
        onClose();
      },
      update: (cache, { data }) => {
        repository.onAddRoom(data, cache);
      },
      onCompleted() {
        setActiveStep(0);
        onClose();
      },
    });
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
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
                <BasicInformationStep fields={fields.text} />
              )}

              {activeStep === 1 && <RoomImageUploadStep formik={formik} />}

              {activeStep === 2 && (
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
              onClick={activeStep === 1 ? formik.submitForm : nextStep}
              disabled={activeStep === 2 || !formik.isValid}
            >
              {activeStep === 1 ? "Adicionar" : "Próximo"}
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </Formik>
  );
};
