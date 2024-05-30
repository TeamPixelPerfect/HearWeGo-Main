"use client";

import Typography from "@mui/material/Typography";

import DeleteIcon from "@mui/icons-material/Delete";
import Box from "@mui/material/Box";
import ShareIcon from "@mui/icons-material/Share";
import Card from "@mui/material/Card";
import { PressReleaseSaved } from "../styles/PressReleaseOriginal.styles";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";

interface Props {
  id: string;
  title: string;
  releaseDate: string;
  handelShare: (id: string) => void;
  handleDelete: (id: string) => void;
}
export default function PressReleaseSavedRow({
  id,
  title,
  releaseDate,
  handelShare,
  handleDelete,
}: Props) {
  return (
    <PressReleaseSaved>
      <Card
        sx={{
          maxWidth: "30%",
          height: "100px"	,
          display: "flex",
          flexDirection: "row",
          //justifyContent: "space-between",
          //backgroundColor: "blue",
          margin: "30px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            padding: "10px",
            backgroundColor: "white",
          }}
        >
          <Button onClick={() => handleDelete(id)}>
            <PictureAsPdfIcon
              sx={{
                color: "red",
                fontSize: "50px",
              }}
            />
          </Button>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            //alignItems: "center",
            flexDirection: "column",
            padding: "20px",
            width: "35%",
            //backgroundColor: "green",
          }}
        >
          <Typography
            sx={{
              fontSize: "20px",
              fontWeight: "bold",
              //   color: "black",
            }}
          >
            {title}
          </Typography>
        </Box>

        {/* <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "10px",
            //backgroundColor: "red",
            // width: "15%",
          }}
        >
          <Divider
            sx={{
              height: "80%",

              // backgroundColor: "black",
            }}
            orientation="vertical"
            flexItem
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            //alignItems: "center",
            flexDirection: "column",
            padding: "20px",
            width: "35%",
            //backgroundColor: "green",
          }}
        >
          <Typography
            sx={{
              fontSize: "20px",
              fontWeight: "bold",
              //   color: "black",
            }}
          >
            {releaseDate}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "5px",
            //backgroundColor: "red",
            // width: "15%",
          }}
        >
          <Divider
            sx={{
              height: "80%",

              // backgroundColor: "black",
            }}
            orientation="vertical"
            flexItem
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            padding: "10px",
            //backgroundColor: "white",
          }}
        >
          <Button onClick={() => handelShare(id)}>
            <ShareIcon
              sx={{
                // color: "red",
                fontSize: "30px",
              }}
            />
          </Button>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "10px",
            //backgroundColor: "red",
            // width: "15%",
          }}
        >
          <Divider
            sx={{
              height: "80%",

              // backgroundColor: "black",
            }}
            orientation="vertical"
            flexItem
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            padding: "10px",
            //backgroundColor: "white",
          }}
        >
          <Button onClick={() => handleDelete(id)}>
            <DeleteIcon
              sx={{
                // color: "red",
                fontSize: "30px",
              }}
            />
          </Button>
        </Box> */}
      </Card>
    </PressReleaseSaved>
  );
}
