import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Link from "next/link";

interface Props {
  eventID: string;
  eventName: string;
  eventImg: string;
  eventDate: string;
  eventDay: string;
  eventTime: string;
  artistName: string;
}

export default function SingleEvent({
  eventID,
  eventName,
  eventImg,
  eventDate,
  eventDay,
  eventTime,
  artistName,
}: Props) {
  return (
    <Link href={`/main/events/` + eventID}>
      <Box
      // sx={{
      //   textAlign: "center",
      //   color: "primary.main",
      //   fontWeight: "bold",
      //   position: "relative",
      //   display: "flex",
      //   alignItems: "center",
      //   flexDirection: "column",
      //   backgroundColor: "red",
      //   width: "100%",
      // }}
      >
        <div
          style={{
            background: "black",
            width: "100%",
            height: "400px",
            //  width: "100%",
            //  height: "100%",
            borderRadius: "14px",
            display: "flex",
            justifyContent: "center",
            marginBottom: "1em",
          }}
        >
          <Box
            sx={{
              backgroundImage: `url(${eventImg})`,
              minwidth: "100px",
              minheight: "120px",
              width: "100%",
              height: "100%",
              aspectRatio: "1/1",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              borderRadius: "14px",
              opacity: "0.7",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",

              //position:'relavant'
            }}
          >
            <Box
              sx={{
                backgroundColor: "rgba(0,0,0,0.7)",
                color: "white",
                width: "50%",
                // height: "30px",
                fontSize: "16px",
                borderRadius: "10px 0 0 0",
                fontWeight: "bold",
                position: "relative",
                margin: "5px 0px 0px 5px",
                justifyContent: "center",
                padding: "8px",
                display: "flex",
                // opacity: "0.9",
              }}
            >
              {eventDate}
            </Box>

            <Box
              sx={{
                position: "relative",
                display: "flex",
                width: "100%",
                // height: "30%",
                borderRadius: "0",
                //backgroundColor: "red",
                flexDirection: "column",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "4px",
              }}
            >
              <Box
                sx={{
                  width: "100%",
                  height: "100%",
                  backgroundColor: "black",
                  // marginTop: "70%",
                  position: "relative",
                  justifyContent: "center",
                  alignItems: "center",
                  display: "flex",
                  borderRadius: "0 0 10px 10px",
                  opacity: "0.8",
                  flexDirection: "row",
                  padding: "8px 4px"
                }}
              >
                <Box
                  sx={{
                    width: "60%",
                    height: "100%",
                    //backgroundColor: "white",
                    //marginTop: "70%",
                    position: "relative",
                    display: "flex",
                    borderRadius: "0",
                    //opacity: "0.8",
                    flexDirection: "column",
                  }}
                >
                  <Box
                    sx={{
                      //backgroundColor: "blue",
                      color: "white",
                      width: "100%",
                      height: "50%",
                      fontSize: "24px",
                      fontWeight: "bold",
                      position: "relative",
                      margin: "0px 0px 0px 5px",
                      justifyContent: "left",
                      padding: "8px",
                      pb: "0px",
                      pl: 0,
                      display: "flex",
                      //opacity: "0.9",
                    }}
                  >
                    {eventName}
                  </Box>

                  <Box
                    sx={{
                      //backgroundColor: "green",
                      color: "white",
                      width: "100%",
                      height: "100%",
                      fontSize: "18px",
                      position: "relative",
                      margin: "0px 0px 0px 8px",
                      padding: "8px",
                      pt: "0px",
                      pl: 0,
                      fontWeight: 400,
                      //justifyContent: "right",
                      // padding: "4px",
                      display: "flex",
                      //opacity: "0.9",
                    }}
                  >
                    {artistName}
                  </Box>
                </Box>
                <Box
                  sx={{
                    //backgroundColor: "white",
                    width: "30%",
                    height: "100%",
                    position: "relative",
                    //padding: "10px",
                    display: "flex",
                    alignItems: "flex-end",
                    //justifyContent:'space-between',
                    // padding: "6px",
                    flexDirection: "column",
                    // margin: "0px 4px 0px 0px",
                  }}
                >
                  <Box
                    sx={{
                      //backgroundColor: "red",
                      color: "white",
                      width: "100%",
                      // height: "100%",
                      fontSize: "16px",
                      padding: "8px",
                      pb: 0,
                      pr:0,
                      // margin: "0px 0px 0px 10px",
                    }}
                  >
                    {eventTime}
                  </Box>
                  <Box
                    sx={{
                      //backgroundColor: "yellow",
                      color: "white",
                      width: "100%",
                      height: "100%",
                      fontSize: "16px",
                      position: "relative",
                      // margin: "0px 0px 0px 30px",
                      //justifyContent: "left",
                      padding: "8px",
                      pt: 0,
                      pr:0,
                      display: "flex",
                    }}
                  >
                    {eventDay}
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </div>
      </Box>
    </Link>
  );
}
