import { defineType, Rule } from "sanity";
import { SECTION_TYPES } from "@/sanity/constants";

const serviceType = {
  type: "object",
  title: "Service",
  name: "service_type",
  fields: [
    {
      name: "service_name",
      type: "string",
      validation: (rule: Rule) => rule.required(),

    },
    {
      name: "service_description",
      type: "string",
      validation: (rule: Rule) => rule.required(),

    },
    {
      name: "service_icon",
      type: "image",
      validation: (rule: Rule) => rule.required(),

    },
    
  ],
};

export default defineType({
  name: SECTION_TYPES.HOME_PAGE_SERVICE_CATEGORY_SECTION_TYPE,
  type: "object",
  title: "Home Page Service Category Section",
  groups: [
    {
      title: "Lawn Care",
      name: "lawn_care",
      default: true,
    },
    {
      title: "Insect Control",
      name: "insect_control",
    },
  ],
  fields: [
    {
      name: "title",
      initialValue: "Home Page Service Category Section",
      type: "string",
      hidden: true,
      group: ["lawn_care", "insect_control"],
    },
    {

      title: "Lawn Services",
      type: "array",
      name: "lawn_care_services",
      of: [serviceType],
      group: ["lawn_care"],
    },
    {
      title: "Insect Control Services",
      type: "array",
      name: "insect_control_services",
      of: [serviceType],
      group: ["insect_control"],
    },
    {
      name: "language",
      type: "string",
      validation: (rule: Rule) => rule.required(),
 
    },
  ],
});
