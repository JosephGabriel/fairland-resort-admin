import { ChevronRight } from "@mui/icons-material";

import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";

const BookingsTable = () => {
  return (
    <TableContainer component={Paper} sx={{ marginTop: "2rem" }}>
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell>Id</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Preço</TableCell>
            <TableCell>Usuário</TableCell>
            <TableCell>Quarto</TableCell>
            <TableCell>Criado em</TableCell>
            <TableCell />
          </TableRow>
        </TableHead>

        <TableBody>
          <TableRow>
            <TableCell>cfectggtg</TableCell>
            <TableCell>Pago</TableCell>
            <TableCell>R$499,99</TableCell>
            <TableCell>Jonh Doe</TableCell>
            <TableCell>Quarto Azul</TableCell>
            <TableCell>15/20/2002</TableCell>
            <TableCell>
              <IconButton>
                <ChevronRight />
              </IconButton>
            </TableCell>
          </TableRow>
        </TableBody>

        <TablePagination rowsPerPageOptions={[10, 50]} />
      </Table>
    </TableContainer>
  );
};

export default BookingsTable;
