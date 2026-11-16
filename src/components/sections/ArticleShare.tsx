"use client";

import { useEffect, useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { tr, useLocale } from "@/i18n/locale";

type ArticleShareProps = {
  title: string;
};

export function ArticleShare({ title }: ArticleShareProps) {
  const { locale } = useLocale();
  const [copied, setCopied] = useState(false);
  const [shareUrl, setShareUrl] = useState("");

  useEffect(() => {
    setShareUrl(window.location.href);
  }, []);

  const xHref = shareUrl
    ? `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(shareUrl)}`
    : "#";
  const linkedInHref = shareUrl
    ? `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`
    : "#";

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="article-share">
      <a
        className="article-share__btn"
        href={xHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={tr(locale, "Share on X")}
      >
        <Icon src="/assets/icons/social-x.svg" width={16} height={16} />
      </a>
      <a
        className="article-share__btn"
        href={linkedInHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={tr(locale, "Share on LinkedIn")}
      >
        <Icon src="/assets/icons/social-linkedin.svg" width={16} height={16} />
      </a>
      <button
        type="button"
        className="article-share__btn"
        onClick={copyLink}
        aria-label={tr(locale, copied ? "Link copied" : "Copy link")}
      >
        <Icon src="/assets/icons/knowledge/link.svg" width={16} height={16} />
      </button>
    </div>
  );
}
