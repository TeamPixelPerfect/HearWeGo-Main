"use client";
import React, { useEffect } from "react";
import { AppItem } from "../constants/models";
import { useAppDispatch } from "@/lib/hooks";
import { setApp } from "@/lib/features/app.slice";

interface Props {
  app: AppItem;
  children: React.ReactNode;
}

const Wrapper = ({ app, children }: Props) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    console.log(app)
    dispatch(setApp(app));
  }, []);

  return <>{children}</>;
};

export default Wrapper;
