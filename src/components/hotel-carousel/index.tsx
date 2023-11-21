import { Fragment } from "react";
import { Grid, Paper, Typography } from "@mui/material";

import { CustomSkeleton } from "@src/components/skeleton";
import { HotelCard } from "@src/components/hotel-card";

import { Props } from "./utils";

import "./styles.scss";

export const HotelCarousel: React.FC<Props> = ({ isLoading, hotels }) => {
  return (
    <Grid container alignItems={"stretch"} spacing={4}>
      {isLoading && (
        <Fragment>
          {new Array(4).fill(" ").map((_, idx) => (
            <Grid className="carousel__item" item md={3} key={idx}>
              <CustomSkeleton variant="card" />
            </Grid>
          ))}
        </Fragment>
      )}

      {!isLoading && hotels?.length !== 0 && (
        <Fragment>
          {hotels?.map((hotel) => (
            <Grid item md={3} key={hotel.id}>
              <HotelCard
                id={hotel.id}
                name={hotel.name}
                thumbnail={hotel.thumbnail}
                summary={hotel.summary}
                city={hotel.city}
                state={hotel.state}
                isLink={true}
              />
            </Grid>
          ))}
        </Fragment>
      )}

      {!isLoading && hotels?.length === 0 && (
        <Grid item md={12}>
          <Paper className="carousel__no-content">
            <Typography className="carousel__no-content-text" variant="body1">
              Nenhum hotel adicionado
            </Typography>
          </Paper>
        </Grid>
      )}
    </Grid>
  );
};
