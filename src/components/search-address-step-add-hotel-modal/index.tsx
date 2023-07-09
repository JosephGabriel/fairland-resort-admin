import React, { useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import { Grid, TextField, Autocomplete, Typography } from "@mui/material";
import { useQuery } from "react-query";
import { FormikProps } from "formik";

import { CustomInput } from "../custom-input";

import { InitialValues } from "../add-hotel-modal/utils";

import { searchAddress, NominatimResult } from "../../services/api";

import * as Material from "./styles";

interface RecenterProps {
  coordinates: number[];
}

interface Props {
  formik: FormikProps<InitialValues>;
}

const Recenter = ({ coordinates }: RecenterProps) => {
  const map = useMap();

  React.useEffect(() => {
    map.setZoom(20);

    // @ts-expect-error ...
    map.fitBounds([coordinates, coordinates], {
      padding: [100, 100],
      animate: true,
    });
  }, [coordinates, map]);
  return null;
};

export const SearchAddressStep = ({ formik }: Props) => {
  const [isOpen, setOpen] = useState(false);
  const [postCode, setPostCode] = useState("");
  const [options, setOptions] = useState<NominatimResult[]>([]);
  const [coordinates, setCoordinates] = useState<number[]>([0, 0]);
  const [selectedAddress, setAddress] = useState<NominatimResult>();

  const { isLoading, refetch } = useQuery<NominatimResult[]>({
    queryKey: ["searchAddress"],
    queryFn: () => searchAddress(postCode),
    onSuccess: (data) => {
      setOptions(data);
    },
    enabled: false,
  });

  useEffect(() => {
    refetch();
  }, [postCode, refetch]);

  return (
    <Material.Container container spacing={2} alignItems="stretch">
      <Grid item md={6}>
        <Autocomplete
          open={isOpen}
          id="search-address-autocomplete"
          loadingText="Pesquisando..."
          filterOptions={(x) => x}
          options={options}
          noOptionsText="Não foi possível encontrar o endereço"
          onOpen={() => setOpen(true)}
          onClose={() => setOpen(false)}
          loading={isLoading}
          style={{ width: "100%" }}
          onChange={(_, value) => {
            if (!value || selectedAddress === value) {
              return;
            }

            setCoordinates([parseFloat(value.lat), parseFloat(value.lon)]);

            formik.setFieldValue("latitude", parseFloat(value.lat));
            formik.setFieldValue("longitude", parseFloat(value.lon));
            formik.setFieldValue("address", value.address["road"]);
            formik.setFieldValue("neighborhood", value.address["suburb"]);
            formik.setFieldValue(
              "state",
              value.address["state"] ?? value.address["state_district"]
            );
            formik.setFieldValue(
              "city",
              value.address["city"] ??
                value.address["town"] ??
                value.address["city_district"]
            );
            formik.setFieldValue("zipCode", value.address["postcode"]);
            formik.setFieldValue("addressNumber", "");

            setAddress(value);
          }}
          getOptionLabel={(option) => option?.display_name ?? "Não encontrada"}
          renderInput={(params) => (
            <Material.SearchInput
              {...params}
              variant="outlined"
              fullWidth
              label="Pesquisar endereço"
              value={postCode}
              onChange={(e) => setPostCode(e.target.value)}
            />
          )}
        />

        {/* <Material.FormTitle variant="body1">Endereço: </Material.FormTitle> */}

        <CustomInput name="address" label={"Logradouro"} />

        <CustomInput name="neighborhood" label={"Bairro"} />

        <CustomInput name="state" label={"Estado"} />

        <CustomInput name="city" label={"Cidade"} />

        <CustomInput name="zipCode" label={"CEP"} />

        <CustomInput name="addressNumber" label={"Número"} />
      </Grid>

      <Grid item md={6}>
        <MapContainer
          id="map"
          // @ts-expect-error ....
          center={coordinates}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {selectedAddress && (
            <>
              <Marker
                // @ts-expect-error ...
                position={coordinates}
              >
                <Popup>{selectedAddress.display_name}</Popup>
              </Marker>

              <Recenter coordinates={coordinates} />
            </>
          )}
        </MapContainer>
      </Grid>
    </Material.Container>
  );
};
