/* eslint-disable @typescript-eslint/no-explicit-any */
import './header.css';

import { Globe, User } from 'lucide-react';
import { QueryParams } from 'next-sanity';
import { headers } from 'next/headers';
import Image from 'next/image';
import Link from 'next/link';

import GoogleAddressAutoCompleteComponent from '@/components/GoogleAddressAutoCompleteComponent';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { getCountryCode } from '@/lib/api';
import { generateLanguageLinks, generateNavLink, getLogoHref } from '@/lib/navigationUtils';

import { i18n } from '../../../languages';

type HeaderProps = {
  params: Promise<QueryParams>;
  franchise?: string;
};

const LanguageSelector = ({ languageLinks, currentLanguage, countryCode, franchise }: any) => (
  <DropdownMenu>
    <DropdownMenuTrigger className="flex items-center gap-2">
      <Globe className="h-5 w-5" />
      <span>
        {countryCode || franchise === countryCode
          ? `${countryCode?.toUpperCase()}/`
          : ""}
        {currentLanguage?.toUpperCase() || "EN"}
      </span>
    </DropdownMenuTrigger>
    <DropdownMenuContent>
      <DropdownMenuLabel>Languages</DropdownMenuLabel>
      <DropdownMenuSeparator />
      {languageLinks.map((link: any) => (
        <Link href={link.href} key={link.id}>
          <DropdownMenuItem>{link.label}</DropdownMenuItem>
        </Link>
      ))}
    </DropdownMenuContent>
  </DropdownMenu>
);

const NavLink = ({ href, label }: { href: string; label: string }) => (
  <Link href={href}>
    <Button variant="ghost" className="flex items-center gap-2">
      {label}
    </Button>
  </Link>
);

export default async function Header({ params, franchise: franchiseName }: HeaderProps) {
  const { language, franchise } = await params;
  const headersList = await headers();
  const countryCode = await getCountryCode(headersList);
  
  const languageLinks = await generateLanguageLinks(i18n, await params, countryCode);
  const logoHref = await getLogoHref(language, franchise, countryCode);

  const navLinks = await Promise.all([
    generateNavLink(language, franchise, countryCode, "Services", "services"),
    generateNavLink(language, franchise, countryCode, "Learn", "learn"),
    generateNavLink(language, franchise, countryCode, "Support", "support"),
  ]);

  return (
    <header className="w-full">
      <div className="border-b">
        <div className="flex justify-end items-center px-4 py-2">
          <GoogleAddressAutoCompleteComponent />
          <div className="flex items-center gap-4 ml-10">
            <LanguageSelector 
              languageLinks={languageLinks}
              currentLanguage={language}
              countryCode={countryCode}
              franchise={franchise}
            />
            <p className="text-green-800">{franchiseName}</p>
            <Link href="/login" className="flex items-center gap-1 text-sm text-green-800">
              <User className="h-5 w-5" />
              <span>Login</span>
            </Link>
          </div>
        </div>
      </div>

      <div className="border-b">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
          <Link href={logoHref} className="flex-shrink-0">
            <Image src="/logo.svg" alt="Weed Man" width={40} height={40} className="h-10 w-auto" />
          </Link>
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link: any, index: number) => (
              <NavLink key={index} {...link} />
            ))}
          </nav>
          <Button className="hidden sm:block px-4 md:px-6">GET STARTED</Button>
        </div>
      </div>
    </header>
  );
}

