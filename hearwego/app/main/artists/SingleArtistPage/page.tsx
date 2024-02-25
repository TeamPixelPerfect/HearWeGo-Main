"use client";
import * as React from "react";
import { Stack } from "@mui/material";

import { 
Maindiv,
CoverCardMedia ,
ProfilePicAvatar,


} from "../../../styles/SingleArtistPage.styles" ;



export default function SingleArtistPage() {
    return (
    <Maindiv>
     
    <CoverCardMedia
          image="https://www.cincinnati.com/gcdn/authoring/authoring-images/2023/09/07/PCIN/70789109007-mj-1.jpg?width=660&height=441&fit=crop&format=pjpg&auto=webp">
           <div style={{background:'black',height:'100%',position:'relative',opacity:'0.5'}}></div>

           <div>
           
        
          <ProfilePicAvatar
            src={
              "https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/Michael_Jackson_Dangerous_World_Tour_1993.jpg/170px-Michael_Jackson_Dangerous_World_Tour_1993.jpg"
            }
          ></ProfilePicAvatar>
          </div>
   
    
          </CoverCardMedia>



  
    </Maindiv>
  )
}

