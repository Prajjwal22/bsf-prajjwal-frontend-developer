"use client";
import Capsules from "@/components/Capsules";
import { CapsuleDataTable } from "@/components/CapsulesTable";
import { columns } from "@/components/Columns";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import { CapsuleContext, CapsuleProvider } from "@/context/capsules";
import { FiltersContext, FiltersProvider } from "@/context/filters";
import { useContext,useEffect, useState } from "react";

export default function Home() {

//   const [data, setData] = useState();

//   useEffect(() => {
//     const fetchSpaceXData = async () => {
//       try {
//         const response = await fetch('http://localhost:3000/api.php', {
//           headers: {
//             'API_KEY': 'QWERTY',
//           },
          
//         });
//         console.log("fsdsfsa")
//         const fetchedData = await response.json();
//         console.log(response)
//         setData(fetchedData); // Corrected this line
//       } catch (err) {
//         console.error("Error fetching SpaceX data:", err);
//       }
//     };

//     fetchSpaceXData();
//   }, []);

// console.log("prajjwal",data)
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
