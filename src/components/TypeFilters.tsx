import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Check, PlusCircleIcon, X } from "lucide-react";
import { useContext, useState } from "react";
import { cn } from "@/lib/utils";
import { CapsuleType, FiltersContext, Status } from "@/context/filters";

export default function TypeFilters() {
  const { setSelectedType, typeList } = useContext(FiltersContext);
  console.log(typeList);
  const [filtered, setFiltered] = useState<CapsuleType[]>([]);

  const handleStatus = (selectedType: CapsuleType) => {
    if (filtered.includes(selectedType)) {
      setFiltered((prevFiltered) =>
        prevFiltered.filter((status) => status !== selectedType)
      );
    } else {
      setFiltered((prevFiltered) => [...prevFiltered, selectedType]);
    }
    const updatedFiltered = [...filtered];
    if (updatedFiltered.includes(selectedType)) {
      updatedFiltered.splice(updatedFiltered.indexOf(selectedType), 1);
    } else {
      updatedFiltered.push(selectedType);
    }

    setSelectedType(
      updatedFiltered.length === 0 ? "all" : String(updatedFiltered)
    );
  };

  const handleClear = () => {
    setSelectedType("all");
    setFiltered([]);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="h-9 border-dashed shadow-sm">
          <PlusCircleIcon className="mr-2 h-4 w-4" />
          Type
        </Button>
      </PopoverTrigger>
      {filtered.length > 0 && (
        <>
          <Separator orientation="vertical" className="mx-2 h-4" />
          <div className="hidden space-x-1 lg:flex">
            {filtered.length > 2 ? (
              <Badge
                variant="secondary"
                className="rounded-sm px-1 font-normal"
              >
                {filtered.length} selected
              </Badge>
            ) : (
              filtered.map((type, i) => (
                <Badge
                  variant="secondary"
                  key={i}
                  className="rounded-sm px-1 font-normal"
                >
                  {type.toString()}
                </Badge>
              ))
            )}
          </div>
        </>
      )}
      {filtered.length > 0 && (
        <Button
          variant="ghost"
          onClick={() => handleClear()}
          className="h-8 px-2 lg:px-3"
        >
          Reset
          <X className="ml-2 h-4 w-4" />
        </Button>
      )}
      <PopoverContent className="w-[200px] p-0" align="start">
        <Command>
          <CommandInput placeholder="Type a command or search..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Suggestions">
              {typeList?.map((type, i) => {
                const isSelected = filtered.includes(type);
                return (
                  <CommandItem onSelect={() => handleStatus(type)} key={i}>
                    {" "}
                    <div
                      className={cn(
                        "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                        isSelected
                          ? "bg-primary text-primary-foreground"
                          : "opacity-50 [&_svg]:invisible"
                      )}
                    >
                      <Check className={cn("h-4 w-4")} />
                    </div>{" "}
                    {String(type)}
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </CommandList>
          <CommandSeparator />
          <CommandGroup>
            <CommandItem
              onSelect={() => handleClear()}
              className="justify-center text-center"
            >
              Clear filters
            </CommandItem>
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
