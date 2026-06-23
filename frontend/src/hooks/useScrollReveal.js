import { useEffect } from 'react';

export function useScrollReveal() {
  useEffect(() => {
    const targets = document.querySelectorAll(
      '.sectionHeader, .productCard, .homeProductCard, .homeFeature, .offerCard, .offerCard2, .offerShowcaseMedia, .prepCard, .thenLabel, .storyImage, .storyCopy, .featureCard, .statCard, .stepCard, .recipeCard, .testimonialCard, .newsletterSection, .productDetailGrid, .checkoutBlock, .orderSummary, .whyCard, .comparisonBand'
    );

    targets.forEach((target, index) => {
      target.classList.add('revealTarget');
      target.style.setProperty('--reveal-delay', `${Math.min(index % 6, 5) * 70}ms`);
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('isVisible');
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.14, rootMargin: '0px 0px -50px 0px' }
    );

    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  });
}
