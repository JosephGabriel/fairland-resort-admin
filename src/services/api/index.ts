export interface NominatimResult {
  place_id: number;
  licence: string;
  osm_type: string;
  osm_id: number;
  boundingbox: [string, string, string, string] | string[];
  lat: string;
  lon: string;
  display_name: string;
  class: string;
  type: string;
  importance: number;
  icon?: string;
  address: {
    house_number?: string;
    road?: string;
    neighbourhood?: string;
    suburb?: string;
    town?: string;
    city?: string;
    city_district?: string;
    county?: string;
    state_district?: string;
    state?: string;
    postcode?: string;
    country?: string;
    country_code?: string;
  };
}

export const uploadImages = async (files: FileList) => {
  const isSingleFile = files.length <= 1;

  if (!files) {
    return;
  }

  const formData = new FormData();

  for (const file of files) {
    formData.append(isSingleFile ? "file" : "files", file);
  }

  const response = await fetch(
    `http://localhost:5000/uploads/${isSingleFile ? "file" : "files"}`,
    {
      body: formData,
      method: "POST",
    }
  );

  return (await response.json()) as { url: string };
};

export const searchAddress = async (address: string) => {
  const url = new URL("https://nominatim.openstreetmap.org/search");
  url.searchParams.set("q", address);
  url.searchParams.set("addressdetails", "[1]");
  url.searchParams.set("format", "json");

  const response = await fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  });

  if (response.ok) {
    const data = await response.json();
    return data as NominatimResult[];
  } else {
    throw new Error("Nominatim API returned an error");
  }
};
