"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { UserButton, useUser } from "@clerk/nextjs";
import axios from "axios";
import { useEffect, useState } from "react";
import Elevate from "@/components/ui/elevate";

export default function Home() {
  const router = useRouter();
  const { user } = useUser();

  if (user?.id) {
    const params = new URLSearchParams();
    params.set("height", "400");
    params.set("width", "400");
    params.set("quality", "100");
    params.set("fit", "crop");
    const { imageUrl } = user;
    const imageSrc = `${imageUrl}?${params.toString()}`;

    const getTotalPoints = () => {
      if (!dataList || dataList.length === 0) {
        return 0;
      }
      return dataList.reduce((total, item) => total + parseInt(item.point), 0);
    };

    const [searchTerm, setSearchTerm] = useState("");
    const [dataList, setDataList] = useState<any[]>([]);
    const filteredDataList =
      dataList !== null && dataList.length > 0
        ? dataList.filter(
            (item) =>
              item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
              item.description.toLowerCase().includes(searchTerm.toLowerCase())
          )
        : [];

    const url = "http://localhost:8080/api/lessons/" + user?.id;

    useEffect(() => {
      const fetchData = async () => {
        try {
          const res = await axios.get(url);
          setDataList(res.data);
        } catch (err) {
          console.error("Error fetching data:", err);
        }
      };

      fetchData();
    }, []);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedItemId, setSelectedItemId] = useState<string | null>(null);

    const handleDelete = async (id: any) => {
      const url = `http://localhost:8080/api/lessons/${id}`;
      try {
        await axios.delete(url);
        setDataList((prevDataList) =>
          prevDataList.filter((item) => item.id !== id)
        );
      } catch (error) {
        console.error("Failed to delete item:", error);
      }
    };

    return (
      <div className="flex items-center justify-center bg-black">
        <div className="w-screen max-w-2xl min-h-screen max-h-max px-10 py-7 bg-black text-neutral-200">
          <div className="w-full h-max flex justify-between items-center">
            <Link href="/" className="font-semibold font-italic">
              BeElevate
            </Link>
            <UserButton />
          </div>

          <div className="w-full h-max rounded-2xl overflow-hidden pt-6 bg-neutral-900 mt-10">
            <div className="px-5 flex space-x-3">
              <img
                src={imageSrc}
                className="w-16 h-16 aspect-square rounded-2xl"
                alt=""
              />
              <div className="flex flex-col items-start justify-center h-full">
                <h1 className="text-xl font-semibold tracking-wide mt-3">
                  {user?.fullName}
                </h1>
                <h1 className="text-[12px] font-mono font-semibold text-main tracking-wide">
                  {getTotalPoints()} Exp Earned
                </h1>
              </div>
            </div>

            <div className="w-full h-2 flex items-center justify-center bg-main mt-6"></div>
          </div>

          <div className="w-full mt-10 pb-16">
            <h1 className="text-xl mb-5 font-semibold tracking-wide">
              You've been <span className="text-main">Elevated</span>{" "}
              {dataList !== null && dataList.length > 0 ? dataList.length : "0"}{" "}
              times
            </h1>
          
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full p-4 ps-10 text-sm border rounded-xl bg-neutral-900 border-neutral-800 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                placeholder="Search Lessons..."
                required
              />
            </div>

            {filteredDataList.map((item, index) => (
              <div className="w-full hover:scale-105 hover:border hover:border-main transition-all duration-500 h-max bg-neutral-900 rounded-xl mt-4 px-5 py-3 flex items-center justify-between">
                <Link
                  href={`/lesson/${item.id}`}
                  className="flex w-full items-center justify-start"
                >
                  <h5 className="font-semibold">{item.name}</h5>
                  <p className="text-main text-[12px] font-semibold ml-3">
                    +{item.point} exp
                  </p>
                </Link>
                <button
                  className="text-white bg-red-800 hover:bg-white hover:text-red-800 transition-all duration-500 w-8 h-8 flex items-center justify-center rounded-xl"
                  onClick={() => {
                    setIsModalOpen(true);
                    setSelectedItemId(item.id);
                  }}
                >
                  <p className="font-semibold mb-[4px]">x</p>
                </button>
              </div>
            ))}
          </div>

          {isModalOpen && (
            <div className="fixed top-0 left-0 right-0 bottom-0 bg-black backdrop-blur-md px-5 bg-opacity-50 flex items-center justify-center">
              <div className="bg-slate-900 p-8 rounded-xl">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-xl text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
                >
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
                <div className="p-4 md:p-5 text-center">
                  <svg
                    className="mx-auto mb-4 text-gray-400 w-12 h-12"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                  </svg>
                  <h3 className="mb-5 text-lg font-normal text-white">
                    Are you sure you want to unElevate?
                  </h3>
                  <button
                    onClick={() => {
                      handleDelete(selectedItemId!);
                      setIsModalOpen(false);
                    }}
                    className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-xl text-sm inline-flex items-center px-5 py-2.5 text-center"
                  >
                    Yes, I'm sure
                  </button>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="py-2.5 px-5 ms-3 text-sm font-medium text-white focus:outline-none bg-slate-900 rounded-xl border border-gray-200 hover:bg-gray-100 hover:text-blue-700"
                  >
                    No, cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          <Elevate href="/elevate" value="Elevate!"/>
        </div>
      </div>
    );
  } else {
    return (
      <div className="bg-[#030F0F] h-screen">
        <div className="absolute bottom-16 w-screen right-0 left-0 m-auto flex px-8 items-end justify-between z-50">
          <div>
            <h1 className="font-semibold text-5xl text-white mb-3 ml-1 tracking-wide">
              Hi!
            </h1>
            <h3 className="text-white text-[28px] w-[235px] mb-5 ml-1">
              Are you ready to{" "}
              <span className="text-main font-semibold">Elevate!</span> yourself
              today?
            </h3>
            <Link href="/login">
              <Button>Elevate!</Button>
            </Link>
          </div>

          <svg
            width="26"
            className="mb-3"
            height="16"
            viewBox="0 0 26 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M25.7071 8.70711C26.0976 8.31658 26.0976 7.68342 25.7071 7.29289L19.3431 0.928932C18.9526 0.538408 18.3195 0.538408 17.9289 0.928932C17.5384 1.31946 17.5384 1.95262 17.9289 2.34315L23.5858 8L17.9289 13.6569C17.5384 14.0474 17.5384 14.6805 17.9289 15.0711C18.3195 15.4616 18.9526 15.4616 19.3431 15.0711L25.7071 8.70711ZM0 9H25V7H0V9Z"
              fill="white"
            />
          </svg>
        </div>
        <Image
          src="/images/bg-welcome.png"
          width={0}
          height={0}
          sizes="100vw"
          alt="welcome image"
          className="absolute left-0 h-auto w-screen top-[-5rem]"
        />
      </div>
    );
  }
}
