"use client";
import { fetchCapsules } from "@/lib/data";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useEffect,
  useState,
} from "react";
import { Capsule } from "./capsules";

export type Status = {
  status: string;
};

export type CapsuleType = {
  type: string;
};

export type OriginalDate = {
  original_launch: string;
};

type FiltersProviderProps = {
  children: ReactNode;
};

export interface FiltersContenxtInterface {
  statusList: Status[];
  setStatusList: Dispatch<SetStateAction<Status[]>>;
  selectedStatus: string;
  setSelectedStatus: Dispatch<SetStateAction<string>>;
  typeList: CapsuleType[];
  setTypeList: Dispatch<SetStateAction<CapsuleType[]>>;
  selectedType: string;
  setSelectedType: Dispatch<SetStateAction<string>>;
  dateList: OriginalDate[];
  setDateList: Dispatch<SetStateAction<OriginalDate[]>>;
  selectedDate: string;
  setSelectedDate: Dispatch<SetStateAction<string>>;
}

const defaultValue: FiltersContenxtInterface = {
  statusList: [], // Changed this to an empty array
  setStatusList: () => {}, // Provided an empty function
  selectedStatus: "",
  setSelectedStatus: () => {},
  typeList: [],
  setTypeList: () => {},
  selectedType: "",
  setSelectedType: () => {},
  dateList: [],
  setDateList: () => {},
  selectedDate: "",
  setSelectedDate: () => {},
};

export const FiltersContext = createContext(defaultValue);

export function FiltersProvider({ children }: FiltersProviderProps) {
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [statusList, setStatusList] = useState<Status[]>([]);
  const [selectedType, setSelectedType] = useState<string>("all");
  const [typeList, setTypeList] = useState<CapsuleType[]>([]);

  const [selectedDate, setSelectedDate] = useState<string>("all");
  const [dateList, setDateList] = useState<OriginalDate[]>([]);

  useEffect(() => {
    const fetchFilters = async () => {
      const res = await fetchCapsules();
      const uniqueStatuses = [
        ...new Set(res.map((item: Capsule) => item.status)),
      ] as Status[];

      setStatusList(uniqueStatuses);

      const uniqueTypes = [
        ...new Set(res.map((item: Capsule) => item.type)),
      ] as CapsuleType[];
      setTypeList(uniqueTypes);

      const uniqueDates = [
        ...new Set(res.map((item: Capsule) => item.original_launch)),
      ] as OriginalDate[];
      setDateList(uniqueDates);
    };

    fetchFilters();
  }, []);

  return (
    <FiltersContext.Provider
      value={{
        selectedStatus,
        setSelectedStatus,
        statusList,
        setStatusList,
        selectedType,
        setSelectedType,
        typeList,
        setTypeList,

        setSelectedDate,
        setDateList,
        selectedDate,
        dateList,
      }}
    >
      {children}
    </FiltersContext.Provider>
  );
}
