"use client";
import * as React from "react";
import { styled } from "@mui/material/styles";


import {
  Maindiv,
  CoverCardMedia,
 
} from "../../../styles/eventsMW.styles";



export default function SingleEvent() {
  return (
    <Maindiv>
      <CoverCardMedia image="https://hwgbucket.s3.ap-south-1.amazonaws.com/images/Pink+And+Blue+Club+DJ+Party+Night+Flyer.png ">
        <div
          style={{
            background: "black",
            height: "500px",
            width: "100%",
            opacity: "0.7",
          }}
        ></div>
        </CoverCardMedia>
        </Maindiv>
  );
        }