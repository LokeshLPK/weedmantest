import { useEffect, useState } from "react";
import { useClient } from "sanity";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";

declare type FranchiseSelectorProps = {
  value: FranchiseReference[];
  onSave: (selectedFranchises: FranchiseReference[]) => Promise<void>;
};

export default function FranchiseSelector(props: FranchiseSelectorProps) {
  const { value = [], onSave } = props;
  const [franchiseList, setFranchiseList] = useState([]);
  const [showLoader, setShowLoader] = useState(false);

  const [selectedFranchises, setSelectedFranchises] = useState<string[]>([]);

  const client = useClient();
  // Fetch franchise data
  useEffect(() => {
    const fetchFranchises = async () => {
      const franchises = await client.fetch(`
          *[_type == "weedManFranchiseType"]{
            ...,
            _id,
            "_key": _id,
            franchise_name
          }
        `);

      setFranchiseList(franchises);
    };
    fetchFranchises();
    if (value.length)
      setSelectedFranchises(
        value?.map((i: FranchiseReference) => i._ref) || []
      );
    return () => {
      setSelectedFranchises([]);
    };
  }, [value.length, client]);

  const toggleSelection = (franchiseId: string) => {
    setSelectedFranchises((prev: string[]) =>
      prev.includes(franchiseId)
        ? prev.filter((id: string) => id !== franchiseId)
        : [...prev, franchiseId]
    );
  };

  const handleSelectAll = () => {
    setSelectedFranchises(
      franchiseList.map((i: WeedManFranchiseType) => i._id)
    );
  };

  const handleSave = async () => {
    setShowLoader(true);
    const selectedFranchiseObjects = selectedFranchises.map((i: string) => ({
      _ref: i,
      _type: "reference",
      _key: i,
    }));
    await onSave(selectedFranchiseObjects);
    setShowLoader(false);
  };
  return (
    <>
      <ScrollArea className="h-[300px]">
        {franchiseList.map((franchise: WeedManFranchiseType) => (
          <div
            key={franchise._id}
            className="flex items-center justify-between py-2"
          >
            <span>{franchise.franchise_name}</span>
            <Checkbox
              checked={
                Array.isArray(selectedFranchises) && selectedFranchises
                  ? selectedFranchises.includes(franchise._id)
                  : false
              }
              onCheckedChange={() => toggleSelection(franchise._id)}
            />
          </div>
        ))}
      </ScrollArea>
      <div className="flex flex-row-reverse">
        <Button disabled={showLoader} onClick={handleSave}>
          {showLoader && <Loader2 className="animate-spin" />}
          Save
        </Button>
        <Button variant="outline" className="mr-2" onClick={handleSelectAll}>
          Select All
        </Button>
      </div>
    </>
  );
}
