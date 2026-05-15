import probabilityPdf from "@/imports/lectures/01-introduction-to-probability.pdf";
import probabilityRulesPdf from "@/imports/lectures/02-probability-rules.pdf";
import binomialDistributionPdf from "@/imports/lectures/03-binomial-distribution.pdf";
import poissonDistributionPdf from "@/imports/lectures/04-poisson-distribution.pdf";
import normalDistributionPdf from "@/imports/lectures/05-normal-distribution.pdf";
import probabilityModelExamplePdf from "@/imports/lectures/06-probability-model-example.pdf";
import bayesTheoremPdf from "@/imports/lectures/07-bayes-theorem.pdf";
import independencePdf from "@/imports/lectures/08-independence.pdf";
import countingPdf from "@/imports/lectures/09-counting.pdf";
import probabilityCountingProblemsPdf from "@/imports/lectures/10-probability-and-counting-problems.pdf";
import applicationsOfProbabilityPdf from "@/imports/lectures/11-applications-of-probability.pdf";
import introductionToStatisticsPdf from "@/imports/lectures/12-introduction-to-statistics.pdf";
import descriptiveStatisticsOneVariablePdf from "@/imports/lectures/13-descriptive-statistics-one-variable.pdf";
import descriptiveStatisticsTwoVariablesPdf from "@/imports/lectures/14-descriptive-statistics-two-variables.pdf";
import descriptiveStatisticsThreeVariablesPdf from "@/imports/lectures/15-descriptive-statistics-three-variables.pdf";
import descriptiveStatisticsWithRPdf from "@/imports/lectures/16-descriptive-statistics-with-r.pdf";
import inferenceTTestPdf from "@/imports/lectures/17-inference-the-t-test.pdf";
import inferenceTTestContinuedPdf from "@/imports/lectures/18-inference-the-t-test-continued.pdf";
import samplingPdf from "@/imports/lectures/19-sampling.pdf";
import assumptionOfNormalityPdf from "@/imports/lectures/20-assumption-of-normality.pdf";
import pValuesPdf from "@/imports/lectures/21-p-values.pdf";
import pairedTTestPdf from "@/imports/lectures/22-paired-t-test.pdf";
import anovaPdf from "@/imports/lectures/23-anova.pdf";
import anovaAssumptionsPdf from "@/imports/lectures/24-anova-assumptions.pdf";
import chiSquaredTestsPdf from "@/imports/lectures/25-chi-squared-tests.pdf";
import correlationPdf from "@/imports/lectures/26-correlation.pdf";
import simpleRegressionPdf from "@/imports/lectures/27-simple-regression.pdf";
import confoundingPdf from "@/imports/lectures/28-confounding.pdf";
import shot1 from "@/imports/Screenshot_2026-04-19_at_23.43.32.png";
import shot2 from "@/imports/Screenshot_2026-04-19_at_23.47.10.png";
import shot3 from "@/imports/Screenshot_2026-04-20_at_00.07.21.png";
import shot4 from "@/imports/Screenshot_2026-04-20_at_00.12.02.png";
import shot5 from "@/imports/Screenshot_2026-04-20_at_00.30.00.png";
import shot6 from "@/imports/Screenshot_2026-04-20_at_00.39.18.png";
import shot7 from "@/imports/Screenshot_2026-04-20_at_00.45.45.png";
import shot8 from "@/imports/Screenshot_2026-04-20_at_00.47.03.png";
import shot9 from "@/imports/Screenshot_2026-04-20_at_00.51.41.png";
import shot10 from "@/imports/Screenshot_2026-04-20_at_01.17.13.png";
import shot11 from "@/imports/Screenshot_2026-04-20_at_01.39.30.png";
import shot12 from "@/imports/Screenshot_2026-04-20_at_01.39.35.png";
import shot13 from "@/imports/Screenshot_2026-04-20_at_01.39.35-1.png";
import shot14 from "@/imports/Screenshot_2026-04-20_at_01.51.13.png";
import shot15 from "@/imports/Screenshot_2026-04-20_at_03.05.47.png";

export type LectureVideo = {
  id: string;
  title: string;
  image: string;
  section?: string;
  pdfLink?: string;
  watchUrl?: string;
  embedUrl?: string;
};

export type LectureCourse = {
  id: string;
  title: string;
  code: string;
  instructor: string;
  videos: number;
  duration: string;
  color: "blue" | "purple" | "green" | "orange" | "indigo" | "teal";
  pdfLink: string;
  videoItems: LectureVideo[];
};

const galleryImages = [
  shot1,
  shot2,
  shot3,
  shot4,
  shot5,
  shot6,
  shot7,
  shot8,
  shot9,
  shot10,
  shot11,
  shot12,
  shot13,
  shot14,
  shot15,
];

function buildVideoItems(courseId: string, total: number, sectionTitles: string[]) {
  return Array.from({ length: total }, (_, index) => ({
    id: `${courseId}-video-${index + 1}`,
    title: `${sectionTitles[index % sectionTitles.length]} Part ${Math.floor(index / sectionTitles.length) + 1}`,
    image: galleryImages[index % galleryImages.length],
    section: "Lecture Videos",
  }));
}

export const lectureCourses: LectureCourse[] = [
  {
    id: "probability-statistics",
    title: "Probability and Statistics",
    code: "CS201",
    instructor: "Dr. Sarah Johnson",
    videos: 24,
    duration: "12 hours",
    color: "blue",
    pdfLink: probabilityPdf,
    videoItems: [
      {
        id: "probability-statistics-video-01",
        title: "01 Introduction to probability",
        image: shot1,
        section: "Probability lectures",
        pdfLink: probabilityPdf,
        watchUrl: "https://www.youtube.com/watch?v=4T3aOIfNdTY&list=PLMrJAkhIeNNR3sNYvfgiKgcStwuPSts9V&index=2",
        embedUrl: "https://www.youtube.com/embed/4T3aOIfNdTY?list=PLMrJAkhIeNNR3sNYvfgiKgcStwuPSts9V",
      },
      {
        id: "probability-statistics-video-02",
        title: "02 Probability rules",
        image: shot2,
        section: "Probability lectures",
        pdfLink: probabilityRulesPdf,
      },
      {
        id: "probability-statistics-video-03",
        title: "03 Binomial distribution",
        image: shot3,
        section: "Probability lectures",
        pdfLink: binomialDistributionPdf,
      },
      {
        id: "probability-statistics-video-04",
        title: "04 Poisson distribution",
        image: shot4,
        section: "Probability lectures",
        pdfLink: poissonDistributionPdf,
      },
      {
        id: "probability-statistics-video-05",
        title: "05 Normal distribution",
        image: shot5,
        section: "Probability lectures",
        pdfLink: normalDistributionPdf,
      },
      {
        id: "probability-statistics-video-06",
        title: "11 Applications of probability",
        image: shot6,
        section: "Probability lectures",
        pdfLink: applicationsOfProbabilityPdf,
      },
      {
        id: "probability-statistics-video-07",
        title: "06 Probability Model Example",
        image: shot7,
        section: "Probability lectures",
        pdfLink: probabilityModelExamplePdf,
      },
      {
        id: "probability-statistics-video-08",
        title: "07 Bayes Theorem",
        image: shot8,
        section: "Probability lectures",
        pdfLink: bayesTheoremPdf,
      },
      {
        id: "probability-statistics-video-09",
        title: "08 Independence",
        image: shot9,
        section: "Probability lectures",
        pdfLink: independencePdf,
      },
      {
        id: "probability-statistics-video-10",
        title: "09 Counting",
        image: shot10,
        section: "Probability lectures",
        pdfLink: countingPdf,
      },
      {
        id: "probability-statistics-video-11",
        title: "10 Probability and Counting problems",
        image: shot11,
        section: "Probability lectures",
        pdfLink: probabilityCountingProblemsPdf,
      },
      { id: "probability-statistics-video-12", title: "12 Introduction to statistics", image: shot12, section: "Statistics lectures", pdfLink: introductionToStatisticsPdf },
      { id: "probability-statistics-video-13", title: "13 Descriptive Statistics - One variable", image: shot13, section: "Statistics lectures", pdfLink: descriptiveStatisticsOneVariablePdf },
      { id: "probability-statistics-video-14", title: "14 Descriptive Statistics - Two variables", image: shot14, section: "Statistics lectures", pdfLink: descriptiveStatisticsTwoVariablesPdf },
      { id: "probability-statistics-video-15", title: "15 Descriptive Statistics - Three variables", image: shot15, section: "Statistics lectures", pdfLink: descriptiveStatisticsThreeVariablesPdf },
      { id: "probability-statistics-video-16", title: "16 Descriptive Statistics with R", image: shot1, section: "Statistics lectures", pdfLink: descriptiveStatisticsWithRPdf },
      { id: "probability-statistics-video-17", title: "17 Inference - the t test", image: shot2, section: "Statistics lectures", pdfLink: inferenceTTestPdf },
      { id: "probability-statistics-video-18", title: "18 Inference - the t test - continued", image: shot3, section: "Statistics lectures", pdfLink: inferenceTTestContinuedPdf },
      { id: "probability-statistics-video-19", title: "19 Sampling", image: shot4, section: "Statistics lectures", pdfLink: samplingPdf },
      { id: "probability-statistics-video-20", title: "20 Assumption of normality", image: shot5, section: "Statistics lectures", pdfLink: assumptionOfNormalityPdf },
      { id: "probability-statistics-video-21", title: "21 p values", image: shot6, section: "Statistics lectures", pdfLink: pValuesPdf },
      { id: "probability-statistics-video-22", title: "22 Paired t test", image: shot7, section: "Statistics lectures", pdfLink: pairedTTestPdf },
      { id: "probability-statistics-video-23", title: "23 ANOVA", image: shot8, section: "Statistics lectures", pdfLink: anovaPdf },
      { id: "probability-statistics-video-24", title: "24 ANOVA assumptions", image: shot9, section: "Statistics lectures", pdfLink: anovaAssumptionsPdf },
      { id: "probability-statistics-video-25", title: "25 Chi squared tests", image: shot10, section: "Statistics lectures", pdfLink: chiSquaredTestsPdf },
      { id: "probability-statistics-video-26", title: "26 Correlation", image: shot11, section: "Statistics lectures", pdfLink: correlationPdf },
      { id: "probability-statistics-video-27", title: "27 Simple Regression", image: shot12, section: "Statistics lectures", pdfLink: simpleRegressionPdf },
      { id: "probability-statistics-video-28", title: "28 Confounding", image: shot13, section: "Statistics lectures", pdfLink: confoundingPdf },
    ],
  },
  {
    id: "web-development",
    title: "Web Development Fundamentals",
    code: "WEB101",
    instructor: "Prof. Michael Chen",
    videos: 18,
    duration: "9 hours",
    color: "purple",
    pdfLink: probabilityPdf,
    videoItems: buildVideoItems("web-development", 18, [
      "HTML Page Structure",
      "Responsive Layout Basics",
      "CSS Components",
      "JavaScript Events",
      "Forms and Validation",
      "Frontend Routing",
    ]),
  },
  {
    id: "database-systems",
    title: "Database Management Systems",
    code: "DB301",
    instructor: "Dr. Emma Williams",
    videos: 20,
    duration: "10 hours",
    color: "green",
    pdfLink: probabilityPdf,
    videoItems: buildVideoItems("database-systems", 20, [
      "Relational Model",
      "Entity Relationship Design",
      "SQL Queries",
      "Joins and Aggregation",
      "Normalization",
    ]),
  },
  {
    id: "software-engineering",
    title: "Probability and Statistics",
    code: "SE202",
    instructor: "Prof. James Brown",
    videos: 16,
    duration: "8 hours",
    color: "orange",
    pdfLink: probabilityPdf,
    videoItems: buildVideoItems("software-engineering", 16, [
      "Probability Foundations",
      "Sampling Techniques",
      "Hypothesis Testing",
      "Regression Overview",
    ]),
  },
  {
    id: "computer-networks",
    title: "Computer Networks",
    code: "NET401",
    instructor: "Dr. Lisa Anderson",
    videos: 22,
    duration: "11 hours",
    color: "indigo",
    pdfLink: probabilityPdf,
    videoItems: buildVideoItems("computer-networks", 22, [
      "Network Layers",
      "IP Addressing",
      "Routing Concepts",
      "Transport Protocols",
      "Network Security",
      "Troubleshooting",
    ]),
  },
  {
    id: "operating-systems",
    title: "Operating Systems",
    code: "OS301",
    instructor: "Prof. David Lee",
    videos: 19,
    duration: "9.5 hours",
    color: "teal",
    pdfLink: probabilityPdf,
    videoItems: buildVideoItems("operating-systems", 19, [
      "Process Management",
      "Scheduling",
      "Memory Allocation",
      "File Systems",
      "Concurrency",
    ]),
  },
];

export function getLectureCourse(courseId?: string) {
  return lectureCourses.find((course) => course.id === courseId) ?? lectureCourses[0];
}

export function getLectureVideo(courseId?: string, videoId?: string) {
  const course = getLectureCourse(courseId);
  const video = course.videoItems.find((item) => item.id === videoId) ?? course.videoItems[0];

  return { course, video };
}
