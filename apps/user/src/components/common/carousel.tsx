'use client';

import Image from 'next/image';
import Link from 'next/link';
import React, { useState, useCallback, useEffect, memo } from 'react';
import { ArrowLeft, ArrowRight, ChevronRight } from '@repo/ui/lib/icons';
import { Button } from '@repo/ui/components/base/button';

export interface CarouselSlide {
  id: string | number;
  imageUrl: string;
  title: string;
  description: string;
  ctaText: string;
  ctaLink: string;
}

interface CarouselProps {
  slides: CarouselSlide[];
  autoPlayInterval?: number;
  showControls?: boolean;
  showIndicators?: boolean;
  height?: { mobile: string; desktop: string };
}

function Carousel(props: CarouselProps) {
  const {
    slides,
    autoPlayInterval = 5000,
    showControls = true,
    showIndicators = true,
    height = { mobile: '400px', desktop: '500px' },
  } = props;

  const [currentSlide, setCurrentSlide] = useState(0);

  const goToSlide = useCallback((index: number) => {
    setCurrentSlide(index);
  }, []);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  useEffect(() => {
    if (!autoPlayInterval || autoPlayInterval <= 0) return undefined;

    const interval = setInterval(nextSlide, autoPlayInterval);
    return () => clearInterval(interval);
  }, [autoPlayInterval, nextSlide]);

  if (!slides?.length) return null;

  return (
    <div className="relative overflow-hidden shadow-2xl">
      <div
        className="relative overflow-hidden bg-gradient-to-br from-[var(--baladi-primary)] via-[var(--baladi-secondary)] to-[var(--baladi-primary-dark)]"
        style={{
          height: `var(--carousel-height, ${height.mobile})`,
        }}
      >
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 h-full w-full transition-all duration-700 ease-in-out ${
              index === currentSlide
                ? 'z-10 scale-100 opacity-100'
                : 'z-0 scale-105 opacity-0'
            }`}
            aria-hidden={index !== currentSlide}
          >
            <div className="absolute inset-0 z-10 bg-gradient-to-r from-black/60 via-black/40 to-black/60" />

            <Image
              src={slide.imageUrl}
              alt={slide.title}
              fill
              sizes="(max-width: 768px) 100vw, 100vw"
              className="object-cover transition-transform duration-700 ease-out"
              priority={index === 0}
              loading={index === 0 ? 'eager' : 'lazy'}
              quality={85}
            />

            <div className="absolute inset-0 z-20 flex items-center justify-center">
              <div className="max-w-4xl px-6 text-center md:px-8">
                <h2 className="animate-in slide-in-from-bottom-8 mb-6 font-[family-name:var(--font-sora)] text-4xl font-bold leading-tight text-white duration-700 md:text-6xl lg:text-7xl">
                  {slide.title}
                </h2>

                <p className="animate-in slide-in-from-bottom-8 mx-auto mb-8 max-w-2xl font-[family-name:var(--font-dm-sans)] text-lg leading-relaxed text-white/90 delay-150 duration-700 md:text-xl lg:text-2xl">
                  {slide.description}
                </p>

                <div className="animate-in slide-in-from-bottom-8 delay-300 duration-700">
                  <Button
                    asChild
                    size="lg"
                    className="hover:shadow-3xl group relative overflow-hidden rounded-full bg-white px-8 py-4 font-[family-name:var(--font-dm-sans)] text-lg font-semibold text-[var(--baladi-primary)] shadow-2xl transition-all duration-300 hover:scale-105"
                  >
                    <Link href={slide.ctaLink}>
                      <div className="absolute inset-0 bg-gradient-to-r from-[var(--baladi-light)] to-white opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                      <div className="relative flex items-center gap-2">
                        <span>{slide.ctaText}</span>
                        <ChevronRight
                          size={20}
                          className="transition-transform duration-200 group-hover:translate-x-1"
                        />
                      </div>
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showControls && slides.length > 1 && (
        <>
          <Button
            onClick={prevSlide}
            variant="secondary"
            size="icon"
            className="absolute left-4 top-1/2 z-30 h-12 w-12 -translate-y-1/2 rounded-full bg-white/10 text-white backdrop-blur-md transition-all duration-200 hover:scale-110 hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/50 md:left-6"
            aria-label="Previous slide"
            type="button"
          >
            <ArrowLeft size={24} />
          </Button>

          <Button
            onClick={nextSlide}
            variant="secondary"
            size="icon"
            className="absolute right-4 top-1/2 z-30 h-12 w-12 -translate-y-1/2 rounded-full bg-white/10 text-white backdrop-blur-md transition-all duration-200 hover:scale-110 hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/50 md:right-6"
            aria-label="Next slide"
            type="button"
          >
            <ArrowRight size={24} />
          </Button>
        </>
      )}

      {showIndicators && slides.length > 1 && (
        <div className="absolute bottom-6 left-0 right-0 z-30 flex justify-center gap-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`group relative h-3 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? 'w-12 bg-white shadow-lg'
                  : 'w-3 bg-white/40 hover:bg-white/60'
              }`}
              aria-label={`Go to slide ${index + 1}`}
              aria-current={index === currentSlide ? 'true' : 'false'}
              type="button"
            >
              {index === currentSlide && (
                <div className="absolute inset-0 rounded-full bg-white/50 blur-sm" />
              )}
            </button>
          ))}
        </div>
      )}

      {autoPlayInterval > 0 && (
        <div className="absolute bottom-0 left-0 right-0 z-30 h-1 bg-white/20">
          <div
            className="h-full bg-gradient-to-r from-[var(--baladi-accent)] to-white transition-all duration-100 ease-linear"
            style={{
              width: '100%',
              animation: `slideProgress ${autoPlayInterval}ms linear infinite`,
            }}
          />
        </div>
      )}

      <style>{`
        @keyframes slideProgress {
          from {
            width: 0%;
          }
          to {
            width: 100%;
          }
        }
        @media (min-width: 768px) {
          .relative {
            --carousel-height: ${height.desktop};
          }
        }
      `}</style>
    </div>
  );
}

export default memo(Carousel);
