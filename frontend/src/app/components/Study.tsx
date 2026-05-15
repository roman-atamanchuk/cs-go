import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router";
import { ArrowLeft, CheckCircle2, Download, FileText } from "lucide-react";
import { getPastExamFileUrl } from "../data/lectureApi";
import { getLectureCourse } from "../data/lectureLibrary";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "./ui/carousel";

type ExamSlide = {
  id: string;
  title: string;
  explanation: string;
  formula?: string;
  example: string;
  tags: string[];
};

type ExamOption = {
  id: string;
  text: string;
};

type ExamQuestion = {
  id: string;
  label: string;
  topic: string;
  text: string;
  fullPrompt?: string[];
  subparts?: string[];
  options: ExamOption[];
  correctAnswer: string;
  feedback: string;
  solutions: ExamSlide[];
  theory: ExamSlide[];
  examples: ExamSlide[];
};

const examQuestionBank: Record<string, ExamQuestion> = {
  q1: {
    id: "q1",
    label: "Question 1.a",
    topic: "Q1 (a)",
    text: "A student is selected at random from the class. How likely is each event in parts (i) to (iv)?",
    fullPrompt: [
      "A statistics class is taken by 30 students, 18 of whom study science and the rest study computing.",
      "Half of the science students and one third of the computing students are female, the rest are male.",
      "A student is selected at random from the class. How likely is it that this student:",
    ],
    subparts: [
      "(i) is a computing student?",
      "(ii) is a female, computing student?",
      "(iii) is female if the student studies science?",
      "(iv) studies science if the student is female?",
    ],
    options: [
      { id: "a", text: "0.37" },
      { id: "b", text: "0.40" },
      { id: "c", text: "1.37" },
      { id: "d", text: "0.27" },
    ],
    correctAnswer: "b",
    feedback: "There are 12 computing students out of 30 total, so P(computing) = 12/30 = 0.40.",
    solutions: [
      {
        id: "q1-s1",
        title: "Identify the missing event",
        explanation: "The question asks for the probability that A does not happen.",
        formula: "P(A') = 1 - P(A)",
        example: "Here A' means not A, so we subtract 0.37 from 1.",
        tags: ["complement", "not A", "subtract"],
      },
      {
        id: "q1-s2",
        title: "Carry out the calculation",
        explanation: "Complements always fill the rest of the probability space.",
        formula: "1 - 0.37 = 0.63",
        example: "The answer is 0.63 because A and A' must add to 1.",
        tags: ["answer", "total 1", "result"],
      },
    ],
    theory: [
      {
        id: "q1-t1",
        title: "Meaning of a complement",
        explanation: "A complement contains every outcome that is not in event A.",
        formula: "P(A') = 1 - P(A)",
        example: "If A is passing, then A' is not passing.",
        tags: ["definition", "event", "opposite"],
      },
      {
        id: "q1-t2",
        title: "Why the rule works",
        explanation: "A and A' are mutually exclusive and collectively exhaustive.",
        example: "Together they cover the whole sample space, so their probabilities sum to 1.",
        tags: ["exclusive", "exhaustive", "sample space"],
      },
    ],
    examples: [
      {
        id: "q1-e1",
        title: "Card example",
        explanation: "If the chance of drawing a heart is 13/52, the complement is not a heart.",
        formula: "1 - 13/52 = 39/52",
        example: "Not a heart has probability 39/52.",
        tags: ["cards", "hearts", "complement"],
      },
      {
        id: "q1-e2",
        title: "Service example",
        explanation: "If 82% of buses are on time, then 18% are late.",
        formula: "1 - 0.82 = 0.18",
        example: "The complement helps interpret delays quickly.",
        tags: ["bus", "late", "on time"],
      },
    ],
  },
  q1a: {
    id: "q1a",
    label: "Question 1.b",
    topic: "Q1 (b)",
    text: "Use probability to appraise whether it is credible that no student was selected more than once over 12 weekly random selections.",
    fullPrompt: [
      "A student is to be randomly selected each week from the full class of 30 to give a short presentation on a particular topic.",
      "At the end of the 12-week semester it is noted that no student has been selected more than once to give a presentation.",
      "There is a suspicion that such an eventuality would be unlikely if the selection process was entirely random.",
    ],
    options: [
      { id: "a", text: "It is impossible" },
      { id: "b", text: "It can happen and is not automatically suspicious" },
      { id: "c", text: "It proves the process was fixed" },
      { id: "d", text: "It means every student must present twice" },
    ],
    correctAnswer: "b",
    feedback: "A run with no repeats is unlikely enough to investigate, but not impossible. Probability should be used to judge whether the suspicion is credible, not to declare certainty immediately.",
    solutions: [
      {
        id: "q1a-s1",
        title: "Check the structure",
        explanation: "A binomial model is built from repeated yes/no trials.",
        formula: "X ~ Bin(n, p)",
        example: "Each trial must be success or failure.",
        tags: ["two outcomes", "fixed n", "constant p"],
      },
      {
        id: "q1a-s2",
        title: "Reject the wrong options",
        explanation: "Continuous variables belong to normal-type models, not binomial ones.",
        example: "Sample size alone does not define a binomial setting.",
        tags: ["discrete", "not continuous", "conditions"],
      },
    ],
    theory: [
      {
        id: "q1a-t1",
        title: "Four binomial conditions",
        explanation: "Fixed number of trials, independent trials, two outcomes, same probability of success.",
        example: "Coin flips or pass/fail checks fit naturally.",
        tags: ["fixed trials", "independent", "same p"],
      },
      {
        id: "q1a-t2",
        title: "What X counts",
        explanation: "The random variable X counts the number of successes across the trials.",
        formula: "P(X = x) = nCx p^x (1-p)^(n-x)",
        example: "X could be the number of defective parts in 20 checks.",
        tags: ["count", "successes", "pmf"],
      },
    ],
    examples: [
      {
        id: "q1a-e1",
        title: "Committee example",
        explanation: "Selecting 5 students and counting how many passed maths is binomial only if each trial can be treated independently with constant p.",
        example: "The count of passes is the variable, not the order of students.",
        tags: ["committee", "students", "count"],
      },
      {
        id: "q1a-e2",
        title: "Machine test example",
        explanation: "A technician checks 10 bulbs and records how many are faulty.",
        example: "Faulty / not faulty gives the two-outcome structure.",
        tags: ["bulbs", "faulty", "inspection"],
      },
    ],
  },
  q1b: {
    id: "q1b",
    label: "Question 1.c",
    topic: "Q1 (c)",
    text: "If a student failed the final exam, how likely is it that the student passed the midterm?",
    fullPrompt: [
      "Students take a midterm exam in addition to an end of semester final exam.",
      "There is a 70% chance that students who attain a passing grade in the midterm will pass the final exam, but there is only a 20% chance that students who fail the midterm will pass the final exam.",
      "If the pass rate for the midterm exam is 80%, use a tree diagram or otherwise to determine how likely it is that a student who has failed the final exam will have passed the midterm.",
    ],
    options: [
      { id: "a", text: "0.35" },
      { id: "b", text: "0.60" },
      { id: "c", text: "0.75" },
      { id: "d", text: "0.875" },
    ],
    correctAnswer: "b",
    feedback: "Use a tree. P(pass midterm and fail final) = 0.8 × 0.3 = 0.24. P(fail final) = 0.24 + (0.2 × 0.8) = 0.40. So P(pass midterm | fail final) = 0.24 / 0.40 = 0.60.",
    solutions: [
      {
        id: "q1b-s1",
        title: "Match lambda to the interval",
        explanation: "Lambda must always reflect the average count in the exact time period used in the question.",
        formula: "X ~ Pois(lambda)",
        example: "One minute means lambda stays 4.",
        tags: ["rate", "interval", "count"],
      },
      {
        id: "q1b-s2",
        title: "Scale only when time changes",
        explanation: "If the question asked for 30 seconds, lambda would be halved.",
        formula: "lambda(30s) = 4 × 0.5 = 2",
        example: "For 2 minutes it would become 8.",
        tags: ["scale", "time", "average"],
      },
    ],
    theory: [
      {
        id: "q1b-t1",
        title: "Poisson interpretation",
        explanation: "A Poisson variable counts random events in a fixed interval when events occur at a stable average rate.",
        example: "Calls, arrivals, defects, or accidents are common Poisson settings.",
        tags: ["count events", "fixed interval", "stable rate"],
      },
      {
        id: "q1b-t2",
        title: "Role of lambda",
        explanation: "Lambda is both the mean and the variance in a Poisson distribution.",
        formula: "E(X) = Var(X) = lambda",
        example: "With lambda = 4, the average count is 4.",
        tags: ["mean", "variance", "lambda"],
      },
    ],
    examples: [
      {
        id: "q1b-e1",
        title: "Cafe arrivals",
        explanation: "If 18 customers arrive per hour, then the parameter for 15 minutes is 4.5.",
        formula: "18 × 15/60 = 4.5",
        example: "Always rescale to the question interval.",
        tags: ["customers", "rescale", "hour"],
      },
      {
        id: "q1b-e2",
        title: "Defect counts",
        explanation: "If a wire has 2 faults per 10 metres, then 30 metres has lambda 6.",
        formula: "2 × 3 = 6",
        example: "Longer intervals mean larger lambda.",
        tags: ["defects", "distance", "rate"],
      },
    ],
  },
  q2: {
    id: "q2",
    label: "Question 2.a",
    topic: "Q2 (a)",
    text: "How likely is it that at least three planes will arrive to land in the next two hours?",
    fullPrompt: [
      "The arrival of aeroplanes to land at a small airport can be modelled with a Poisson distribution with an average time between arrivals of 28.05 minutes.",
      "How likely is it that at least three planes will arrive to land in the next two hours?",
    ],
    options: [
      { id: "a", text: "0.14" },
      { id: "b", text: "0.48" },
      { id: "c", text: "0.76" },
      { id: "d", text: "0.94" },
    ],
    correctAnswer: "c",
    feedback: "The arrival rate for two hours is about 120 / 28.05 ≈ 4.28. Using a Poisson model, P(X ≥ 3) = 1 - [P(0) + P(1) + P(2)] ≈ 0.76.",
    solutions: [
      {
        id: "q2-s1",
        title: "Condition on females first",
        explanation: "The phrase 'studies science if the student is female' means we restrict attention to female students only.",
        formula: "P(science | female) = P(science and female) / P(female)",
        example: "The denominator must count all female students, not all students.",
        tags: ["conditional", "given female", "restricted set"],
      },
      {
        id: "q2-s2",
        title: "Compute the ratio",
        explanation: "There are 9 female science students and 4 female computing students, so there are 13 females in total.",
        formula: "9/13 ≈ 0.6923",
        example: "That gives the probability that a female student studies science.",
        tags: ["9 females", "13 total", "answer"],
      },
    ],
    theory: [
      {
        id: "q2-t1",
        title: "Read the condition carefully",
        explanation: "In a conditional probability question, the word after 'if' or 'given' tells you the reduced sample space.",
        example: "Here the reduced sample space is the set of female students.",
        tags: ["if", "given", "reduced set"],
      },
      {
        id: "q2-t2",
        title: "Why order matters",
        explanation: "P(science | female) is not the same as P(female | science) because the denominator changes.",
        example: "One divides by all females, the other divides by all science students.",
        tags: ["order", "different denominator", "warning"],
      },
    ],
    examples: [
      {
        id: "q2-e1",
        title: "Table reading example",
        explanation: "If a table shows 12 females in science and 8 females in business, then P(science | female) = 12/20.",
        formula: "12/20 = 0.6",
        example: "You always divide by the total number of females.",
        tags: ["table", "conditional", "divide by females"],
      },
      {
        id: "q2-e2",
        title: "Reverse-condition contrast",
        explanation: "In the same class, P(female | science) = 9/18 = 0.5, which differs from P(science | female) = 9/13.",
        example: "Changing the condition changes the denominator and the answer.",
        tags: ["contrast", "reverse", "denominator"],
      },
    ],
  },
  q2a: {
    id: "q2a",
    label: "Question 2.b",
    topic: "Q2 (b)",
    text: "How likely is it that fewer than 3 of the next 9 flights will be charter flights?",
    fullPrompt: [
      "If 15.4% of flights are charter flights, how likely is it that fewer than 3 of the next 9 flights will be charter flights?",
    ],
    options: [
      { id: "a", text: "0.32" },
      { id: "b", text: "0.58" },
      { id: "c", text: "0.82" },
      { id: "d", text: "0.95" },
    ],
    correctAnswer: "c",
    feedback: "Use a binomial model with n = 9 and p = 0.154. Then P(X < 3) = P(0) + P(1) + P(2) ≈ 0.82.",
    solutions: [
      {
        id: "q2a-s1",
        title: "Restrict the sample space",
        explanation: "Once B is known to happen, only cases inside B remain relevant.",
        formula: "P(A|B) = P(A ∩ B) / P(B)",
        example: "The numerator counts cases where both A and B happen.",
        tags: ["given B", "denominator", "intersection"],
      },
      {
        id: "q2a-s2",
        title: "Explain the denominator",
        explanation: "The denominator cannot be P(A) because the new universe is B, not the whole sample space.",
        example: "That is why the answer uses P(B).",
        tags: ["restricted set", "new universe", "ratio"],
      },
    ],
    theory: [
      {
        id: "q2a-t1",
        title: "Meaning of given",
        explanation: "The phrase given B means we already know B occurred before asking about A.",
        example: "This changes which outcomes are still possible.",
        tags: ["given", "updated set", "conditioning"],
      },
      {
        id: "q2a-t2",
        title: "Direction matters",
        explanation: "P(A|B) and P(B|A) usually describe different restricted sets.",
        example: "That is why they are not interchangeable.",
        tags: ["order", "different", "warning"],
      },
    ],
    examples: [
      {
        id: "q2a-e1",
        title: "Class table example",
        explanation: "If B means studies science, then P(pass|science) focuses only on science students.",
        example: "You divide science passes by total science students.",
        tags: ["table", "students", "restricted"],
      },
      {
        id: "q2a-e2",
        title: "Medical test example",
        explanation: "P(disease|positive) is not the same as P(positive|disease).",
        example: "One starts from positive results, the other starts from patients with disease.",
        tags: ["medical", "order", "interpretation"],
      },
    ],
  },
  q3: {
    id: "q3",
    label: "Question 3.a",
    topic: "Q3 (a)",
    text: "Determine how many arrangements are possible under the three stated restrictions.",
    fullPrompt: [
      "A building surveyor firm is asked to survey a historical building and must produce a report on three aspects of the building: structural, fittings and decorative.",
      "The structural aspect consists of four sections (foundation, roof, doors and windows), the fittings aspect consists of three sections (electrics, plumbing and wiring) and the decorative aspect also consists of three sections (painting, coving and panelling).",
      "The project leader is tasked with arranging the 10 sections in a final report. Determine how many arrangements are possible if:",
    ],
    subparts: [
      "(i) there is no restriction.",
      "(ii) the sections pertaining to any of the three aspects must be together.",
      "(iii) the sections pertaining to any of the three aspects must be together, but with structural first, then fittings and finally decorative.",
    ],
    options: [
      { id: "a", text: "10!" },
      { id: "b", text: "4! × 3! × 3!" },
      { id: "c", text: "3! × 4! × 3! × 3!" },
      { id: "d", text: "All of the above, in different parts" },
    ],
    correctAnswer: "d",
    feedback: "This is a counting question with three separate arrangement cases. Part (i) uses 10!, part (ii) groups the three aspects together, and part (iii) fixes the group order before arranging sections within each aspect.",
    solutions: [
      {
        id: "q3-s1",
        title: "Recognise the reversal",
        explanation: "Bayes is helpful when the known conditional is the reverse of the one required.",
        formula: "P(A|B) = P(B|A)P(A) / P(B)",
        example: "We move from evidence given cause to cause given evidence.",
        tags: ["reverse", "update", "cause"],
      },
      {
        id: "q3-s2",
        title: "Identify the parts",
        explanation: "P(A) is the prior, P(B|A) is the likelihood, and P(B) normalises the result.",
        example: "These parts combine to produce a revised probability.",
        tags: ["prior", "likelihood", "posterior"],
      },
    ],
    theory: [
      {
        id: "q3-t1",
        title: "Bayes in words",
        explanation: "Posterior probability equals weighted evidence divided by total evidence.",
        example: "It answers how belief should change after data arrives.",
        tags: ["posterior", "evidence", "belief"],
      },
      {
        id: "q3-t2",
        title: "Connection to total probability",
        explanation: "The denominator P(B) is often found using the law of total probability.",
        example: "That is why Bayes and partitions often appear together.",
        tags: ["total probability", "partition", "denominator"],
      },
    ],
    examples: [
      {
        id: "q3-e1",
        title: "Medical screening",
        explanation: "A rare disease can still give many false positives even with a good test.",
        example: "Bayes helps explain why the posterior may remain low.",
        tags: ["screening", "rare", "false positive"],
      },
      {
        id: "q3-e2",
        title: "Factory source",
        explanation: "If two factories supply products, Bayes can identify the probability a defective item came from factory A.",
        example: "You combine each factory share with its defect rate.",
        tags: ["factory", "source", "defect"],
      },
    ],
  },
  q3a: {
    id: "q3a",
    label: "Question 3.b",
    topic: "Q3 (b)",
    text: "Determine the number of ways the four selected sections can be chosen under the stated restrictions.",
    fullPrompt: [
      "Four of the ten sections of the final report are to be selected to be checked for errors. Adam is qualified to check the structural sections only and Elle the fitting and decorative sections only.",
      "Determine the number of ways the four sections to be checked might be selected if:",
    ],
    subparts: [
      "(i) there is no restriction.",
      "(ii) there must be at least two aspects represented in the selected four.",
      "(iii) Adam checks all four sections or Elle checks all four sections.",
      "(iv) Adam checks two sections and Elle checks two sections.",
    ],
    options: [
      { id: "a", text: "10C4 only" },
      { id: "b", text: "Separate combinations by eligibility and aspect coverage" },
      { id: "c", text: "Use a normal distribution" },
      { id: "d", text: "Use a Poisson process" },
    ],
    correctAnswer: "b",
    feedback: "This is a selection-counting problem. You must count combinations under different restrictions about aspect representation and who is eligible to check which sections.",
    solutions: [
      {
        id: "q3a-s1",
        title: "Read the definition directly",
        explanation: "Independence is defined by no change in probability after conditioning.",
        formula: "P(A|B) = P(A)",
        example: "This is the clearest statement of independence.",
        tags: ["definition", "given B", "no change"],
      },
      {
        id: "q3a-s2",
        title: "Equivalent product rule",
        explanation: "The same idea can also be written as a joint-probability rule.",
        formula: "P(A ∩ B) = P(A)P(B)",
        example: "Either form is valid for testing independence.",
        tags: ["joint rule", "product", "equivalent"],
      },
    ],
    theory: [
      {
        id: "q3a-t1",
        title: "Independence versus exclusivity",
        explanation: "Independent events are not the same as mutually exclusive events.",
        example: "Mutually exclusive events cannot happen together unless one has probability 0.",
        tags: ["contrast", "exclusive", "common confusion"],
      },
      {
        id: "q3a-t2",
        title: "How to test",
        explanation: "Compare P(A ∩ B) with P(A)P(B) or compare P(A|B) with P(A).",
        example: "If they match, the events are independent.",
        tags: ["test", "compare", "rule"],
      },
    ],
    examples: [
      {
        id: "q3a-e1",
        title: "Coin and die",
        explanation: "A coin flip result does not alter the probability of rolling a 4 on a die.",
        example: "That makes the events independent.",
        tags: ["coin", "die", "unrelated"],
      },
      {
        id: "q3a-e2",
        title: "Cards without replacement",
        explanation: "Two draws without replacement are usually not independent because the first draw changes the deck.",
        example: "This is a useful contrast case.",
        tags: ["cards", "without replacement", "dependence"],
      },
    ],
  },
  q4: {
    id: "q4",
    label: "Question 3.c",
    topic: "Q3 (c)",
    text: "Determine how many three-character document codes are possible under each restriction.",
    fullPrompt: [
      "The firm are developing a coding system to assist in the document management process. The code will consist of three characters, the first two are to be one of the 26 uppercase letters (A–Z), and the third a digit 1, 2 or 3.",
      "Examples include WQ2 and FF1. Determine how many codes are possible:",
    ],
    subparts: [
      "(i) if there is no restriction.",
      "(ii) if the letters cannot be repeated.",
      "(iii) if the letter I and the number 1 may not be used in the same code.",
      "(iv) if one letter is a vowel (A, E, I, O or U) the other letter must be also.",
    ],
    options: [
      { id: "a", text: "26 × 26 × 3 is one base count" },
      { id: "b", text: "The code count must consider the restrictions separately" },
      { id: "c", text: "Only vowels can be used" },
      { id: "d", text: "The answer is always 26^3" },
    ],
    correctAnswer: "b",
    feedback: "This is a structured counting question. Start from the unrestricted code count, then apply each separate rule carefully for repeated letters, forbidden combinations, and vowel pairing.",
    solutions: [
      {
        id: "q4-s1",
        title: "Ask the order question",
        explanation: "The fastest way to choose between permutations and combinations is to ask whether rearranging the same items creates a new outcome.",
        formula: "nCk when order does not matter",
        example: "Selecting a committee uses combinations.",
        tags: ["order", "select", "committee"],
      },
      {
        id: "q4-s2",
        title: "Contrast with permutations",
        explanation: "If rearranging the selected items changes the outcome, use permutations instead.",
        formula: "nPk when order matters",
        example: "Assigning president and secretary uses permutations.",
        tags: ["arrange", "positions", "order matters"],
      },
    ],
    theory: [
      {
        id: "q4-t1",
        title: "Combination meaning",
        explanation: "A combination counts groups without caring about arrangement inside the group.",
        formula: "nCk = n! / (k!(n-k)!)",
        example: "Useful for committees, teams, or chosen subsets.",
        tags: ["formula", "groups", "selection"],
      },
      {
        id: "q4-t2",
        title: "Permutation meaning",
        explanation: "A permutation counts ordered selections or arrangements.",
        formula: "nPk = n! / (n-k)!",
        example: "Useful for rankings, codes, or assigned roles.",
        tags: ["arrangement", "ordered", "roles"],
      },
    ],
    examples: [
      {
        id: "q4-e1",
        title: "Committee example",
        explanation: "Choosing 3 students from 10 for a committee does not care about order.",
        example: "So the count is 10C3.",
        tags: ["committee", "selection", "combination"],
      },
      {
        id: "q4-e2",
        title: "Podium example",
        explanation: "Gold, silver, and bronze medals do care about order.",
        example: "So the count uses permutations instead.",
        tags: ["podium", "ranking", "permutation"],
      },
    ],
  },
  q4a: {
    id: "q4a",
    label: "Question 4.a",
    topic: "Q4 (a)",
    text: "Identify the statistical variable types of the highlighted car survey variables.",
    fullPrompt: [
      "Using a statistical classification of variable types, identify the types of all the variables collected in the car usage survey.",
    ],
    options: [
      { id: "a", text: "Classify them as qualitative or quantitative, and where relevant as nominal, ordinal, discrete or continuous" },
      { id: "b", text: "Use Bayes' theorem" },
      { id: "c", text: "Fit a regression line" },
      { id: "d", text: "Use a Poisson model" },
    ],
    correctAnswer: "a",
    feedback: "This is a variable-type classification task. The expected answer is to identify which variables are categorical, ordinal, discrete, or continuous.",
    solutions: [],
    theory: [],
    examples: [],
  },
  q4b: {
    id: "q4b",
    label: "Question 4.b",
    topic: "Q4 (b)",
    text: "Interpret the odometer boxplot shown in the paper.",
    fullPrompt: [
      "A boxplot of odometer is generated using R and shown in the exam paper.",
      "Interpret this plot.",
    ],
    options: [
      { id: "a", text: "Comment on median, spread, skewness and possible outliers" },
      { id: "b", text: "Use a chi-squared test" },
      { id: "c", text: "Apply a Poisson formula" },
      { id: "d", text: "Differentiate the boxplot" },
    ],
    correctAnswer: "a",
    feedback: "A boxplot question is about structure and interpretation: centre, spread, skewness, and unusual values.",
    solutions: [],
    theory: [],
    examples: [],
  },
  q4c: {
    id: "q4c",
    label: "Question 4.c",
    topic: "Q4 (c)",
    text: "Interpret the standard deviation and estimate the inter-quartile range from the plot.",
    fullPrompt: [
      "An analysis of the odometer variable finds that the standard deviation is 50.4.",
      "Interpret this statistic and use the plot in part (b) to estimate the inter-quartile range.",
    ],
    options: [
      { id: "a", text: "Explain spread around the mean and estimate IQR from the box width" },
      { id: "b", text: "Use only the mode" },
      { id: "c", text: "Ignore the boxplot" },
      { id: "d", text: "Convert it to a z-score only" },
    ],
    correctAnswer: "a",
    feedback: "The standard deviation describes typical variation around the mean, while the IQR is estimated from the distance between Q1 and Q3 on the boxplot.",
    solutions: [],
    theory: [],
    examples: [],
  },
  q4d: {
    id: "q4d",
    label: "Question 4.d",
    topic: "Q4 (d)",
    text: "Give one clustered scatterplot example and one bubble plot example using the car survey variables.",
    fullPrompt: [
      "Using the variables in the car survey data, give examples where the data might be visualised using (i) a clustered scatterplot and (ii) a bubble plot.",
    ],
    options: [
      { id: "a", text: "Choose variable combinations that show relationships and group differences" },
      { id: "b", text: "Use only one variable each time" },
      { id: "c", text: "Avoid any grouping variable" },
      { id: "d", text: "Use a binomial distribution" },
    ],
    correctAnswer: "a",
    feedback: "This is a data-visualisation design question. The answer should pair meaningful variables and explain why each plot is suitable.",
    solutions: [],
    theory: [],
    examples: [],
  },
  q5: {
    id: "q5",
    label: "Question 5.a",
    topic: "Q5 (a)",
    text: "For each listed survey question, identify a suitable chart and an inferential method.",
    fullPrompt: [
      "For each of the following questions pertaining to the car usage survey, identify a suitable chart to visualise the data and state an inferential method that might be used to help answer each question.",
      "The paper then lists five separate applied questions about maintenance, insurance, fuel type, age, and costs.",
    ],
    options: [
      { id: "a", text: "Match each research question to both a chart and a relevant statistical test" },
      { id: "b", text: "Use the same chart and test for every part" },
      { id: "c", text: "Use only a Poisson model" },
      { id: "d", text: "Ignore the variable types" },
    ],
    correctAnswer: "a",
    feedback: "This is a method-selection question. The answer depends on whether each variable pairing is numeric, categorical, paired, grouped, or relational.",
    solutions: [],
    theory: [],
    examples: [],
  },
  q5a: {
    id: "q5a",
    label: "Question 5.b",
    topic: "Q5 (b)",
    text: "Explain the difference between statistical significance and practical importance.",
    fullPrompt: [
      "The appropriate analysis for the first question in part (a) is carried out and the analyst reports that maintenance costs in the current year were higher than in the previous year by an amount that was statistically significant but not practically important.",
      "Explain the distinction between statistically significant and practically important.",
    ],
    options: [
      { id: "a", text: "Statistical significance concerns evidence; practical importance concerns real-world size and impact" },
      { id: "b", text: "They mean exactly the same thing" },
      { id: "c", text: "Practical importance ignores data" },
      { id: "d", text: "Only practical importance uses probability" },
    ],
    correctAnswer: "a",
    feedback: "A result can be statistically significant because the data give strong evidence of a difference, while the size of that difference may still be too small to matter in practice.",
    solutions: [],
    theory: [],
    examples: [],
  },
  q6: {
    id: "q6",
    label: "Question 6.a",
    topic: "Q6 (a)",
    text: "Interpret the regression slope and assess whether a specific maintenance value is above average.",
    fullPrompt: [
      "Using the car sales survey data, a simple regression model was used to relate this year's maintenance charge to registration year, with the model given by maintenance = 117,450 - 58 year.",
      "Interpret the value -58 and assess whether a respondent with registration year 2020 and maintenance of €170 might be considered above average compared to other respondents.",
    ],
    options: [
      { id: "a", text: "Interpret the slope as the average change in maintenance for a one-year increase in registration year" },
      { id: "b", text: "Treat -58 as a probability" },
      { id: "c", text: "Ignore the fitted model" },
      { id: "d", text: "Use a chi-squared test only" },
    ],
    correctAnswer: "a",
    feedback: "The regression coefficient describes expected change in maintenance as registration year changes. The second part compares the observed value with the fitted value from the model.",
    solutions: [],
    theory: [],
    examples: [],
  },
  q6a: {
    id: "q6a",
    label: "Question 6.b",
    topic: "Q6 (b)",
    text: "State a method to assess predictor usefulness and another to assess model fit.",
    fullPrompt: [
      "For the regression model in part (a), what statistical method might be used to decide if year is a meaningful predictor of maintenance, and what method might be used to quantify how well the model fits the data?",
    ],
    options: [
      { id: "a", text: "Use a regression significance test and a fit measure such as R-squared" },
      { id: "b", text: "Use only a histogram" },
      { id: "c", text: "Use a binomial PMF" },
      { id: "d", text: "Use a complement rule" },
    ],
    correctAnswer: "a",
    feedback: "This question is about regression inference and fit: whether the predictor contributes meaningfully, and how much variation the model explains.",
    solutions: [],
    theory: [],
    examples: [],
  },
  q6b: {
    id: "q6b",
    label: "Question 6.c",
    topic: "Q6 (c)",
    text: "Explain what is meant by confounding in this regression context.",
    fullPrompt: [
      "A second regression analysis finds that there is a statistically significant, negative relationship between current maintenance costs and age.",
      "However, there is a suspicion that this relationship is confounded by registration year. Explain what is meant by confounding.",
    ],
    options: [
      { id: "a", text: "Confounding means a third variable distorts or partly explains the observed relationship" },
      { id: "b", text: "Confounding means the regression line has slope zero" },
      { id: "c", text: "Confounding means all data are normal" },
      { id: "d", text: "Confounding means there is no sample" },
    ],
    correctAnswer: "a",
    feedback: "Confounding occurs when another variable is related to both the predictor and the outcome, making the observed relationship misleading or partly explained by that third factor.",
    solutions: [],
    theory: [],
    examples: [],
  },
};

const questionIdsByYear: Record<number, string[]> = {
  2022: ["q1", "q1a", "q2", "q2a", "q3", "q4"],
  2023: ["q1", "q1a", "q1b", "q2", "q2a", "q3", "q3a", "q4", "q4a", "q4b", "q4c", "q4d", "q5", "q5a", "q6", "q6a", "q6b"],
  2024: ["q1", "q1a", "q1b", "q2", "q3", "q3a", "q4"],
  2025: ["q1", "q2", "q2a", "q3", "q3a", "q4"],
};

const years = [2022, 2023, 2024, 2025];

export default function Study() {
  const { examId } = useParams();
  const course = getLectureCourse(examId);
  const lectureHref = `/lectures/${course.id}/videos/${course.videoItems[0].id}`;

  const [selectedYear, setSelectedYear] = useState(2023);
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [slidesApi, setSlidesApi] = useState<CarouselApi>();
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

  const pastExamFiles: Record<string, Partial<Record<number, { paper?: string; solutions?: string }>>> = {
    "probability-statistics": {
      2022: { paper: "2022-paper.doc" },
      2023: { paper: "2023-paper.docx", solutions: "2023-solutions.docx" },
      2024: { paper: "2024-paper.docx", solutions: "2024-solutions.docx" },
      2025: { paper: "2025-paper.docx" },
    },
  };

  const selectedYearFiles = examId ? pastExamFiles[examId]?.[selectedYear] : undefined;
  const paperUrl =
    examId && selectedYearFiles?.paper ? getPastExamFileUrl(examId, selectedYearFiles.paper) : null;
  const solutionsUrl =
    examId && selectedYearFiles?.solutions ? getPastExamFileUrl(examId, selectedYearFiles.solutions) : null;

  const questionList = useMemo(() => {
    const ids = questionIdsByYear[selectedYear] ?? questionIdsByYear[2023];
    return ids.map((id) => examQuestionBank[id]).filter(Boolean);
  }, [selectedYear]);

  const activeQuestion = questionList[activeQuestionIndex] ?? questionList[0];

  useEffect(() => {
    setActiveQuestionIndex(0);
    setSelectedAnswer(null);
    setActiveSlideIndex(0);
    slidesApi?.scrollTo(0);
  }, [selectedYear, examId]);

  useEffect(() => {
    setSelectedAnswer(null);
  }, [activeQuestionIndex]);

  useEffect(() => {
    if (!slidesApi) return;

    const updateIndex = () => {
      const selectedIndex = slidesApi.selectedScrollSnap();
      setActiveSlideIndex(selectedIndex);
      setActiveQuestionIndex(selectedIndex);
    };

    updateIndex();
    slidesApi.on("select", updateIndex);
  }, [slidesApi]);

  if (!activeQuestion) {
    return null;
  }

  return (
    <div className="min-h-screen relative p-4 sm:p-6">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            'url(https://images.unsplash.com/photo-1627556704465-fa360ceb4f6f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920)',
        }}
      />
      <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-sm" />

      <div className="relative z-10 mx-auto max-w-[1750px]">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
          <Link
            to="/lectures"
            className="inline-flex items-center gap-2 text-slate-300 transition-colors hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Link>

          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm font-medium text-slate-300">Exam Year:</span>
            {years.map((year) => (
              <button
                key={year}
                onClick={() => setSelectedYear(year)}
                className={`rounded-xl px-4 py-2 text-sm font-medium transition-colors ${
                  selectedYear === year
                    ? "bg-blue-600 text-white"
                    : "border border-white/15 bg-white/10 text-slate-300 hover:bg-white/15"
                }`}
              >
                {year}
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-[28px] border border-white/10 bg-[#050922]/95 p-4 shadow-[0_30px_80px_rgba(4,8,32,0.45)] sm:p-6">
          <div className="grid items-start gap-6 xl:grid-cols-[minmax(0,1fr)_350px]">
            <div className="min-w-0">
              <div className="mb-5 flex flex-wrap items-start justify-between gap-4">
                <div>
                  <div className="mb-3 flex flex-wrap items-center gap-3">
                    <Link
                      to={lectureHref}
                      className="rounded-full border border-white/15 bg-white px-4 py-2 text-sm font-semibold text-slate-900 transition-colors hover:bg-slate-100"
                    >
                      Learning Mode
                    </Link>
                    <span className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-white">
                      Exam Mode
                    </span>
                  </div>
                  <p className="mb-2 text-sm uppercase tracking-[0.25em] text-slate-400">Exam Mode</p>
                  <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                    {course.title} {selectedYear}
                  </h1>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  {paperUrl ? (
                    <a
                      href={paperUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-white/15"
                    >
                      <Download className="h-4 w-4" />
                      Paper
                    </a>
                  ) : null}
                  {solutionsUrl ? (
                    <a
                      href={solutionsUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-white/15"
                    >
                      <FileText className="h-4 w-4" />
                      Solutions File
                    </a>
                  ) : null}
                </div>
              </div>

              <div className="mb-6 flex items-center justify-end">
                <span className="text-sm font-medium text-slate-300">
                  {activeSlideIndex + 1}/{questionList.length}
                </span>
              </div>

              <Carousel
                key={`${course.id}-${selectedYear}`}
                setApi={setSlidesApi}
                className="mb-6 w-full px-10"
                opts={{ loop: false }}
              >
                <CarouselContent>
                  {questionList.map((question) => (
                    <CarouselItem key={question.id} className="basis-full">
                      <article className="h-[460px] overflow-y-auto rounded-[32px] bg-white p-7 text-slate-900 shadow-[0_20px_60px_rgba(15,23,42,0.16)] sm:p-8">
                        <p className="mb-2 text-sm font-semibold uppercase tracking-[0.22em] text-slate-400">
                          {question.label}
                        </p>
                        <h2 className="mb-5 text-3xl font-semibold tracking-tight">{question.topic}</h2>
                        <div className="space-y-4 text-xl leading-10 text-slate-800">
                          {question.fullPrompt?.map((paragraph) => (
                            <p key={paragraph}>{paragraph}</p>
                          ))}
                          {question.subparts ? (
                            <div className="space-y-2 pl-6">
                              {question.subparts.map((part) => (
                                <p key={part}>{part}</p>
                              ))}
                            </div>
                          ) : (
                            <p className="font-semibold text-slate-900">{question.text}</p>
                          )}
                        </div>
                      </article>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="left-0 border-white/20 bg-white/10 text-white hover:bg-white/20 hover:text-white" />
                <CarouselNext className="right-0 border-white/20 bg-white/10 text-white hover:bg-white/20 hover:text-white" />
              </Carousel>

              <div className="px-10">
                <div className="rounded-[28px] bg-white p-6 shadow-[0_20px_60px_rgba(15,23,42,0.16)]">
                <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="mb-1 text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">
                      Answer Area
                    </p>
                    <h3 className="text-2xl font-semibold text-slate-900">
                      {activeQuestion.label}
                    </h3>
                  </div>
                  <span className="rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-600">
                    {activeQuestionIndex + 1}/{questionList.length}
                  </span>
                </div>

                <div className="mb-6 rounded-3xl border border-slate-200 bg-slate-50 px-5 py-4">
                  <p className="text-2xl font-semibold leading-9 text-slate-900">{activeQuestion.text}</p>
                </div>

                <div className="space-y-3">
                  {activeQuestion.options.map((option) => {
                    const isSelected = selectedAnswer === option.id;
                    const isCorrect = option.id === activeQuestion.correctAnswer;
                    const showCorrect = selectedAnswer !== null && isCorrect;
                    const showWrong = isSelected && !isCorrect;

                    return (
                      <button
                        key={option.id}
                        onClick={() => setSelectedAnswer(option.id)}
                        className={`w-full rounded-2xl border p-4 text-left transition-all ${
                          showCorrect
                            ? "border-emerald-400 bg-emerald-50"
                            : showWrong
                              ? "border-rose-400 bg-rose-50"
                              : isSelected
                                ? "border-blue-400 bg-blue-50"
                                : "border-slate-200 bg-white hover:border-slate-300"
                        }`}
                      >
                        <span className="flex items-center gap-3">
                          <span
                            className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 ${
                              showCorrect
                                ? "border-emerald-500 bg-emerald-500"
                                : showWrong
                                  ? "border-rose-500 bg-rose-500"
                                  : isSelected
                                    ? "border-blue-500 bg-blue-500"
                                    : "border-slate-300"
                            }`}
                          >
                            {(showCorrect || showWrong || isSelected) && (
                              <span className="h-2.5 w-2.5 rounded-full bg-white" />
                            )}
                          </span>
                          <span className="text-base text-slate-700">
                            {option.id.toUpperCase()}. {option.text}
                          </span>
                        </span>
                      </button>
                    );
                  })}
                </div>

                {selectedAnswer !== null ? (
                  <div
                    className={`mt-5 rounded-2xl border px-5 py-4 ${
                      selectedAnswer === activeQuestion.correctAnswer
                        ? "border-emerald-200 bg-emerald-50"
                        : "border-amber-200 bg-amber-50"
                    }`}
                  >
                    <div className="mb-2 flex items-center gap-2">
                      <CheckCircle2
                        className={`h-5 w-5 ${
                          selectedAnswer === activeQuestion.correctAnswer
                            ? "text-emerald-600"
                            : "text-amber-600"
                        }`}
                      />
                      <p className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-600">
                        {selectedAnswer === activeQuestion.correctAnswer ? "Correct" : "Explanation"}
                      </p>
                    </div>
                    <p className="text-base leading-7 text-slate-700">{activeQuestion.feedback}</p>
                  </div>
                ) : null}
                </div>
              </div>
            </div>

            <aside className="self-start rounded-[28px] border border-white/10 bg-white/5 p-5">
              <div className="mb-4 flex items-start justify-between gap-3">
                <div>
                  <p className="mb-2 text-sm uppercase tracking-[0.25em] text-slate-300">Question List</p>
                  <h2 className="text-2xl font-semibold text-white">{selectedYear} Paper</h2>
                </div>
                <span className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-slate-300">
                  {questionList.length} items
                </span>
              </div>

              <div className="max-h-[920px] space-y-3 overflow-y-auto pr-1">
                {questionList.map((question, index) => (
                  <button
                    key={question.id}
                    onClick={() => {
                      setActiveQuestionIndex(index);
                      setSelectedAnswer(null);
                      slidesApi?.scrollTo(index);
                    }}
                    className={`w-full rounded-[24px] border p-4 text-left transition-all ${
                      index === activeQuestionIndex
                        ? "border-white/30 bg-white/15"
                        : "border-white/10 bg-[#0a1028] hover:border-white/20 hover:bg-white/10"
                    }`}
                  >
                    <div className="min-w-0">
                      <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                        {question.label}
                      </p>
                      <h3 className="mb-1 text-lg font-semibold text-white">{question.topic}</h3>
                      <p className="line-clamp-2 text-sm leading-6 text-slate-300">{question.text}</p>
                    </div>
                  </button>
                ))}
              </div>
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
}
