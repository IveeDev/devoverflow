"use server";
import mongoose from "mongoose";

import Answer, { IAnswerDoc } from "@/database/answer.model";
import action from "../handlers/action";
import {
  AnswerSchema,
  AnswerServerSchema,
  GetAnswersSchema,
} from "../validations";
import handleError from "../handlers/error";
import { Question } from "@/database";
import { revalidatePath } from "next/cache";
import ROUTES from "@/constants/routes";
import { ValidationError } from "../http-errors";

export const createAnswer = async (
  params: CreateAnswerParams,
): Promise<ActionResponse<IAnswerDoc>> => {
  const validationResult = await action({
    params,
    schema: AnswerServerSchema,
    authorize: true,
  });

  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }

  const { content, questionId } = validationResult.params!;
  const userId = validationResult?.session?.user?.id;

  if (!userId) throw new Error("Unauthorized");

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // check if the question exists
    const question = await Question.findById(questionId).session(session);
    if (!question) throw new Error("Question not found!");

    const [newAnswer] = await Answer.create(
      [
        {
          author: userId,
          question: questionId,
          content,
        },
      ],
      { session },
    );

    if (!newAnswer) throw new Error("Failed to create the answer!");

    // update the question answers count
    await Question.findByIdAndUpdate(
      questionId,
      { $inc: { answers: 1 } },
      { session },
    );

    await session.commitTransaction();

    revalidatePath(ROUTES.QUESTION(questionId));
    return { success: true, data: JSON.parse(JSON.stringify(newAnswer)) };
  } catch (error) {
    await session.abortTransaction();
    return handleError(error) as ErrorResponse;
  } finally {
    await session.endSession();
  }
};

export const getAnswers = async (
  params: GetAnswersParams,
): Promise<
  ActionResponse<{
    answers: Answer[];
    isNext: boolean;
    totalAnswers: number;
  }>
> => {
  const validationResult = await action({
    params,
    schema: GetAnswersSchema,
  });

  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }

  const {
    questionId,
    page = 1,
    pageSize = 10,
    filter,
  } = validationResult.params!;

  const skip = (Number(page) - 1) * pageSize;
  const limit = pageSize;

  let sortCriteria = {};

  switch (filter) {
    case "latest":
      sortCriteria = { createdAt: -1 };
      break;
    case "oldest":
      sortCriteria = { createdAt: 1 };
      break;
    case "popular":
      sortCriteria = { upvotes: -1 };
      break;
    default:
      sortCriteria = { createdAt: -1 };
      break;
  }

  try {
    const [totalAnswers, answers] = await Promise.all([
      Answer.countDocuments({ question: questionId }),
      Answer.find({ question: questionId })
        .populate("author", "_id name image")
        .sort(sortCriteria)
        .skip(skip)
        .limit(limit)
        .lean(),
    ]);

    const isNext = totalAnswers > skip + answers.length;
    return {
      success: true,
      data: {
        answers: JSON.parse(JSON.stringify(answers)),
        isNext,
        totalAnswers,
      },
    };
  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
};
