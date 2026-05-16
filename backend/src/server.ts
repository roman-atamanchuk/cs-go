import { createReadStream, existsSync } from "node:fs";
import { stat } from "node:fs/promises";
import { createServer } from "node:http";
import { basename, extname, join, resolve } from "node:path";
import {
  additionalProbabilityLectureExperiences,
  introductionQuestionBank,
  introductionSlides,
  introductionSupportVideos,
  probabilityRulesQuestionBank,
  probabilityRulesSlides,
  probabilityRulesSupportVideos,
  type LectureExperience,
} from "./data/lectureContent.ts";

const PORT = Number(process.env.PORT ?? "4000");
const HOST = process.env.HOST ?? "0.0.0.0";
const lecturesDir = resolve(process.cwd(), "..", "frontend", "src", "imports", "lectures");
const pastExamsDir = resolve(process.cwd(), "..", "frontend", "src", "imports", "past-exams");

function getLectureExperience(videoId: string): LectureExperience | null {
  if (videoId === "probability-statistics-video-01") {
    return {
      slides: introductionSlides,
      questionBank: introductionQuestionBank,
      supportVideos: introductionSupportVideos,
    };
  }

  if (videoId === "probability-statistics-video-02") {
    return {
      slides: probabilityRulesSlides,
      questionBank: probabilityRulesQuestionBank,
      supportVideos: probabilityRulesSupportVideos,
    };
  }

  return additionalProbabilityLectureExperiences[videoId] ?? null;
}

function sendJson(response: Parameters<typeof createServer>[0] extends never ? never : any, statusCode: number, data: unknown) {
  response.writeHead(statusCode, {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Content-Type": "application/json; charset=utf-8",
  });
  response.end(JSON.stringify(data));
}

function sendNotFound(response: Parameters<typeof createServer>[0] extends never ? never : any, message: string) {
  sendJson(response, 404, { error: message });
}

const server = createServer(async (request, response) => {
  const url = new URL(request.url ?? "/", `http://${request.headers.host ?? "localhost"}`);

  if (request.method === "OPTIONS") {
    response.writeHead(204, {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    });
    response.end();
    return;
  }

  if (request.method !== "GET" && request.method !== "HEAD") {
    sendJson(response, 405, { error: "Method not allowed" });
    return;
  }

  if (url.pathname === "/api/health") {
    if (request.method === "HEAD") {
      response.writeHead(200, {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
        "Content-Type": "application/json; charset=utf-8",
      });
      response.end();
      return;
    }

    sendJson(response, 200, { ok: true });
    return;
  }

  if (url.pathname.startsWith("/api/lectures/content/")) {
    const videoId = decodeURIComponent(url.pathname.replace("/api/lectures/content/", ""));
    const experience = getLectureExperience(videoId);

    if (!experience) {
      sendNotFound(response, `No lecture content found for ${videoId}`);
      return;
    }

    if (request.method === "HEAD") {
      response.writeHead(200, {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
        "Content-Type": "application/json; charset=utf-8",
      });
      response.end();
      return;
    }

    sendJson(response, 200, experience);
    return;
  }

  if (url.pathname.startsWith("/api/lectures/files/")) {
    const requestedFile = decodeURIComponent(url.pathname.replace("/api/lectures/files/", ""));
    const safeFileName = basename(requestedFile);
    const filePath = join(lecturesDir, safeFileName);

    if (safeFileName !== requestedFile || extname(safeFileName).toLowerCase() !== ".pdf" || !existsSync(filePath)) {
      sendNotFound(response, `Lecture PDF not found: ${requestedFile}`);
      return;
    }

    const fileStats = await stat(filePath);
    response.writeHead(200, {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/pdf",
      "Content-Length": fileStats.size,
      "Content-Disposition": `inline; filename="${safeFileName}"`,
      "Cache-Control": "no-cache",
    });
    if (request.method === "HEAD") {
      response.end();
      return;
    }

    createReadStream(filePath).pipe(response);
    return;
  }

  if (url.pathname.startsWith("/api/past-exams/files/")) {
    const requestedPath = decodeURIComponent(url.pathname.replace("/api/past-exams/files/", ""));
    const safeRequestedPath = requestedPath.replace(/^\/+/, "");
    const filePath = resolve(pastExamsDir, safeRequestedPath);

    if (
      !filePath.startsWith(pastExamsDir) ||
      !existsSync(filePath)
    ) {
      sendNotFound(response, `Past exam file not found: ${requestedPath}`);
      return;
    }

    const fileStats = await stat(filePath);
    const safeFileName = basename(filePath);
    const extension = extname(filePath).toLowerCase();
    const contentType =
      extension === ".pdf"
        ? "application/pdf"
        : extension === ".docx"
          ? "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          : extension === ".doc"
            ? "application/msword"
            : "application/octet-stream";

    response.writeHead(200, {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": contentType,
      "Content-Length": fileStats.size,
      "Content-Disposition": `inline; filename="${safeFileName}"`,
      "Cache-Control": "no-cache",
    });
    if (request.method === "HEAD") {
      response.end();
      return;
    }

    createReadStream(filePath).pipe(response);
    return;
  }

  sendNotFound(response, "Route not found");
});

server.listen(PORT, HOST, () => {
  console.log(`Lecture backend running on http://${HOST}:${PORT}`);
});
