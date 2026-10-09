"use client";

import { useEffect, useState } from "react";
import Hero from "../Hero";
import { useGetPortfolioBySlug } from "../../../features/portfolio/hooks/useGetPortfolioBySlug";
import { SafeImage } from "../../components/ui/SafeImage";

interface Props {
  params: {
    project: string;
  };
}

function siteLabel(url: string | null | undefined) {
  if (!url) return undefined;
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

function hasHtmlContent(html: string | undefined) {
  if (!html) return false;
  return html.replace(/<[^>]*>/g, " ").replace(/&nbsp;/g, " ").trim().length > 0;
}

export default function Page({ params }: Props) {
  const slug = params.project;
  const { data: item, isLoading, error } = useGetPortfolioBySlug(slug);
  const gallery = item?.galleryImages?.filter(Boolean) ?? [];
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useEffect(() => {
    if (activeIndex == null) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActiveIndex(null);
      if (event.key === "ArrowRight") {
        setActiveIndex((index) => (index == null ? 0 : (index + 1) % gallery.length));
      }
      if (event.key === "ArrowLeft") {
        setActiveIndex((index) =>
          index == null ? 0 : (index - 1 + gallery.length) % gallery.length
        );
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [activeIndex, gallery.length]);

  if (isLoading) {
    return (
      <div className="min-h-[60vh] bg-gradient-to-r from-customLightBlue to-customVeryLightBlue">
        <div className="h-48 animate-pulse bg-[#237DCE]/30" />
        <div className="mx-auto mt-12 h-64 max-w-5xl animate-pulse rounded-2xl bg-white/50" />
      </div>
    );
  }

  if (error || !item) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center bg-gradient-to-r from-customLightBlue to-customVeryLightBlue px-6">
        <p className="text-center text-lg text-customDarkGray/80">
          This project could not be found.
        </p>
      </div>
    );
  }

  const activeImage = activeIndex != null ? gallery[activeIndex] : null;

  return (
    <>
      <Hero
        title={item.title}
        description={item.shortDescription}
        sitename={siteLabel(item.siteUrl)}
        sitelink={item.siteUrl || undefined}
      />
      <div className="relative w-full overflow-hidden bg-gradient-to-r from-customLightBlue to-customVeryLightBlue">
        <div className="pointer-events-none absolute inset-0 hidden bg-[url('/Frame.svg')] bg-cover bg-top bg-no-repeat md:block" />
        <div className="relative z-10 px-6 py-10 sm:px-10 md:px-16 md:py-14 lg:px-24">
          {item.videoUrl ? (
            <div className="mb-10 flex justify-center">
              <div className="w-full max-w-5xl">
                <video
                  src={item.videoUrl}
                  controls
                  className="w-full rounded-2xl bg-black shadow-lg"
                />
              </div>
            </div>
          ) : null}

          {gallery.length > 0 ? (
            <div className="mx-auto mb-12 grid max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3">
              {gallery.map((image, index) => (
                <button
                  key={image}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  className="group min-w-0 overflow-hidden rounded-2xl bg-white shadow-lg ring-1 ring-black/5"
                >
                  <SafeImage
                    src={image}
                    fallback="/icon.png"
                    alt={`${item.title} gallery ${index + 1}`}
                    className="h-52 w-full object-contain p-2 transition duration-300 group-hover:scale-[1.03] md:h-60"
                  />
                </button>
              ))}
            </div>
          ) : item.coverImage ? (
            <div className="mb-12 flex justify-center">
              <div className="w-full max-w-5xl">
                <SafeImage
                  src={item.coverImage}
                  fallback="/icon.png"
                  alt={item.title}
                  className="w-full rounded-2xl object-contain shadow-md"
                />
              </div>
            </div>
          ) : null}

          {hasHtmlContent(item.content) ? (
            <div className="mx-auto max-w-6xl">
              <div
                className="project-details-content text-left text-customBlue1 font-work-sans font-medium text-[18px] leading-[26px] md:text-[22px] md:leading-[30px] lg:text-[26px] lg:leading-[34px] [&_p]:mb-5 [&_p]:text-left [&_h1]:mb-4 [&_h1]:mt-8 [&_h1]:text-left [&_h1]:font-semibold [&_h2]:mb-4 [&_h2]:mt-8 [&_h2]:text-left [&_h2]:font-semibold [&_h3]:mb-3 [&_h3]:mt-8 [&_h3]:text-left [&_h3]:font-semibold [&_ul]:mb-2 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:text-left [&_ol]:mb-2 [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:text-left [&_li]:mb-1.5 [&_li]:text-left [&_li_p]:mb-0 [&_li_p]:text-left [&_strong]:font-semibold [&_img]:my-4 [&_img]:max-w-full [&_img]:rounded-xl"
                dangerouslySetInnerHTML={{ __html: item.content }}
              />
            </div>
          ) : null}
        </div>
      </div>

      {activeImage ? (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-black/85 p-4"
          onClick={() => setActiveIndex(null)}
          role="dialog"
          aria-modal="true"
          aria-label="Gallery image"
        >
          <button
            type="button"
            onClick={() => setActiveIndex(null)}
            className="absolute right-4 top-4 rounded-full bg-white/15 px-3 py-1 text-2xl leading-none text-white hover:bg-white/25"
            aria-label="Close"
          >
            ×
          </button>
          {gallery.length > 1 ? (
            <>
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  setActiveIndex((index) =>
                    index == null ? 0 : (index - 1 + gallery.length) % gallery.length
                  );
                }}
                className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/15 px-3 py-2 text-2xl leading-none text-white hover:bg-white/25 md:left-6"
                aria-label="Previous image"
              >
                ‹
              </button>
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  setActiveIndex((index) => (index == null ? 0 : (index + 1) % gallery.length));
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/15 px-3 py-2 text-2xl leading-none text-white hover:bg-white/25 md:right-6"
                aria-label="Next image"
              >
                ›
              </button>
            </>
          ) : null}
          <img
            src={activeImage}
            alt={item.title}
            className="max-h-[90vh] max-w-[min(92vw,1100px)] rounded-lg object-contain"
            onClick={(event) => event.stopPropagation()}
          />
        </div>
      ) : null}
    </>
  );
}
