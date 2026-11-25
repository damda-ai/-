import { BRAND_IMAGES } from "../data/menus";
import { ResilientImage } from "./ResilientImage";

const PROCESS_STEPS = [
  {
    number: "01.",
    title: "당일 신선 조리 및 9첩 검수",
    description:
      "당일 신선한 재료로 조리한 뒤, 주문하신 메뉴 구성과 수량을 체크리스트로 꼼꼼히 확인합니다.",
  },
  {
    number: "02.",
    title: "위생 포장 및 보온백 적재",
    description:
      "위생모·마스크·장갑을 착용한 전문 인력이 깔끔하게 밀봉 포장한 뒤 보온백과 전용 박스에 적재합니다.",
  },
  {
    number: "03.",
    title: "원하는 시간·장소 정확 배송",
    description:
      "회의실·강당·병원·학원 등 요청하신 동선과 시간에 맞춰 차질 없이 안전하게 전달해 드립니다.",
  },
];

export function ProcessSection() {
  return (
    <section id="process" className="py-16 md:py-24 bg-[#f7f6f3]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="max-w-2xl mb-12">
          <p className="text-xs font-bold tracking-wider uppercase text-[#e05a1b] mb-2">
            HYGIENE &amp; DELIVERY
          </p>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#161f1d] tracking-tight text-balance mb-3">
            체계적인 당일 조리 · 위생 포장 · 직배송
          </h2>
          <p className="text-[15px] sm:text-base text-[#5a6260] leading-relaxed">
            수백 개의 단체 주문도 누락 없이, 가장 맛있는 온도를 유지해 약속된 시간에 도착합니다.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-stretch">
          <div className="lg:col-span-6 rounded-2xl overflow-hidden border border-[#e5e2da] bg-[#edeae3]">
            <ResilientImage
              src={BRAND_IMAGES.hygienePacking}
              alt="위생 복장을 갖춘 인력이 단체 도시락을 포장·검수·적재하는 현장"
              className="w-full h-full object-cover aspect-[4/3] lg:aspect-auto"
            />
          </div>

          <div className="lg:col-span-6 flex flex-col justify-center gap-4">
            {PROCESS_STEPS.map((step) => (
              <div
                key={step.number}
                className="bg-white border border-[#e5e2da] rounded-xl p-6"
              >
                <div className="text-xs font-extrabold text-[#e05a1b] tabular-nums mb-1.5">
                  {step.number}
                </div>
                <h3 className="text-base sm:text-[17px] font-bold text-[#161f1d] mb-1.5">
                  {step.title}
                </h3>
                <p className="text-sm text-[#5a6260] leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
