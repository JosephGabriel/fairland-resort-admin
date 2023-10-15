import { Grid, Typography } from "@mui/material";
import ReactApexChart from "react-apexcharts";

import * as Material from "./styles";
import { useUserContext } from "@src/contexts/user";

const series = [
  {
    name: "series1",
    data: [31, 40, 28, 51, 42, 109, 100],
  },
  {
    name: "series2",
    data: [11, 32, 45, 32, 34, 52, 41],
  },
];

export const DashBoardPage = () => {
  const { user } = useUserContext();

  return (
    <Material.Container>
      <Material.Title variant="h4">Olá, {user?.firstName}</Material.Title>

      <Material.GridContainer
        container
        spacing={2}
        justifyContent={"center"}
        alignItems={"stretch"}
      >
        <Material.GridFullItem item sm={12} md={6}>
          <Grid
            container
            spacing={2}
            justifyContent={"center"}
            alignItems={"stretch"}
          >
            <Grid item xs={12} sm={6} md={4} lg={6}>
              <Material.GridItem>
                <Typography variant="body1">Ganhos do Mês</Typography>
                <Typography variant="h5">$74,438.00</Typography>
              </Material.GridItem>
            </Grid>

            <Grid item xs={12} sm={6} md={4} lg={6}>
              <Material.GridItem>
                <Typography variant="body1">Ganhos</Typography>
                <Typography variant="h5">$74,438.00</Typography>
              </Material.GridItem>
            </Grid>

            <Grid item xs={12} sm={6} md={4} lg={6}>
              <Material.GridItem>
                <Typography variant="body1">Reservas Totais do Mês</Typography>
                <Typography variant="h5">89</Typography>
              </Material.GridItem>
            </Grid>

            <Grid item xs={12} sm={6} md={4} lg={6}>
              <Material.GridItem>
                <Typography variant="body1">
                  Reservas Canceladas no Mês
                </Typography>
                <Typography variant="h5">21</Typography>
              </Material.GridItem>
            </Grid>
          </Grid>
        </Material.GridFullItem>

        <Grid item xs={12} sm={6} md={4} lg={6}>
          <Material.GridItem>
            <Typography variant="body1">Relátorio de Ganhos</Typography>

            <ReactApexChart
              options={{
                theme: {
                  mode: "dark",
                },
                grid: {
                  row: {
                    colors: ["transparent"],
                    opacity: 0,
                  },
                  column: {
                    colors: ["transparent"],
                    opacity: 0,
                  },
                },
                chart: {
                  height: 350,
                  type: "bar",
                  background: "transparent",
                },
                plotOptions: {
                  bar: {
                    columnWidth: "45%",
                    distributed: true,
                  },
                },
                dataLabels: {
                  enabled: false,
                },
                legend: {
                  show: false,
                },
                xaxis: {
                  categories: [
                    ["John", "Doe"],
                    ["Joe", "Smith"],
                    ["Jake", "Williams"],
                    "Amber",
                    ["Peter", "Brown"],
                    ["Mary", "Evans"],
                    ["David", "Wilson"],
                    ["Lily", "Roberts"],
                  ],
                },
              }}
              series={[
                {
                  data: [21, 22, 10, 28, 16, 21, 13, 30],
                },
              ]}
              type="bar"
              height={"100%"}
            />
          </Material.GridItem>
        </Grid>
      </Material.GridContainer>

      <Material.GridContainer container spacing={2} justifyContent={"center"}>
        <Grid item xs={12} sm={6} md={4} lg={8}>
          <Material.GridItem>
            <Typography variant="body1">Relátorio de Ganhos</Typography>

            <ReactApexChart
              options={{
                theme: {
                  mode: "dark",
                },
                grid: {
                  row: {
                    colors: ["transparent"],
                    opacity: 0,
                  },
                  column: {
                    colors: ["transparent"],
                    opacity: 0,
                  },
                  xaxis: {
                    lines: {
                      show: false,
                    },
                  },
                  yaxis: {
                    lines: {
                      show: false,
                    },
                  },
                },
                chart: {
                  height: "100%",
                  width: "100%",
                  type: "area",
                  background: "#ff00000",
                },
                dataLabels: {
                  enabled: false,
                },
                stroke: {
                  curve: "smooth",
                },
                xaxis: {
                  type: "datetime",
                  categories: [
                    "2018-09-19T00:00:00.000Z",
                    "2018-09-19T01:30:00.000Z",
                    "2018-09-19T02:30:00.000Z",
                    "2018-09-19T03:30:00.000Z",
                    "2018-09-19T04:30:00.000Z",
                    "2018-09-19T05:30:00.000Z",
                    "2018-09-19T06:30:00.000Z",
                  ],
                },
                tooltip: {
                  theme: "dark",
                  x: {
                    show: false,
                    format: "dd/MM/yy HH:mm",
                  },
                },
              }}
              series={series}
              type="area"
              height={"100%"}
            />
          </Material.GridItem>{" "}
        </Grid>

        <Grid item xs={12} sm={6} md={4} lg={4}>
          <Material.GridItem>
            <Material.GridTitle variant="body1">
              Relátorio de Ganhos
            </Material.GridTitle>

            <ReactApexChart
              height={320}
              type="donut"
              options={{
                colors: ["#2499EF", "#8C8DFF", "#FFC675", "#8CA3BA"],
                chart: {
                  stacked: false,
                  background: "transparent",
                  sparkline: {
                    enabled: true,
                  },
                  fontFamily: "'Montserrat', sans-serif",
                },
                plotOptions: {
                  pie: {
                    donut: {
                      size: "65%",
                      labels: {
                        show: true,
                        total: {
                          show: true,
                          showAlways: true,
                          label: "Avg Range",
                          fontSize: "14px",
                          fontWeight: 500,
                          color: "#8CA3BA",
                        },
                        value: {
                          show: true,
                          fontSize: "28px",
                          fontWeight: 600,
                        },
                      },
                    },
                  },
                },
                states: {
                  normal: {
                    filter: {
                      type: "none",
                    },
                  },
                  hover: {
                    filter: {
                      type: "none",
                    },
                  },
                  active: {
                    filter: {
                      type: "none",
                    },
                  },
                },
                labels: ["Transactions", "Payouts", "Sales", "Reports"],
                theme: {
                  mode: "dark",
                },
                legend: {
                  show: true,
                  position: "bottom",
                  fontSize: "13px",
                  fontWeight: 500,
                  itemMargin: {
                    horizontal: 20,
                    vertical: 5,
                  },
                  onItemClick: {
                    toggleDataSeries: false,
                  },
                  onItemHover: {
                    highlightDataSeries: false,
                  },
                },
                tooltip: {
                  style: {
                    fontSize: "13px",
                  },
                },
                stroke: {
                  width: 0,
                },
              }}
              series={[50, 30, 20, 40]}
              width="100%"
            />
          </Material.GridItem>
        </Grid>
      </Material.GridContainer>
    </Material.Container>
  );
};
