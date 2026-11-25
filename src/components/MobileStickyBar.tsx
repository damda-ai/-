import { MessageCircle, Phone } from "lucide-react";
import { CONTACT_PHONE_HREF } from "../data/menus";

interface MobileStickyBarProps {
  selectedCount: number;
  onOpenKakao: () => void;
}

export function MobileStickyBar({
  selectedCount,
  onOpenKakao,
}: MobileStickyBarProps) {
  return (
    <div className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#e5e2da] px-3 py-2">
      <div className="flex items-center gap-2 max-w-lg mx-auto">
        <a
          href={CONTACT_PHONE_HREF}
          className="flex-1 inline-flex items-center justify-center gap-1.5 h-11 rounded-lg bg-[#161f1d] text-white text-xs font-bold whitespace-nowrap"
        >
          <Phone className="w-3.5 h-3.5 shrink-0" strokeWidth={2.25} />
          전화 문의
        </a>
        <button
          type="button"
          onClick={onOpenKakao}
          className="flex-1 inline-flex items-center justify-center gap-1.5 h-11 rounded-lg bg-[#fee500] text-[#191919] text-xs font-bold whitespace-nowrap cursor-pointer"
        >
          <MessageCircle className="w-3.5 h-3.5 shrink-0" strokeWidth={2.25} />
          카톡 상담
        </button>
        <a
          href="#inquiry"
          className="flex-[1.2] inline-flex items-center justify-center h-11 rounded-lg bg-[#e05a1b] text-white text-xs font-bold whitespace-nowrap tabular-nums"
        >
          {selectedCount > 0 ? `견적 문의 (${selectedCount})` : "견적 문의하기"}
        </a>
      </div>
    </div>
  );
}
