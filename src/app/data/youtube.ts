/**
 * Videos publicados en el canal Dr Jaime Pinzon.
 * Fuente: https://www.youtube.com/channel/UCuRjAOddn9UDHBnLxSJzSsg
 */
export type YoutubeVideo = {
  id: string;
  title: string;
  kind: "video" | "short";
};

export const youtubeVideos: YoutubeVideo[] = [
  { id: "Wr1dbyYULqM", title: "Carillas cerámicas", kind: "video" },
  { id: "deYKzY5nMDU", title: "Bordes incisales", kind: "video" },
  { id: "i--oGwUzbA0", title: "Ortodoncia invisible", kind: "short" },
  { id: "YEgcCF4g1K8", title: "Ortodoncia", kind: "short" },
  { id: "hTS-uubMRgc", title: "Gingivoplastia y bordes", kind: "short" },
  { id: "60pkj1kiniE", title: "Ortodoncia", kind: "short" },
  {
    id: "LgEpgP_5Sxg",
    title: "Reconstrucción de fractura central",
    kind: "short",
  },
  { id: "OA4n7T6nFOE", title: "Testimonio", kind: "short" },
  { id: "6tXrpgwUwWM", title: "Resina posterior", kind: "short" },
];
