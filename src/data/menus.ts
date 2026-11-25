import processHygienePacking from "../assets/images/process_hygiene_packing_v2_1795611724027.jpg";

export const BRAND_IMAGES = {
  brandMark: "/assets/aistudio/20260119_120108_0315bac2.jpg",
  heroMain: "/assets/aistudio/KakaoTalk_20260801_195245854_19_69257d40.jpg",
  featureSpread1: "/assets/aistudio/KakaoTalk_20260801_195245854_16_8cb4929b.jpg",
  featureSpread2: "/assets/aistudio/watermarked_img_7392641346911436412_421a1d04.webp",
  hygienePacking: processHygienePacking,
};

export type MenuCategory = "all" | "premium" | "combo" | "value";

export interface MenuItem {
  id: string;
  name: string;
  category: Exclude<MenuCategory, "all">;
  categoryLabel: string;
  badge?: "대표" | "인기";
  description: string;
  price: number;
  priceFormatted: string;
  image: string;
}

export const MENU_ITEMS: MenuItem[] = [
  // 프리미엄 한정식
  {
    id: "pumgyeok-hanjeongsik",
    name: "품격 한정식 도시락",
    category: "premium",
    categoryLabel: "프리미엄 한정식",
    badge: "대표",
    description: "불고기 + 제육 + 새우튀김 2개 + 생선가스(반) + 잡채 + 삼색전 등",
    price: 15900,
    priceFormatted: "15,900원",
    image: "/assets/menus/pumgyeok-hanjeongsik.jpg",
  },
  {
    id: "pumgyeok-hangadeuk",
    name: "품격 한가득 도시락",
    category: "premium",
    categoryLabel: "프리미엄 한정식",
    description: "전통방식 숙성 소불고기 + 매콤 오징어볶음 + 명인 떡갈비 + 군만두 등",
    price: 15900,
    priceFormatted: "15,900원",
    image: "/assets/menus/pumgyeok-hangadeuk.jpg",
  },
  {
    id: "myeongin-tteok-ojingeo",
    name: "명인(떡갈비+오징어)도시락",
    category: "premium",
    categoryLabel: "프리미엄 한정식",
    description: "명인 떡갈비 + 매콤한 오징어볶음 + 삼색전 + 계란말이 + 샐러드 + 잡채 + 반찬",
    price: 14900,
    priceFormatted: "14,900원",
    image: "/assets/menus/myeongin-tteok-ojingeo.jpg",
  },
  // 인기 콤보 & 정식
  {
    id: "odon-combo",
    name: "오돈콤보(오징어볶음+돈가스)",
    category: "combo",
    categoryLabel: "인기 콤보·정식",
    badge: "인기",
    description: "오징어볶음 + 돈가스 + 잡채 + 전 + 반찬 4종 + 샐러드 + 국 + 흑미밥",
    price: 14300,
    priceFormatted: "14,300원",
    image: "/assets/menus/odon-combo.jpg",
  },
  {
    id: "hanjeongsik-bulgogi",
    name: "한정식 소불고기도시락",
    category: "combo",
    categoryLabel: "인기 콤보·정식",
    description: "불고기 + 새우튀김 2개 + 잡채 + 삼색전 + 계란말이 + 샐러드 + 4찬 반찬 + 국 + 흑미밥",
    price: 14300,
    priceFormatted: "14,300원",
    image: "/assets/menus/hanjeongsik-bulgogi.jpg",
  },
  {
    id: "myeongin-tteok-bulgogi",
    name: "명인(떡갈비+소불고기)도시락",
    category: "combo",
    categoryLabel: "인기 콤보·정식",
    description: "명인 떡갈비 + 소불고기 + 오색전 + 전통 잡채 + 계란말이 + 샐러드 + 반찬 4가지",
    price: 14300,
    priceFormatted: "14,300원",
    image: "/assets/menus/myeongin-tteok-bulgogi.jpg",
  },
  {
    id: "myeongin-tteok-jeyuk",
    name: "명인(떡갈비+제육) 도시락",
    category: "combo",
    categoryLabel: "인기 콤보·정식",
    badge: "인기",
    description: "명인 떡갈비 + 제육볶음 + 오색전 + 전통 잡채 + 계란말이 + 샐러드 + 반찬 4가지",
    price: 13900,
    priceFormatted: "13,900원",
    image: "/assets/menus/myeongin-tteok-jeyuk.jpg",
  },
  {
    id: "buldon-combo",
    name: "불돈콤보(소불고기+돈가스)",
    category: "combo",
    categoryLabel: "인기 콤보·정식",
    description: "소불고기 + 돈가스 + 잡채 + 전 + 반찬 4종 + 샐러드 + 국 + 흑미밥",
    price: 13900,
    priceFormatted: "13,900원",
    image: "/assets/menus/buldon-combo.jpg",
  },
  {
    id: "combo-c",
    name: "콤보C (오징어+불고기)도시락",
    category: "combo",
    categoryLabel: "인기 콤보·정식",
    description: "오징어볶음 + 불고기 + 잡채 + 전 + 반찬 4종 + 샐러드 + 국 + 흑미밥",
    price: 13900,
    priceFormatted: "13,900원",
    image: "/assets/menus/combo-c.jpg",
  },
  {
    id: "jedon-combo",
    name: "제돈콤보(제육볶음+돈가스)",
    category: "combo",
    categoryLabel: "인기 콤보·정식",
    description: "제육볶음 + 돈가스 + 잡채 + 전 + 반찬 4종 + 샐러드 + 국 + 흑미밥",
    price: 13400,
    priceFormatted: "13,400원",
    image: "/assets/menus/jedon-combo.jpg",
  },
  {
    id: "combo-a",
    name: "콤보A (불고기+제육볶음) 도시락",
    category: "combo",
    categoryLabel: "인기 콤보·정식",
    description: "불고기 + 제육볶음 + 잡채 + 계란말이 + 샐러드 + 4찬 반찬 + 국 + 흑미밥",
    price: 13400,
    priceFormatted: "13,400원",
    image: "/assets/menus/combo-a.jpg",
  },
  {
    id: "combo-b",
    name: "콤보B (제육볶음+불고기) 도시락",
    category: "combo",
    categoryLabel: "인기 콤보·정식",
    description: "불고기 + 제육볶음 + 잡채 + 계란말이 + 샐러드 + 4찬 반찬 + 국 + 흑미밥",
    price: 12900,
    priceFormatted: "12,900원",
    image: "/assets/menus/combo-b.jpg",
  },
  // 실속 단품
  {
    id: "deungsim-tonkatsu",
    name: "등심돈까스도시락",
    category: "value",
    categoryLabel: "실속 단품",
    description: "바삭한 등심돈까스와 흑미밥, 정갈한 반찬 조합의 실속 메뉴",
    price: 10500,
    priceFormatted: "10,500원",
    image: "/assets/menus/deungsim-tonkatsu.jpg",
  },
  {
    id: "maekom-ojingeo",
    name: "매콤오징어볶음도시락",
    category: "value",
    categoryLabel: "실속 단품",
    description: "매콤달콤한 오징어볶음을 메인으로 한 든든한 한 끼",
    price: 10500,
    priceFormatted: "10,500원",
    image: "/assets/menus/maekom-ojingeo.jpg",
  },
  {
    id: "gyeongyangsik-tonkatsu",
    name: "경양식돈까스도시락",
    category: "value",
    categoryLabel: "실속 단품",
    description: "소스가 어우러진 돈까스로 남녀노소 부담 없이 즐기기 좋은 메뉴",
    price: 10000,
    priceFormatted: "10,000원",
    image: "/assets/menus/gyeongyangsik-tonkatsu.jpg",
  },
  {
    id: "saengseon-shrimp",
    name: "생선가스&새우튀김도시락",
    category: "value",
    categoryLabel: "실속 단품",
    description: "튀김류를 선호하는 행사·모임용 가성비 구성",
    price: 10000,
    priceFormatted: "10,000원",
    image: "/assets/menus/saengseon-shrimp.jpg",
  },
  {
    id: "silsok-pabulgogi",
    name: "실속파불고기도시락",
    category: "value",
    categoryLabel: "실속 단품",
    description: "달큰하고 감칠맛 나는 불고기 중심의 실속 도시락",
    price: 10000,
    priceFormatted: "10,000원",
    image: "/assets/menus/silsok-pabulgogi.jpg",
  },
  {
    id: "modeum-tonkatsu",
    name: "모듬돈까스",
    category: "value",
    categoryLabel: "실속 단품",
    description: "생선가스 + 새우튀김 + 돈가스 + 흑미밥 + 반찬 및 샐러드",
    price: 10000,
    priceFormatted: "10,000원",
    image: "/assets/menus/modeum-tonkatsu.jpg",
  },
  {
    id: "tteokgalbi-dosirak",
    name: "떡갈비 도시락",
    category: "value",
    categoryLabel: "실속 단품",
    description: "담백한 떡갈비와 기본 반찬으로 구성된 합리적 선택",
    price: 10000,
    priceFormatted: "10,000원",
    image: "/assets/menus/tteokgalbi-dosirak.jpg",
  },
  {
    id: "eommason-jeyuk",
    name: "엄마손제육볶음도시락",
    category: "value",
    categoryLabel: "실속 단품",
    description: "예산 부담을 낮춘 단체·학원·현장 식사용 베스트 가성비 메뉴",
    price: 9500,
    priceFormatted: "9,500원",
    image: "/assets/menus/eommason-jeyuk.jpg",
  },
];

export const KAKAO_CHANNEL_URL = "https://qr.kakao.com/talk/Dn8Iu0AO60T3uTJ2IsaVAiK2Wvg-";
export const KAKAO_ID = "lionpark67";
export const KAKAO_QR_IMAGE = "/assets/aistudio/image_4bb567bb.png";
export const CONTACT_PHONE = "010-2267-3330";
export const CONTACT_PHONE_HREF = "tel:01022673330";
export const CONTACT_EMAIL = "p3330@naver.com";
export const CONTACT_EMAIL_HREF = "mailto:p3330@naver.com";
