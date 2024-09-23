"use server";

import Answer from "@/database/answer.model";
import { connectToDatabase } from "../mongoose";
import {
  AnswerVoteParams,
  CreateAnswerParams,
  GetAnswersParams,
} from "./shared.types";
import { revalidatePath } from "next/cache";
import Question from "@/database/question.model";

export async function createAnswer(params: CreateAnswerParams) {
  try {
    connectToDatabase();

    const { content, author, question, path } = params;

    const newAnswer = await Answer.create({ content, author, question });

    // Add the answer to the questions answer array

    await Question.findByIdAndUpdate(question, {
      $push: { answers: newAnswer._id },
    });

    revalidatePath(path);
  } catch (error) {
    console.log(error);
  }
}

export async function getAnswers(params: GetAnswersParams) {
  try {
    connectToDatabase();

    const { questionId, sortBy, page = 1, pageSize = 5 } = params;

    const skipAmount = (page - 1) * pageSize;

    let sortOptions = {};

    switch (sortBy) {
      case "highestUpvotes":
        sortOptions = { upvotes: -1 };
        break;
      case "lowestUpvotes":
        sortOptions = { upvotes: 1 };
        break;
      case "recent":
        sortOptions = { createdAt: -1 };
        break;
      case "old":
        sortOptions = { createdAt: 1 };
        break;
      default:
        break;
    }

    const answers = await Answer.find({ question: questionId })
      .populate("author", "_id clerkId name picture username")
      .sort(sortOptions)
      .skip(skipAmount)
      .limit(pageSize);

    const totalAnswers = await Answer.countDocuments({
      question: questionId,
    });

    const isNext = totalAnswers > skipAmount + answers.length;

    return { answers, isNext };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function upvoteAnswer(params: AnswerVoteParams) {
  try {
    connectToDatabase();

    const { answerId, userId, hasupVoted, hasdownVoted, path } = params;

    let updateQuery = {};

    if (hasupVoted) {
      updateQuery = { $pull: { upvotes: userId } };
    } else if (hasdownVoted) {
      updateQuery = {
        $pull: { downvotes: userId },
        $push: { updvotes: userId },
      };
    } else {
      updateQuery = { $addToSet: { upvotes: userId } };
    }

    const answer = await Answer.findByIdAndUpdate(answerId, updateQuery, {
      new: true,
    });

    if (!answer) {
      throw new Error("Answer not found");
    }

    // Increment authors reputation

    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function downvoteAnswer(params: AnswerVoteParams) {
  try {
    connectToDatabase();

    const { answerId, userId, hasupVoted, hasdownVoted, path } = params;

    let updateQuery = {};

    if (hasdownVoted) {
      updateQuery = { $pull: { downvotes: userId } };
    } else if (hasupVoted) {
      updateQuery = {
        $pull: { upvotes: userId },
        $push: { downdvotes: userId },
      };
    } else {
      updateQuery = { $addToSet: { downvotes: userId } };
    }

    const answer = await Answer.findByIdAndUpdate(answerId, updateQuery, {
      new: true,
    });

    if (!answer) {
      throw new Error("Answer not found");
    }

    // Increment authors reputation

    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}
