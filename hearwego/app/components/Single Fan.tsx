import Box from "@mui/material/Box";

interface Props {
  userName: string;
  userImg: string;
}

export default function SingleFan({ userName, userImg }: Props) {
  return (
    <Box
      sx={{
        textAlign: "center",
        color: "primary.main",
        fontWeight: "bold",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
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
        }}
      ></Box>
      {userName}
    </Box>
  );
}
