import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Link from "next/link";

interface Props {
  albumName: string;
  albumImg: string;
  year: string;
  album_id: string;
}

export default function SingleAlbum({ albumName, year, albumImg, album_id }: Props) {
  return (
    <Link href={"/main/artists/Albums/" + album_id}>
    <Box

      sx={{
        textAlign: "center",
        color: "primary.main",
        fontWeight: "bold",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        //backgroundColor: "red",
      }}
    >                

   
      <Box
        sx={{
          backgroundImage: `url(${albumImg})`,
          minWidth: "80px",
          minHeight: "80px",
          width: "95%",
          aspectRatio: "1/1",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          borderRadius: "14px",
          //   position:'relavant'
        }}
      >
        <div
          style={{
            background: "black",
            width: "100%",
            height: "100%",
            borderRadius: "14px",
            opacity: "0.7",
            // position:'fixed'
          }}
        >
          <Box
            style={{
              position: "relative",
              padding: "2%",
              justifyContent: "space-between",
              //backgroundColor: "yellow",
              borderRadius: "14px",
              
            }}
          >
            <Box
              sx={{
                backgroundColor: "black",
                color: "white",
                width: "100%",
                fontSize: "28px",
                fontWeight: "bold",
                position: "relative",
                display: "flex",
                textTransform: "capitalize",
                textAlign:'left',
                
              }}
            >
              {albumName}
            </Box>
            <Box
              sx={{
                backgroundColor: "black",
                color: "white",
                width: "40%",
                fontSize: "20px",
                fontWeight: "bold",
                position: "relative",
                display: "flex",
              }}
            >
              {year}
            </Box>
          </Box>
        </div>
      </Box>
   
    </Box>
    </Link>
  );
}
