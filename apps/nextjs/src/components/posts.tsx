"use client";

import { useState } from "react";

import { api } from "~/utils/api";
import type { RouterInputs, RouterOutputs } from "~/utils/api";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export function CreatePostForm() {
  const context = api.useContext();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const { mutateAsync: createPost, error } = api.post.create.useMutation({
    async onSuccess() {
      setTitle("");
      setContent("");
      await context.post.all.invalidate();
    },
  });

  return (
    <form
      className="flex w-full max-w-2xl flex-col"
      onSubmit={async (e) => {
        e.preventDefault();
        try {
          await createPost({
            title,
            content,
          });
          setTitle("");
          setContent("");
          await context.post.all.invalidate();
        } catch {
          // noop
        }
      }}
    >
      <Input
        className="mb-2 rounded bg-white/50 p-2"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
      />
      {error?.data?.path && (
        <span className="mb-2 text-red-500">{error.data.code}</span>
      )}
      <Input
        className="mb-2 rounded bg-white/50 p-2"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Content"
      />

      {}
      <Button type="submit" className="rounded  p-2 font-bold">
        Create
      </Button>
      {error?.data?.code === "UNAUTHORIZED" && (
        <span className="mt-2 text-red-500">You must be logged in to post</span>
      )}
    </form>
  );
}

export function PostList() {
  const [posts] = api.post.all.useSuspenseQuery();

  if (posts.length === 0) {
    return (
      <div className="relative flex w-full flex-col gap-4">
        <PostCardSkeleton pulse={false} />
        <PostCardSkeleton pulse={false} />
        <PostCardSkeleton pulse={false} />

        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/10">
          <p className="text-2xl font-bold">No posts yet</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col gap-4">
      {posts.map((p) => {
        return <PostCard key={p.id} post={p} />;
      })}
    </div>
  );
}

export function PostCard(props: {
  post: RouterOutputs["post"]["all"][number];
}) {
  const context = api.useContext();
  const deletePost = api.post.delete.useMutation();

  return (
    <div className="bg-card flex flex-row rounded-lg p-4 transition-all hover:scale-[101%]">
      <div className="flex-grow">
        <h2 className="text-2xl font-bold ">{props.post.title}</h2>
        <p className="mt-2 text-sm">{props.post.content}</p>
      </div>
      <div>
        <Button
          className="cursor-pointer text-sm font-bold uppercase"
          onClick={async () => {
            await deletePost.mutateAsync(props.post.id);
            await context.post.all.invalidate();
          }}
        >
          Delete
        </Button>
      </div>
    </div>
  );
}

export function PostCardSkeleton(props: { pulse?: boolean }) {
  const { pulse = true } = props;
  return (
    <div className="flex flex-row rounded-lg bg-white/10 p-4 transition-all hover:scale-[101%]">
      <div className="flex-grow">
        <h2
          className={`w-1/4 rounded  text-2xl font-bold ${
            pulse && "animate-pulse"
          }`}
        >
          &nbsp;
        </h2>
        <p
          className={`mt-2 w-1/3 rounded bg-current text-sm ${
            pulse && "animate-pulse"
          }`}
        >
          &nbsp;
        </p>
      </div>
    </div>
  );
}
