"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface MarkdownContentProps {
  content: string;
}

export function MarkdownContent({ content }: MarkdownContentProps) {
  return (
    <div className="prose prose-slate max-w-none">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ ...props }) => (
            <h1
              className="mb-4 mt-8 text-3xl font-bold text-[var(--foreground)]"
              {...props}
            />
          ),
          h2: ({ ...props }) => (
            <h2
              className="mb-3 mt-8 text-xl font-semibold text-[var(--foreground)]"
              {...props}
            />
          ),
          h3: ({ ...props }) => (
            <h3
              className="mb-2 mt-6 text-lg font-semibold text-[var(--foreground)]"
              {...props}
            />
          ),
          p: ({ ...props }) => (
            <p className="mb-4 leading-relaxed text-[var(--foreground-muted)]" {...props} />
          ),
          ul: ({ ...props }) => (
            <ul
              className="mb-4 ml-4 list-inside list-disc space-y-2 text-[var(--foreground-muted)]"
              {...props}
            />
          ),
          ol: ({ ...props }) => (
            <ol
              className="mb-4 ml-4 list-inside list-decimal space-y-2 text-[var(--foreground-muted)]"
              {...props}
            />
          ),
          li: ({ ...props }) => (
            <li className="leading-relaxed text-[var(--foreground-muted)]" {...props} />
          ),
          strong: ({ ...props }) => (
            <strong className="font-semibold text-[var(--foreground)]" {...props} />
          ),
          em: ({ ...props }) => (
            <em className="italic text-[var(--foreground-muted)]" {...props} />
          ),
          a: ({ ...props }) => (
            <a
              className="focus-ring rounded-sm text-[var(--brand)] underline hover:text-[var(--brand-hover)]"
              {...props}
            />
          ),
          blockquote: ({ ...props }) => (
            <blockquote
              className="my-4 border-l-4 border-[var(--border)] pl-4 italic text-[var(--foreground-muted)]"
              {...props}
            />
          ),
          table: ({ ...props }) => (
            <div className="my-6 overflow-x-auto">
              <table
                className="w-full border-collapse border border-[var(--border)] text-left text-sm"
                {...props}
              />
            </div>
          ),
          thead: ({ ...props }) => (
            <thead className="bg-[var(--surface-muted)]" {...props} />
          ),
          tbody: ({ ...props }) => <tbody {...props} />,
          tr: ({ ...props }) => (
            <tr className="border-b border-[var(--border)] last:border-b-0" {...props} />
          ),
          th: ({ ...props }) => (
            <th
              className="px-4 py-2 font-semibold text-[var(--foreground)]"
              {...props}
            />
          ),
          td: ({ ...props }) => (
            <td className="px-4 py-2 text-[var(--foreground-muted)]" {...props} />
          ),
          code: ({ className, ...props }) => {
            const isCodeBlock = className?.includes("language-");

            if (isCodeBlock) {
              return (
                <code
                  className="block overflow-x-auto rounded bg-[var(--surface-muted)] p-4 text-sm font-mono text-[var(--foreground)]"
                  {...props}
                />
              );
            }

            return (
              <code
                className="rounded bg-[var(--surface-muted)] px-1.5 py-0.5 text-sm font-mono text-[var(--foreground)]"
                {...props}
              />
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
