'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  signIn,
  signOut,
  useSession,
  getProviders,
  ClientSafeProvider,
  LiteralUnion,
} from 'next-auth/react';
import { BuiltInProviderType } from 'next-auth/providers/index';

type ProviderType = Record<
  LiteralUnion<BuiltInProviderType, string>,
  ClientSafeProvider
> | null;

const Nav = () => {
  // const { data: session } = useSession();
  const isUserLoggedIn = true;
  const [providers, setProviders] = useState<ProviderType>(null);
  const [toggleDropdown, setToggleDropdown] = useState(false);

  useEffect(() => {
    console.log('hello ...');

    (async () => {
      const response = await getProviders();
      console.log(response);
      setProviders(response);
    })();
  }, []);

  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href="/" className="flex gap-2 flex-center">
        <Image
          src="/assets/images/logo.svg"
          alt="Logo"
          width={30}
          height={30}
          className="object-contain"
        />
        <p className="logo_text">Prompt-GPT</p>
      </Link>
      {/* Desktop Navigation */}
      <div>
        {isUserLoggedIn ? (
          <>
            {/* Desktop Navigation */}
            <div className="sm:flex hidden">
              <div className="flex gap-3 md:gap-5">
                <Link href="/create-prompt" className="black_btn">
                  Create Prompt
                </Link>
                <button
                  type="button"
                  className="outline_btn"
                  onClick={() => signOut()}
                >
                  Sign Out
                </button>

                <Link href="/profile">
                  <Image
                    src="/assets/images/logo.svg"
                    alt="Profile"
                    width={37}
                    height={37}
                  />
                </Link>
              </div>
            </div>
            {/* End of Desktop Navigation */}

            {/* Mobile Navigation */}
            <div className="sm:hidden flex relative">
              <div className="flex cursor-pointer">
                <Image
                  src="/assets/images/logo.svg"
                  alt="Profile"
                  width={35}
                  height={35}
                  onClick={() => setToggleDropdown((prev) => !prev)}
                />
              </div>
              {toggleDropdown && (
                <div className="dropdown">
                  <Link
                    href="/profile"
                    className="dropdown_link"
                    onClick={() => setToggleDropdown(false)}
                  >
                    My Profile
                  </Link>
                  <Link
                    href="/create-prompt"
                    className="dropdown_link"
                    onClick={() => setToggleDropdown(false)}
                  >
                    Create Prompt
                  </Link>
                  <button
                    type="button"
                    className="black_btn mt-4 w-full"
                    onClick={() => {
                      setToggleDropdown(false);
                      signOut();
                    }}
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
            {/* End of Mobile Navigation */}
          </>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  key={provider.name}
                  type="button"
                  onClick={() => signIn(provider.id)}
                  className="black_btn"
                >
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;
