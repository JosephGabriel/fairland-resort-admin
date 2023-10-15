import { useState } from "react";
import { useQuery } from "react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { enqueueSnackbar } from "notistack";
import { Grid, Autocomplete, Button } from "@mui/material";

import { CustomMap } from "@src/components/map-container";

import {
  SearchAddressSchema,
  TAddHotelSchema,
  TSearchAddressSchema,
} from "@src/components/add-hotel-modal/utils";

import { searchAddress, NominatimResult } from "@src/services/api";

import * as Material from "./styles";

interface Props {
  defaultValues: TSearchAddressSchema;
  onSelectAddress: (selectedAddress: Partial<TAddHotelSchema>) => void;
}

export function SearchAddressStep({ defaultValues, onSelectAddress }: Props) {
  const [isOpen, setOpen] = useState(false);
  const [postCode, setPostCode] = useState("");
  const [options, setOptions] = useState<NominatimResult[]>([]);
  const [selectedAddress, setAddress] = useState<NominatimResult>();

  const { isLoading, isFetching } = useQuery<NominatimResult[]>({
    queryKey: [postCode],
    queryFn: () => searchAddress(postCode),
    onSuccess: (data) => setOptions(data),
    onError: () => enqueueSnackbar("Erro ao pesquisar endereço"),
  });

  const { register, handleSubmit, formState, setValue } =
    useForm<TSearchAddressSchema>({
      resolver: zodResolver(SearchAddressSchema),
      defaultValues,
      mode: "onChange",
    });

  const onOpen = () => setOpen(true);

  const onClose = () => setOpen(false);

  const onSelectOption = (_: unknown, value: NominatimResult | null) => {
    if (!value || selectedAddress === value) {
      return;
    }

    setValue("latitude", parseFloat(value.lat));

    setValue("longitude", parseFloat(value.lon));

    setValue("address", String(value.address["road"]));

    setValue("neighborhood", String(value.address["suburb"]));

    setValue("zipCode", String(value.address["postcode"]));

    setValue(
      "state",
      String(value.address["state"]) ?? String(value.address["state_district"])
    );

    setValue(
      "city",
      String(value.address["city"]) ??
        String(value.address["town"]) ??
        String(value.address["city_district"])
    );

    setAddress(value);
  };

  return (
    <Material.Container container spacing={2} alignItems="stretch">
      <Grid item md={6}>
        <Autocomplete
          open={isOpen}
          id="search-address-autocomplete"
          loadingText="Pesquisando..."
          filterOptions={(x) => x}
          options={options}
          loading={isLoading || isFetching}
          noOptionsText="Não foi possível encontrar o endereço"
          onOpen={onOpen}
          onClose={onClose}
          onChange={onSelectOption}
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

        <Material.SearchInput
          fullWidth
          label={"Logradouro"}
          {...register("address")}
          error={!!formState.errors.address}
          helperText={formState.errors.address?.message}
        />

        <Material.SearchInput
          fullWidth
          label={"Bairro"}
          {...register("neighborhood")}
          error={!!formState.errors.neighborhood}
          helperText={formState.errors.neighborhood?.message}
        />

        <Material.SearchInput
          fullWidth
          label={"Estado"}
          {...register("state")}
          error={!!formState.errors.state}
          helperText={formState.errors.state?.message}
        />

        <Material.SearchInput
          fullWidth
          label={"Cidade"}
          {...register("city")}
          error={!!formState.errors.city}
          helperText={formState.errors.city?.message}
        />

        <Material.SearchInput
          fullWidth
          label={"CEP"}
          {...register("zipCode")}
          error={!!formState.errors.zipCode}
          helperText={formState.errors.zipCode?.message}
        />

        <Material.SearchInput
          fullWidth
          label={"Número"}
          {...register("addressNumber")}
          error={!!formState.errors.addressNumber}
          helperText={formState.errors.addressNumber?.message}
        />
      </Grid>

      <Grid item md={6}>
        <CustomMap
          latitude={selectedAddress?.lat ?? `${defaultValues.latitude}`}
          longitude={selectedAddress?.lon ?? `${defaultValues.longitude}`}
          displayName={selectedAddress?.display_name ?? defaultValues.address}
        />
      </Grid>

      <Grid item md={12}>
        <Button
          variant="contained"
          disabled={!formState.isValid}
          onClick={handleSubmit(onSelectAddress)}
        >
          Proximo
        </Button>
      </Grid>
    </Material.Container>
  );
}
