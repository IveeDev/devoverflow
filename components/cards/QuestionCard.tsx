import ROUTES from "@/constants/routes";
import { getTimeStamp } from "@/lib/utils";
import Link from "next/link";
import TagCard from "./TagCard";
import Metric from "../Metric";

interface Props {
  question: Question;
}

const QuestionCard = ({
  question: { _id, title, tags, author, createdAt, upvotes, answers, views },
}: Props) => {
  return (
    <div className="card-wrapper rounded-[10px] px-9 py-[36px] sm:px-11">
      <div className="flex flex-col-reverse items-start justify-between gap-5 sm:flex-row">
        <div>
          <span>{getTimeStamp(createdAt)}</span>
          <Link href={ROUTES.QUESTION(_id)}>
            <h3 className="sm:h3-semibold base-semibold text-dark200_light900 line-clamp-1 flex-1">
              {title}
            </h3>
          </Link>
        </div>
      </div>

      <div className="mt-3.5 flex flex-wrap gap-2 w-full">
        {tags.map((tag: Tag) => (
          <TagCard
            key={tag._id}
            _id={tag._id}
            name={tag.name}
            // questions={tag.questions ?? 0}
            compact
          />
        ))}
      </div>

      <div className="flex-between gap-3 mt-2 w-full flex-wrap">
        <Metric
          imgUrl={author.image}
          alt="author"
          value={author.name}
          title={`asked ${getTimeStamp(createdAt)}`}
          textStyles="text-dark400_light700 body-medium"
          isAuthor={true}
          href={ROUTES.PROFILE(author._id)}
          titleStyles="max-sm:hidden"
        />

        <div className="flex items-center gap-3 max-sm:flex-wrap max-sm:gap-2">
          <Metric
            imgUrl={"/icons/like.svg"}
            alt="upvotes"
            value={upvotes}
            title=" Votes"
            textStyles="small-medium text-dark400_light700"
          />
          <Metric
            imgUrl={"/icons/message.svg"}
            alt="answers"
            value={answers}
            title=" Answers"
            textStyles="small-medium text-dark400_light700"
          />
          <Metric
            imgUrl={"/icons/eye.svg"}
            alt="views"
            value={views}
            title=" Views"
            textStyles="small-medium text-dark400_light700"
          />
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;
