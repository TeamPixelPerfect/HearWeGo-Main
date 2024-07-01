"use client";
import React, { useEffect } from "react";
import { AppItem } from "../constants/models";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { setApp } from "@/lib/features/app.slice";
import { getUser } from "../services/UserServices";
import { logInUser } from "@/lib/features/user.slice";

interface Props {
  app: AppItem;
  children: React.ReactNode;
}

const Wrapper = ({ app, children }: Props) => {
  const dispatch = useAppDispatch();

  const user = useAppSelector((state) => state.user?.user);

  console.log(user);

  useEffect(() => {
    console.log(app);
    dispatch(setApp(app));
  }, []);

  useEffect(() => {
    if (!user) {
      const _user = sessionStorage.getItem("hwg-user");
      if (_user) {
        const currentUser = JSON.parse(_user);
        getUser(currentUser.user._id).then((res) => {
          if (res) {
            const newData = { ...currentUser, ...res.user };
            dispatch(logInUser(newData));
            sessionStorage.setItem("hwg-user", JSON.stringify(newData));
          }
        });
      }
    }
  }, [user]);

  return <>{children}</>;
};

export default Wrapper;
