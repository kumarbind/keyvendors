import * as React from "react";
import { styled } from "@mui/material/styles";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import AvailabilityModal from "./AvailabilityModal";
const ListItem = styled("li")(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

export default function SelectedDates({ dates, handleAvailability }) {
  console.log(dates);
  const [list, setList] = React.useState(Array.isArray(dates)?dates:[]);
  const [selected, setSelected] = React.useState();

  const handleDelete = (chipToDelete) => () => {
    setList((list) => list.filter((chip) => chip.date !== chipToDelete.date));
  };

  const handelRefresh = (data) => {
    if (data.date) {
      let selectedList = list.filter((x) => x.date !== data.date);
      let availability = [...selectedList, data];
      setList(availability);
      handleAvailability(availability);
    }

    setSelected(undefined);
  };

  return (
    <Paper
      sx={{
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
        listStyle: "none",
        p: 0.5,
        m: 0,
      }}
      component="ul">
      {list.map((data, index) => {
        return (
          <ListItem key={index}>
            <Chip
              label={data.date}
              onClick={() => setSelected(index)}
              onDelete={handleDelete(data)}
            />
          </ListItem>
        );
      })}
      <ListItem>
        <AvailabilityModal
          handelRefresh={handelRefresh}
          actionTitle="Add"
          isOpen={selected !== undefined ? true : undefined}
          data={selected !== undefined ? list[selected] : undefined}
        />
      </ListItem>
    </Paper>
  );
}
