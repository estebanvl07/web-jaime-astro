type ImageSkeletonProps = {
  className?: string;
};

export function ImageSkeleton({ className = "" }: ImageSkeletonProps) {
  return (
    <div
      className={`animate-pulse rounded-2xl bg-muted ${className}`}
      aria-hidden
    />
  );
}
