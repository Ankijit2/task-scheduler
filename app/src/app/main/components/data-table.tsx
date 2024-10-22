'use client';
import { DataTable } from "@/components/tantstack-table";
import { useReactTable,getCoreRowModel } from "@tanstack/react-table";
import { UserData } from "@prisma/client";
import { Usercolumns } from "./data-column";
import { io } from "socket.io-client";
import { useEffect, useState,useMemo } from "react";
import { Card } from "@/components/ui/card";
import { CreateData } from "./create-data";
import { useGetData } from "../hooks/hook";
import { getDataById } from "../hooks/hook";
import { useDispatch, useSelector } from 'react-redux';
import { setUserData } from "@/app/store/slices/user-slice";
import { RootState } from "@/app/store/store";
function Table() {

    const dispatch = useDispatch();

    const { data,isLoading } = useGetData();
    const userData = useSelector((state: RootState) => state.userData.userData);
    console.log(userData);
    const socket = useMemo(
      () =>
        io("http://localhost:4000", {
          withCredentials: true,
        }),
      []
    );

    const getDatabyId = async (id: string)=> {
      const response =await getDataById(id)
      console.log(response);
    }

    useEffect(() => {
      socket.on('userUpdated', (updatedUser) => {
      
        console.log(updatedUser);
      });
      
      // Clean up the socket connection on unmount
      return () => {
          socket.off('userUpdated');
          socket.disconnect();
      };
  }, [socket]);
  
    useEffect(() => {
        if (data) {
            dispatch(setUserData(data));
        }
    })


    const userDataTable = useReactTable<UserData>({
        data: userData|| [], // Use the userData prop for the data
        getCoreRowModel: getCoreRowModel(),
        columns: Usercolumns
    });
 
  return (
    <Card className=" flex h-[100vh] flex-col gap-3 p-3">
       <div className='ml-auto'>
        <CreateData/>
      </div>
    <DataTable table={userDataTable} loading={isLoading} />
    </Card>
  )
}

export default Table
