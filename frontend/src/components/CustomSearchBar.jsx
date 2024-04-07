import * as React from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Autocomplete from "@mui/material/Autocomplete";
import SearchContext from "../context/SearchContext";
import { useNavigate } from "react-router-dom";
export default function CustomSearchBar({ width }) {
  const { carNames, searchValue, setSearchValue } =
    React.useContext(SearchContext);
  const navigate = useNavigate();
  return (
    <Paper
      component="form"
      sx={{
        p: "2px 4px",
        display: "flex",
        alignItems: "center",
        width: width || "50%",
        // backgroundColor: "rgba(255, 255, 255, 0.9)",
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
        }}
        renderInput={(params) => {
          const { InputLabelProps, InputProps, ...rest } = params;
          return (
            <InputBase
              sx={{ borderRadius: 0 }}
              placeholder="Search All Cars"
              inputProps={{ "aria-label": "search all cars" }}
              variant="outlined"
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
          navigate(`/search/${searchValue}`);
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
}
