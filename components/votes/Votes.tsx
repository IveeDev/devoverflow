"use client";
import { createVote } from "@/lib/actions/vote.action";
import { formatNumber } from "@/lib/utils";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { use, useState } from "react";
import { toast } from "sonner";

interface Props {
  targetType: "question" | "answer";
  targetId: string;
  upvotes: number;
  downvotes: number;
  hasVotedPromise: Promise<ActionResponse<HasVotedResponse>>;
}

const Votes = ({
  upvotes,
  downvotes,
  hasVotedPromise,
  targetId,
  targetType,
}: Props) => {
  const { success, data } = use(hasVotedPromise);
  const { hasUpvoted, hasDownvoted } = data!;
  const [isLoading, setIsLoading] = useState(false);
  const session = useSession();
  const userId = session.data?.user?.id;

  const handleVote = async (voteType: "upvote" | "downvote") => {
    if (!userId)
      return toast("Please log in", {
        description: "You need to log in to upvote or downvote!",
      });

    setIsLoading(true);
    try {
      const result = await createVote({
        targetId,
        targetType,
        voteType,
      });

      if (!result.success) {
        toast.error("Failed to vote", {
          description:
            "An error occurred while voting. Please try again later.",
          className: "bg-red-600 text-white",
        });
        return;
      }

      const successMessage =
        voteType === "upvote"
          ? `Upvote ${!hasUpvoted ? "added" : "removed"} successfully`
          : `Downvote ${!hasDownvoted ? "added" : "removed"} successfully`;
      toast.success(successMessage, {
        description: "Your vote has been recorded.",
      });
    } catch (error) {
      toast.error("Failed to vote", {
        description: "An error occurred while voting. Please try again later.",
        className: "bg-red-600 text-white",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex-center gap-2.5">
      <div className="flex-center gap-1.5">
        <Image
          src={
            success && hasUpvoted ? "/icons/upvoted.svg" : "/icons/upvote.svg"
          }
          width={18}
          height={18}
          alt="upvote"
          aria-label="Upvote"
          className={`cursor-pointer ${isLoading && "opacity-50"}`}
          onClick={() => !isLoading && handleVote("upvote")}
        />
      </div>
      <div className="flex-center background-light700_dark400 min-w-5 rounded-sm p-1">
        <p className="subtle-medium text-dark400_light900">
          {formatNumber(upvotes)}
        </p>
      </div>

      <div className="flex-center gap-1.5">
        <Image
          src={
            success && hasDownvoted
              ? "/icons/downvoted.svg"
              : "/icons/downvote.svg"
          }
          width={18}
          height={18}
          alt="downvote"
          aria-label="Downvote"
          className={`cursor-pointer ${isLoading && "opacity-50"}`}
          onClick={() => !isLoading && handleVote("downvote")}
        />
      </div>
      <div className="flex-center background-light700_dark400 min-w-5 rounded-sm p-1">
        <p className="subtle-medium text-dark400_light900">
          {formatNumber(downvotes)}
        </p>
      </div>
    </div>
  );
};

export default Votes;
