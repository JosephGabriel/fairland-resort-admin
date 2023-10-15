import { useState } from "react";
import { useSnackbar } from "notistack";

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
import { SearchAddressStep } from "@src/components/search-address-step";
import { ImageUploadStep } from "@src/components/image-upload-step";

import { Loader } from "@src/components/loader";

import {
  useGetHotelByIdQuery,
  useUpdateHotelMutation,
} from "@src/services/apollo/hooks";

import {
  BasicHotelInfoSchema,
  ImagesSchema,
  TBasicHotelInfoSchema,
  TImagesSchema,
  TUpdateHotelSchema,
  fields,
  imagesFields,
} from "./utils";

import * as Material from "./styles";

interface Props {
  hotelId: string;
  isOpen: boolean;
  onClose: () => void;
}

const steps = ["Informações básicas", "Localização", "Imagens"];

export const EditHotelModal = ({ hotelId, isOpen, onClose }: Props) => {
  const [activeStep, setActiveStep] = useState(0);

  const [formValues, setFormValues] = useState<TUpdateHotelSchema>(
    {} as TUpdateHotelSchema
  );

  const { enqueueSnackbar } = useSnackbar();

  const [updateHotel, { loading }] = useUpdateHotelMutation();

  const { loading: isLoading } = useGetHotelByIdQuery({
    variables: {
      id: hotelId,
    },
    onCompleted(data) {
      const values = { ...data.hotel };

      delete values.__typename;

      setFormValues(values);
    },
  });

  const nextStep = () => {
    if (activeStep === 2) {
      onSubmit();
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

  const onSubmitStep = (values: Partial<TUpdateHotelSchema>) => {
    setFormValues((prev) => ({
      ...prev,
      ...values,
    }));

    nextStep();
  };

  const onCloseModal = () => {
    if (loading || activeStep === 3) {
      return;
    }

    setActiveStep(0);
    onClose();
  };

  const onSubmit = async () => {
    await updateHotel({
      variables: { data: formValues, id: hotelId },
      onError(error) {
        if (error.graphQLErrors) {
          error.graphQLErrors.map((error) => {
            enqueueSnackbar(error.message, {
              variant: "error",
            });
          });
        }

        onCloseModal();
      },
      onCompleted() {
        enqueueSnackbar("Hotel atualizado com sucesso", {
          variant: "success",
        });

        onCloseModal();
      },
    });
  };

  return (
    <Dialog open={isOpen} onClose={onCloseModal} fullWidth maxWidth={"md"}>
      <Loader variant="linear" isLoading={isLoading} />

      <DialogTitle>Editar um hotel</DialogTitle>

      <DialogContent>
        <Material.DialogText>
          Preencha os campos abaixo para Editar um hotel
        </Material.DialogText>

        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((step) => (
            <Step key={step}>
              <StepLabel>{step}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {activeStep === 0 && (
          <BasicInformationStep<TBasicHotelInfoSchema>
            fields={fields}
            schema={BasicHotelInfoSchema}
            onSubmit={onSubmitStep}
            defaultValues={formValues}
          />
        )}

        {activeStep === 1 && (
          <SearchAddressStep
            defaultValues={formValues}
            onSelectAddress={onSubmitStep}
          />
        )}

        {activeStep === 2 && (
          <ImageUploadStep<TImagesSchema>
            fields={imagesFields}
            schema={ImagesSchema}
            defaultValues={formValues}
            onSubmit={onSubmitStep}
          />
        )}

        {activeStep === 3 && (
          <Material.LoadingContainer>
            <CircularProgress />
          </Material.LoadingContainer>
        )}
      </DialogContent>

      <DialogActions>
        <Button onClick={prevStep}>
          {activeStep === 0 ? "Cancelar" : "Voltar"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
