import React from "react";
import {
  ADNavItemGroupBox,
  ADNavItemBox,
} from "../styles/artistDashboard.styles";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { SvgIconTypeMap, Typography, useMediaQuery } from "@mui/material";
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

  return (
    <ADNavItemGroupBox>
      {!matches && <label>{groupLabel}</label>}
      {items.map((item) => (
        <ADNavItemBox>
          {!matches ? (
            <Link href={item.link}>
              <item.icon style={{ color: "#4B4B4B", marginRight: "10px" }} />
              <div>{item.label}</div>
            </Link>
          ) : (
            <Link href={item.link}>
              <item.icon style={{ color: "#4B4B4B" }} />
            </Link>
          )}
        </ADNavItemBox>
      ))}
    </ADNavItemGroupBox>
  );
};

export default ADNavItemGroup;
