'use client';
import React, { useState } from 'react';
import { Box, TextField, MenuItem, IconButton, Typography, Link, List, ListItem, ListItemIcon, ListItemText, ListItemSecondaryAction } from '@mui/material';
import YouTubeIcon from '@mui/icons-material/YouTube';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TikTokIcon from '@mui/icons-material/MusicNote';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';

interface Platform {
  name: string;
  link: string;
}

const StreamingPlatformLinks: React.FC = () => {
  const [platform, setPlatform] = useState('YouTube');
  const [link, setLink] = useState('https://www.youtube.com/results?search_query=friends');
  const [platforms, setPlatforms] = useState<Platform[]>([]);

  const handlePlatformChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPlatform(event.target.value);
  };

  const handleLinkChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLink(event.target.value);
  };

  const addPlatform = () => {
    setPlatforms([...platforms, { name: platform, link }]);
    setLink('');
  };

  const removePlatform = (index: number) => {
    setPlatforms(platforms.filter((_, i) => i !== index));
  };

  const renderIcon = (platform: string) => {
    switch (platform) {
      case 'YouTube':
        return <YouTubeIcon />;
      case 'Facebook':
        return <FacebookIcon />;
      case 'Twitter':
        return <TwitterIcon />;
      case 'Instagram':
        return <InstagramIcon />;
      case 'LinkedIn':
        return <LinkedInIcon />;
      case 'TikTok':
        return <TikTokIcon />;
      default:
        return null;
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#303030',
        padding: 2,
        borderRadius: 2,
        width: '100%',
      }}
    >
      <Typography variant="h6" color="white" mb={2}>
        Streaming Platform Links
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
        <TextField
          select
          value={platform}
          onChange={handlePlatformChange}
          variant="outlined"
          sx={{ marginRight: 2, flex: 1, color: 'white' }}
        >
          <MenuItem value="YouTube">
            <YouTubeIcon sx={{ marginRight: 1 }} /> YouTube
          </MenuItem>
          <MenuItem value="Facebook">
            <FacebookIcon sx={{ marginRight: 1 }} /> Facebook
          </MenuItem>
          <MenuItem value="Twitter">
            <TwitterIcon sx={{ marginRight: 1 }} /> Twitter
          </MenuItem>
          <MenuItem value="Instagram">
            <InstagramIcon sx={{ marginRight: 1 }} /> Instagram
          </MenuItem>
          <MenuItem value="LinkedIn">
            <LinkedInIcon sx={{ marginRight: 1 }} /> LinkedIn
          </MenuItem>
          <MenuItem value="TikTok">
            <TikTokIcon sx={{ marginRight: 1 }} /> TikTok
          </MenuItem>
          {/* Add more platforms here if needed */}
        </TextField>
        <TextField
          value={link}
          onChange={handleLinkChange}
          variant="outlined"
          fullWidth
          sx={{ flex: 4, color: 'white' }}
        />
        <IconButton color="primary" sx={{ marginLeft: 2 }} onClick={addPlatform}>
          <AddIcon />
        </IconButton>
      </Box>
      <List>
        {platforms.map((platform, index) => (
          <ListItem key={index} sx={{ backgroundColor: '#424242', marginBottom: 1, borderRadius: 1 }}>
            <ListItemIcon>{renderIcon(platform.name)}</ListItemIcon>
            <ListItemText>
              <Link href={platform.link} target="_blank" rel="noopener noreferrer" color="inherit">
                {platform.link}
              </Link>
            </ListItemText>
            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="delete" onClick={() => removePlatform(index)}>
                <CloseIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default StreamingPlatformLinks;
