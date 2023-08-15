import {
  Box,
  styled,
  Container as BoxContainer,
  Grid,
  Paper,
  Typography,
  Button,
  IconButton,
} from "@mui/material";

interface CarouselButtonProps {
  isLeft?: boolean;
}

export const Container = styled(Box)(({ theme }) => ({
  paddingBottom: theme.spacing(2),
}));

export const ThumbnailImage = styled("img")({
  width: "100%",
  maxHeight: "60vh",
  objectFit: "cover",
});

export const DetailContainer = styled(BoxContainer)(({ theme }) => ({
  paddingBlock: theme.spacing(3),
}));

export const PaperTitleGrid = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  display: "flex",
  marginBottom: theme.spacing(8),
}));

export const TitleGrid = styled(Grid)(() => ({
  flex: 1,
}));

export const ImageLogo = styled("img")(({ theme }) => ({
  width: 150,
  maxHeight: 150,
  objectFit: "cover",
  marginLeft: theme.spacing(2),
}));

export const Subtitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  display: "inline",
}));

export const MainTitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.primary,
  display: "inline",
  fontSize: "2rem",
}));

export const SummaryText = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1),
  display: "block",
}));

export const MapGrid = styled(Grid)(({ theme }) => ({
  marginBottom: theme.spacing(8),
}));

export const DescriptionPaper = styled(Paper)(({ theme }) => ({
  height: "100%",
  padding: theme.spacing(4),
}));

export const MapItemGrid = styled(Grid)(() => ({
  height: "400px",
}));

export const ImageGrid = styled(Grid)(({ theme }) => ({
  position: "relative",
  alignItems: "center",
  marginBottom: theme.spacing(8),
}));

export const RoomTitle = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(0),
}));

export const AddRoomButton = styled(Button)(({ theme }) => ({
  marginBottom: theme.spacing(4),
}));

export const NoRoomPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(10),
}));

export const NoRoomPaperText = styled(Typography)(() => ({
  textAlign: "center",
}));

export const CarouselButton = styled(IconButton)(
  ({ isLeft }: CarouselButtonProps) => ({
    position: "absolute",
    left: isLeft ? 0 : "auto",
    right: isLeft ? "auto" : 0,
  })
);

export const RoomGridItemOptions = styled(Grid)(() => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
}));

export const GridItemCard = styled(Grid)(() => ({
  flex: 1,
}));

export const PaginationContainer = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  marginTop: theme.spacing(3),
}));
