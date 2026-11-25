import { MessageCircle } from "lucide-react";
import { BRAND_IMAGES } from "../data/menus";
import { ResilientImage } from "./ResilientImage";

interface HeroProps {
  onOpenKakao: () => void;
}

const TRUST_STATS = [
  { value: "10 ~ 500개", label: "소량부터 대량 단체 주문 가능" },
  { value: "10분 내", label: "예산·수량 맞춤 견적 발송" },
  { value: "당일 조리", label: "냉동 없는 100% 수제 반찬" },
  { value: "즉시 발급", label: "세금계산서·견적서·카드결제" },
];

export function Hero({ onOpenKakao }: HeroProps) {
  return (
    <section className="bg-[#161f1d] text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-12 pb-14 md:pt-16 md:pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          {/* Left Copy Column */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <div className="flex items-start justify-between gap-4 sm:gap-6 mb-8">
              <div className="flex-1 min-w-0">
                <p className="text-xs sm:text-sm font-semibold tracking-wide text-[#ff9c6b] mb-3.5">
                  단체주문 전문 · 회의 · 행사 · 학원 · 세미나 맞춤 제작 (10개~500개 OK)
                </p>

                <h1 className="text-[1.7rem] sm:text-[2.35rem] lg:text-[2.85rem] font-extrabold leading-[1.22] tracking-tight text-balance text-white mb-4">
                  우리 동네 단체도시락 1등,
                  <br />
                  <span className="text-[#ff9c6b]">도시락담다</span>
                </h1>

                <p className="text-sm sm:text-[16.5px] text-[#d5dedb] leading-relaxed max-w-xl">
                  정성 가득 수제 단체도시락, 원하는 시간·장소로 정확하게 배송해 드립니다.
                  <br className="hidden sm:inline" /> 받는 분도 주문하는 분도 모두 만족하는 깔끔한 프리미엄 수제 도시락입니다.
                </p>
              </div>

              <div className="shrink-0 w-24 h-24 sm:w-36 sm:h-36 lg:w-44 lg:h-44 rounded-2xl overflow-hidden border border-white/15 bg-[#5a141d] shadow-lg">
                <ResilientImage
                  src={BRAND_IMAGES.brandMark}
                  alt="도시락담다 브랜드 마크"
                  loading="eager"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <a
                href="#inquiry"
                className="inline-flex items-center justify-center px-6 py-3.5 min-h-[46px] rounded-lg bg-[#e05a1b] hover:bg-[#c94c12] text-white text-sm sm:text-base font-bold transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                무료 견적 문의하기
              </a>
              <button
                type="button"
                onClick={onOpenKakao}
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 min-h-[46px] rounded-lg bg-[#fee500] hover:bg-[#f2da00] text-[#191919] text-sm sm:text-base font-bold transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                <MessageCircle className="w-4 h-4 shrink-0" strokeWidth={2.25} />
                카카오톡 상담
              </button>
              <a
                href="#menu"
                className="inline-flex items-center justify-center px-5 py-3.5 min-h-[46px] rounded-lg border border-white/25 bg-white/5 hover:bg-white/10 text-white text-sm sm:text-base font-semibold transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                메뉴 살펴보기
              </a>
            </div>
          </div>

          {/* Right Visual Column */}
          <div className="lg:col-span-5">
            <div className="relative h-full min-h-[260px] sm:min-h-[320px] rounded-xl overflow-hidden border border-white/15 bg-[#222e2b]">
              <ResilientImage
                src={BRAND_IMAGES.heroMain}
                alt="당일 신선한 재료로 정갈하게 담아낸 도시락담다 프리미엄 수제 도시락"
                loading="eager"
                className="w-full h-full object-cover aspect-[4/3] lg:aspect-auto"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/45 to-transparent p-5 pt-14 flex items-end justify-between gap-4">
                <div className="text-xs sm:text-sm font-medium text-white/95">
                  당일 신선 조리 · 1:1 예산 맞춤
                </div>
                <div className="text-xs sm:text-sm font-bold text-[#ff9c6b] whitespace-nowrap shrink-0">
                  10분 내 견적 안내
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Full-width 4-Column Trust Metrics Strip */}
      <div className="bg-white border-b border-[#e5e2da] text-[#161f1d]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-[#e5e2da]">
            {TRUST_STATS.map((stat, idx) => (
              <div
                key={stat.label}
                className={`py-5 px-3 sm:px-5 text-center ${
                  idx % 2 === 0 ? "border-r md:border-r-0 border-[#e5e2da]" : ""
                }`}
              >
                <div className="text-lg sm:text-xl font-extrabold text-[#161f1d] tabular-nums tracking-tight">
                  {stat.value}
                </div>
                <div className="mt-1 text-xs sm:text-[13px] font-medium text-[#5a6260]">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
