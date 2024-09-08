import QuestionCard from "@/components/cards/QuestionCard";
import HomeFilters from "@/components/home/HomeFilters";
import Filter from "@/components/shared/Filter";
import NoResult from "@/components/shared/NoResult";
import LocalSearchbar from "@/components/shared/search/LocalSearchbar";
import { Button } from "@/components/ui/button";
import { HomePageFilters } from "@/constants/filters";
import Link from "next/link";

const questions = [
  {
    _id: "1",
    title: "How do I pass Time?",
    tags: [
      { _id: "101", name: "python" },
      { _id: "102", name: "sql" },
    ],
    author: {
      _id: "201",
      name: "John Doe",
      picture: "https://example.com/john_doe.jpg",
    },
    upvotes: 40,
    views: 402,
    answers: [
      {
        _id: "301",
        content: "Try learning a new skill!",
        author: "Jane Smith",
      },
    ],
    createdAt: new Date("2021-09-02T12:00:00.000Z"),
  },
  {
    _id: "2",
    title: "What's the best way to learn JavaScript?",
    tags: [
      { _id: "103", name: "javascript" },
      { _id: "104", name: "frontend" },
    ],
    author: {
      _id: "202",
      name: "Alice Johnson",
      picture: "https://example.com/alice_johnson.jpg",
    },
    upvotes: 120,
    views: 1234,
    answers: [
      {
        _id: "302",
        content: "Start with basic tutorials!",
        author: "Robert Green",
      },
      { _id: "303", content: "Work on projects.", author: "Emily White" },
    ],
    createdAt: new Date("2022-01-15T09:30:00.000Z"),
  },
  {
    _id: "3",
    title: "How to improve SQL performance?",
    tags: [
      { _id: "105", name: "sql" },
      { _id: "106", name: "database" },
    ],
    author: {
      _id: "203",
      name: "David Brown",
      picture: "https://example.com/david_brown.jpg",
    },
    upvotes: 75,
    views: 890,
    answers: [
      { _id: "304", content: "Use proper indexing.", author: "Michael Lee" },
    ],
    createdAt: new Date("2022-05-10T15:20:00.000Z"),
  },
  {
    _id: "4",
    title: "What are the best practices for API design?",
    tags: [
      { _id: "107", name: "api" },
      { _id: "108", name: "rest" },
    ],
    author: {
      _id: "204",
      name: "Sophia Wilson",
      picture: "https://example.com/sophia_wilson.jpg",
    },
    upvotes: 150,
    views: 2000,
    answers: [
      {
        _id: "305",
        content: "Follow RESTful conventions.",
        author: "Chris Evans",
      },
      { _id: "306", content: "Document your API well.", author: "Anna Grey" },
    ],
    createdAt: new Date("2023-03-08T08:45:00.000Z"),
  },
  {
    _id: "5",
    title: "How do I implement authentication in Next.js?",
    tags: [
      { _id: "109", name: "nextjs" },
      { _id: "110", name: "authentication" },
    ],
    author: {
      _id: "205",
      name: "Emma Martinez",
      picture: "https://example.com/emma_martinez.jpg",
    },
    upvotes: 95,
    views: 1500,
    answers: [
      { _id: "307", content: "Use Clerk or Auth0.", author: "Nick Roberts" },
    ],
    createdAt: new Date("2023-06-22T17:10:00.000Z"),
  },
];

export default function Home() {
  return (
    <>
      <div className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100_light900">All Questions</h1>

        <Link href="/ask-question" className="flex justify-end max-sm:w-full">
          <Button className="primary-gradient min-h-[46px] px-4 py-3 !text-light-900">
            Ask a Question
          </Button>
        </Link>
      </div>

      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearchbar
          route="/"
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Search for Questions"
          otherClasses="flex-1"
        />
        <Filter
          filters={HomePageFilters}
          otherClasses="min-h-[56px] sm:min-w-[170px]"
          containerClasses="hidden max-md:flex"
        />
      </div>

      <HomeFilters />

      <div className="mt-10 flex flex-col gap-6">
        {questions.length > 0 ? (
          questions.map((question) => (
            <QuestionCard
              key={question._id}
              _id={question._id}
              title={question.title}
              tags={question.tags}
              author={question.author}
              upvotes={question.upvotes}
              views={question.views}
              answers={question.answers}
              createdAt={question.createdAt}
            />
          ))
        ) : (
          <NoResult
            title="There is no question to show"
            description="Be the first to break the silence! Ask a Question and Kickstart the
            discussion. Our Query could be the next big thing others learn from. Get
            involved"
            link="/ask-question"
            linkTitle="Ask a Question"
          />
        )}
      </div>
    </>
  );
}
