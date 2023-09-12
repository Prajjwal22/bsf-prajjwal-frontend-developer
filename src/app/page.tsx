"use client";
import Capsules from "@/components/Capsules";
import { CapsuleDataTable } from "@/components/CapsulesTable";
import { columns } from "@/components/Columns";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import { CapsuleContext, CapsuleProvider } from "@/context/capsules";
import { FiltersContext, FiltersProvider } from "@/context/filters";
import { useContext } from "react";

export default function Home() {
  const { capsules } = useContext(CapsuleContext);

  const { selectedStatus, selectedType } = useContext(FiltersContext);

  return (
    <>
      <Header />
      <Hero />
      <Capsules
        capsules={
          selectedStatus === "all"
            ? capsules
            : capsules.filter((item) => {
                return (
                  selectedStatus.includes(item.status) ||
                  selectedStatus === "all"
                );
              })
        }
      />
      <CapsuleDataTable
        columns={columns}
        data={
          selectedStatus === "all" && selectedType === "all"
            ? capsules
            : capsules.filter((item) => {
                return (
                  (selectedStatus.includes(item.status) ||
                    selectedStatus === "all") &&
                  (selectedType.includes(item.type) || selectedType === "all")
                );
              })
        }
      />
    </>
  );
}
