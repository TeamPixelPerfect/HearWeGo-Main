import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Link from "next/link";

interface Props {
  eventName: string;
  eventImg: string;
  eventDate: string;
  eventDay: string;
  eventTime: string;
  artistName: string;
}

export default function SingleEvent({
  eventName,
  eventImg,
  eventDate,
  eventDay,
  eventTime,
  artistName,
}: Props) {
  return (
    <Link href="/main/events/SingleEvent">
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
            width: "150px",
            height: "200px",
            //  width: "100%",
            //  height: "100%",
            borderRadius: "14px",
            display: "flex",
            justifyContent: "center",
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
              opacity: "0.4",
              //position:'relavant'
            }}
          >
            <Box
              sx={{
                backgroundColor: "black",
                color: "white",
                width: "50%",
                height: "30px",
                fontSize: "16px",
                borderRadius: "10px",
                fontWeight: "bold",
                position: "relative",
                margin: "5px 0px 0px 5px",
                justifyContent: "center",
                padding: "2px",
                display: "flex",
                opacity: "0.9",
              }}
            >
              {eventDate}
            </Box>

            <Box sx={{
              position: "relative",
              display: "flex",
              width: "100%",
              height: "100%",
              borderRadius: "14px",
              //backgroundColor: "red",
              flexDirection: "column",
              justifyContent:'space-between',
              alignItems:'center'
            }}>
              
            <Box
              sx={{
                width: "90%",
                height: "25%",
                backgroundColor: "black",
                marginTop: "70%",
                position: "relative",
                display: "flex",
                borderRadius: "14px",
                opacity: "0.8",
                flexDirection: "row",
              }}
            >
              <Box sx={{
                   width: "90%",
                   height: "100%",
                   //backgroundColor: "white",
                   //marginTop: "70%",
                   position: "relative",
                   display: "flex",
                   borderRadius: "14px",
                   //opacity: "0.8",
                   flexDirection: "column",
              }}>
               <Box
                sx={{
                  //backgroundColor: "blue",
                  color: "white",
                  width: "60%",
                  height: "50%",
                  fontSize: "16px",
                  fontWeight: "bold",
                  position: "relative",
                  margin: "0px 0px 0px 5px",
                  justifyContent: "left",
                  padding: "2px",
                  display: "flex",
                  //opacity: "0.9",
                }}
              >
                {eventName}
              </Box> 

              <Box sx={{
                //backgroundColor: "green",
                color: "white",
                width: "100%",
                height: "100%",
                fontSize: "10px",
              position: "relative",
                margin: "0px 0px 0px 8px",
                //justifyContent: "right",
               // padding: "4px",
                display: "flex",
                //opacity: "0.9",
              }}>
                {artistName}
              
              </Box>
              </Box>
              <Box
              sx={{
                //backgroundColor: "white",
                width: "50%",
                height: "100%",
                 position: "relative",
                 //padding: "10px",
                display: "flex", 
                alignItems:'right', 
                //justifyContent:'space-between', 
                padding: "6px",
                flexDirection: "column",
                  margin: "0px 4px 0px 0px",
            
                
              }}
              >
                <Box
                sx={{
                  //backgroundColor: "red",
                  color: "white",
                  width: "100%",
                  height: "30%",
                  fontSize: "12px",
                  //padding: "4px",
                  margin: "0px 0px 0px 10px",
               
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
                  fontSize: "10px",
                  position: "relative",
                  margin: "0px 0px 0px 30px",
                  //justifyContent: "left",
                  padding: "2px",
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
