import React from "react";
import {
  ADNavItemGroupBox,
  ADNavItemBox,
} from "../styles/artistDashboard.styles";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import {
  Box,
  SvgIconTypeMap,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Link from "next/link";

interface Props {
  groupLabel: string;
  items: {
    icon: OverridableComponent<SvgIconTypeMap<{}, "svg">>;
    label: string;
    link: string;
  }[];
}

const ADNavItemGroup = ({ groupLabel, items }: Props) => {
  const matches = useMediaQuery("(max-width:960px)");
  const theme = useTheme();

  return (
    <ADNavItemGroupBox>
      {!matches && <label>{groupLabel}</label>}
      {items.map((item) => (
        <ADNavItemBox>
          {!matches ? (
            <Link
              href={item.link}
              style={{ display: "flex", alignItems: "center" }}
            >
              <item.icon
                color="secondary"
                sx={{ color: theme.palette.mode === "dark" ? "#fff" : "#000" }}
                style={{ marginRight: "10px" }}
              />
              <Box sx={{ color: theme.palette.text.primary }}>{item.label}</Box>
            </Link>
          ) : (
            <Link
              href={item.link}
              style={{ display: "flex", alignItems: "center" }}
            >
              <item.icon color="secondary" style={{ color: "#fff" }} />
            </Link>
          )}
        </ADNavItemBox>
      ))}
    </ADNavItemGroupBox>
  );
};

export default ADNavItemGroup;
