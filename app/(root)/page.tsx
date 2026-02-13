import { auth, signOut } from "@/auth";
import QuestionCard from "@/components/cards/QuestionCard";
import HomeFilter from "@/components/filters/HomeFilter";
import LocalSearch from "@/components/search/LocalSearch";
import { Button } from "@/components/ui/button";
import ROUTES from "@/constants/routes";
import handleError from "@/lib/handlers/error";
import Link from "next/link";
import logger from "@/lib/logger";
import { NotFoundError, ValidationError } from "@/lib/http-errors";
import dbConnect from "@/lib/mongoose";
import { api } from "@/lib/api";
import { IUser } from "@/database/user.model";
import { getQuestions } from "@/lib/actions/question.action";

interface SearchParams {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}

const Home = async ({ searchParams }: SearchParams) => {
  const { page, pageSize, query, filter } = await searchParams;

  const { success, data, error } = await getQuestions({
    page: Number(page) || 1,
    pageSize: Number(pageSize) || 10,
    query,
    filter,
  });

  const { questions } = data || {};
  // const filteredQuestions = questions.filter((question) =>
  //   question.title.toLowerCase().includes(query.toLowerCase()),
  // );

  return (
    <>
      <section className="flex flex-col-reverse justify-between gap-4 w-full sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100_light900">All Questions</h1>

        <Button
          className="primary-gradient text-light-900 min-h-[46px] px-4 py-3 rounded-lg"
          asChild
        >
          <Link href={ROUTES.ASK_QUESTION}>Ask a Question</Link>
        </Button>
      </section>
      <section className="mt-11">
        <LocalSearch
          route="/"
          imgSrc="/icons/search.svg"
          placeholder="Search for a question..."
          otherClasses="flex-1"
        />
      </section>
      <HomeFilter />

      {success ? (
        <div className="mt-10 flex w-full flex-col gap-6">
          {questions && questions?.length > 0 ? (
            <>
              {questions?.map((question) => (
                <QuestionCard key={question._id} question={question} />
              ))}
            </>
          ) : (
            <div className="mt-10 flex w-full items-center justify-center">
              <p className="text-dark200_light900">No questions found</p>
            </div>
          )}
        </div>
      ) : (
        <div className="mt-10 flex w-full items-center justify-center">
          <p className="text-dark200_light900">
            {error?.message || "Something went wrong"}
          </p>
        </div>
      )}
    </>
  );
};

export default Home;
