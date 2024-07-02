import Box from "@mui/material/Box";

import FavoriteBorderRounded from "@mui/icons-material/FavoriteBorderRounded";
import Divider from "@mui/material/Divider";
import Share from "@mui/icons-material/Share";
import CommentIcon from "@mui/icons-material/Comment";
import IconButton from "@mui/material/IconButton";
import { Stack } from "@mui/material";

import {
  PostCard,
  PostPublishAvatar,
  PublisherNameBox,
  PublishedDateBox,
  DescriptionBox,
  PostImageCard,
  NoOfLikesBox,
  NoOfCommentsBox,
} from "../styles/fanclub.styles";

export default function SinglePost() {
  return (
    <PostCard sx={{ marginBottom: "8px" }}>
      <Stack
        direction="row"
        sx={{
          width: "100%",
          padding: "1em",
          display: "flex",
          alignItems: "center",
        }}
      >
        <PostPublishAvatar
          src={"https://www.rollingstone.com/wp-content/uploads/2021/05/rembrandts-flashback.jpg"
          }
        />
        <Stack>
          <PublisherNameBox component="h3">The Rembrandts</PublisherNameBox>
          <PublishedDateBox component="h3">2024-01-25</PublishedDateBox>
        </Stack>
      </Stack>

      <DescriptionBox>
        <p>
          Snow storm coming in Sommaroy island, Arctic Norway. This is something
          that you definitely wanna see in your life.
        </p>
      </DescriptionBox>

      <PostImageCard
        image={
          "https://nsidc.org/sites/default/files/images/After%20a%20snow%20storm%2C%20the%20sun%20emerged%20revealing%20this%20beautiful%20scene%20on%20Cedar%20River%20Road%20west%20of%20Mount%20Vernon%2C%20IA..jpg"
        }
      />
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          padding: "0 2em",
          mb: "1em",
        }}
      >
        <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
          <IconButton
            sx={
              {
                //color: "#3B0764",
              }
            }
          >
            <FavoriteBorderRounded />
          </IconButton>
          <NoOfLikesBox component="h3">Damidu and 12k others</NoOfLikesBox>
        </Stack>

        <NoOfCommentsBox component="h3">250 comments</NoOfCommentsBox>
      </Box>

      <Divider
        sx={{
          backgroundColor: "#9A9A9A",
          height: "2px",
          width: "90%",
          margin: "8px 0",
        }}
      />
      <Stack
        direction="row"
        sx={{
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          padding: "0 2em",
          pb: "1em",
        }}
      >
        <IconButton>
          <FavoriteBorderRounded />
        </IconButton>

        <IconButton>
          <CommentIcon />
        </IconButton>

        <IconButton>
          <Share />
        </IconButton>
      </Stack>
    </PostCard>
  );
}
