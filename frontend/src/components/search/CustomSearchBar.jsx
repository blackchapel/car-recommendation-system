import React, { useEffect, useState, useContext } from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Autocomplete from "@mui/material/Autocomplete";
import SearchContext from "../../context/SearchContext";
import { useNavigate } from "react-router-dom";
import { getAutocomplete } from "../../apis/car";

const CustomSearchBar = ({ width }) => {
  const navigate = useNavigate();
  const {
    carNames,
    setCarNames,
    searchValue,
    setSearchValue,
    selectedCar,
    setSelectedCar,
  } = useContext(SearchContext);

  const [textValue, setTextValue] = useState("");
  const [cars, setCars] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await getAutocomplete(textValue);
      setCarNames((response || []).map((car) => `${car?.make} ${car?.model}`));
      setCars(response);
    }
    fetchData();
  }, [textValue]);

  return (
    <Paper
      component="form"
      sx={{
        p: "2px 4px",
        display: "flex",
        alignItems: "center",
        width: width || "50%",
        borderRadius: 0.5,
      }}
    >
      <Autocomplete
        sx={{ ml: 1, flex: 1, borderRadius: 0 }}
        id="combo-box-demo"
        options={carNames}
        freeSolo
        value={searchValue}
        onChange={(event, newValue) => {
          setSearchValue(newValue);
          setSelectedCar(
            cars.find((car) => `${car?.make} ${car?.model}` === newValue)
          );
        }}
        renderInput={(params) => {
          const { InputLabelProps, InputProps, ...rest } = params;
          return (
            <InputBase
              sx={{ borderRadius: 0 }}
              placeholder="Search All Cars"
              inputProps={{ "aria-label": "search all cars" }}
              variant="outlined"
              value={textValue}
              onChange={(e) => setTextValue(e.target.value)}
              {...params.InputProps}
              {...rest}
            />
          );
        }}
      />

      <IconButton
        type="submit"
        sx={{ p: "10px" }}
        aria-label="search"
        onClick={() => {
          navigate(`/search/${selectedCar.index}`);
        }}
      >
        <SearchIcon />
      </IconButton>
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      <IconButton color="primary" sx={{ p: "10px" }} aria-label="favorite">
        <FavoriteIcon />
      </IconButton>
    </Paper>
  );
};

export default CustomSearchBar;
