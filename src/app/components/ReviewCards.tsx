import { Star } from "lucide-react";
import type { GoogleReview } from "@/app/data/reviews";

type ReviewCardsProps = {
  reviews: GoogleReview[];
};

export function ReviewCards({ reviews }: ReviewCardsProps) {
  return (
    <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3 lg:gap-5">
      {reviews.map((review) => (
        <article
          key={review.name}
          className="flex flex-col rounded-2xl border border-border bg-card p-5"
        >
          <div
            className="flex gap-0.5 text-[var(--star)]"
            role="img"
            aria-label={`${review.stars} estrellas`}
          >
            {Array.from({ length: review.stars }).map((_, index) => (
              <Star key={index} size={14} fill="currentColor" strokeWidth={0} />
            ))}
          </div>

          <p className="mt-4 flex-1 text-sm leading-relaxed text-foreground/90">
            {review.text}
          </p>

          <div className="mt-5 flex items-center gap-3">
            <img
              src={review.avatar}
              alt=""
              width={40}
              height={40}
              referrerPolicy="no-referrer"
              className="h-10 w-10 shrink-0 rounded-full object-cover"
            />
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-foreground">
                {review.name}
              </p>
              <p className="text-xs text-muted-foreground">{review.when}</p>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
