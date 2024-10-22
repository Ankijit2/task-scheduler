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

function Table() {
    const [UserData, setUserData] = useState<UserData[]>([]);
    const [ks, setKs] = useState('');
    const { data,isLoading } = useGetData();
    const socket = useMemo(
      () =>
        io("http://localhost:4000", {
          withCredentials: true,
        }),
      []
    );

    useEffect(() => {
      socket.on('userUpdated', (updatedUser) => {
        setKs(updatedUser);
          setUserData((prevData) => 
              prevData.map(user => 
                  user.id === updatedUser.id ? updatedUser : user // Update the user data if it exists
              )
          );
      });

      // Clean up the socket connection on unmount
      return () => {
          socket.off('userUpdated');
          socket.disconnect();
      };
  }, [socket]);
  
    useEffect(() => {
        if (data) {
          setUserData(data);
        }
    })

    useEffect(() => {
        if (ks) {
         console.log(ks);
        }
    }, [ks])
    const userDataTable = useReactTable<UserData>({
        data: UserData || [], // Use the userData prop for the data
        getCoreRowModel: getCoreRowModel(),
        columns: Usercolumns
    });
 
  return (
    <Card className=" flex h-[100vh] flex-col gap-3 p-3">
       <div className='ml-auto'>
        <CreateData/>
      </div>
    <DataTable table={userDataTable} loading={isLoading}/>
    </Card>
  )
}

export default Table
