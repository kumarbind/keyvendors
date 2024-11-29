import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { ccyFormat } from "utils/utility";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CartContainer from "./CartContainer";
const TAX_RATE = 0.07;

function priceRow(qty, unit) {
  return qty * unit;
}

function createRow(desc, qty, unit) {
  const price = priceRow(qty, unit);
  return { desc, qty, unit, price };
}

function subtotal(items) {
  return items.map(({ price }) => price).reduce((sum, i) => sum + i, 0);
}

const rows = [
  createRow("Paperclips (Box)", 100, 1.15),
  createRow("Paper (Case)", 10, 45.99),
  createRow("Waste Basket", 2, 17.99),
];

const invoiceSubtotal = subtotal(rows);
const invoiceTaxes = TAX_RATE * invoiceSubtotal;
const invoiceTotal = invoiceTaxes + invoiceSubtotal;

export default function CartItemsTable() {
  return (
    <CartContainer>
      <TableContainer sx={{ p: 5 }}>
        <Table sx={{ minWidth: 700 }}  aria-label="spanning table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 600 }}>Product Name</TableCell>
              <TableCell  sx={{ fontWeight: 600 }} align="right">
                Plan / Service Type
              </TableCell>
              <TableCell sx={{ fontWeight: 600 }} align="right">
                Total Amount
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.desc}>
                <TableCell>{row.desc}</TableCell>
                <TableCell align="right">{row.qty}</TableCell>
                <TableCell align="right">{ccyFormat(row.price)}</TableCell>
              </TableRow>
            ))}

            <TableRow border="0">
              <TableCell
                style={{ borderBottom: "none" }}
                colSpan={3}
                align="right">
                {" "}
                <TextField
                  id="promo-code"
                  placeholder="Have a promo code?"
                  value=""
                  sx={{ backgroundColor: "#FBFBFB" }}
                  InputProps={{
                    endAdornment: (
                      <Button sx={{ textTransform: "none", fontWeight: 800 }}>
                        Apply
                      </Button>
                    ),
                  }}
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell
                style={{ borderBottom: "none" }}
                colSpan={3}
                align="right">
                Total: {ccyFormat(invoiceTotal)}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </CartContainer>
  );
}
