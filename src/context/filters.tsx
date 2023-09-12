"use client";
import { fetchCapsules } from "@/lib/rockets";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useEffect,
  useState,
} from "react";

export type Status = {
  status: string;
};
export type CapsuleType = {
  type: string;
};

type FiltersProviderProps = {
  children: ReactNode;
};

export interface FiltersContenxtInterface {
 statusList: Status[]
 setStatusList:Dispatch<SetStateAction<Status[]>>
 selectedStatus: string
 setSelectedStatus:Dispatch<SetStateAction<string>>
}

const defaultValue: FiltersContenxtInterface = {
  statusList: [], // Changed this to an empty array
  setStatusList: () => {}, // Provided an empty function
  selectedStatus: '',
  setSelectedStatus:()=>{}
};

import { Capsule } from "./capsules";

export const FiltersContext = createContext(defaultValue);

export function FiltersProvider({ children }: FiltersProviderProps) {
    const [selectedStatus, setSelectedStatus] = useState<string>("all");
    const [statusList, setStatusList] = useState<Status[]>([]);
  

  useEffect(() => {
    const fetchFilters = async () => {
      const res = await fetchCapsules();
      const uniqueStatuses = [...new Set(res.map((item: Capsule) => item.status))] as Status[];

      setStatusList(uniqueStatuses);
    //   setCapsuleTypeList(res.map((item: Capsule) => item.type));
    };

    fetchFilters();
  }, []);

  return (
    <FiltersContext.Provider
      value={{
        selectedStatus, setSelectedStatus,statusList, setStatusList
      }}
    >
      {children}
    </FiltersContext.Provider>
  );
}
