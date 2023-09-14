"use client";

import { Rocket, RocketContext } from "@/context/rocket";
import { fetchRockets } from "@/lib/data";
import React, { useContext, useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import SectionHead from "./SectionHead";
import { Capsule, CapsuleContext } from "@/context/capsules";
import StatusFilters from "./StatusFilter";

type CapsuleProps = {
  capsules: Capsule[];
};

export default function Capsules({ capsules }: CapsuleProps) {
  //   const [searchQuery, setSearchQuery] = useState("");
  //   const [filteredList, setFilteredList] = useState(capsules);

  //   console.log(capsules);

  //   useEffect(() => {
  //     setFilteredList(capsules);
  //   }, [capsules]);

  //   const handleRocketSearch = (event: ChangeEventHandler<HTMLInputElement>) => {
  //     const query = event.target.value;
  //     setSearchQuery(query);

  //     const searchList = capsules.filter((item) => {
  //       return item.type.toLowerCase().indexOf(query.toLowerCase()) !== -1;
  //     });

  //     setFilteredList(searchList);
  //   };

  return (
    <section id="capsule_grid" className="w-full my-8 m-auto flex flex-col items-center max-w-screen-xl justify-center p-3">
      <SectionHead title="All Capsules" />
      <StatusFilters />
      {/* <input
        value={searchQuery}
        type="text"
        placeholder="Search Rockets."
        className="border max-w-sm p-4 mb-4"
        onChange={handleRocketSearch}
      /> */}

      <div className="grid sm:grid-cols-2  md:grid-cols-3 justify-center w-full gap-4">
        {capsules.length !== 0
          ? capsules.map((capsule: Capsule) => (
              <Card
                key={capsule.id}
                className="max-w-md flex flex-col justify-between"
              >
                <CardHeader>
                  <CardTitle>{capsule.capsule_serial}</CardTitle>
                  <CardDescription className="">
                    {capsule.details}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <span className="flex justify-between items-center mb-10">
                    <p>Launch Date: {capsule.original_launch}</p>
                    <p>Landings: {capsule.landings}</p>
                  </span>
                  <span className="flex justify-between items-center">
                    <p>Serial: {capsule.capsule_serial}</p>
                    <p>Status: {capsule.status}</p>
                  </span>
                </CardContent>
                <CardFooter>
                  <p>Type: {capsule.type}</p>
                </CardFooter>
              </Card>
            ))
          : "No Rocket Found"}
      </div>
    </section>
  );
}
