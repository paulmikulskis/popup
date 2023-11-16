import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "~/styles/globals.css";

import { headers } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/nextjs";
import sharp from "sharp";

import { buttonVariants } from "~/components/ui/button";
import Noise from "~/components/ui/noise";
import { TRPCReactProvider } from "./providers";

const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

async function Header() {
  async function getLogoDimensions() {
    const imagePath = "./public/logo.png";
    const imageBuffer = await sharp(imagePath).toBuffer();
    const { width, height } = await sharp(imageBuffer).metadata();
    console.log(`read image dimensions: ${width}x${height}`);
    const res = { width, height };
    return res;
  }

  const { width, height } = await getLogoDimensions();

  return (
    <header className="sticky mx-auto flex w-full items-center justify-between bg-muted px-8 py-4 md:px-40 xl:px-60">
      <Link className="w-8" href="/">
        {width !== undefined && height !== undefined ? (
          <Image src="/logo.png" width={width} height={height} alt="logo" />
        ) : (
          <p>Logo</p>
        )}
      </Link>
      <SignedIn>
        {/* Mount the UserButton component */}
        <UserButton />
      </SignedIn>
      <SignedOut>
        {/* Signed out users get sign in button */}
        <SignInButton>
          <button className={buttonVariants({ variant: "default" })}>
            Sign in
          </button>
        </SignInButton>
      </SignedOut>
    </header>
  );
}

/**
 * Since we're passing `headers()` to the `TRPCReactProvider` we need to
 * make the entire app dynamic. You can move the `TRPCReactProvider` further
 * down the tree (e.g. /dashboard and onwards) to make part of the app statically rendered.
 */
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Create T3 Turbo",
  description: "Simple monorepo with shared backend for web & mobile apps",
  openGraph: {
    title: "Create T3 Turbo",
    description: "Simple monorepo with shared backend for web & mobile apps",
    url: "https://create-t3-turbo.vercel.app",
    siteName: "Create T3 Turbo",
  },
};

export default function Layout(props: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${["font-sans", fontSans.variable].join(
            " ",
          )} bg-noise-1 bg-background`}
        >
          <TRPCReactProvider headers={headers()}>
            <Header />
            {props.children}
          </TRPCReactProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
