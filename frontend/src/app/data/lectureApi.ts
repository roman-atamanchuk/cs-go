export const lectureApiBaseUrl = import.meta.env.VITE_LECTURE_API_URL ?? "http://localhost:4000";

export function getLectureContentUrl(videoId: string) {
  return `${lectureApiBaseUrl}/api/lectures/content/${encodeURIComponent(videoId)}`;
}

export function getLecturePdfUrl(fileName: string) {
  return `${lectureApiBaseUrl}/api/lectures/files/${encodeURIComponent(fileName)}`;
}

export function getPastExamFileUrl(courseId: string, fileName: string) {
  return `${lectureApiBaseUrl}/api/past-exams/files/${encodeURIComponent(courseId)}/${encodeURIComponent(fileName)}`;
}
