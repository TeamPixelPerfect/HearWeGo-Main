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
    <Link href="/main/events">
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
                    borderRadius: "14px",
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
              
            
          </Box>
        </div>
      </Box>
    </Link>
  );
}
