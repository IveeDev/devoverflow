"use client";
import { signIn } from "next-auth/react";
import { Button } from "../ui/button";
import Image from "next/image";
import { toast } from "sonner";
import ROUTES from "@/constants/routes";

const SocialAuthForm = () => {
  const buttonClasses =
    "background-dark400_light900 body-medium text-dark200_light800 min-h-12 flex-1 rounded-2 px-4 py-3.5";

  const handleSigIn = async (provider: "github" | "google") => {
    try {
      const result = await signIn(provider, {
        callbackUrl: ROUTES.HOME,
        redirect: false,
      });
      if (result?.error) {
        toast.error(result.error);
        return;
      }
      if (result?.url) {
        window.location.href = result.url;
      }
    } catch (error) {
      console.error(error);
      toast.error(error instanceof Error ? error.message : "Sign in failed");
    }
  };
  return (
    <div className="mt-10 flex flex-wrap gap-2.5">
      <Button className={buttonClasses} onClick={() => handleSigIn("github")}>
        <Image
          src="/icons/github.svg"
          alt="github"
          width={20}
          height={20}
          className="invert-colors mr-2.5 object-contain"
        />
        <span className="text-dark100_light900 text-sm font-medium">
          Login In with GitHub
        </span>
      </Button>
      <Button className={buttonClasses} onClick={() => handleSigIn("google")}>
        <Image
          src="/icons/google.svg"
          alt="google"
          width={20}
          height={20}
          className="mr-2.5 object-contain"
        />
        <span className="text-dark100_light900 text-sm font-medium">
          Login In with Google
        </span>
      </Button>
    </div>
  );
};

export default SocialAuthForm;
