import { CircleX, Cloud, CloudRain, Search } from 'lucide-react';
import React from 'react'
import '../App.css'

function Left() {
  return (
    <>
      <div className="left-content rounded-t-4xl md:rounded-none bg-gray-200 h-[40%] w-full  md:h-full md:w-[35%] md:rounded-bl-4xl md:rounded-tl-4xl">
        <div className="first lg:px-5 py-2 border-b-2">
          <div className="search flex justify-between p-3 items-center">
            <Search />
            <input
              className="w-[80%] outline-none lg:text-xl"
              placeholder="Search for place..."
              type="text"
            />
            <CircleX />
          </div>
        </div>

        <div className="flex-turns w-full h-[88%]">
          <div className="topp md:w-full md:h-[65%]  lg:px-5">
            <div className="sec flex justify-center mt-1">
              <img
                className="w-[40%]"
                src="https://cdn-icons-png.flaticon.com/512/1888/1888282.png"
                alt=""
              />
            </div>
            <div className="third">
              <div className="deg flex justify-center m-5">
                <h2 className="font-semibold md:text-8xl text-2xl">12°C</h2>
              </div>
              <div className="time flex gap-1 justify-center">
                <h2 className="text-gray-600 font-bold">Monday,</h2>
                <span className="text-gray-400">16:00</span>
              </div>
            </div>
          </div>
          <div className="line w-full px-16">
            <div className="border-2 rounded-4xl"></div>
          </div>

          <div className="bottoms md:w-full md:h-[35%]  p-5 flex flex-col gap-5">
            <div className="one flex flex-col gap-4">
              <div className="details flex gap-1 items-center">
                <Cloud />
                <h2 className="md:text-xl">Mostly Cloudy</h2>
              </div>
              <div className="rain flex gap-1 items-center">
                <CloudRain />
                <h2 className="md:text-xl">Rain - 30%</h2>
              </div>
            </div>
            <div className="two h-full">
              <h1 className="location">London</h1>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Left