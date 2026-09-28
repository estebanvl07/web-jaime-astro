import { useEffect, useRef, useState, type PointerEvent } from "react";
import { ChevronLeft, ChevronRight, Play, X } from "lucide-react";
import { LazyImage } from "@/app/components/LazyImage";

const VIDEO_SRC = "/images/real_case/Video.mov";

type CasePhoto = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

const CASES: CasePhoto[] = [
  {
    src: "/images/real_case/image12.avif",
    alt: "Sonrisa antes y después de una rehabilitación estética anterior",
    width: 2048,
    height: 2048,
  },
  {
    src: "/images/real_case/image13.avif",
    alt: "Detalle de encía y brackets durante un procedimiento de ortodoncia",
    width: 4000,
    height: 1589,
  },
  {
    src: "/images/real_case/image11.avif",
    alt: "Incisivo fracturado y el mismo diente restaurado",
    width: 1083,
    height: 1452,
  },
  {
    src: "/images/real_case/image1.avif",
    alt: "Espacio entre incisivos y la misma zona con brackets",
    width: 1440,
    height: 1440,
  },
  {
    src: "/images/real_case/image0.avif",
    alt: "Secuencia clínica del contorno de la encía en los dientes anteriores",
    width: 1080,
    height: 1080,
  },
  {
    src: "/images/real_case/image3.avif",
    alt: "Bordes incisales reconstruidos comparados con el desgaste previo",
    width: 1440,
    height: 1440,
  },
  {
    src: "/images/real_case/image7.avif",
    alt: "Diastema central antes del tratamiento y después del cierre",
    width: 1440,
    height: 1440,
  },
  {
    src: "/images/real_case/image15.avif",
    alt: "Separación entre incisivos superiores antes y después del tratamiento",
    width: 1254,
    height: 1254,
  },
  {
    src: "/images/real_case/image4.avif",
    alt: "Arco con brackets y el resultado de la alineación",
    width: 1080,
    height: 1080,
  },
  {
    src: "/images/real_case/image8.avif",
    alt: "Apiñamiento anterior y la misma arcada con brackets",
    width: 1440,
    height: 1440,
  },
  {
    src: "/images/real_case/image16.avif",
    alt: "Progreso de ortodoncia con brackets estéticos",
    width: 1254,
    height: 1254,
  },
  {
    src: "/images/real_case/image2.avif",
    alt: "Mordida abierta anterior antes y después del tratamiento",
    width: 1440,
    height: 1440,
  },
  {
    src: "/images/real_case/image6.avif",
    alt: "Comparación de la alineación de los dientes anteriores",
    width: 1440,
    height: 1440,
  },
  {
    src: "/images/real_case/image9.avif",
    alt: "Rehabilitación de dientes anteriores desgastados",
    width: 2048,
    height: 2048,
  },
  {
    src: "/images/real_case/image14.avif",
    alt: "Comparación estética de la sonrisa antes y después",
    width: 1254,
    height: 1254,
  },
];

function useColumnCount() {
  const query = "(min-width: 1024px)";
  const [count, setCount] = useState(() =>
    window.matchMedia(query).matches ? 3 : 2,
  );

  useEffect(() => {
    const media = window.matchMedia(query);
    const update = () => setCount(media.matches ? 3 : 2);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  return count;
}

export function RealCases() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [started, setStarted] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);
  const [active, setActive] = useState<number | null>(null);
  const photo = active == null ? null : CASES[active];

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (active != null && !dialog.open) dialog.showModal();
    if (active == null && dialog.open) dialog.close();
  }, [active]);

  function playVideo() {
    const video = videoRef.current;
    if (!video) return;
    video.controls = true;
    const attempt = video.play();
    if (attempt) {
      attempt.then(() => setStarted(true)).catch(() => setVideoFailed(true));
    }
  }

  function step(direction: -1 | 1) {
    setActive((current) => {
      if (current == null) return current;
      return (current + direction + CASES.length) % CASES.length;
    });
  }

  const columnCount = useColumnCount();
  const columnRefs = useRef<Array<HTMLDivElement | null>>([]);
  const dragRef = useRef<{
    id: number;
    y: number;
    top: number;
    el: HTMLDivElement;
  } | null>(null);
  const heldRef = useRef<HTMLDivElement | null>(null);
  const draggedRef = useRef(false);
  const columns = Array.from({ length: columnCount }, (_, column) =>
    CASES.filter((_, index) => index % columnCount === column),
  );

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const positions = new WeakMap<HTMLDivElement, number>();
    let frame = 0;
    let last = performance.now();

    const list = () =>
      columnRefs.current.filter((el): el is HTMLDivElement => el != null);

    const wrap = (pos: number, copy: number) => {
      if (copy <= 0) return 0;
      const looped = pos % copy;
      return looped < 0 ? looped + copy : looped;
    };

    const prime = (el: HTMLDivElement) => {
      el.style.scrollBehavior = "auto";
      if (el.dataset.primed === "1") return;
      const copy = el.scrollHeight / 2;
      if (copy <= el.clientHeight) return;
      const start = el.dataset.drift === "down" ? copy - 1 : 0;
      el.scrollTop = start;
      positions.set(el, start);
      el.dataset.primed = "1";
    };

    const tick = (now: number) => {
      const dt = Math.min(now - last, 34) / 1000;
      last = now;
      for (const el of list()) {
        prime(el);
        if (reduce || el.dataset.primed !== "1") continue;
        const copy = el.scrollHeight / 2;
        const down = el.dataset.drift === "down";
        let pos = positions.get(el) ?? el.scrollTop;
        if (heldRef.current === el || Math.abs(el.scrollTop - pos) > 2) {
          pos = el.scrollTop;
        } else {
          pos += ((down ? -1 : 1) * copy) / (down ? 58 : 46) * dt;
        }
        pos = wrap(pos, copy);
        positions.set(el, pos);
        if (Math.abs(el.scrollTop - pos) > 0.2) el.scrollTop = pos;
      }
      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    const observer = new ResizeObserver(() => {
      for (const el of list()) prime(el);
    });
    for (const el of list()) observer.observe(el);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      for (const el of list()) delete el.dataset.primed;
    };
  }, [columnCount]);

  function onColumnPointerDown(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    heldRef.current = event.currentTarget;
    dragRef.current = {
      id: event.pointerId,
      y: event.clientY,
      top: event.currentTarget.scrollTop,
      el: event.currentTarget,
    };
    draggedRef.current = false;
  }

  function onColumnPointerMove(event: PointerEvent<HTMLDivElement>) {
    const drag = dragRef.current;
    if (!drag || drag.id !== event.pointerId) return;
    const delta = event.clientY - drag.y;
    if (Math.abs(delta) <= 8) return;
    draggedRef.current = true;
    if (event.pointerType !== "mouse") return;
    if (!drag.el.hasPointerCapture(event.pointerId)) {
      drag.el.setPointerCapture(event.pointerId);
    }
    drag.el.scrollTop = drag.top - delta;
  }

  function onColumnPointerUp(event: PointerEvent<HTMLDivElement>) {
    const dragged = draggedRef.current;
    if (heldRef.current === event.currentTarget) heldRef.current = null;
    if (dragRef.current?.id === event.pointerId) dragRef.current = null;
    if (dragged) return;
    const node = event.target;
    if (!(node instanceof Element)) return;
    const button = node.closest("button");
    if (!button || !event.currentTarget.contains(button)) return;
    const label = button.getAttribute("aria-label") ?? "";
    const alt = label.startsWith("Ampliar: ")
      ? label.slice("Ampliar: ".length)
      : "";
    const index = CASES.findIndex((item) => item.alt === alt);
    if (index >= 0) setActive(index);
  }

  return (
    <>
      <div className="grid items-stretch gap-4 lg:grid-cols-[minmax(220px,300px)_minmax(0,1fr)] lg:gap-5">
        <div className="h-[min(46vh,380px)] lg:h-[min(72vh,760px)]">
          <div className="h-full overflow-hidden rounded-[28px] bg-brand-dark">
            <div className="relative h-full bg-black">
              {videoFailed ? (
                <p className="absolute inset-0 flex items-center px-6 text-center text-sm leading-relaxed text-white/80">
                  Este navegador no reproduce el video. Ábrelo en Chrome o
                  Safari.
                </p>
              ) : (
                <video
                  ref={videoRef}
                  className="size-full object-cover"
                  src={VIDEO_SRC}
                  playsInline
                  preload="metadata"
                  onPlay={() => setStarted(true)}
                  onError={() => setVideoFailed(true)}
                />
              )}
              {!started && !videoFailed ? (
                <button
                  type="button"
                  onClick={playVideo}
                  aria-label="Reproducir video del procedimiento"
                  className="absolute inset-0 flex items-center justify-center bg-brand-dark/35 text-white focus-visible:outline-2 focus-visible:outline-offset-[-6px] focus-visible:outline-brand"
                >
                  <span className="flex size-16 items-center justify-center rounded-full bg-brand text-brand-dark shadow-lg">
                    <Play size={26} fill="currentColor" aria-hidden />
                  </span>
                </button>
              ) : null}
            </div>
          </div>
        </div>

        <div className="cases-stage relative h-[min(72vh,760px)] overflow-hidden">
          <div
            className={`grid h-full min-h-0 gap-3 ${columnCount === 2 ? "grid-cols-2" : "grid-cols-3"}`}
          >
            {columns.map((column, columnIndex) => (
              <div
                key={columnIndex}
                ref={(node) => {
                  columnRefs.current[columnIndex] = node;
                }}
                data-drift={columnIndex % 2 === 0 ? "up" : "down"}
                className="cases-column h-full min-h-0"
                onPointerDown={onColumnPointerDown}
                onPointerMove={onColumnPointerMove}
                onPointerUp={onColumnPointerUp}
                onPointerCancel={onColumnPointerUp}
              >
                {[0, 1].map((copy) => (
                  <div
                    key={copy}
                    className="flex flex-col gap-3 pb-3"
                    aria-hidden={copy === 1 ? true : undefined}
                  >
                    {column.map((item) => {
                      const index = CASES.indexOf(item);
                      return (
                        <button
                          key={`${item.src}-${copy}`}
                          type="button"
                          onClick={(event) => {
                            if (draggedRef.current) {
                              event.preventDefault();
                              draggedRef.current = false;
                              return;
                            }
                            setActive(index);
                          }}
                          className="block w-full overflow-hidden rounded-2xl bg-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
                          aria-label={`Ampliar: ${item.alt}`}
                          tabIndex={copy === 0 ? 0 : -1}
                        >
                          <LazyImage
                            src={item.src}
                            alt={copy === 0 ? item.alt : ""}
                            width={item.width}
                            height={item.height}
                            priority={copy === 0}
                            className="h-[280px] w-full object-cover sm:h-[340px] lg:h-[420px]"
                          />
                        </button>
                      );
                    })}
                  </div>
                ))}
              </div>
            ))}
          </div>
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 z-10 h-16 bg-gradient-to-b from-background to-transparent"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-20 bg-gradient-to-t from-background to-transparent"
          />
        </div>
      </div>

      <dialog
        ref={dialogRef}
        aria-labelledby="caso-titulo"
        className="m-auto w-[min(960px,calc(100%-2rem))] rounded-[28px] border-0 bg-brand-dark p-3 text-white backdrop:bg-black/75 sm:p-4"
        onClose={() => setActive(null)}
        onKeyDown={(event) => {
          if (event.key === "ArrowRight") step(1);
          if (event.key === "ArrowLeft") step(-1);
        }}
      >
        <div className="mb-3 flex items-center justify-between gap-4">
          <h3 id="caso-titulo" className="text-sm text-white/70">
            {active == null ? "" : `${active + 1} de ${CASES.length}`}
          </h3>
          <button
            type="button"
            onClick={() => setActive(null)}
            className="flex size-10 shrink-0 items-center justify-center rounded-full bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
            aria-label="Cerrar"
          >
            <X size={18} />
          </button>
        </div>
        {photo ? (
          <LazyImage
            src={photo.src}
            alt={photo.alt}
            width={photo.width}
            height={photo.height}
            priority
            className="max-h-[min(72dvh,820px)] w-full rounded-xl object-contain"
          />
        ) : null}
        <div className="mt-3 flex justify-end gap-2">
          <button
            type="button"
            onClick={() => step(-1)}
            className="flex size-10 items-center justify-center rounded-full bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
            aria-label="Caso anterior"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            type="button"
            onClick={() => step(1)}
            className="flex size-10 items-center justify-center rounded-full bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
            aria-label="Caso siguiente"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </dialog>
    </>
  );
}
