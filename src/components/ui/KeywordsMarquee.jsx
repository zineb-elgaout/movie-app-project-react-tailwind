import { useEffect, useRef, useState } from "react";

export default function KeywordsMarquee({ keywords , position , backgroundColor}) {
  const containerRef = useRef(null);
  const contentRef = useRef(null);
  const [shouldAnimate, setShouldAnimate] = useState(false);

  useEffect(() => {
    if (containerRef.current && contentRef.current) {
      setShouldAnimate(contentRef.current.scrollWidth > containerRef.current.clientWidth);
    }
  }, [keywords]);

  return (
    <div
      ref={containerRef}
      className={`${position} w-full overflow-hidden px-4 py-2 flex justify-center`}

    >
      <div
        ref={contentRef}
        className={`flex whitespace-nowrap ${shouldAnimate ? 'animate-marquee' : ''}`}
      >
        {keywords.split(",").map((kw, i) => (
          <span
            key={i}
            className={`${backgroundColor} px-4 py-2 rounded-full text-sm inline-block mr-2 `}
          >
            {kw.trim()}
          </span>
        ))}
        {/* Répétition pour animation continue */}
        {shouldAnimate && keywords.split(",").map((kw, i) => (
          <span
            key={`repeat-${i}`}
            className={`${backgroundColor} px-4 py-2 rounded-full text-sm inline-block mr-2 `}
          >
            {kw.trim()}
          </span>
        ))}
      </div>
    </div>
  );
}
