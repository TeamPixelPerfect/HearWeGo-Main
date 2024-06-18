"use client";
import React, { useState } from 'react';
import { Typography, Container, IconButton } from '@mui/material';
import { styled } from '@mui/system';
import Masonry from 'react-masonry-css';
import Box from '@mui/material/Box';
import CloseIcon from '@mui/icons-material/Close';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Grid from '@mui/material/Grid';

const RootContainer = styled(Container)({
  flexGrow: 1,
  padding: '20px',
  textAlign: 'left',
  borderRadius: '10px',
  boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
  border: '0.5px solid #f0f0f0',
  color: 'black',
  marginTop: '20px',
});

const MasonryGrid = styled(Masonry)({
  display: 'flex',
  marginLeft: '-30px',
  marginTop: '10px',
  width: 'auto',
  '& > div': {
    paddingLeft: '20px', // gutter size
    backgroundClip: 'padding-box',
  },
});

const ImageCard = styled('div')({
  position: 'relative',
  marginBottom: '20px',
  borderRadius: '8px',
  overflow: 'hidden',
  boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
  '& img': {
    width: '100%',
    display: 'block',
    borderRadius: '8px',
    transition: 'transform 0.3s ease',
  },
  '&:hover img': {
    transform: 'scale(1.05)',
  },
  '&:hover .overlay': {
    opacity: 1,
  },
  '& .overlay': {
    position: 'absolute',
    bottom: '0',
    left: '0',
    right: '0',
    background: 'rgba(0, 0, 0, 0.5)',
    color: '#fff',
    padding: '10px',
    opacity: 0,
    transition: 'opacity 0.3s ease',
  },
});

const EnlargedImageContainer = styled('div')({
  position: 'fixed',
  top: '0',
  left: '0',
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.8)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  
  // zIndex: 999,
});

const EnlargedImageWrapper = styled('div')({
  maxWidth: '90%',
  maxHeight: '90%',
  width: '600px',
  height: '600px',
  borderRadius: '4px',
  boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
  overflow: 'hidden',
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
});

const EnlargedImage = styled('img')({
  width: '100%',
  height: 'auto',
});

const CloseButton = styled(IconButton)({
  position: 'absolute',
  top: '10px',
  right: '10px',
  color: '#fff',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  '&:hover': {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
});

const PhotoInfo = styled('div')({
  position: 'absolute',
  bottom: '40px',
  left: '20px',
  display: 'flex',
  flexDirection: 'column',
  color: '#fff',

});

const PhotoTitle = styled(Typography)({
  marginBottom: '5px',
  fontWeight: 'bold',
});

const PhotoDetails = styled(Typography)({
  fontSize: '24px',
});

const LikeButton = styled(IconButton)({
  position: 'absolute',
  bottom: '10px',
  right: '10px',
  color: '#fff',

});

const LikeCount = styled(Typography)({
  marginLeft: '5px',
});

const photos = [
  { 
    title: 'Photo 1',
    url: 'https://i.ytimg.com/vi/aa5rRRnK1-g/maxresdefault.jpg' ,
    artist: 'Jane Smith',
    uploadedDate: '2022-11-20'
  },
  {
    title: 'Photo 2',
    url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJ9bqFoVHe3j5XZIS-7byR68c8CepiTd-zsg&s',
    artist: 'John Doe',
    uploadedDate: '2022-11-21'
  },
  {
    title: 'Photo 3',
    url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRc0uU5oxJivp2cT3bUKsblq9tHZ1ek515wbA&s',
    artist: 'Alice Johnson',
    uploadedDate: '2022-11-22'
  },
  {
    title: 'Photo 4',
    url: 'https://images.fineartamerica.com/images/artworkimages/mediumlarge/2/the-rembrandts-perform-in-los-angeles-jim-steinfeldt.jpg',
    artist: 'Bob Brown',
    uploadedDate: '2022-11-23'
  },
  {
    title: 'Photo 5',
    url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSb_ngOqUzVqG-UhIuS70EEwfFcZwyHX6fU1g&s',
    artist: 'Eve Green',
    uploadedDate: '2022-11-24'
  },
  {
    title: 'Photo 6',
    url: 'https://i.ytimg.com/vi/aa5rRRnK1-g/maxresdefault.jpg',
    artist: 'Eve Green',
    uploadedDate: '2022-11-24'
  },
  {
    title: 'Photo 7',
    url: 'https://live.staticflickr.com/4045/4649380056_5c4a776777_z.jpg',
    artist: 'Eve Green',
    uploadedDate: '2022-11-24'
  },
  {
    title: 'Photo 8',
    url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLGhiIH_1abUNcVyEDof7ZRPGrMDy3A6Zdlw&s',
    artist: 'Eve Green',
    uploadedDate: '2022-11-24'
  },
  {
    title: 'Photo 9',
    url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFa7GyUjL7A4GHdAPXUW8PjInMYda6djUnCA&s',
    artist: 'Eve Green',
    uploadedDate: '2022-11-24'
  },
  {
    title: 'Photo 10',
    url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMipB6sSzARwG04pMNDcFra1PpAwMov_7B2hkzh1Dl6kogSab6bMSLWScv-u7z-mIhNqw&usqp=CAU',
    artist: 'Eve Green',
    uploadedDate: '2022-11-24'
  },


  
   
];

const PhotoGallery: React.FC = () => {
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null);
  const [likes, setLikes] = useState<number[]>(new Array(photos.length).fill(0));
  const [liked, setLiked] = useState<boolean[]>(new Array(photos.length).fill(false));

  const openModal = (index: number) => {
    setSelectedPhoto(index);
  };

  const closeModal = () => {
    setSelectedPhoto(null);
  };

  const toggleLike = (index: number) => {
    const updatedLiked = [...liked];
    updatedLiked[index] = !updatedLiked[index];
    setLiked(updatedLiked);

    const updatedLikes = [...likes];
    updatedLikes[index] = updatedLiked[index] ? likes[index] + 1 : likes[index] - 1;
    setLikes(updatedLikes);
  };

  return (
    <Box >
      <Typography variant="h4" component="h1" sx={{fontWeight:"bold",marginLeft:"60px"}}>
        Photos
      </Typography>
   
    

      <RootContainer>
        <MasonryGrid
          breakpointCols={{
            default: 3,
            1100: 3,
            700: 2,
            500: 1,
          }}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {photos.map((photo, index) => (
            <ImageCard key={index} onClick={() => openModal(index)}>
              <img src={photo.url} alt={photo.title} />
            </ImageCard>
          ))}
        </MasonryGrid>
        {selectedPhoto !== null && (
          <EnlargedImageContainer>
            <EnlargedImageWrapper>
              <EnlargedImage src={photos[selectedPhoto].url} alt={photos[selectedPhoto].title} />
              <CloseButton onClick={closeModal}>
                <CloseIcon />
              </CloseButton>
              <PhotoInfo >
                <PhotoDetails>{` ${photos[selectedPhoto].artist}`}</PhotoDetails>
                <PhotoDetails>{`${photos[selectedPhoto].uploadedDate}`}</PhotoDetails>
              </PhotoInfo>
              <LikeButton onClick={() => toggleLike(selectedPhoto)} sx={{ margin: "20px" }}>
                {liked[selectedPhoto] ? <FavoriteIcon color="secondary" sx={{size:"20px"}}/> : <FavoriteBorderIcon />}
              </LikeButton>
              <LikeCount>{likes[selectedPhoto]}</LikeCount>
            </EnlargedImageWrapper>
          </EnlargedImageContainer>
        )}
      </RootContainer>
  </Box>
  );
};

export default PhotoGallery;
