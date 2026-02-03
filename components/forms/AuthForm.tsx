"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  DefaultValues,
  FieldValues,
  Path,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { z, type ZodType, core } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import ROUTES from "@/constants/routes";
import { toast } from "sonner";

interface AuthFormProps<TSchema extends z.ZodType<FieldValues>> {
  schema: TSchema;
  defaultValues: z.infer<TSchema>;
  onSubmit: (data: z.infer<TSchema>) => Promise<ActionResponse>;
  formType: "SIGN_IN" | "SIGN_UP";
}

const AuthForm = <TSchema extends z.ZodType<FieldValues>>({
  schema,
  defaultValues,
  formType,
  onSubmit,
}: AuthFormProps<TSchema>) => {
  const router = useRouter();

  type TValues = z.infer<TSchema>;
  const form = useForm<TValues>({
    resolver: zodResolver(schema as unknown as core.$ZodType<TValues, TValues>),
    defaultValues: defaultValues as DefaultValues<TValues>,
  });

  const handleSubmit: SubmitHandler<z.infer<TSchema>> = async (data) => {
    const result = await onSubmit(data);

    if (result?.success) {
      toast.success(
        formType === "SIGN_IN"
          ? "Signed in successfully"
          : "Signed up successfully"
      );

      router.push(ROUTES.HOME);
    } else {
      toast.error(`Error ${result?.status ?? ""}`, {
        description: result?.error?.message,
      });
    }
  };

  const buttonText = formType === "SIGN_IN" ? "Sign In" : "Sign Up";

  const fields = Object.keys(defaultValues) as Array<keyof z.infer<TSchema>>;

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="mt-10 space-y-6"
      >
        {fields.map((name) => (
          <FormField
            key={String(name)}
            control={form.control}
            name={name as any}
            render={({ field }) => (
              <FormItem className="flex flex-col gap-2.5 w-full">
                <FormLabel className="paragraph-medium text-dark400_light700">
                  {field.name === "email"
                    ? "Email Address"
                    : field.name.charAt(0).toUpperCase() + field.name.slice(1)}
                </FormLabel>

                <FormControl>
                  <Input
                    {...field}
                    required
                    type={
                      field.name.toLowerCase().includes("password")
                        ? "password"
                        : "text"
                    }
                    className="paragraph-regular background-light-900_dark300 light-border-2 text-dark300_light700 no-focus min-h-12 rounded-1.5 border"
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        ))}

        <Button
          disabled={form.formState.isSubmitting}
          className="primary-gradient paragraph-medium w-full min-h-12 rounded-2 px-4 py-3.5 font-inter !text-light-900"
        >
          {form.formState.isSubmitting
            ? buttonText === "Sign In"
              ? "Signing in..."
              : "Signing up..."
            : buttonText}
        </Button>

        {formType === "SIGN_IN" ? (
          <p className="text-center text-sm text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link href={ROUTES.SIGN_UP} className="font-medium underline">
              Sign up
            </Link>
          </p>
        ) : (
          <p className="text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link href={ROUTES.SIGN_IN} className="font-medium underline">
              Sign in
            </Link>
          </p>
        )}
      </form>
    </Form>
  );
};

export default AuthForm;
