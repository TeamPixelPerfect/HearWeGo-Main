"use client";
import React, { useState, useEffect } from "react";
import { jsPDF } from "jspdf";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import DownloadIcon from "@mui/icons-material/Download";
import ShareIcon from "@mui/icons-material/Share";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  getPressReleasesByArtist,
  deletePressRelease,
} from "../../services/PressReleaseServices";
import { useAppSelector } from "@/lib/hooks";
import { formatDate } from "@/app/constants/functions";
import { PressReleaseData } from "@/app/constants/models";

const DraftsTab = () => {
  const artist = useAppSelector((state) => state.artist.user);
  const [DraftedPressReleases, setDraftedPressReleases] = useState<
    PressReleaseData[]
  >([]);
  const [IsChanged, setIsChanged] = useState<boolean>(false);

  useEffect(() => {
    if (artist?.token) {
      getPressReleasesByArtist(
        artist.token,
        artist?.user?.artist_id ? artist.user.artist_id : ""
      )
        .then((response) => {
          const draftedReleases = response.data.filter(
            (pr: any) => pr.Status === "Draft"
          );
          setDraftedPressReleases(draftedReleases);
          if (IsChanged) setIsChanged(false);
        })
        .catch((error) => console.error(error));
    }
  }, [artist?.token, artist?.user?.artist_id, IsChanged]);

  const generatePDF = async (data: any) => {
    const doc = new jsPDF();

    // Adding Artist Logo (Top Left)
    if (data.ArtistLogo_URL) {
      try {
        const imgLogo = await loadImage(data.ArtistLogo_URL);
        doc.addImage(imgLogo as string, 20, 10, 30, 30); // Adjust positioning as needed
      } catch (error) {
        console.error("Error loading artist logo:", error);
      }
    }

    // Header Section
    doc.setFont("Helvetica", "bold");
    doc.setFontSize(12);
    doc.text("FOR IMMEDIATE RELEASE", 20, 70); // Left aligned

    // Title Section
    doc.setFont("Helvetica", "bold");
    doc.setFontSize(22);
    doc.text(data.Headline, 20, 80); // Left aligned

    // Subtitle Section
    doc.setFont("Helvetica", "italic");
    doc.setFontSize(16);
    doc.text(data.SubHeadline, 20, 90); // Left aligned

    // Date and Location Section
    doc.setFont("Helvetica", "normal");
    doc.setFontSize(12);
    doc.text(`${formatDate(data.EventDate)} | ${data.Venue}`, 20, 100); // Left aligned

    // Line Separator
    doc.setLineWidth(0.5);
    doc.line(20, 110, 190, 110);

    // Body Section
    doc.setFont("Helvetica", "normal");
    doc.setFontSize(12);
    const descriptionLines = doc.splitTextToSize(data.Description, 170);
    doc.text(descriptionLines, 20, 120);

    // Release Date
    doc.setFont("Helvetica", "normal");
    doc.setFontSize(12);
    doc.text(`Release Date: ${formatDate(data.ReleaseDate)}`, 20, 180);

    // Adding Signature
    if (data.Signature) {
      try {
        const imgSignature = await loadImage(data.Signature);
        doc.addImage(imgSignature as string, 20, 190, 30, 30);
      } catch (error) {
        console.error("Error loading signature:", error);
      }
    }

    // Contact Information Section
    doc.setFont("Helvetica", "normal");
    doc.setFontSize(12);
    const contactY = data.Signature ? 230 : 200;
    doc.text("Contact Information", 20, contactY);
    doc.setFont("Helvetica", "bold");
    doc.text(artist?.user.artistName as string, 20, contactY + 10);
    doc.setFont("Helvetica", "normal");
    doc.text(`Phone: ${artist?.user.mobileNumber}`, 20, contactY + 20);
    doc.text(`Email: ${artist?.user.email}`, 20, contactY + 30);

    // Footer Section
    const pageHeight = doc.internal.pageSize.height;
    doc.setFontSize(10);
    doc.text(
      `Press Release generated on ${new Date().toLocaleDateString()}`,
      105,
      pageHeight - 10,
      { align: "center" }
    );

    // Save the PDF
    doc.save(`${data.Headline}_press_release.pdf`);
  };

  const loadImage = (url: string) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = "Anonymous";
      img.src = url;
      img.onload = () => resolve(img);
      img.onerror = (error) => reject(error);
    });
  };

  const handleDelete = (id: any) => {
    deletePressRelease(artist ? artist.token : "", id)
      .then((res) => {
        setIsChanged(true);
      })
      .catch((error) => console.error(error));
  };

  return (
    <>
      {DraftedPressReleases.length > 0 ? (
        <Grid container spacing={2}>
          {DraftedPressReleases.map((item, index) => (
            <Grid item xs={12} md={6} lg={4} key={index}>
              <Paper
                elevation={3}
                sx={{
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                  bgcolor: "background.default",
                  borderRadius: 2,
                  boxShadow: 3,
                  height: "auto",
                  transition: "transform 0.3s ease-in-out",
                  "&:hover": {
                    transform: "scale(1.02)",
                  },
                }}
              >
                <Box
                  component="img"
                  src={item.ArtistLogo_URL}
                  alt="logo"
                  sx={{
                    width: 150,
                    height: 150,
                    mb: 2,
                    borderRadius: "50%",
                    border: "2px solid #1976d2",
                  }}
                />
                <Typography variant="h5" sx={{ fontWeight: "bold", mb: 1 }}>
                  {item.Headline}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ mb: 1, color: "text.secondary" }}
                >
                  {item.SubHeadline}
                </Typography>
                <Typography variant="body2" sx={{ mb: 0.5 }}>
                  Event Date:{" "}
                  {item.EventDate && formatDate(item.EventDate.toString())}
                </Typography>
                <Typography variant="body2" sx={{ mb: 2 }}>
                  Release Date:{" "}
                  {item.ReleaseDate && formatDate(item.ReleaseDate.toString())}
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    gap: 2,
                    mt: 2,
                  }}
                >
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => generatePDF(item)}
                    startIcon={<DownloadIcon />}
                    sx={{ textTransform: "none" }}
                  >
                    Download
                  </Button>
                  <IconButton color="secondary" sx={{ textTransform: "none" }}>
                    <ShareIcon />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => {
                      handleDelete(item?.PressReleaseID);
                    }}
                    sx={{ textTransform: "none" }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography variant="h6" sx={{ textAlign: "center" }}>
          No drafted press releases saved.
        </Typography>
      )}
    </>
  );
};

export default DraftsTab;
