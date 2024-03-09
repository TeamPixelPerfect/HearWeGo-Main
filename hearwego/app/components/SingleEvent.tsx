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

export default function SingleEvent({eventName, eventImg, eventDate, eventDay, eventTime, artistName}: Props) {
  return (
    <Link href="/main/events">
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
          backgroundImage: `url(${eventImg})`,
          minWidth: "80px",
          minHeight: "80px",
          width: "95%",
          aspectRatio: "1/1",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          borderRadius: "14px",
          //position:'relavant'
        }}
      >
        <div
           style={{
            background: "black",
             width: "100%",
             height: "100%",
             borderRadius: "14px",
             opacity: "0.6",
              //position:'fixed'
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
                backgroundColor: "black",
                color: "white",
                width: "100%",
                height:'50px',
                fontSize: "24px",
                fontWeight: "bold",
                position: "relative",
                display: "flex",
                opacity:'0.9'
              }}
            >
              {eventDate}
            </Box>
            
            
          </Box>
        </div>
      </Box>
   
    </Box>
    </Link>
  );
}
