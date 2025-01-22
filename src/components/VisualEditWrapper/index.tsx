import React, { ReactNode } from 'react';
import { config } from '@/constants';
import { createDataAttribute } from 'next-sanity';

type VisualEditWrapperProps = {
  id: string;
  type: string;
  path: string;
  children: ReactNode; // Allows for any valid React child elements
};

export default function VisualEditWrapper({
  id,
  type,
  path,
  children,
}: VisualEditWrapperProps) {
  return (
    <div
      data-sanity={createDataAttribute({
        ...config,
        id,
        type,
        path,
      }).toString()}
    >
      {children}
    </div>
  );
}
