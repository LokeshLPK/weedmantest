 import './globals.css';

import { VisualEditing } from 'next-sanity';
import { draftMode } from 'next/headers';

// import { SanityLive } from "@/sanity/lib/live";
import { DisableDraftMode } from '@/components/DisableDraftMode';
 
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
      >
         {children}
 
        {/* <SanityLive /> */}
        {(await draftMode()).isEnabled && (
          <>
            <DisableDraftMode />
            <VisualEditing />
          </>
        )}
     
      </body>
    </html>
  );
}
