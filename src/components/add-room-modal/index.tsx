import { useState } from "react";
import { faker } from "@faker-js/faker/locale/pt_BR";

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

import { BasicInformationStep } from "@src/components/basic-information-step";
import { ImageUploadStep } from "@src/components/image-upload-step";

import { useCreateRoomMutation } from "@src/services/apollo/hooks";

import { RoomRepository } from "@src/repositories/room";

import {
  steps,
  fields,
  imagesFields,
  RoomBasicInfoSchema,
  RoomImagesSchema,
  TAddRoomSchema,
  TRoomBasicInfoSchema,
  TRoomImagesSchema,
  Props,
} from "./utils";

import Material from "./styles.ts";

export const AddRoomModal = ({ isOpen, onClose, hotelId }: Props) => {
  const [activeStep, setActiveStep] = useState(0);

  const [formFields, setFormFields] = useState<TAddRoomSchema>({
    name: faker.company.name(),
    summary: faker.lorem.sentence(),
    description: faker.lorem.paragraphs(),

    price: Math.floor(Math.random() * (199 - 20 + 1)) + 20,

    thumbnail: faker.image.urlLoremFlickr({ category: "business" }),
    images: [
      faker.image.urlLoremFlickr({ category: "nightlife" }),
      faker.image.urlLoremFlickr({ category: "people" }),
      faker.image.urlLoremFlickr({ category: "business" }),
    ],
  });

  const [createRoom, { loading }] = useCreateRoomMutation();

  const repository = new RoomRepository();

  const nextStep = () => {
    if (activeStep === 1) {
      onSubmit(formFields);
    }

    setActiveStep((prev) => prev + 1);
  };

  const prevStep = () => {
    if (activeStep <= 0) {
      onClose();
      return;
    }

    setActiveStep((prev) => prev - 1);
  };

  const onSubmitStep = (values: Partial<TAddRoomSchema>) => {
    setFormFields((prev) => Object.assign(prev, values));

    nextStep();
  };

  const onCloseModal = () => {
    if (loading || activeStep === 3) {
      return;
    }

    onClose();
  };

  const onSubmit = async (values: TAddRoomSchema) => {
    await createRoom({
      variables: {
        data: {
          ...values,
          hotel: hotelId,
        },
      },
      onError(error) {
        alert(JSON.stringify(error));
      },
      update: (cache, { data }) => {
        repository.onAddRoom(data, cache);
      },
    }).finally(() => {
      setActiveStep(0);
      onClose();
    });
  };

  return (
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

        {activeStep === 0 && (
          <BasicInformationStep<TRoomBasicInfoSchema>
            key={"basic-room"}
            fields={fields}
            defaultValues={formFields}
            schema={RoomBasicInfoSchema}
            onSubmit={onSubmitStep}
          />
        )}

        {activeStep === 1 && (
          <ImageUploadStep<TRoomImagesSchema>
            defaultValues={formFields}
            onSubmit={onSubmitStep}
            schema={RoomImagesSchema}
            fields={imagesFields}
          />
        )}

        {activeStep === 2 && (
          <Material.LoadingContainer>
            <CircularProgress />
          </Material.LoadingContainer>
        )}
      </DialogContent>

      <DialogActions>
        <Button onClick={prevStep} disabled={activeStep === 2}>
          {activeStep === 0 ? "Cancelar" : "Voltar"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
