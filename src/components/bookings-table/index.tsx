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

interface Props {
  data: GetAllBookingsQuery["bookings"];
}

export const BookingsTable: React.FC<Props> = ({ data }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell colSpan={2}>Id</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Preço</TableCell>
            <TableCell>Usuário</TableCell>
            <TableCell>Quarto</TableCell>
            <TableCell>Criado em</TableCell>
            <TableCell />
          </TableRow>
        </TableHead>

        <TableBody>
          {data.map((booking) => (
            <TableRow key={booking.id}>
              <TableCell colSpan={2}>{booking.id}</TableCell>
              <TableCell>{booking.paid ? "Pago" : "Pendente"}</TableCell>
              <TableCell>R${booking.price}</TableCell>
              <TableCell>{`${booking.user.firstName} ${booking.user.lastName}`}</TableCell>
              <TableCell>{booking.room.name}</TableCell>
              <TableCell>{new Date(booking.bookingDate).toString()}</TableCell>
              <TableCell>
                <IconButton>
                  <ChevronRight />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>

        <TablePagination
          component={Paper}
          count={data.length}
          onPageChange={() => null}
          page={1}
          rowsPerPage={10}
          rowsPerPageOptions={[10, 50]}
        />
      </Table>
    </TableContainer>
  );
};
