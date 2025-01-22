/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { SanityClient } from "@sanity/client";
import { useToast } from "@sanity/ui";
import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useClient } from "sanity";

type DraftDocument = {
  _id: string;
  title?: string; // Adjust according to your schema
  _type: string;
  franchise?: string;
  [key: string]: unknown; // For additional fields in the document
};

// const runCypress = () => {
//   return new Promise((res, rej) => {
//     fetch("http://localhost:4000/api/run-cypress")
//       .then((response) => {
//         if (response.status === 200) {
//           res({});
//         } else {
//           rej({ error: response.statusText });
//         }
//       })
//       .catch(() => rej({ error: true }));
//   });
// };

const PublishAllButton: React.FC = () => {
  const client = useClient() as SanityClient;
  const [drafts, setDrafts] = useState<DraftDocument[]>([]);
  const [selectedDrafts, setSelectedDrafts] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [fetched, setFetched] = useState(false);

  const toast = useToast();
  const getAllUsers = async () => {
    try {
      if (fetched) return;
      setFetched(true); // Ensure it runs only once
    
      // // Fetch ACL data to get user IDs
      // const response = await client.request({
      //   uri: `/projects/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}/acl`,
      //   withCredentials: true,
      // });

      // // Extract user IDs from the response
      // const franchiseOwnerIds = response.reduce((ids: string[], entry: any) => {
      //   if (entry.roles.some((role: any) => role.name === "franchise-owner")) {
      //     ids.push(entry.projectUserId);
      //   }
      //   return ids;
      // }, []);
      
      // // Fetch user details for all IDs concurrently
      // const userRequests = franchiseOwnerIds.map((id: string) =>
      //   client.request({
      //     uri: `/projects/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}/users/${id}`,
      //     withCredentials: true,
      //   })
      // );

      // const users = await Promise.all(userRequests);

      // // Log the fetched users
      // console.log({ users });
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  // Fetch drafts on mount
  useEffect(() => {
    fetchDrafts();
    getAllUsers();
    return (()=>{
      console.log('unmounted')
    })
  }, []);

  const fetchDrafts = async (): Promise<void> => {
    try {
      setLoading(true);
      const fetchedDrafts: DraftDocument[] = await client.fetch(
        `*[_id in path("drafts.**") && _type != "sanity.previewUrlSecret" ]{
        ...,
        "franchise": franchise_type->franchise_name

        }`
      );
      setDrafts(fetchedDrafts);
    } catch (error) {
      console.error("Error fetching drafts:", error);
      alert("An error occurred while fetching drafts.");
    } finally {
      setLoading(false);
    }
  };

  const toggleDraftSelection = (id: string): void => {
    setSelectedDrafts((prev) => {
      const updated = new Set(prev);
      if (updated.has(id)) {
        updated.delete(id);
      } else {
        updated.add(id);
      }
      return updated;
    });
  };

  const publishSelectedDrafts = async (): Promise<void> => {
    try {
      setIsCreating(true);
      // await runCypress();
      if (selectedDrafts.size === 0) {
        alert("No drafts selected to publish!");
        return;
      }

      const transaction = client.transaction();

      drafts.forEach((draft) => {
        if (selectedDrafts.has(draft._id)) {
          const nonDraftDocument = {
            ...draft,
            _type: draft._type,
            _id: draft._id.replace("drafts.", ""), // Remove "drafts." prefix
          };
          delete nonDraftDocument.franchise;
          transaction.createOrReplace(nonDraftDocument);
        }
      });

      await transaction.commit();
      await Promise.all(
        Array.from(selectedDrafts).map((id) => client.delete(id))
      );
      toast.push({
        title: "Selected Documents Published",
        status: "success",
      });

      setDrafts((prev) =>
        prev.filter((draft) => !selectedDrafts.has(draft._id))
      );
      setSelectedDrafts(new Set()); // Clear selected drafts
    } catch (error: any) {
      console.error("Error publishing drafts:", error);
      toast.push({
        title: "Error Publishing Documents",
        description: error.message,
        status: "error",
      });
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <Card className="p-4 space-y-4">
      <h2 className="text-lg font-bold">Drafts</h2>
      {loading ? (
        <p>Loading drafts...</p>
      ) : drafts.length === 0 ? (
        <p>No drafts available.</p>
      ) : (
        <div className="space-y-2">
          {drafts.map((draft) => (
            <div
              key={draft._id}
              className="flex items-center justify-between p-2 border rounded-md"
            >
              <div className="flex items-center space-x-3">
                <Checkbox
                  checked={selectedDrafts.has(draft._id)}
                  onCheckedChange={() => toggleDraftSelection(draft._id)}
                />
                <span className="text-sm font-medium">
                  {draft.title || "Untitled Document"}
                </span>
              </div>
              <span className="text-xs">{draft.franchise || "-"}</span>

              <span className="text-xs text-gray-500">{draft._id}</span>
            </div>
          ))}
        </div>
      )}
      <Button
        variant="default"
        disabled={selectedDrafts.size === 0 || isCreating}
        onClick={publishSelectedDrafts}
      >
        {isCreating && <Loader2 className="animate-spin" />}
        Publish Selected
      </Button>
    </Card>
  );
};

const MemorizedPublishAllButton= React.memo(()=><PublishAllButton/>)

const publishAllTool = () => ({
  title: "Publish All",
  name: "publish-all-tool",
  icon: null,
  component: () => <MemorizedPublishAllButton />,
});
export default publishAllTool;
