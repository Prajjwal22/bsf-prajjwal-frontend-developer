"use client";

import { Rocket, RocketContext } from "@/context/rocket";
import { fetchRockets } from "@/lib/rockets";
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

export default function Rockets() {
  const { rockets } = useContext(RocketContext);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredList, setFilteredList] = useState(rockets);

  useEffect(() => {
    setFilteredList(rockets);
  }, [rockets]);

  const handleRocketSearch = (event: ChangeEventHandler<HTMLInputElement>) => {
    const query = event.target.value;
    setSearchQuery(query);

    const searchList = rockets.filter((item) => {
      return item.rocket_name.toLowerCase().indexOf(query.toLowerCase()) !== -1;
    });

    setFilteredList(searchList);
  };

  return (
    <section className="w-full my-8 m-auto flex flex-col items-center max-w-screen-xl justify-center">
      <SectionHead title="All Rockets" />

      <input
        value={searchQuery}
        type="text"
        placeholder="Search Rockets."
        className="border max-w-sm p-4 mb-4"
        onChange={handleRocketSearch}
      />

      <div className="flex flex-wrap justify-center w-full gap-4">
        {filteredList.length !== 0
          ? filteredList.map((rocket: Rocket) => (
              <Card
                key={rocket.id}
                className="max-w-md flex flex-col justify-between"
              >
                <CardHeader>
                  <CardTitle>{rocket.rocket_name}</CardTitle>
                  <CardDescription className="">
                    {rocket.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <span className="flex justify-between items-center">
                    <p>
                      Height: {rocket.height.meters} x {rocket.height.feet}
                    </p>
                    <p>
                      Diameter: {rocket.diameter.meters} x{" "}
                      {rocket.diameter.feet}
                    </p>
                  </span>
                </CardContent>
                <CardFooter>
                  <p>Country: {rocket.country}</p>
                </CardFooter>
              </Card>
            ))
          : "No Rocket Found"}
      </div>
    </section>
  );
}
