export function Header() {
  return (
    <header className="md:sticky md:top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#e5e2da]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 md:h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#"
          className="text-lg sm:text-xl font-extrabold tracking-tight text-[#161f1d] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#e05a1b] rounded"
        >
          도시락담다
        </a>

        {/* Zone 2: 4 concise single-line text navigation links */}
        <nav
          aria-label="주요 메뉴"
          className="hidden md:flex items-center gap-7 text-sm font-semibold text-[#4a5250]"
        >
          <a
            href="#features"
            className="whitespace-nowrap shrink-0 hover:text-[#161f1d] hover:underline underline-offset-4 decoration-[#e05a1b] decoration-2 transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#e05a1b] rounded"
          >
            서비스 강점
          </a>
          <a
            href="#menu"
            className="whitespace-nowrap shrink-0 hover:text-[#161f1d] hover:underline underline-offset-4 decoration-[#e05a1b] decoration-2 transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#e05a1b] rounded"
          >
            메뉴 라인업
          </a>
          <a
            href="#process"
            className="whitespace-nowrap shrink-0 hover:text-[#161f1d] hover:underline underline-offset-4 decoration-[#e05a1b] decoration-2 transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#e05a1b] rounded"
          >
            제작·배송
          </a>
          <a
            href="#inquiry"
            className="whitespace-nowrap shrink-0 hover:text-[#161f1d] hover:underline underline-offset-4 decoration-[#e05a1b] decoration-2 transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#e05a1b] rounded"
          >
            견적 신청
          </a>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="shrink-0">
          <a
            href="#inquiry"
            className="inline-flex items-center justify-center px-4 py-2 min-h-[40px] text-xs sm:text-sm font-bold text-white bg-[#161f1d] rounded-lg hover:bg-[#263330] transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e05a1b]"
          >
            견적 문의하기
          </a>
        </div>
      </div>
    </header>
  );
}
