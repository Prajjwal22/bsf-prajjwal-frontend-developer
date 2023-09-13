"use client";

import { fetchRockets } from "@/lib/data";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useEffect,
  useState,
} from "react";

type RocketProviderProps = {
  children: ReactNode;
};

export type Rocket = {
  rocket_name: string;
  rocket_type: string;
  rocket_id: string;
  description: string;
  id: number;
  active: boolean;
  country: string;
  company: string;
  height: {
    feet: number;
    meters: number;
  };
  diameter: {
    feet: number;
    meters: number;
  };
};

interface RocketContextInterface {
  rockets: Rocket[];
  setRockets: Dispatch<SetStateAction<Rocket[]>>;
}

const defaultValue: RocketContextInterface = {
  rockets: [], // Changed this to an empty array
  setRockets: () => {}, // Provided an empty function
};

export const RocketContext = createContext(defaultValue);

export function RocketProvider({ children }: RocketProviderProps) {
  const [rockets, setRockets] = useState<Rocket[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchMyOffers = async () => {
    setLoading(true);
    const allRockets = await fetchRockets();
    setRockets(allRockets);
    setLoading(false);
  };

  useEffect(() => {
    fetchMyOffers();
  }, []);

  return (
    <RocketContext.Provider value={{ rockets, setRockets }}>
      {children}
    </RocketContext.Provider>
  );
}
