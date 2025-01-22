import React, {  useState } from 'react';
import { useClient, useDocumentOperation } from 'sanity';

import FranchiseSelector from '@/components/FranchiseSelector';
import { useToast } from '@sanity/ui';
import { uuid } from '@sanity/uuid';
import { CopyIcon } from '@sanity/icons'

type CopyForFranchisesActionModalProps = {
  id: string;
  type: string;
  published: PageContentType;
  draft: PageContentType;
};
type FranchisePageParams = {
  language: string;
  page_type: { _ref: string };
  sections: Section[];
  title: string;
  _id?: string;
};
export default function CopyForFranchisesActionModal(
  props: CopyForFranchisesActionModalProps
) {
  const { id, type, published, draft } = props;
  const client = useClient();

  const doc = draft || published;
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const toast = useToast();
   
  const { patch } = useDocumentOperation(id, type);
 

  const createFranchiePage = async (
    franchisePageParams: FranchisePageParams,
    franchise: FranchiseReference
  ) => {
    const drafId = `drafts.${uuid()}`;
    await client.create({
      _type: "franchisePageType",
      ...franchisePageParams,
      franchise_type: franchise,
      _id: drafId,
    });
   };
  const replaceFranchisePage = async (
    franchisePageParams: FranchisePageParams,
    franchisePageIdToDelete: string,
    franchise: FranchiseReference
  ) => {
    await client.delete(franchisePageIdToDelete);
    await createFranchiePage(franchisePageParams, franchise);
  };
  const handleSave = async (selectedFranchises: Array<FranchiseReference>) => {
    const pageParams: FranchisePageParams = {
      language: doc.language,
      title: doc.title,
      page_type: doc.page_type,
      sections: doc.sections,
    };
    const allCurrentFranchisePages= await client.fetch(
      `*[_type=="franchisePageType"]`
    );
     try {
      // Process each selected franchise
      await Promise.all(
        selectedFranchises.map((franchise) => {
          // Check if a franchisePageType already exists for the page_type and franchise_type
          const existingDoc = allCurrentFranchisePages.find(
            (i:FranchisePageType) =>
              i.page_type._ref === pageParams.page_type._ref &&
              i.franchise_type._ref === franchise._ref &&
              i.language === pageParams.language
          );
          if (existingDoc) {
            return replaceFranchisePage(
              pageParams,
              existingDoc._id,
              franchise
            );
          } else {
            // Create a new document
            return createFranchiePage(pageParams, franchise);
          }
        })
      );

      // Update the main document with the selected franchises
      patch.execute([{ set: { assigned_franchises: selectedFranchises } }]);
      setIsDialogOpen(false);

      // Show success toast
      toast.push({
        title: "Page Copied for selected franchises",
        status: "success",
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("Error assigning franchises:", error);
      toast.push({
        title: "Error Assigning Franchises",
        description: error.message,
        status: "error",
      });
    }
  };
 
  return {
    label: "Duplicate (Franchises)",
    icon:  <CopyIcon  />,
    onHandle: () => setIsDialogOpen(true),
    dialog: isDialogOpen && {
      type: "dialog",
      onClose: () => setIsDialogOpen(false),
      header: "Select Franchises",
      content: (
        <FranchiseSelector
          onSave={handleSave}
          value={doc.assigned_franchises}
        />
      ),
    },
  };
}
