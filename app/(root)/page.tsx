import { auth, signOut } from "@/auth";
import LocalSearch from "@/components/search/LocalSearch";
import { Button } from "@/components/ui/button";
import ROUTES from "@/constants/routes";
import Link from "next/link";

const questions = [
  {
    id: 1,
    title: "What is the best way to learn React?",
    description: "I want to learn React to build a web application.",
    tags: [
      {
        id: 1,
        name: "React",
        description:
          "React is a JavaScript library for building user interfaces.",
      },
      {
        id: 2,
        name: "JavaScript",
        description: "JavaScript is a programming language for the web.",
      },
      {
        id: 3,
        name: "Web Development",
        description: "Web development is the process of building websites.",
      },
    ],
    answers: 10,
    views: 100,
    createdAt: new Date(),
    author: {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
    },
  },
  {
    id: 2,
    title: "What is the best way to learn React?",
    description: "I want to learn React to build a web application.",
    tags: [
      {
        id: 1,
        name: "React",
        description:
          "React is a JavaScript library for building user interfaces.",
      },
      {
        id: 2,
        name: "JavaScript",
        description: "JavaScript is a programming language for the web.",
      },
    ],
    answers: 10,
    views: 100,
    createdAt: new Date(),
  },
];

interface SearchParams {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}

const Home = async ({ searchParams }: SearchParams) => {
  const { query = "" } = await searchParams;
  const filteredQuestions = questions.filter((question) =>
    question.title.toLowerCase().includes(query.toLowerCase())
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
      {/* homeFilter */}
      <div className="mt-10 flex w-full flex-col">
        {filteredQuestions.map((question) => (
          <h1 key={question.id}>{question.title}</h1>
        ))}
      </div>
    </>
  );
};

export default Home;
