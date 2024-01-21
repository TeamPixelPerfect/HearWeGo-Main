import React from "react";
import Box from "@mui/material/Box";
import { menuItem } from "../constants/models";
import Link from "next/link";

interface Props {
  menuItems: menuItem[];
}

const Navigation = ({ menuItems }: Props) => {
  return (
    <Box
      sx={{
        flexGrow: 1,
        display: "flex",
        justifyContent: "flex-end",
      }}
    >
      {menuItems.map((item: menuItem) => (
        <Box key={item._id} sx={{ padding: 2 }}>
          <Link href={item.url} style={{color: "#fff"}}>{item.name}</Link>
        </Box>
      ))}
    </Box>
  );
};

export default Navigation;
