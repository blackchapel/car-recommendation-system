import React, { useContext, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import SearchContext from "../../context/SearchContext";

function createData(name, value) {
  return {
    name: name
      .replace("Mpg", "MPG")
      .replace("Co2", "CO2")
      .replace("For Fuel", " ")
      .replace("Atv", "ATV"),
    value,
  };
}

function capitalizeWords(str) {
  return str
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export default function Features() {
  const [rows, setRows] = React.useState([]);
  const { selectedCar } = useContext(SearchContext);

  useEffect(() => {
    if (selectedCar) {
      let features = Object.keys(selectedCar).map((key) => {
        const ogKey = key;
        key = key.replace(/_/g, " ");
        key = key.replace("type1", "");
        if (
          ![
            "image",
            "index",
            "make",
            "model",
            "make_model",
            "id",
            "price",
          ].includes(ogKey)
        ) {
          return createData(capitalizeWords(key), selectedCar[ogKey]);
        } else {
          return null;
        }
      });
      features = features.filter(function (val) {
        return val !== null;
      });
      setRows(features);
    }
  }, [selectedCar]);

  return (
    <TableContainer
      component={Paper}
      sx={{
        mt: 3,
      }}
    >
      <Table sx={{ width: "100%" }} size="small">
        <TableBody>
          {rows.map((row, index) => (
            <TableRow
              key={index}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row?.name}
              </TableCell>
              <TableCell align="right" sx={{ fontWeight: "bold" }}>
                {row?.value}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
