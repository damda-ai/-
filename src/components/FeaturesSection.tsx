import { Briefcase, Building2, Check, GraduationCap, MessageCircle, Stethoscope } from "lucide-react";
import { BRAND_IMAGES } from "../data/menus";
import { ResilientImage } from "./ResilientImage";

interface FeaturesSectionProps {
  onOpenKakao: () => void;
}

const USE_CASES = [
  {
    icon: Briefcase,
    title: "회의·기업 세미나",
    description: "임원 회의, 미팅, 컨퍼런스 등 격식 있는 자리에 어울리는 품격 있는 한정식 한상",
  },
  {
    icon: Stethoscope,
    title: "병원·학회 행사",
    description: "의료진 식사 및 학술 세미나 일정에 맞춘 정갈한 구성과 정확한 시간 배송",
  },
  {
    icon: GraduationCap,
    title: "학원·학교·시험",
    description: "학생들과 교직원이 모두 좋아하는 푸짐한 메인 구성과 실속 있는 예산 설계",
  },
  {
    icon: Building2,
    title: "야근·워크샵·행사",
    description: "10개 소규모 팀 식사부터 500개 대규모 행사까지 1:1 전담 맞춤 제작",
  },
];

const MEAL_STANDARDS = [
  {
    title: "메뉴 구성",
    detail:
      "잡곡밥 + 계란후라이 + 국 + 메인 2~3종(소불고기/제육/떡갈비/돈까스/왕새우튀김 등) + 수제 반찬 6종",
  },
  {
    title: "맞춤 서비스",
    detail:
      "예산별·인원별 1:1 식단 구성 (소량 10개부터 500개 대량 단체 주문까지 가능)",
  },
  {
    title: "행정 완벽 지원",
    detail: "세금계산서, 현금영수증, 카드결제, 견적서 즉시 발급",
  },
];

export function FeaturesSection({ onOpenKakao }: FeaturesSectionProps) {
  return (
    <section id="features" className="py-16 md:py-24 bg-[#f7f6f3]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Heading */}
        <div className="max-w-2xl mb-12">
          <p className="text-xs font-bold tracking-wider uppercase text-[#e05a1b] mb-2">
            WHY DOSIRAK DAMDA
          </p>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#161f1d] tracking-tight text-balance mb-3">
            어떤 자리에서도 빛나는 맞춤 단체도시락
          </h2>
          <p className="text-[15px] sm:text-base text-[#5a6260] leading-relaxed">
            중요한 행사, 병원 세미나, 학원 간식, 회사 야근 식사까지 목적과 예산에 딱 맞게 준비해 드립니다.
          </p>
        </div>

        {/* 4-Column Use Cases */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {USE_CASES.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="bg-white border border-[#e5e2da] rounded-xl p-6 flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-lg bg-[#f7f6f3] border border-[#e5e2da] flex items-center justify-center text-[#161f1d] mb-4">
                    <Icon className="w-5 h-5" strokeWidth={1.8} />
                  </div>
                  <h3 className="text-base font-bold text-[#161f1d] mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-[#5a6260] leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Editorial Meal Composition & Visual Split */}
        <div className="bg-white border border-[#e5e2da] rounded-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 items-stretch">
          <div className="lg:col-span-5 grid grid-cols-2 lg:grid-cols-1 gap-px bg-[#e5e2da]">
            <div className="relative bg-[#edeae3] overflow-hidden">
              <ResilientImage
                src={BRAND_IMAGES.featureSpread1}
                alt="잡곡밥, 계란후라이, 국과 함께 즐기는 도시락담다 상차림"
                className="w-full h-full object-cover aspect-[4/3] lg:aspect-[16/11]"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent px-4 py-3">
                <p className="text-xs font-semibold text-white">
                  잡곡밥 + 계란후라이 + 국 + 메인 구성
                </p>
              </div>
            </div>
            <div className="relative bg-[#edeae3] overflow-hidden">
              <ResilientImage
                src={BRAND_IMAGES.featureSpread2}
                alt="다양한 메인 메뉴와 수제 반찬이 담긴 도시락담다 콤보"
                className="w-full h-full object-cover aspect-[4/3] lg:aspect-[16/11]"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent px-4 py-3">
                <p className="text-xs font-semibold text-white">
                  예산별 맞춤 콤보 &amp; 프리미엄 한정식
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between">
            <div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-[#161f1d] tracking-tight mb-2">
                정성 가득 수제 도시락, 구성부터 다릅니다
              </h3>
              <p className="text-sm sm:text-[15px] text-[#5a6260] leading-relaxed mb-8">
                잡곡밥과 계란후라이, 따뜻한 국, 든든한 메인 2~3종에 수제 반찬 6종까지 알차게 채웠습니다.
              </p>

              <div className="divide-y divide-[#e5e2da] border-t border-b border-[#e5e2da]">
                {MEAL_STANDARDS.map((point) => (
                  <div key={point.title} className="py-4 flex items-start gap-3.5">
                    <div className="w-6 h-6 rounded-md bg-[#e05a1b] text-white flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5" strokeWidth={2.75} />
                    </div>
                    <div>
                      <h4 className="text-sm sm:text-[15px] font-bold text-[#161f1d] mb-1">
                        {point.title}
                      </h4>
                      <p className="text-sm text-[#5a6260] leading-relaxed">
                        {point.detail}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <p className="text-sm font-bold text-[#161f1d]">
                예산과 수량만 알려주시면 10분 내로 맞춤 견적을 보내드립니다.
              </p>
              <div className="flex flex-wrap items-center gap-2.5 shrink-0">
                <a
                  href="#inquiry"
                  className="inline-flex items-center justify-center px-5 py-2.5 min-h-[42px] rounded-lg bg-[#e05a1b] hover:bg-[#c94c12] text-white text-sm font-bold transition-colors whitespace-nowrap shrink-0"
                >
                  견적 문의하기
                </a>
                <button
                  type="button"
                  onClick={onOpenKakao}
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 min-h-[42px] rounded-lg bg-[#fee500] hover:bg-[#f2da00] text-[#191919] text-sm font-bold transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 shrink-0" strokeWidth={2.25} />
                  카톡 상담
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
