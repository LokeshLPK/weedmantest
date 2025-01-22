import { FiAward } from "react-icons/fi";
import { StructureResolver } from "sanity/structure";

export const structure: StructureResolver = (S) => {
  // Main structure definition
  return S.list()
    .title("Weedman") // The main title of the structure.
    .items([
      // First Section: Configuration
      S.listItem()
        .id("confifuration") // ID for the Configuration list item.
        .title("Configuration") // Title for the Configuration section.
        .child(
          S.list()
            .title("Configuration")
            .id("confifuration_list") // ID for the inner Configuration list.
            .items([
              // Pages configuration
              S.listItem()
                .title("Pages") // Title for the Pages section.
                .icon(FiAward) // Icon for Pages.
                .child(
                  S.documentList()
                    .title("Pages") // Title for the Pages document list.
                    .id("page_id") // ID for the Pages document list.
                    .schemaType("page") // Schema type for Pages.
                    .filter('_type == "page"') // Filter to show only documents of type "page".
                ),
              S.divider(), // Divider to separate sections.

              // Franchises configuration
              S.listItem()
                .title("Franchises") // Title for the Franchises section.
                .icon(FiAward) // Icon for Franchises.
                .child(
                  S.documentList()
                    .title("Franchises") // Title for the Franchises document list.
                    .id("franchise_id") // ID for the Franchises document list.
                    .schemaType("weedManFranchiseType") // Schema type for Franchises.
                    .filter('_type=="weedManFranchiseType"') // Filter for "weedManFranchiseType".
                ),
              S.divider(), // Divider to separate sections.

              // Zones configuration
              S.listItem()
                .title("Zones") // Title for the Zones section.
                .icon(FiAward) // Icon for Zones.
                .child(
                  S.documentList()
                    .title("Zones") // Title for the Zones document list.
                    .id("zone_id") // ID for the Zones document list.
                    .schemaType("zoneType") // Schema type for Zones.
                    .filter('_type=="zoneType"') // Filter for "zoneType".
                ),
              S.divider(), // Divider to separate sections.
            ])
        ),
      S.divider(), // Divider to separate sections.

      // Second Section: Content
      S.listItem()
        .id("content") // ID for the Content list item.
        .title("Content") // Title for the Content section.
        .child(
          S.list()
            .id("content_list") // ID for the inner Content list.
            .title("Content")
            .items([
              // DEFAULT PAGES
              S.listItem()
                .title("Default Pages") // Title for the Zone-wise pages section.
                .icon(FiAward) // Icon for Zone-wise pages.
                .child(
                  S.documentList()
                    .title("Page Content") // Title for the Page Content list.
                    .schemaType("pageContentType") // Schema type for Page Content.
                    .filter(
                      '_type == "pageContentType"' // Filter for Page Content based on zone ID.
                    )
                ),

              S.divider(), // Divider to separate sections.

              // Franchise-wise pages
              S.listItem()
                .title("Franchise Pages") // Title for the Franchise-wise pages section.
                .icon(FiAward) // Icon for Franchise-wise pages.
                .child(
                  S.documentList()
                    .title("Franchises") // Title for the Franchises document list.
                    .id("franchise_id") // ID for the Franchises document list.
                    .schemaType("weedManFranchiseType") // Schema type for Franchises.
                    .filter('_type == "weedManFranchiseType"') // Filter for "weedManFranchiseType".
                    .child(
                      (franchiseId) => {
                        return S.documentList()
                          .title("Page Content") // Title for the Page Content list.
                          .id("franchise_page_content_id") // ID for the Page Content list.
                          .schemaType("franchisePageType") // Schema type for Page Content.
                          .filter(
                            '_type == "franchisePageType" && $franchiseId == franchise_type._ref' // Filter for Page Content based on franchise ID.
                          )
                          .params({ franchiseId });
                      }

                      // Passing the franchise ID as a parameter.
                    )
                ),
              S.divider(), // Divider to separate sections.

              // Zone-wise pages
              S.listItem()
                .title("Zone Pages") // Title for the Zone-wise pages section.
                .icon(FiAward) // Icon for Zone-wise pages.
                .child(
                  S.documentList()
                    .title("Zones") // Title for the Zones document list.
                    .id("zone_id") // ID for the Zones document list.
                    .schemaType("zoneType") // Schema type for Zones.
                    .filter('_type == "zoneType"') // Filter for "zoneType".
                    .child(
                      (zoneId) =>
                        S.documentList()
                          .title("Page Content") // Title for the Page Content list.
                          .id("zone_page_content_id") // ID for the Page Content list.
                          .schemaType("zonePageType") // Schema type for Page Content.
                          .filter(
                            '_type == "zonePageType" && $zoneId == zone_type._ref' // Filter for Page Content based on zone ID.
                          )
                          .params({ zoneId }) // Passing the zone ID as a parameter.
                    )
                ),
            ])
        ),

        S.listItem().id('users').title('Users').child(
          S.documentList()
                    .title("Users") 
                    .id("user_id") 
                    .schemaType("usersType") // Schema type for Franchises.
                    .filter('_type == "usersType"') // Filter for "weedManFranchiseType".
                    // .child(
                    //   (franchiseId) => {
                    //     return S.documentList()
                    //       .title("Page Content") // Title for the Page Content list.
                    //       .id("franchise_page_content_id") // ID for the Page Content list.
                    //       .schemaType("franchisePageType") // Schema type for Page Content.
                    //       .filter(
                    //         '_type == "franchisePageType" && $franchiseId == franchise_type._ref' // Filter for Page Content based on franchise ID.
                    //       )
                    //       .params({ franchiseId });
                    //   }

                    //   // Passing the franchise ID as a parameter.
                    // )
        )
    ]);
};
