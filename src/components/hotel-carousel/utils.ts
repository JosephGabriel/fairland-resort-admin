export interface Props {
  isLoading: boolean;
  hotels: GetHotelsByAdminQuery["hotelsByAdmin"]["nodes"] | undefined;
}
