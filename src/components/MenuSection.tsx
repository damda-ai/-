import { useMemo, useState } from "react";
import { ArrowRight, Check, Plus } from "lucide-react";
import { MENU_ITEMS, MenuCategory, MenuItem } from "../data/menus";
import { ResilientImage } from "./ResilientImage";

interface MenuSectionProps {
  selectedMenuIds: string[];
  onToggleMenu: (menu: MenuItem) => void;
}

const FILTER_TABS: { id: MenuCategory; label: string }[] = [
  { id: "all", label: "전체 메뉴 (20)" },
  { id: "premium", label: "프리미엄 한정식 (3)" },
  { id: "combo", label: "인기 콤보·정식 (9)" },
  { id: "value", label: "실속 단품 (8)" },
];

export function MenuSection({ selectedMenuIds, onToggleMenu }: MenuSectionProps) {
  const [activeFilter, setActiveFilter] = useState<MenuCategory>("all");

  const filteredItems = useMemo(() => {
    if (activeFilter === "all") return MENU_ITEMS;
    return MENU_ITEMS.filter((item) => item.category === activeFilter);
  }, [activeFilter]);

  const selectedItems = useMemo(
    () => MENU_ITEMS.filter((item) => selectedMenuIds.includes(item.id)),
    [selectedMenuIds]
  );

  return (
    <section id="menu" className="py-16 md:py-24 bg-white border-t border-b border-[#e5e2da]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Quality Promise Banner */}
        <div className="bg-[#161f1d] text-white rounded-2xl p-6 sm:p-8 mb-12 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h3 className="text-lg sm:text-xl font-extrabold tracking-tight mb-1.5">
              뚜껑 열자마자 박수 나오는 &lsquo;도시락담다&rsquo; 수제 도시락
            </h3>
            <p className="text-sm sm:text-[15px] text-[#cfd8d5] leading-relaxed">
              공장에서 찍어내는 냉동 도시락이 아닙니다. 당일 신선한 재료로 조리해 따뜻하고 정갈하게 담아드립니다.
            </p>
          </div>
          <a
            href="#inquiry"
            className="inline-flex items-center justify-center px-5 py-2.5 min-h-[42px] rounded-lg bg-[#e05a1b] hover:bg-[#c94c12] text-white text-sm font-bold transition-colors whitespace-nowrap shrink-0 self-start md:self-auto"
          >
            예산 맞춤 추천받기
          </a>
        </div>

        {/* Section Header & Segmented Filter */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <p className="text-xs font-bold tracking-wider uppercase text-[#e05a1b] mb-2">
              MENU LINEUP
            </p>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#161f1d] tracking-tight mb-2">
              대표 메뉴 라인업 (높은 가격순)
            </h2>
            <p className="text-sm text-[#5a6260]">
              원하는 메뉴의 <strong className="text-[#161f1d]">+ 견적 담기</strong>를 누르면 아래 견적 신청서에 자동 입력됩니다.
            </p>
          </div>

          <div
            role="tablist"
            aria-label="메뉴 카테고리 필터"
            className="flex items-center gap-1 p-1 bg-[#f4f2ec] border border-[#e5e2da] rounded-xl overflow-x-auto max-w-full"
          >
            {FILTER_TABS.map((tab) => {
              const isActive = activeFilter === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveFilter(tab.id)}
                  className={`px-3.5 py-2 min-h-[38px] rounded-lg text-xs sm:text-[13px] font-bold transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e05a1b] ${
                    isActive
                      ? "bg-[#161f1d] text-white shadow-sm"
                      : "text-[#5a6260] hover:text-[#161f1d]"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Menus Inline Summary Bar */}
        {selectedItems.length > 0 && (
          <div className="mb-6 bg-[#fff5f0] border border-[#ffd6c2] rounded-xl px-4 py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="text-sm text-[#161f1d]">
              <span className="font-bold text-[#e05a1b] tabular-nums">
                {selectedItems.length}개 메뉴
              </span>
              <span className="mx-2 text-[#c9b8ae]">·</span>
              <span className="font-medium text-[#4a5250]">
                {selectedItems.map((m) => m.name).join(", ")}
              </span>
            </div>
            <a
              href="#inquiry"
              className="inline-flex items-center justify-center gap-1.5 px-4 py-2 min-h-[38px] rounded-lg bg-[#e05a1b] hover:bg-[#c94c12] text-white text-xs sm:text-sm font-bold transition-colors whitespace-nowrap shrink-0 self-start sm:self-auto"
            >
              담은 메뉴로 견적 신청
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        )}

        {/* 2-Column Menu Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredItems.map((item) => {
            const isPicked = selectedMenuIds.includes(item.id);
            return (
              <article
                key={item.id}
                className={`flex items-stretch justify-between gap-4 p-4 rounded-xl border transition-colors ${
                  isPicked
                    ? "bg-[#fffaf7] border-[#e05a1b]"
                    : "bg-white border-[#e5e2da] hover:border-[#c8c2b6]"
                }`}
              >
                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-[#5a6260] mb-1">
                      <span>{item.categoryLabel}</span>
                      {item.badge && (
                        <>
                          <span aria-hidden="true">·</span>
                          <span className="text-[#e05a1b] font-bold">{item.badge}</span>
                        </>
                      )}
                    </div>
                    <h3 className="text-base sm:text-[17px] font-extrabold text-[#161f1d] leading-snug mb-1.5">
                      {item.name}
                    </h3>
                    <p className="text-[13px] text-[#5a6260] leading-relaxed line-clamp-2 mb-3">
                      {item.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between gap-2 pt-1">
                    <span className="text-base sm:text-lg font-extrabold text-[#161f1d] tabular-nums">
                      {item.priceFormatted}
                    </span>
                    <button
                      type="button"
                      onClick={() => onToggleMenu(item)}
                      aria-pressed={isPicked}
                      className={`inline-flex items-center justify-center gap-1 px-3.5 py-2 min-h-[40px] rounded-lg text-xs font-bold transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e05a1b] ${
                        isPicked
                          ? "bg-[#161f1d] text-white"
                          : "bg-[#f7f6f3] text-[#161f1d] border border-[#dcd8ce] hover:border-[#e05a1b] hover:text-[#e05a1b]"
                      }`}
                    >
                      {isPicked ? (
                        <>
                          <Check className="w-3.5 h-3.5" strokeWidth={2.5} />
                          담김
                        </>
                      ) : (
                        <>
                          <Plus className="w-3.5 h-3.5" strokeWidth={2.5} />
                          견적 담기
                        </>
                      )}
                    </button>
                  </div>
                </div>

                <div className="w-24 sm:w-28 h-24 sm:h-28 rounded-lg overflow-hidden bg-[#edeae3] shrink-0 self-center">
                  <ResilientImage
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
