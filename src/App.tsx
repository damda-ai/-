import { useCallback, useEffect, useState } from "react";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { FeaturesSection } from "./components/FeaturesSection";
import { MenuSection } from "./components/MenuSection";
import { ProcessSection } from "./components/ProcessSection";
import { InquirySection } from "./components/InquirySection";
import { Footer } from "./components/Footer";
import { MobileStickyBar } from "./components/MobileStickyBar";
import { KakaoConsultModal } from "./components/KakaoConsultModal";
import { MENU_ITEMS, MenuItem } from "./data/menus";

export default function App() {
  const [selectedMenuIds, setSelectedMenuIds] = useState<string[]>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isKakaoModalOpen, setIsKakaoModalOpen] = useState(false);
  const [kakaoCustomQuoteText, setKakaoCustomQuoteText] = useState<string | undefined>(
    undefined
  );

  const showToast = useCallback((msg: string) => {
    setToastMessage(msg);
  }, []);

  useEffect(() => {
    if (!toastMessage) return;
    const timer = setTimeout(() => setToastMessage(null), 2000);
    return () => clearTimeout(timer);
  }, [toastMessage]);

  const handleToggleMenu = useCallback(
    (menu: MenuItem) => {
      setSelectedMenuIds((prev) => {
        const exists = prev.includes(menu.id);
        if (exists) {
          showToast(`${menu.name} 선택이 해제되었습니다.`);
          return prev.filter((id) => id !== menu.id);
        } else {
          showToast(`${menu.name}이(가) 견적 신청서에 담겼습니다.`);
          return [...prev, menu.id];
        }
      });
    },
    [showToast]
  );

  const handleRemoveMenu = useCallback((id: string) => {
    setSelectedMenuIds((prev) => prev.filter((item) => item !== id));
  }, []);

  const handleClearMenus = useCallback(() => {
    setSelectedMenuIds([]);
  }, []);

  const selectedMenus = MENU_ITEMS.filter((item) =>
    selectedMenuIds.includes(item.id)
  );

  const handleOpenKakao = useCallback((customQuote?: string) => {
    setKakaoCustomQuoteText(customQuote);
    setIsKakaoModalOpen(true);
  }, []);

  const fallbackSelectedQuoteText =
    selectedMenus.length > 0
      ? `[도시락담다 견적 상담]\n희망 메뉴: ${selectedMenus
          .map((m) => `${m.name} (${m.priceFormatted})`)
          .join(", ")}`
      : undefined;

  return (
    <div className="min-h-screen flex flex-col bg-[#f7f6f3] text-[#161f1d]">
      <Header />

      <main className="flex-1">
        <Hero onOpenKakao={() => handleOpenKakao()} />
        <FeaturesSection onOpenKakao={() => handleOpenKakao()} />
        <MenuSection
          selectedMenuIds={selectedMenuIds}
          onToggleMenu={handleToggleMenu}
        />
        <ProcessSection />
        <InquirySection
          selectedMenus={selectedMenus}
          onRemoveMenu={handleRemoveMenu}
          onClearMenus={handleClearMenus}
          onOpenKakao={handleOpenKakao}
        />
      </main>

      <Footer onOpenKakao={() => handleOpenKakao()} />
      <MobileStickyBar
        selectedCount={selectedMenuIds.length}
        onOpenKakao={() => handleOpenKakao()}
      />

      <KakaoConsultModal
        isOpen={isKakaoModalOpen}
        onClose={() => setIsKakaoModalOpen(false)}
        quoteText={kakaoCustomQuoteText || fallbackSelectedQuoteText}
      />

      {/* Accessible Non-Blocking Toast */}
      <div
        role="status"
        aria-live="polite"
        className={`fixed bottom-20 md:bottom-6 left-1/2 -translate-x-1/2 z-50 px-4 py-2.5 rounded-lg bg-[#161f1d] text-white text-xs sm:text-sm font-semibold shadow-lg transition-all duration-200 pointer-events-none whitespace-nowrap ${
          toastMessage ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
        }`}
      >
        {toastMessage}
      </div>
    </div>
  );
}
