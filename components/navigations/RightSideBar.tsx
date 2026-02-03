import Link from "next/link";
import Image from "next/image";
import TagCard from "../cards/TagCard";

const RightSideBar = () => {
  const topQuestions = [
    { _id: "1", title: "How to use Next.js?" },
    {
      _id: "2",
      title: "How to use React Router?",
    },
    { _id: "3", title: "How to use TypeScript?" },
    { _id: "4", title: "How to use Prisma ORM?" },
    { _id: "5", title: "How to use Tailwind CSS?" },
  ];

  const popularTags = [
    { _id: "1", name: "Next.js", questions: 10 },
    { _id: "2", name: "React", questions: 10 },
    { _id: "3", name: "TypeScript", questions: 10 },
    { _id: "4", name: "Prisma ORM", questions: 10 },
    { _id: "5", name: "Tailwind CSS", questions: 10 },
  ];
  return (
    <section className="pt-36 custom-scrollbar background-light900_dark200 light-border sticky right-0 h-screen flex flex-col justify-between overflow-y-auto border-l p-6  shadow-light-300 dark:shadow-none max-xl:hidden w-[350px]">
      <div>
        <h3 className="h3-bold text-dark200_light900">Top Questions</h3>

        <div className="mt-7 flex w-full flex-col gap-[30px]">
          {topQuestions.map(({ _id, title }) => (
            <Link
              href={`/question/${_id}`}
              key={_id}
              className="cursor-pointer flex items-center justify-between gap-7"
            >
              <p className="body-medium text-dark500_light700">{title}</p>

              <Image
                src="/icons/chevron-right.svg"
                alt="chevron-right"
                width={20}
                height={20}
                className="invert-colors"
              />
            </Link>
          ))}
        </div>
      </div>

      <div className="mt-16">
        <h3 className="h3-bold text-dark200_light900">Popular Tags</h3>

        <div className="mt-7 flex flex-col gap-4">
          {popularTags.map(({ _id, name, questions }) => (
            <TagCard
              key={_id}
              _id={_id}
              name={name}
              questions={questions}
              showCount
              compact
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default RightSideBar;
