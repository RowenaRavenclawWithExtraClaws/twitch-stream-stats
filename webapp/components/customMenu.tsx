import { List, ListItem, ListItemText, Menu, MenuItem } from "@mui/material";
import { MouseEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { customFetch } from "../utility";

const CustomMenue = (props: {
  endpoint: string;
  setter: (body: number | object) => void;
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const open = Boolean(anchorEl);
  const options = ["Database", "In-memory"];

  const dispatch = useDispatch();

  const handleClickListItem = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (
    event: MouseEvent<HTMLElement>,
    index: number
  ) => {
    setSelectedIndex(index);
    setAnchorEl(null);

    if (index === 1)
      customFetch(props.endpoint, { page: 1, inmemory: 1 }, (body) =>
        dispatch(props.setter(body))
      );
    else
      customFetch(props.endpoint, { page: 1 }, (body) =>
        dispatch(props.setter(body))
      );
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <List
        component="nav"
        aria-label="Device settings"
        sx={{ bgcolor: "background.paper" }}
        style={{ width: 150 }}
      >
        <ListItem
          button
          id="lock-button"
          aria-haspopup="listbox"
          aria-controls="lock-menu"
          aria-label="when device is locked"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClickListItem}
        >
          <ListItemText
            primary="Data Source"
            secondary={options[selectedIndex]}
          />
        </ListItem>
      </List>
      <Menu
        id="lock-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "lock-button",
          role: "listbox",
        }}
      >
        {options.map((option, index) => (
          <MenuItem
            key={option}
            selected={index === selectedIndex}
            onClick={(event) => handleMenuItemClick(event, index)}
          >
            {option}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default CustomMenue;
