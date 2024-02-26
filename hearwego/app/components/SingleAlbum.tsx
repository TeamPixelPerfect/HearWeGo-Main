import Box from "@mui/material/Box";

interface Props {
  userName: string;
  userImg: string;
  year: string;
}

export default function SingleFan({ userName, year, userImg }: Props) {
  return (
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
          backgroundImage: `url(${userImg})`,
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
            opacity: "0.6",
            // position:'fixed'
          }}
        >
          <Box
            style={{
              position: "relative",
              padding: "10%",
              justifyContent: "space-between",
            }}
          >
            <Box
              sx={{
                //backgroundColor: "blue",
                color: "white",
                width: "40%",
                fontSize: "24px",
                fontWeight: "bold",
                position: "relative",
                display: "flex",
              }}
            >
              {userName}
            </Box>
            <Box
              sx={{
                //backgroundColor: "blue",
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
  );
}
