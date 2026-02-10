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

const questions: Question[] = [
  {
    _id: "1",
    title: "What is the best way to learn React?",
    content: "I want to learn React to build a web application.",
    tags: [
      { _id: "1", name: "React" },
      { _id: "2", name: "JavaScript" },
      { _id: "3", name: "Web Development" },
    ],
    answers: 10,
    views: 100,
    upvotes: 5,
    downvotes: 0,
    createdAt: new Date(),
    author: {
      _id: "2",
      name: "John Doe",
      image: "/icons/user.svg",
    },
  },
  {
    _id: "2",
    title: "What is the best way to learn React?",
    content: "I want to learn React to build a web application.",
    tags: [
      { _id: "1", name: "React" },
      { _id: "2", name: "JavaScript" },
    ],
    answers: 10,
    views: 100,
    upvotes: 3,
    downvotes: 1,
    createdAt: new Date(),
    author: {
      _id: "3",
      name: "Jane Smith",
      image: "/icons/user.svg",
    },
  },
];

interface SearchParams {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}

const Home = async ({ searchParams }: SearchParams) => {
  const session = await auth();
  console.log("Session:", session);

  const { query = "" } = await searchParams;
  const filteredQuestions = questions.filter((question) =>
    question.title.toLowerCase().includes(query.toLowerCase()),
  );

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
      <div className="mt-10 flex w-full flex-col gap-6">
        {filteredQuestions.map((question) => (
          <QuestionCard key={question._id} question={question} />
        ))}
      </div>
    </>
  );
};

export default Home;
