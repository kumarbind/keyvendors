import { useEffect, useState } from "react";
import { Box, Button, Grid, TextareaAutosize, TextField } from "@mui/material";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import FilledInput from "@mui/material/FilledInput";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormHelperText from "@mui/material/FormHelperText";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import { fetchData, postFormData } from "services/api";
import { useSelector } from "react-redux";
import { getAuthPartnerToken } from "../../store/authPartnerSlice";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const ItemLabel = styled(Box)(({ theme }) => ({
  backgroundColor: "lightgrey",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "left",
  fontWeight: "bold",
  color: theme.palette.text.secondary,
}));

export function LeadPayment({ lead }) {
  const additionalItemObj = { itemName: "", cost: 0 };
  const [leadDetail, setLeadDetail] = useState(null);
  const [additionalItem, setAdditionalItem] = useState([additionalItemObj]);
  const [grandTotal, setGrandTotal] = useState(0);

  const authToken = useSelector(getAuthPartnerToken);
  const fetchOrder = async (oid, tl_id) => {
    let options = {
      headers: {
        Authorization: "Bearer " + authToken,
      },
    };
    let res = await fetchData(
      `partner/order_bill_now`,
      { oid: oid, tl_id: tl_id },
      options
    );
    setGrandTotal(res.order.grand_total);
    setLeadDetail(res);
  };

  const handleItemCostChange = (value, key) => {
    if (value >= 0) {
      let tAdditionalItem = [...additionalItem];
      tAdditionalItem[key].cost = value;
      setAdditionalItem(tAdditionalItem);
      handleGrandTotal(tAdditionalItem);
    }
  };

  const handleGrandTotal = (tAdditionalItem) => {
    let cost = tAdditionalItem.reduce(
      (total, value) => parseInt(total) + parseInt(value.cost),
      0
    );
    console.log(cost);
    setGrandTotal(parseInt(leadDetail.order.grand_total) + parseInt(cost));
  };

  const removeItem = (key) => {
    const tAdditionalItem = [
      ...additionalItem.slice(0, key),
      ...additionalItem.slice(key + 1),
    ];
    setAdditionalItem(tAdditionalItem);
    handleGrandTotal(tAdditionalItem);
  };

  useEffect(() => {
    console.log(lead.tl_id, lead.order.oid);
    if (lead.order) {
      fetchOrder(lead.order.oid, lead.tl_id);
    }
  }, []);

  return (
    <Box sx={{ mt: 3, mb: 3, flexGrow: 1 }}>
      <Grid container spacing={2} justify="flex-end">
        <Grid xs={12} item>
          <ItemLabel>CASE PICTURES</ItemLabel>
          <Item>
            <RadioGroup row>
              <FormControlLabel
                value="cash"
                control={<Radio />}
                label="Case Picture"
              />
              <FormControlLabel
                value="hard"
                control={<Radio />}
                label="Hard copy invoice"
              />
            </RadioGroup>
            <TextField
              id="picture"
              name="picture"
              onChange={() => {}}
              label="Upload Picture"
              variant="outlined"
              fullWidth
              type="file"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Item>
        </Grid>
        <Grid xs={12} item>
          <ItemLabel>COMMENTS</ItemLabel>
          <Item>
            <TextField
              fullWidth
              placeholder="COMMENTS"
              multiline
              rows={2}
              maxRows={4}
            />
          </Item>
        </Grid>
        <Grid xs={12} item>
          <ItemLabel>BILLING</ItemLabel>
          <Item>
            {leadDetail && (
              <>
                {leadDetail.order_items.map((value, key) => (
                  <Box key={key}>
                    <Grid
                      sx={{ mt: 1 }}
                      container
                      spacing={1}
                      justify="flex-end"
                    >
                      <Grid xs={8} item>
                        {value.title}
                        <Divider />
                      </Grid>
                      <Grid xs={4} item>
                        {value.cost}
                        <Divider />
                      </Grid>
                    </Grid>
                  </Box>
                ))}
                <Box>
                  <Grid sx={{ mt: 1 }} container spacing={1} justify="flex-end">
                    <Grid xs={8} item>
                      Inspection/Visiting Charges
                      <Divider />
                    </Grid>
                    <Grid xs={4} item>
                      Rs.
                      {leadDetail.order.min_amount_for_user
                        ? leadDetail.order.min_amount_for_user
                        : 0}
                      <Divider />
                    </Grid>
                  </Grid>
                </Box>
                <Box>
                  <Grid sx={{ mt: 1 }} container spacing={1} justify="flex-end">
                    <Grid xs={8} sx={{ fontWeight: "bold" }} item>
                      Total
                      <Divider />
                    </Grid>
                    <Grid xs={4} item>
                      Rs.{grandTotal}
                      <Divider />
                    </Grid>
                  </Grid>
                </Box>
              </>
            )}

            {additionalItem.map((value, key) => (
              <Grid
                sx={{ mt: 1 }}
                key={key}
                container
                spacing={1}
                justify="flex-end"
              >
                <Grid xs={8} item>
                  <TextField fullWidth placeholder="Item Name" />
                </Grid>
                <Grid xs={3} item>
                  <TextField
                    id="outlined-start-adornment"
                    sx={{ width: "25v" }}
                    onChange={(e) => handleItemCostChange(e.target.value, key)}
                    InputProps={{
                      inputProps: {
                        type: "number",
                        min: 0,
                      },
                      startAdornment: (
                        <InputAdornment position="start">Rs.₹</InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid xs={1} item>
                  <Box>
                    <IconButton>
                      {additionalItem.length - 1 == key ? (
                        <AddCircleIcon
                          onClick={() =>
                            setAdditionalItem((oldAdditionalItem) => [
                              ...oldAdditionalItem,
                              additionalItemObj,
                            ])
                          }
                        />
                      ) : (
                        <RemoveCircleIcon onClick={() => removeItem(key)} />
                      )}
                    </IconButton>
                  </Box>
                </Grid>
              </Grid>
            ))}

            <Box sx={{ display: "flex" }}>
              <FormControlLabel
                control={<Checkbox defaultChecked />}
                label="Is Warranty ?"
              />
            </Box>
            <TextField
              fullWidth
              placeholder="Warranty"
              multiline
              rows={2}
              maxRows={4}
            />
            <FormControl sx={{ mt: 3, display: "flex" }}>
              <Box sx={{ display: "flex" }}>Select Payment mode</Box>
              <RadioGroup row>
                <FormControlLabel
                  value="cash"
                  control={<Radio />}
                  label="Case Picture"
                />
                <FormControlLabel
                  value="hard"
                  control={<Radio />}
                  label="Hard copy invoice"
                />
              </RadioGroup>
            </FormControl>
          </Item>
        </Grid>
      </Grid>
    </Box>
  );
}
