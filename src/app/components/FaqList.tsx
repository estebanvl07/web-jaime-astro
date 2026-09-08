import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import type { FaqItem } from "@/app/data/faqs";

const easeOut = [0.22, 1, 0.36, 1] as const;

type FaqListProps = {
  items: FaqItem[];
  openIndex: number | null;
  onToggle: (index: number) => void;
  startNumber?: number;
  className?: string;
};

export function FaqList({
  items,
  openIndex,
  onToggle,
  startNumber = 1,
  className = "",
}: FaqListProps) {
  const reduceMotion = useReducedMotion();

  return (
    <div className={`flex flex-col gap-3 ${className}`.trim()}>
      {items.map((faq, i) => {
        const isOpen = openIndex === i;

        return (
          <div
            key={faq.question}
            className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm"
          >
            <button
              type="button"
              className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left sm:px-8"
              onClick={() => onToggle(i)}
              aria-expanded={isOpen}
            >
              <span className="font-['Playfair_Display',serif] text-base font-bold text-foreground">
                {startNumber + i}. {faq.question}
              </span>
              <motion.span
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: reduceMotion ? 0 : 0.25 }}
                className="shrink-0 text-primary"
              >
                <ChevronDown size={18} />
              </motion.span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  key="content"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{
                    duration: reduceMotion ? 0 : 0.3,
                    ease: easeOut,
                  }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-6 sm:px-8">
                    <div className="mb-5 h-px w-full bg-muted" />
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {faq.answer}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
