import { useRef, useState } from "react";
import { Form, Formik, FormikProps } from "formik";
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

import { BasicInformationStepModal } from "@components/basic-information-step-add-hotel-modal";
import { SearchAddressStep } from "@components/search-address-step-add-hotel-modal";
import { ImageUploadStep } from "@components/image-upload-step";
import { Loader } from "@components/loader";

import {
  InitialValues,
  fields,
  imagesFields,
  initialValues,
  validationSchema,
} from "./utils";

import {
  useGetHotelByIdQuery,
  useUpdateHotelMutation,
} from "@services/apollo/generated/hooks";

import * as Material from "./styles";

interface Props {
  hotelId: string;
  isOpen: boolean;
  onClose: () => void;
}

const steps = ["Informações básicas", "Localização", "Imagens"];

export const EditHotelModal = ({ hotelId, isOpen, onClose }: Props) => {
  const [activeStep, setActiveStep] = useState(0);

  const [updateHotel, { loading }] = useUpdateHotelMutation();

  const { loading: isLoading } = useGetHotelByIdQuery({
    variables: {
      id: hotelId,
    },
    onCompleted(data) {
      Object.keys(initialValues).map((key) => {
        formikRef.current?.setFieldValue(
          key,
          data.hotel[key as keyof typeof data.hotel]
        );
      });
    },
  });

  const { enqueueSnackbar } = useSnackbar();

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

    setActiveStep(0);
    onClose();
  };

  const onSubmit = async (values: InitialValues) => {
    await updateHotel({
      variables: { data: values, id: hotelId },
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

  const onRemoveImage = (name: string) => {
    const meta = formikRef.current?.getFieldMeta(name);

    alert(JSON.stringify(meta));
    return;
    formikRef.current?.setFieldValue(name, "");
  };

  const onImageUploaded = (url: string, name: string) => {
    formikRef.current?.setFieldValue(name, url);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      innerRef={formikRef}
    >
      {(formik) => (
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

            <Form onSubmit={formik.handleSubmit}>
              {activeStep === 0 && (
                <BasicInformationStepModal fields={fields} />
              )}

              {activeStep === 1 && <SearchAddressStep formik={formik} />}

              {activeStep === 2 && (
                <ImageUploadStep
                  formik={formik}
                  onRemoveImage={onRemoveImage}
                  onImageUploaded={onImageUploaded}
                  fields={imagesFields}
                />
              )}

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
              {activeStep === 2 ? "Editar" : "Próximo"}
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </Formik>
  );
};
