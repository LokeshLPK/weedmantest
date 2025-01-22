"use client";

import Image from "next/image";
import { useState } from "react";

type SERVICE_TAB_ITEM = { id: string; title: string };
const TABS: SERVICE_TAB_ITEM[] = [
  { id: "lawn_care_services", title: "LAWN CARE" },
  { id: "insect_control_services", title: "INSECT CONTROL" },
];

export default function HomePageServiceCategorySection(
  props: HomePageServiceCategorySectionType
) {
  const [selectedTab, setSelectedTab] = useState("lawn_care_services");
  const onTabChange = (tab: SERVICE_TAB_ITEM) => setSelectedTab(tab.id);
  const services =
    selectedTab === "lawn_care_services"
      ? props.lawn_care_services
      : props.insect_control_services;
  return (
    <section className="p-6">
      <div className="flex justify-center mb-8">
        {TABS.map((i) => {
          return (
            <div
              onClick={() => onTabChange(i)}
              className={`p-2 flex-1 sm:flex-none    flex  justify-center  bg-nutral-200 ${selectedTab === i.id ? "bg-orange-100 border-b-4 border-orange-500" : "bg-[#F7F7F7]"} cursor-pointer`}
              key={i.id}
            >
              <h2 className="max-w-[70px] text-center sm:max-w-none  text-green-800 font-bold">{i.title}</h2>
            </div>
          );
        })}
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-6  sm:p-10">
        {services?.map((item) => {
          return (
            <div
              key={item._key}
              className="flex flex-col sm:flex-row items-start  gap-3 sm:gap-6 "
            >
               <Image
                src={item.service_icon.asset.url}
                alt={`${item.service_name} Icon`}
                width={20}
                height={20}
              />

              <div className="flex flex-col gap-3">
                <h4 className="text-xl font-bold text-green-800">
                  {item.service_name}
                </h4>
                <h5 className="text-sm font-weight-400">
                  {item.service_description}
                </h5>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
