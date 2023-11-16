import { Suspense } from "react";
import Link from "next/link";
import { SignIn, UserButton } from "@clerk/nextjs";

import { Button } from "~/components/ui/button";
import {
  CreatePostForm,
  PostCardSkeleton,
  PostList,
} from "../components/posts";

export default function HomePage() {
  return (
    <main className="flex h-screen flex-col items-center">
      <div className="container mt-12 flex flex-col items-center justify-center gap-4 py-8">
        <Link href="/posts">
          <Button variant="default">Go to posts</Button>
        </Link>
      </div>
    </main>
  );
}
