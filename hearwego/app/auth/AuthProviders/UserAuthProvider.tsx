"use client";
import { logInUser } from "@/lib/features/user.slice";
import { useAppSelector } from "@/lib/hooks";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

const UserAuthProvider = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  const dispatch = useDispatch();
  const user = useAppSelector((state) => state.user.user);

  const checkUser = () => {
    if (!user) {
      const u = localStorage.getItem("hwg-user");
      if (u) {
        dispatch(logInUser(JSON.parse(u)));
      }
    }
  };

  useEffect(() => {
    checkUser();
  }, [user]);

  return <>{children}</>;
};

export default UserAuthProvider;
