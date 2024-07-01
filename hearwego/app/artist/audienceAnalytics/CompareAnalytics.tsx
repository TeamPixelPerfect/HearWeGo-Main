import {
  Box,
  Card,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { ADGraphTab } from "../../styles/artistAnalytics.styles";
import { LineChart } from "@mui/x-charts/LineChart";
import { getSongsForArtist } from "@/app/services/SongServices";
import { useAppSelector } from "@/lib/hooks";
import { Song } from "@/app/constants/models";
import CircleIcon from "@mui/icons-material/Circle";

interface DataSet {
  hour?: string;
  date?: string;
  impressions: number;
  plays: number;
  shares: number;
}

const ADCompareAnalytics = () => {
  const theme = useTheme();

  const artist = useAppSelector((state) => state.artist.user);

  const [songs, setSongs] = useState<Song[]>();

  const [songs1, setSongs1] = useState<Song[]>();
  const [songs2, setSongs2] = useState<Song[]>();

  const [impressions1, setImpressions1] = useState<string>("79.2K");
  const [impressions2, setImpressions2] = useState<string>("95.2K");

  const [plays1, setPlays1] = useState<string>("20K");
  const [plays2, setPlays2] = useState<string>("32.5K");

  const [shares1, setShares1] = useState<string>("3K");
  const [shares2, setShares2] = useState<string>("1.2K");

  const [rangeValue, setrangeValue] = useState(0);
  const [songValue1, setSongValue1] = useState<string>();
  const [songValue2, setSongValue2] = useState<string>();
  const [dataKey, setDataKey] = useState("Impressions");
  const [dataset1, setDataset1] = useState<any[]>([
    { hour: "00:00", impressions: 182, plays: 102, shares: 29 },
    { hour: "01:00", impressions: 249, plays: 146, shares: 34 },
    { hour: "02:00", impressions: 153, plays: 87, shares: 22 },
    { hour: "03:00", impressions: 214, plays: 123, shares: 28 },
    { hour: "04:00", impressions: 178, plays: 92, shares: 20 },
    { hour: "05:00", impressions: 205, plays: 118, shares: 27 },
    { hour: "06:00", impressions: 233, plays: 129, shares: 31 },
    { hour: "07:00", impressions: 312, plays: 189, shares: 38 },
    { hour: "08:00", impressions: 347, plays: 215, shares: 35 },
    { hour: "09:00", impressions: 421, plays: 276, shares: 41 },
    { hour: "10:00", impressions: 398, plays: 252, shares: 37 },
    { hour: "11:00", impressions: 460, plays: 299, shares: 45 },
    { hour: "12:00", impressions: 511, plays: 324, shares: 49 },
    { hour: "13:00", impressions: 470, plays: 300, shares: 42 },
    { hour: "14:00", impressions: 488, plays: 314, shares: 50 },
    { hour: "15:00", impressions: 530, plays: 332, shares: 46 },
    { hour: "16:00", impressions: 560, plays: 354, shares: 51 },
    { hour: "17:00", impressions: 589, plays: 370, shares: 48 },
    { hour: "18:00", impressions: 620, plays: 395, shares: 53 },
    { hour: "19:00", impressions: 640, plays: 408, shares: 56 },
    { hour: "20:00", impressions: 665, plays: 426, shares: 60 },
    { hour: "21:00", impressions: 700, plays: 451, shares: 62 },
    { hour: "22:00", impressions: 720, plays: 465, shares: 55 },
    { hour: "23:00", impressions: 755, plays: 490, shares: 66 },
  ]);

  const [dataset2, setDataset2] = useState<any[]>([
    { hour: "00:00", impressions: 212, plays: 72, shares: 59 },
    { hour: "01:00", impressions: 279, plays: 116, shares: 4 },
    { hour: "02:00", impressions: 183, plays: 57, shares: 52 },
    { hour: "03:00", impressions: 244, plays: 93, shares: 58 },
    { hour: "04:00", impressions: 208, plays: 122, shares: 50 },
    { hour: "05:00", impressions: 235, plays: 148, shares: 57 },
    { hour: "06:00", impressions: 263, plays: 159, shares: 1 },
    { hour: "07:00", impressions: 282, plays: 219, shares: 8 },
    { hour: "08:00", impressions: 317, plays: 245, shares: 65 },
    { hour: "09:00", impressions: 451, plays: 306, shares: 71 },
    { hour: "10:00", impressions: 428, plays: 222, shares: 67 },
    { hour: "11:00", impressions: 490, plays: 329, shares: 15 },
    { hour: "12:00", impressions: 481, plays: 354, shares: 79 },
    { hour: "13:00", impressions: 440, plays: 330, shares: 12 },
    { hour: "14:00", impressions: 518, plays: 344, shares: 20 },
    { hour: "15:00", impressions: 500, plays: 302, shares: 76 },
    { hour: "16:00", impressions: 590, plays: 324, shares: 81 },
    { hour: "17:00", impressions: 559, plays: 400, shares: 18 },
    { hour: "18:00", impressions: 590, plays: 365, shares: 23 },
    { hour: "19:00", impressions: 670, plays: 438, shares: 86 },
    { hour: "20:00", impressions: 635, plays: 396, shares: 30 },
    { hour: "21:00", impressions: 730, plays: 481, shares: 92 },
    { hour: "22:00", impressions: 690, plays: 495, shares: 25 },
    { hour: "23:00", impressions: 785, plays: 460, shares: 96 },
  ]);

  const handleRangeChange = (event: SelectChangeEvent<number>) => {
    const value = Number(event.target.value);
    setrangeValue(value);

    if (value === 0) {
      setDataset1([
        { hour: "00:00", impressions: 182, plays: 102, shares: 29 },
        { hour: "01:00", impressions: 249, plays: 146, shares: 34 },
        { hour: "02:00", impressions: 153, plays: 87, shares: 22 },
        { hour: "03:00", impressions: 214, plays: 123, shares: 28 },
        { hour: "04:00", impressions: 178, plays: 92, shares: 20 },
        { hour: "05:00", impressions: 205, plays: 118, shares: 27 },
        { hour: "06:00", impressions: 233, plays: 129, shares: 31 },
        { hour: "07:00", impressions: 312, plays: 189, shares: 38 },
        { hour: "08:00", impressions: 347, plays: 215, shares: 35 },
        { hour: "09:00", impressions: 421, plays: 276, shares: 41 },
        { hour: "10:00", impressions: 398, plays: 252, shares: 37 },
        { hour: "11:00", impressions: 460, plays: 299, shares: 45 },
        { hour: "12:00", impressions: 511, plays: 324, shares: 49 },
        { hour: "13:00", impressions: 470, plays: 300, shares: 42 },
        { hour: "14:00", impressions: 488, plays: 314, shares: 50 },
        { hour: "15:00", impressions: 530, plays: 332, shares: 46 },
        { hour: "16:00", impressions: 560, plays: 354, shares: 51 },
        { hour: "17:00", impressions: 589, plays: 370, shares: 48 },
        { hour: "18:00", impressions: 620, plays: 395, shares: 53 },
        { hour: "19:00", impressions: 640, plays: 408, shares: 56 },
        { hour: "20:00", impressions: 665, plays: 426, shares: 60 },
        { hour: "21:00", impressions: 700, plays: 451, shares: 62 },
        { hour: "22:00", impressions: 720, plays: 465, shares: 55 },
        { hour: "23:00", impressions: 755, plays: 490, shares: 66 },
      ]);

      setDataset2([
        { hour: "00:00", impressions: 212, plays: 72, shares: 59 },
        { hour: "01:00", impressions: 279, plays: 116, shares: 4 },
        { hour: "02:00", impressions: 183, plays: 57, shares: 52 },
        { hour: "03:00", impressions: 244, plays: 93, shares: 58 },
        { hour: "04:00", impressions: 208, plays: 122, shares: 50 },
        { hour: "05:00", impressions: 235, plays: 148, shares: 57 },
        { hour: "06:00", impressions: 263, plays: 159, shares: 1 },
        { hour: "07:00", impressions: 282, plays: 219, shares: 8 },
        { hour: "08:00", impressions: 317, plays: 245, shares: 65 },
        { hour: "09:00", impressions: 451, plays: 306, shares: 71 },
        { hour: "10:00", impressions: 428, plays: 222, shares: 67 },
        { hour: "11:00", impressions: 490, plays: 329, shares: 15 },
        { hour: "12:00", impressions: 481, plays: 354, shares: 79 },
        { hour: "13:00", impressions: 440, plays: 330, shares: 12 },
        { hour: "14:00", impressions: 518, plays: 344, shares: 20 },
        { hour: "15:00", impressions: 500, plays: 302, shares: 76 },
        { hour: "16:00", impressions: 590, plays: 324, shares: 81 },
        { hour: "17:00", impressions: 559, plays: 400, shares: 18 },
        { hour: "18:00", impressions: 590, plays: 365, shares: 23 },
        { hour: "19:00", impressions: 670, plays: 438, shares: 86 },
        { hour: "20:00", impressions: 635, plays: 396, shares: 30 },
        { hour: "21:00", impressions: 730, plays: 481, shares: 92 },
        { hour: "22:00", impressions: 690, plays: 495, shares: 25 },
        { hour: "23:00", impressions: 785, plays: 460, shares: 96 },
      ]);
    } else if (value === 1) {
      setDataset1([
        { date: "2024-05-23", impressions: 182, plays: 102, shares: 29 },
        { date: "2024-05-24", impressions: 249, plays: 146, shares: 34 },
        { date: "2024-05-25", impressions: 153, plays: 87, shares: 22 },
        { date: "2024-05-26", impressions: 214, plays: 123, shares: 38 },
        { date: "2024-05-27", impressions: 178, plays: 92, shares: 25 },
        { date: "2024-05-28", impressions: 205, plays: 118, shares: 27 },
        { date: "2024-05-29", impressions: 233, plays: 129, shares: 31 },
      ]);

      setDataset2([
        { date: "2024-05-23", impressions: 212, plays: 72, shares: 59 },
        { date: "2024-05-24", impressions: 279, plays: 116, shares: 4 },
        { date: "2024-05-25", impressions: 183, plays: 57, shares: 52 },
        { date: "2024-05-26", impressions: 244, plays: 93, shares: 8 },
        { date: "2024-05-27", impressions: 148, plays: 122, shares: 55 },
        { date: "2024-05-28", impressions: 235, plays: 148, shares: 57 },
        { date: "2024-05-29", impressions: 263, plays: 159, shares: 1 },
      ]);
    } else if (value === 2) {
      setDataset1([
        { date: "2024-05-01", impressions: 182, plays: 102, shares: 29 },
        { date: "2024-05-02", impressions: 249, plays: 146, shares: 34 },
        { date: "2024-05-03", impressions: 153, plays: 87, shares: 22 },
        { date: "2024-05-04", impressions: 214, plays: 123, shares: 38 },
        { date: "2024-05-05", impressions: 178, plays: 92, shares: 25 },
        { date: "2024-05-06", impressions: 205, plays: 118, shares: 27 },
        { date: "2024-05-07", impressions: 233, plays: 129, shares: 31 },
        { date: "2024-05-08", impressions: 312, plays: 189, shares: 45 },
        { date: "2024-05-09", impressions: 347, plays: 215, shares: 39 },
        { date: "2024-05-10", impressions: 421, plays: 276, shares: 47 },
        { date: "2024-05-11", impressions: 398, plays: 252, shares: 40 },
        { date: "2024-05-12", impressions: 460, plays: 299, shares: 55 },
        { date: "2024-05-13", impressions: 511, plays: 324, shares: 49 },
        { date: "2024-05-14", impressions: 470, plays: 300, shares: 52 },
        { date: "2024-05-15", impressions: 488, plays: 314, shares: 60 },
        { date: "2024-05-16", impressions: 530, plays: 332, shares: 46 },
        { date: "2024-05-17", impressions: 560, plays: 354, shares: 51 },
        { date: "2024-05-18", impressions: 589, plays: 370, shares: 48 },
        { date: "2024-05-19", impressions: 620, plays: 395, shares: 53 },
        { date: "2024-05-20", impressions: 640, plays: 408, shares: 56 },
        { date: "2024-05-21", impressions: 665, plays: 426, shares: 60 },
        { date: "2024-05-22", impressions: 700, plays: 451, shares: 62 },
        { date: "2024-05-23", impressions: 720, plays: 465, shares: 55 },
        { date: "2024-05-24", impressions: 755, plays: 490, shares: 66 },
        { date: "2024-05-25", impressions: 780, plays: 510, shares: 70 },
        { date: "2024-05-26", impressions: 800, plays: 525, shares: 68 },
        { date: "2024-05-27", impressions: 820, plays: 540, shares: 75 },
        { date: "2024-05-28", impressions: 850, plays: 555, shares: 78 },
        { date: "2024-05-29", impressions: 870, plays: 570, shares: 80 },
        { date: "2024-05-30", impressions: 900, plays: 585, shares: 85 },
      ]);

      setDataset2([
        { date: "2024-05-01", impressions: 212, plays: 132, shares: 59 },
        { date: "2024-05-02", impressions: 279, plays: 176, shares: 64 },
        { date: "2024-05-03", impressions: 183, plays: 57, shares: 52 },
        { date: "2024-05-04", impressions: 244, plays: 153, shares: 8 },
        { date: "2024-05-05", impressions: 148, plays: 62, shares: 55 },
        { date: "2024-05-06", impressions: 235, plays: 88, shares: 57 },
        { date: "2024-05-07", impressions: 203, plays: 99, shares: 61 },
        { date: "2024-05-08", impressions: 342, plays: 219, shares: 75 },
        { date: "2024-05-09", impressions: 317, plays: 245, shares: 69 },
        { date: "2024-05-10", impressions: 451, plays: 246, shares: 17 },
        { date: "2024-05-11", impressions: 368, plays: 282, shares: 70 },
        { date: "2024-05-12", impressions: 490, plays: 269, shares: 25 },
        { date: "2024-05-13", impressions: 481, plays: 354, shares: 79 },
        { date: "2024-05-14", impressions: 500, plays: 270, shares: 22 },
        { date: "2024-05-15", impressions: 518, plays: 344, shares: 90 },
        { date: "2024-05-16", impressions: 500, plays: 362, shares: 16 },
        { date: "2024-05-17", impressions: 590, plays: 384, shares: 21 },
        { date: "2024-05-18", impressions: 619, plays: 340, shares: 18 },
        { date: "2024-05-19", impressions: 590, plays: 365, shares: 83 },
        { date: "2024-05-20", impressions: 610, plays: 438, shares: 26 },
        { date: "2024-05-21", impressions: 695, plays: 396, shares: 30 },
        { date: "2024-05-22", impressions: 670, plays: 481, shares: 92 },
        { date: "2024-05-23", impressions: 750, plays: 435, shares: 25 },
        { date: "2024-05-24", impressions: 785, plays: 460, shares: 96 },
        { date: "2024-05-25", impressions: 810, plays: 540, shares: 40 },
        { date: "2024-05-26", impressions: 770, plays: 495, shares: 98 },
        { date: "2024-05-27", impressions: 790, plays: 570, shares: 45 },
        { date: "2024-05-28", impressions: 820, plays: 525, shares: 108 },
        { date: "2024-05-29", impressions: 900, plays: 585, shares: 110 },
        { date: "2024-05-30", impressions: 870, plays: 555, shares: 55 },
      ]);
    }
  };

  const getXAxisData = () => {
    let dataset = [];

    if (dataset1.length > dataset2.length) dataset = dataset1;
    else dataset = dataset2;

    if (rangeValue === 0) {
      return dataset.map((data) => data.hour);
    } else {
      return dataset.map((data) => data.date);
    }
  };

  const getYAxisData = (dataset: any[]) => {
    if (dataKey === "Impressions")
      return dataset.map((data) => data.impressions);
    else if (dataKey === "Plays") return dataset.map((data) => data.plays);
    else if (dataKey === "Shares") return dataset.map((data) => data.shares);
  };

  const handleKeyChange = (key: string) => {
    // e.target.active = true;
    setDataKey(key);
  };

  const handleSongChange1 = (event: SelectChangeEvent<string>) => {
    const value = event.target.value;
    setSongValue1(value);

    const filtered = songs?.filter((song) => song.song_id !== value);

    setSongs2(filtered);
  };

  const handleSongChange2 = (event: SelectChangeEvent<string>) => {
    const value = event.target.value;
    setSongValue2(value);

    const filtered = songs?.filter((song) => song.song_id !== value);

    setSongs1(filtered);
  };

  useEffect(() => {
    getSongsForArtist(
      artist?.token ? artist.token : "",
      artist?.user?.artist_id ? artist.user.artist_id : ""
    ).then((songs) => {
      setSongs(songs.data);
      setSongs1(songs.data);
      setSongs2(songs.data);
    });
  }, []);

  return (
    <Box>
      <Stack
        direction="row"
        sx={{
          width: "100%",
          justifyContent: "space-between",
          // alignItems: "center",
          padding: "2em 1em",
          paddingTop: "1em",
          paddingRight: 0,
        }}
      >
        <Typography variant="h6" fontWeight="700" color="secondary">
          Advanced Analytics
        </Typography>
      </Stack>
      <Grid container>
        <Grid
          xs={12}
          md={6}
          sx={{ display: "flex", justifyContent: "flex-end", pr: 1, pb: 3 }}
          item
        >
          <FormControl
            sx={{
              width: "40%",
              minWidth: "100px",
            }}
          >
            <InputLabel id="demo-simple-select-label">Choose a song</InputLabel>
            <Select
              labelId="song-select-label"
              id="song-select"
              label="Select a song"
              onChange={handleSongChange1}
              value={songValue1}
              sx={{
                borderColor: theme.palette.secondary.main,
                // background: "#C4B5FD",
              }}
            >
              {songs1 &&
                songs1?.map((song) => (
                  <MenuItem value={song.song_id}>{song.song_title}</MenuItem>
                ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid
          xs={12}
          md={6}
          sx={{ display: "flex", justifyContent: "flex-start", pl: 1, pb: 3 }}
          item
        >
          <FormControl
            sx={{
              width: "40%",
              minWidth: "100px",
            }}
          >
            <InputLabel id="demo-simple-select-label">Choose a song</InputLabel>
            <Select
              labelId="song-select-label"
              id="song-select"
              label="Select a song"
              onChange={handleSongChange2}
              value={songValue2}
              sx={{
                borderColor: theme.palette.secondary.main,
                // background: "#C4B5FD",
              }}
            >
              {songs2 &&
                songs2?.map((song) => (
                  <MenuItem value={song.song_id}>{song.song_title}</MenuItem>
                ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid xs={3} md={2} item>
          <ADGraphTab
            active={false}
            onClick={() => {
              handleKeyChange("Impressions");
            }}
            sx={{
              background:
                dataKey === "Impressions"
                  ? theme.palette.primary.dark
                  : theme.palette.primary.light,
            }}
          >
            <Typography variant="body1" fontSize={13}>
              Impressions
            </Typography>
            <Stack direction="row" sx={{ alignItems: "center" }} spacing={1}>
              <CircleIcon
                sx={{ color: theme.palette.secondary.light, fontSize: "12px" }}
              />
              <Typography variant="body1" fontWeight={700}>
                {impressions1}
              </Typography>
            </Stack>
            <Stack direction="row" sx={{ alignItems: "center" }} spacing={1}>
              <CircleIcon
                sx={{ color: theme.palette.secondary.dark, fontSize: "12px" }}
              />
              <Typography variant="body1" fontWeight={700}>
                {impressions2}
              </Typography>
            </Stack>
          </ADGraphTab>
        </Grid>
        <Grid xs={3} md={2} item>
          <ADGraphTab
            active={false}
            onClick={() => {
              handleKeyChange("Plays");
            }}
            sx={{
              background:
                dataKey === "Plays"
                  ? theme.palette.primary.dark
                  : theme.palette.primary.light,
            }}
          >
            <Typography variant="body1" fontSize={13}>
              Plays
            </Typography>
            <Stack direction="row" sx={{ alignItems: "center" }} spacing={1}>
              <CircleIcon
                sx={{ color: theme.palette.secondary.light, fontSize: "12px" }}
              />
              <Typography variant="body1" fontWeight={700}>
                {plays1}
              </Typography>
            </Stack>
            <Stack direction="row" sx={{ alignItems: "center" }} spacing={1}>
              <CircleIcon
                sx={{ color: theme.palette.secondary.dark, fontSize: "12px" }}
              />
              <Typography variant="body1" fontWeight={700}>
                {plays2}
              </Typography>
            </Stack>
          </ADGraphTab>
        </Grid>
        <Grid xs={3} md={2} item>
          <ADGraphTab
            active={false}
            onClick={() => {
              handleKeyChange("Shares");
            }}
            sx={{
              background:
                dataKey === "Shares"
                  ? theme.palette.primary.dark
                  : theme.palette.primary.light,
            }}
          >
            <Typography variant="body1" fontSize={13}>
              Shares
            </Typography>
            <Stack direction="row" sx={{ alignItems: "center" }} spacing={1}>
              <CircleIcon
                sx={{ color: theme.palette.secondary.light, fontSize: "12px" }}
              />
              <Typography variant="body1" fontWeight={700}>
                {shares1}
              </Typography>
            </Stack>
            <Stack direction="row" sx={{ alignItems: "center" }} spacing={1}>
              <CircleIcon
                sx={{ color: theme.palette.secondary.dark, fontSize: "12px" }}
              />
              <Typography variant="body1" fontWeight={700}>
                {shares2}
              </Typography>
            </Stack>
          </ADGraphTab>
        </Grid>
        <Grid
          xs={3}
          md={6}
          item
          sx={{ display: "flex", justifyContent: "flex-end" }}
        >
          <FormControl
            sx={{
              width: "40%",
              minWidth: "100px",
            }}
          >
            <InputLabel id="date-range">Show results for</InputLabel>
            <Select
              labelId="song-select-label"
              id="song-select"
              value={rangeValue}
              label="Select a song"
              onChange={handleRangeChange}
              sx={{
                borderColor: theme.palette.secondary.main,
                // background: "#C4B5FD",
              }}
            >
              <MenuItem value={0}>Last Day</MenuItem>
              <MenuItem value={1}>Last Week</MenuItem>
              <MenuItem value={2}>Last Month</MenuItem>
              <MenuItem value={3}>All Time</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid xs={12} md={12} item>
          <Card
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <LineChart
              dataset={dataset1}
              xAxis={[
                {
                  scaleType: "point",
                  data: getXAxisData(),
                },
              ]}
              series={[
                {
                  data: getYAxisData(dataset1),
                  color: theme.palette.secondary.light,
                  type: "line",
                  curve: "linear",
                  label: dataKey,
                },
                {
                  data: getYAxisData(dataset2),
                  color: theme.palette.secondary.dark,
                  type: "line",
                  curve: "linear",
                  label: dataKey,
                },
              ]}
              width={1000}
              height={400}
              leftAxis={null}
            />
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ADCompareAnalytics;
