import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Play, X } from "lucide-react";
import { youtubeVideos, type YoutubeVideo } from "@/app/data/youtube";

function embedUrl(id: string) {
  return `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`;
}

function thumbnailUrl(id: string) {
  return `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
}

function VideoThumb({
  video,
  onPlay,
  className,
}: {
  video: YoutubeVideo;
  onPlay: () => void;
  className: string;
}) {
  return (
    <button
      type="button"
      onClick={onPlay}
      className={`group relative block overflow-hidden bg-brand-dark text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand ${className}`}
      aria-label={`Reproducir ${video.title}`}
    >
      <img
        src={thumbnailUrl(video.id)}
        alt=""
        loading="lazy"
        className="absolute inset-0 size-full object-cover"
      />
      <span className="absolute inset-0 bg-brand-dark/25 transition-colors group-hover:bg-brand-dark/40" />
      <span className="absolute top-1/2 left-1/2 flex size-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-brand text-brand-dark shadow-lg">
        <Play size={20} fill="currentColor" aria-hidden />
      </span>
      <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-brand-dark/85 to-transparent px-3 pt-8 pb-3 text-sm font-medium text-white">
        {video.title}
      </span>
    </button>
  );
}

export function YoutubeGallery() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [active, setActive] = useState<number | null>(null);
  const video = active == null ? null : youtubeVideos[active];

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (active != null && !dialog.open) dialog.showModal();
    if (active == null && dialog.open) dialog.close();
  }, [active]);

  function step(direction: -1 | 1) {
    setActive((current) => {
      if (current == null) return current;
      return (current + direction + youtubeVideos.length) % youtubeVideos.length;
    });
  }

  const videos = youtubeVideos.filter((item) => item.kind === "video");
  const shorts = youtubeVideos.filter((item) => item.kind === "short");

  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="grid gap-4 md:grid-cols-2">
          {videos.map((item) => (
            <VideoThumb
              key={item.id}
              video={item}
              onPlay={() =>
                setActive(youtubeVideos.findIndex((entry) => entry.id === item.id))
              }
              className="aspect-video w-full rounded-[28px]"
            />
          ))}
        </div>

        <div className="flex gap-3 overflow-x-auto pb-1">
          {shorts.map((item) => (
            <VideoThumb
              key={item.id}
              video={item}
              onPlay={() =>
                setActive(youtubeVideos.findIndex((entry) => entry.id === item.id))
              }
              className="aspect-[9/16] w-[168px] shrink-0 rounded-[24px] sm:w-[190px]"
            />
          ))}
        </div>
      </div>

      <dialog
        ref={dialogRef}
        aria-labelledby="video-titulo"
        className="m-auto w-[min(960px,calc(100%-2rem))] rounded-[28px] border-0 bg-brand-dark p-3 text-white backdrop:bg-black/75 sm:p-4"
        onClose={() => setActive(null)}
        onKeyDown={(event) => {
          if (event.key === "ArrowRight") step(1);
          if (event.key === "ArrowLeft") step(-1);
        }}
      >
        <div className="mb-3 flex items-start justify-between gap-4">
          <div>
            <h3 id="video-titulo" className="font-['Playfair_Display',serif] text-xl">
              {video?.title}
            </h3>
            <p className="mt-1 text-sm text-white/70">
              {active == null ? "" : `${active + 1} de ${youtubeVideos.length}`}
            </p>
          </div>
          <button
            type="button"
            onClick={() => setActive(null)}
            className="flex size-10 shrink-0 items-center justify-center rounded-full bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
            aria-label="Cerrar"
          >
            <X size={18} />
          </button>
        </div>
        {video ? (
          <iframe
            key={video.id}
            className={
              video.kind === "short"
                ? "mx-auto aspect-[9/16] h-[min(72dvh,760px)] w-auto max-w-full rounded-xl"
                : "aspect-video w-full rounded-xl"
            }
            src={embedUrl(video.id)}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        ) : null}
        <div className="mt-3 flex justify-end gap-2">
          <button
            type="button"
            onClick={() => step(-1)}
            className="flex size-10 items-center justify-center rounded-full bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
            aria-label="Video anterior"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            type="button"
            onClick={() => step(1)}
            className="flex size-10 items-center justify-center rounded-full bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
            aria-label="Video siguiente"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </dialog>
    </>
  );
}
