/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { documentInternationalization } from "@sanity/document-internationalization";
import { visionTool } from "@sanity/vision";
import {assist} from '@sanity/assist'
import { defineConfig } from "sanity";
import { presentationTool } from "sanity/presentation";
import { structureTool } from "sanity/structure";
// import { workflow } from "sanity-plugin-workflow";

import Icon from "@/components/Icon";
import { i18n } from "./languages";
import { apiVersion, dataset, projectId } from "./src/sanity/env";
import { schema } from "./src/sanity/schemaTypes";
import { structure } from "./src/sanity/structure/index";
import { theme } from "./src/sanity/utils/theme";
import CopyForFranchisesActionModal from "@/components/CopyForFranchisesActionModal";
import publishAllTool from "@/components/CustomTools/PublishAllButton";

 
export default defineConfig({
  basePath: "/studio",
  projectId,
  dataset,
  icon: Icon,
  theme,
  schema: { ...schema },
  document:{
     actions:(prev: any, context: any) => {
        return context.schemaType === 'pageContentType' ? [...prev,CopyForFranchisesActionModal,] : prev;
    },
  } as any,
  plugins: [
    assist(),
    structureTool({ structure }),

    presentationTool({
      previewUrl: {
        previewMode: {
          enable: "/api/draft-mode/enable",
        },
      },
    }),
    visionTool({ defaultApiVersion: apiVersion }),
    documentInternationalization({
      supportedLanguages: i18n.languages,
      schemaTypes: ["pageContentType","franchisePageType","zonePageType"],
      languageField: `language`,
    }),
  ],
  tools:[publishAllTool() as any]
});
