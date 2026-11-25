import {
  CONTACT_EMAIL,
  CONTACT_EMAIL_HREF,
  CONTACT_PHONE,
  CONTACT_PHONE_HREF,
  KAKAO_ID,
} from "../data/menus";

interface FooterProps {
  onOpenKakao: () => void;
}

export function Footer({ onOpenKakao }: FooterProps) {
  return (
    <footer className="bg-[#f7f6f3] border-t border-[#e5e2da] pt-10 pb-24 md:pb-12 text-center">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 text-xs sm:text-[13px] text-[#5a6260] leading-relaxed space-y-1.5">
        <p className="font-extrabold text-[#161f1d] text-sm">
          도시락담다 · 우리 동네 단체도시락 1등
        </p>
        <p className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1">
          <span>
            단체 주문 및 제휴 문의:{" "}
            <a
              href={CONTACT_PHONE_HREF}
              className="font-semibold text-[#161f1d] hover:underline tabular-nums"
            >
              {CONTACT_PHONE}
            </a>
          </span>
          <span className="text-[#c8c2b6]" aria-hidden="true">
            ·
          </span>
          <span>
            이메일:{" "}
            <a
              href={CONTACT_EMAIL_HREF}
              className="font-semibold text-[#161f1d] hover:underline"
            >
              {CONTACT_EMAIL}
            </a>
          </span>
          <span className="text-[#c8c2b6]" aria-hidden="true">
            ·
          </span>
          <span>
            카카오톡 ID:{" "}
            <button
              type="button"
              onClick={onOpenKakao}
              className="font-semibold text-[#161f1d] hover:underline cursor-pointer"
            >
              {KAKAO_ID}
            </button>
          </span>
        </p>
        <p className="text-[#88918e]">
          회의·행사·학원·세미나 맞춤 제작 (10개~500개 OK) · 세금계산서 및 견적서 즉시 발급
        </p>
      </div>
    </footer>
  );
}
