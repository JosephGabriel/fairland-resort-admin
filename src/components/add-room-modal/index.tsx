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

import { BasicInformationStepModal } from "@components/basic-information-step-add-hotel-modal";
import { RoomImageUploadStep } from "@components/room-image-step";

import {
  InitialValues,
  fields,
  initialValues,
  validationSchema,
} from "./utils";

import { OrderBy, useCreateRoomMutation } from "@services/apollo/hooks";
import { GetHotelByIdDocument } from "@services/apollo/documents";

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
        const hotel = cache.readQuery({
          query: GetHotelByIdDocument,
          variables: {
            id: hotelId,
            roomOptions: {
              skip: 0,
              take: 4,
              orderBy: OrderBy.Desc,
            },
          },
        });

        if (!hotel || !data?.createRoom) {
          return;
        }

        const room = data.createRoom;

        cache.writeQuery({
          query: GetHotelByIdDocument,
          variables: {
            id: hotelId,
            roomOptions: {
              skip: 0,
              take: 4,
              orderBy: OrderBy.Desc,
            },
          },
          data: {
            hotel: {
              ...hotel?.hotel,
              rooms: [...hotel.hotel.rooms, room],
            },
          },
        });
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
                <BasicInformationStepModal fields={fields.text} />
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
