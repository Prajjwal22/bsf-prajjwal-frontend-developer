"use client";

import { fetchCapsules, fetchRockets } from "@/lib/rockets";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useEffect,
  useState,
} from "react";

type CapsuleProviderProps = {
  children: ReactNode;
};

export type Capsule = {
  capsule_serial: string;
  type: string;
  capsule_id: string;
  details: string;
  landings: number;
  id: number;
  original_launch: string;
  status: string;
};

interface CapsuleContextInterface {
  capsules: Capsule[];
  setCapsules: Dispatch<SetStateAction<Capsule[]>>;
}

const defaultValue: CapsuleContextInterface = {
  capsules: [], // Changed this to an empty array
  setCapsules: () => {}, // Provided an empty function
};

export const CapsuleContext = createContext(defaultValue);

export function CapsuleProvider({ children }: CapsuleProviderProps) {
  const [capsules, setCapsules] = useState<Capsule[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchMyOffers = async () => {
    setLoading(true);
    const allCapsules = await fetchCapsules();
    console.log(allCapsules)
    setCapsules(allCapsules);
    setLoading(false);
  };

  useEffect(() => {
    fetchMyOffers();
  }, []);

  return (
    <CapsuleContext.Provider value={{ capsules, setCapsules }}>
      {children}
    </CapsuleContext.Provider>
  );
}
