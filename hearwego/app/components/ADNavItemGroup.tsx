import React, { useEffect } from "react";
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
import { usePathname } from "next/navigation";

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

  const pathname = usePathname();

  // const checkActivePath = () => {
  //   const path = pathname.split("/");
  //   const activePath = path[path.length - 1];
  //   console.log("ActivePath:::", activePath);
  // };

  // useEffect(() => {
  //   checkActivePath();
  // }, [pathname]);

  return (
    <ADNavItemGroupBox>
      {!matches && <div className="label">{groupLabel}</div>}
      {items.map((item) => (
        <ADNavItemBox
          className={pathname.includes(item.link) ? "active" : ""}
        >
          {!matches ? (
            <Link
              href={item.link}
              style={{ display: "flex", alignItems: "center" }}
            >
              <item.icon
                style={{
                  marginRight: "10px",
                  // color: theme.palette.text.secondary,
                  fontSize: "18px",
                }}
              />
              <Box
                sx={{
                  // color: theme.palette.text.secondary,
                  fontSize: "13px",
                  fontWeight: 400,
                }}
              >
                {item.label}
              </Box>
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
