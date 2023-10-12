import { useState } from "react";
import { useSnackbar } from "notistack";
import { faker } from "@faker-js/faker";

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
import { SearchAddressStep } from "@components/search-address-step";
import { ImageUploadStep } from "@components/image-upload-step";

import { HotelRepository } from "@repositories/hotel";

import { useCreateHotelMutation } from "@services/apollo/hooks";

import {
  fields,
  imagesFields,
  ImagesSchema,
  BasicHotelInfoSchema,
  TAddHotelSchema,
  TBasicHotelInfoSchema,
  TImagesSchema,
} from "./utils";

import * as Material from "./styles";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const steps = ["Informações básicas", "Localização", "Imagens"];

export const AddHotelModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const [activeStep, setActiveStep] = useState(0);

  const [formValues, setFormValues] = useState<TAddHotelSchema>({
    name: faker.company.name(),
    summary: faker.company.catchPhrase(),
    description: faker.lorem.paragraphs(2),

    address: faker.location.streetAddress(),
    addressNumber: faker.helpers
      .rangeToNumber({ min: 100, max: 1000 })
      .toString(),
    city: faker.location.city(),
    latitude: faker.location.latitude(),
    longitude: faker.location.longitude(),
    neighborhood: faker.location.county(),
    state: faker.location.state(),
    zipCode: faker.location.zipCode(),

    images: [faker.image.urlPicsumPhotos(), faker.image.urlLoremFlickr()],
    logo: faker.image.unsplash.people(),
    thumbnail: faker.image.urlPicsumPhotos(),
  });

  const [createHotel, { loading }] = useCreateHotelMutation();

  const { enqueueSnackbar } = useSnackbar();

  const repository = new HotelRepository();

  const onSubmitStep = (values: Partial<TAddHotelSchema>) => {
    setFormValues((prev) => ({
      ...prev,
      ...values,
    }));

    nextStep();
  };

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

  const onCloseModal = () => {
    if (loading || activeStep === 3) {
      return;
    }

    setActiveStep(0);
    onClose();
  };

  const onSubmit = async () => {
    await createHotel({
      variables: { data: formValues as TAddHotelSchema },
      update: (cache, { data }) => {
        repository.onCreateHotel(data, cache);
      },
      onError(error) {
        if (error.graphQLErrors) {
          error.graphQLErrors.map((error) => {
            enqueueSnackbar(error.message, {
              variant: "error",
            });
          });
        }

        if (error.networkError) {
          enqueueSnackbar("Erro de conexão, tente novamente mais tarde", {
            variant: "error",
          });
        }

        onCloseModal();
      },
      onCompleted() {
        enqueueSnackbar("Hotel criado com sucesso", {
          variant: "success",
        });

        onCloseModal();
      },
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
