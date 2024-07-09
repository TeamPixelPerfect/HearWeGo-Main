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
import shadows from "@mui/material/styles/shadows";
import { Dataset } from "aws-sdk/clients/cognitosync";
import { getSongs, getSongsForArtist } from "@/app/services/SongServices";
import { useSelector } from "react-redux";
import { useAppSelector } from "@/lib/hooks";
import { Song } from "@/app/constants/models";
import { PieChart } from "@mui/x-charts/PieChart";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import WorldMap from "react-svg-worldmap";

interface DataSet {
  hour?: string;
  date?: string;
  impressions: number;
  plays: number;
  shares: number;
}

const ADAdvancedAnalytics = () => {
  const theme = useTheme();

  const artist = useAppSelector((state) => state.artist.user);
  const [songs, setSongs] = useState<Song[]>();

  const [impressions, setImpressions] = useState<string>("72.4K");
  const [plays, setPlays] = useState<string>("20.5K");
  const [shares, setShares] = useState<string>("4K");

  const [rangeValue, setrangeValue] = useState(0);
  const [songValue, setSongValue] = useState<string>("");
  const [dataKey, setDataKey] = useState("Impressions");
  const [dataset, setDataset] = useState<any[]>([
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

  const [genderDataset, setGenderDataset] = useState<any[]>([
    { id: 0, label: "Male", value: 10 },
    { id: 1, label: "Female", value: 20 },
    { id: 2, label: "Other", value: 1 },
  ]);

  const [ageDataset, setAgeDataset] = useState<any[]>([
    { id: 0, value: 25, label: "13-24" },
    { id: 1, value: 20, label: "25-39" },
    { id: 2, value: 12, label: "40-59" },
    { id: 2, value: 10, label: "60+" },
  ]);

  const [countryData, setCountryData] = useState<any[]>([
    { country: "cn", value: 1389618778 }, // china
    { country: "in", value: 1311559204 }, // india
    { country: "us", value: 331883986 }, // united states
    { country: "id", value: 264935824 }, // indonesia
    { country: "pk", value: 210797836 }, // pakistan
    { country: "br", value: 210301591 }, // brazil
    { country: "ng", value: 208679114 }, // nigeria
    { country: "bd", value: 161062905 }, // bangladesh
    { country: "ru", value: 141944641 }, // russia
    { country: "mx", value: 127318112 }, // mexico
  ]);

  const handleRangeChange = (event: SelectChangeEvent<number>) => {
    const value = Number(event.target.value);
    setrangeValue(value);

    if (value === 0) {
      setDataset([
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
    } else if (value === 1) {
      setDataset([
        { date: "2024-05-23", impressions: 182, plays: 102, shares: 29 },
        { date: "2024-05-24", impressions: 249, plays: 146, shares: 34 },
        { date: "2024-05-25", impressions: 153, plays: 87, shares: 22 },
        { date: "2024-05-26", impressions: 214, plays: 123, shares: 38 },
        { date: "2024-05-27", impressions: 178, plays: 92, shares: 25 },
        { date: "2024-05-28", impressions: 205, plays: 118, shares: 27 },
        { date: "2024-05-29", impressions: 233, plays: 129, shares: 31 },
      ]);
    } else if (value === 2) {
      setDataset([
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
    }
  };

  const handleKeyChange = (key: string) => {
    // e.target.active = true;
    setDataKey(key);
  };

  const handleSongChange = (event: SelectChangeEvent<string>) => {
    const value = event.target.value;
    setSongValue(value);
  };

  useEffect(() => {
    getSongsForArtist(
      artist?.token ? artist.token : "",
      artist?.user?.artist_id ? artist.user.artist_id : ""
    ).then((songs) => {
      setSongs(songs.data);
      setSongValue(songs.data[0].song_id);
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
            onChange={handleSongChange}
            value={songValue}
            sx={{
              borderColor: theme.palette.secondary.main,
              // background: "#C4B5FD",
            }}
          >
            {songs &&
              songs?.map((song) => (
                <MenuItem value={song.song_id}>{song.song_title}</MenuItem>
              ))}
          </Select>
        </FormControl>
      </Stack>
      {songValue !== "" && (
        <Grid container>
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
              <Typography variant="h5" fontWeight={700}>
                {impressions}
              </Typography>
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
              <Typography variant="h5" fontWeight={700}>
                {plays}
              </Typography>
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
              <Typography variant="h5" fontWeight={700}>
                {shares}
              </Typography>
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
                dataset={dataset}
                xAxis={[
                  {
                    scaleType: "band",
                    dataKey:
                      rangeValue === 0 ? "hour" : 1 || 2 ? "date" : "month",
                    valueFormatter: (value, context) =>
                      context.location === "tick" ? value : "",
                  },
                ]}
                series={[
                  {
                    dataKey: dataKey.toLowerCase(),
                    color: "#4338ca",
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
          <Grid xs={12} md={6} item>
            <Card
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                padding: "1em",
                boxShadow: shadows[3],
                margin: "1em",
                ml: 0,
              }}
            >
              <Typography variant="h6" fontWeight={700} color="secondary">
                Gender
              </Typography>
              <PieChart
                series={[
                  {
                    data: genderDataset,
                  },
                ]}
                width={400}
                height={200}
                colors={[
                  theme.palette.primary.main,
                  theme.palette.secondary.main,
                  theme.palette.secondary.light,
                ]}
              />
            </Card>
          </Grid>
          <Grid xs={12} md={6} item>
            <Card
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                padding: "1em",
                boxShadow: shadows[3],
                margin: "1em",
                mr: 0,
              }}
            >
              <Typography variant="h6" fontWeight={700} color="secondary">
                Age Group
              </Typography>
              <PieChart
                series={[
                  {
                    data: ageDataset,
                  },
                ]}
                width={400}
                height={200}
                colors={[
                  theme.palette.primary.main,
                  theme.palette.primary.dark,
                  theme.palette.secondary.main,
                  theme.palette.secondary.light,
                ]}
              />
            </Card>
          </Grid>
          <Grid xs={12} md={12} item>
            <Card
              sx={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                padding: "1em",
                boxShadow: shadows[3],
                margin: "1em 0",
              }}
            >
              <Typography variant="h6" fontWeight={700} color="secondary">
                Top Countries
              </Typography>
              <Box sx={{ m: "auto" }}>
                <WorldMap
                  color={theme.palette.secondary.main}
                  backgroundColor="transparent"
                  value-suffix="people"
                  size={1000}
                  data={countryData}
                />
              </Box>
            </Card>
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default ADAdvancedAnalytics;
