import { FormEvent, useEffect, useMemo, useState } from "react";
import { Check, Copy, Mail, MessageCircle, Phone, QrCode, RotateCcw, X } from "lucide-react";
import {
  CONTACT_EMAIL,
  CONTACT_PHONE,
  CONTACT_PHONE_HREF,
  KAKAO_CHANNEL_URL,
  KAKAO_ID,
  KAKAO_QR_IMAGE,
  MenuItem,
} from "../data/menus";
import { ResilientImage } from "./ResilientImage";

interface InquirySectionProps {
  selectedMenus: MenuItem[];
  onRemoveMenu: (id: string) => void;
  onClearMenus: () => void;
  onOpenKakao: (quoteText?: string) => void;
}

const FORMSPREE_ENDPOINT = "https://formspree.io/f/xnpdwzbz";

const EVENT_TYPES = [
  "회의 / 세미나",
  "병원 / 학회 행사",
  "학원 / 학교 / 시험",
  "워크샵 / 체육대회 / 각종 행사",
  "회사 야근 / 정기 식사",
  "기타 모임·단체",
];

const BUDGET_OPTIONS = [
  "9,000원 ~ 10,500원 (실속 라인)",
  "12,000원 ~ 14,300원 (인기 콤보·정식)",
  "14,900원 ~ 15,900원 (프리미엄 한정식)",
  "예산 맞춤 추천 희망",
];

const DOC_OPTIONS = ["견적서 발급", "세금계산서", "현금영수증", "카드결제"];

interface SubmittedQuote {
  name: string;
  phone: string;
  replyEmail: string;
  eventType: string;
  deliveryTime: string;
  quantity: string;
  budget: string;
  menuText: string;
  address: string;
  docs: string[];
  notes: string;
  submittedAt: string;
}

export function InquirySection({
  selectedMenus,
  onRemoveMenu,
  onClearMenus,
  onOpenKakao,
}: InquirySectionProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [replyEmail, setReplyEmail] = useState("");
  const [eventType, setEventType] = useState("");
  const [deliveryTime, setDeliveryTime] = useState("");
  const [quantity, setQuantity] = useState("");
  const [budget, setBudget] = useState("");
  const [customMenuText, setCustomMenuText] = useState("");
  const [address, setAddress] = useState("");
  const [selectedDocs, setSelectedDocs] = useState<string[]>([]);
  const [notes, setNotes] = useState("");
  const [agreedPrivacy, setAgreedPrivacy] = useState(false);

  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedQuote, setSubmittedQuote] = useState<SubmittedQuote | null>(null);
  const [copiedSummary, setCopiedSummary] = useState(false);
  const [copiedKakaoId, setCopiedKakaoId] = useState(false);
  const [showKakaoQr, setShowKakaoQr] = useState(false);

  // Sync picked menus into the editable menu text input
  useEffect(() => {
    if (selectedMenus.length > 0) {
      setCustomMenuText(
        selectedMenus.map((m) => `${m.name} (${m.priceFormatted})`).join(", ")
      );
    } else if (selectedMenus.length === 0 && customMenuText.includes("원)")) {
      setCustomMenuText("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedMenus]);

  // Estimate range if quantity has a number and menus are selected
  const estimatedSubtotal = useMemo(() => {
    const qtyNum = parseInt(quantity.replace(/[^0-9]/g, ""), 10);
    if (!qtyNum || qtyNum <= 0 || selectedMenus.length === 0) return null;
    const avgPrice =
      selectedMenus.reduce((sum, m) => sum + m.price, 0) / selectedMenus.length;
    return Math.round(avgPrice * qtyNum);
  }, [quantity, selectedMenus]);

  const toggleDoc = (doc: string) => {
    setSelectedDocs((prev) =>
      prev.includes(doc) ? prev.filter((d) => d !== doc) : [...prev, doc]
    );
  };

  const buildSummaryText = (quote: SubmittedQuote) => {
    return [
      "[도시락담다 단체도시락 견적 문의]",
      `성함/단체명: ${quote.name}`,
      `연락처: ${quote.phone}`,
      `행사 유형: ${quote.eventType}`,
      `배송 희망 일시: ${quote.deliveryTime}`,
      `예상 수량: ${quote.quantity}`,
      quote.budget ? `희망 예산대: ${quote.budget}` : null,
      `희망 메뉴: ${quote.menuText || "추천 희망"}`,
      `배송 지역: ${quote.address}`,
      quote.docs.length > 0 ? `필요 증빙/결제: ${quote.docs.join(", ")}` : null,
      quote.notes ? `요청사항: ${quote.notes}` : null,
    ]
      .filter(Boolean)
      .join("\n");
  };

  const draftEmailHref = useMemo(() => {
    const subject = `[도시락담다] 단체도시락 견적 문의${name.trim() ? ` - ${name.trim()}` : ""}`;
    const body = [
      "[도시락담다 단체도시락 견적 문의]",
      `성함/단체명: ${name.trim() || "(입력 예정)"}`,
      `연락처: ${phone.trim() || "(입력 예정)"}`,
      `행사 유형: ${eventType || "(선택 예정)"}`,
      `배송 희망 일시: ${deliveryTime.trim() || "(입력 예정)"}`,
      `예상 수량: ${quantity.trim() || "(입력 예정)"}`,
      budget ? `희망 예산대: ${budget}` : null,
      `희망 메뉴: ${customMenuText.trim() || "추천 희망"}`,
      `배송 지역: ${address.trim() || "(입력 예정)"}`,
      selectedDocs.length > 0 ? `필요 증빙/결제: ${selectedDocs.join(", ")}` : null,
      notes.trim() ? `요청사항: ${notes.trim()}` : null,
    ]
      .filter(Boolean)
      .join("\n");

    return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }, [name, phone, eventType, deliveryTime, quantity, budget, customMenuText, address, selectedDocs, notes]);

  const submittedEmailHref = useMemo(() => {
    if (!submittedQuote) return `mailto:${CONTACT_EMAIL}`;
    const subject = `[도시락담다] 단체도시락 견적 문의 - ${submittedQuote.name} (${submittedQuote.quantity})`;
    const body = buildSummaryText(submittedQuote);
    return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }, [submittedQuote]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitting) return;
    setErrorMsg(null);

    const digitsOnly = phone.replace(/[^0-9]/g, "");
    if (digitsOnly.length < 9 || digitsOnly.length > 12) {
      setErrorMsg("올바른 연락처 번호(9~12자리 숫자)를 입력해 주세요.");
      return;
    }

    if (!agreedPrivacy) {
      setErrorMsg("개인정보 수집 및 이용 동의에 체크해 주세요.");
      return;
    }

    const trimmedName = name.trim();
    const trimmedPhone = phone.trim();
    const trimmedReplyEmail = replyEmail.trim();
    const trimmedDeliveryTime = deliveryTime.trim();
    const trimmedQuantity = quantity.trim();
    const resolvedMenuText = customMenuText.trim() || "예산 맞춤 추천 희망";
    const trimmedAddress = address.trim();
    const trimmedNotes = notes.trim();

    const now = new Date();
    const formattedTime = `${now.getFullYear()}.${String(now.getMonth() + 1).padStart(2, "0")}.${String(now.getDate()).padStart(2, "0")} ${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;

    const formData = new FormData(e.currentTarget);
    formData.set("_subject", `[도시락담다] 단체도시락 견적 문의 - ${trimmedName} (${trimmedQuantity})`);
    formData.set("성함_단체명", trimmedName);
    formData.set("연락처", trimmedPhone);
    if (trimmedReplyEmail) {
      formData.set("email", trimmedReplyEmail);
    }
    formData.set("행사유형", eventType);
    formData.set("배송희망일시", trimmedDeliveryTime);
    formData.set("예상수량", trimmedQuantity);
    formData.set("희망예산대", budget || "미선택");
    formData.set("희망메뉴", resolvedMenuText);
    formData.set(
      "참고예상금액",
      estimatedSubtotal ? `약 ${estimatedSubtotal.toLocaleString("ko-KR")}원` : "미산출"
    );
    formData.set("배송지역", trimmedAddress);
    formData.set("증빙_결제방식", selectedDocs.length > 0 ? selectedDocs.join(", ") : "미선택");
    formData.set("기타요청사항", trimmedNotes || "없음");
    formData.set("접수시각", formattedTime);
    formData.set("유입페이지", typeof window !== "undefined" ? window.location.href : "");

    setIsSubmitting(true);

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: formData,
      });

      if (!response.ok) {
        const result = await response.json().catch(() => null);
        const serverMsg =
          result?.errors?.map((err: { message?: string }) => err.message).join(", ") ||
          "견적 전송 중 문제가 발생했습니다. 잠시 후 다시 시도하거나 전화·카카오톡으로 문의해 주세요.";
        setErrorMsg(serverMsg);
        return;
      }

      setSubmittedQuote({
        name: trimmedName,
        phone: trimmedPhone,
        replyEmail: trimmedReplyEmail,
        eventType,
        deliveryTime: trimmedDeliveryTime,
        quantity: trimmedQuantity,
        budget,
        menuText: resolvedMenuText,
        address: trimmedAddress,
        docs: selectedDocs,
        notes: trimmedNotes,
        submittedAt: formattedTime,
      });
    } catch {
      setErrorMsg(
        `네트워크 연결을 확인한 뒤 다시 시도해 주세요. 급한 문의는 전화(${CONTACT_PHONE}) 또는 카카오톡(ID: ${KAKAO_ID})으로 바로 가능합니다.`
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopySummary = async () => {
    if (!submittedQuote) return;
    try {
      await navigator.clipboard.writeText(buildSummaryText(submittedQuote));
      setCopiedSummary(true);
      setTimeout(() => setCopiedSummary(false), 2500);
    } catch {
      // Clipboard fallback ignored if blocked by browser permission
    }
  };

  const handleCopyKakaoId = async () => {
    try {
      await navigator.clipboard.writeText(KAKAO_ID);
      setCopiedKakaoId(true);
      setTimeout(() => setCopiedKakaoId(false), 2500);
    } catch {
      // Clipboard fallback ignored if blocked by browser permission
    }
  };

  const handleResetForm = () => {
    setSubmittedQuote(null);
    setName("");
    setPhone("");
    setReplyEmail("");
    setEventType("");
    setDeliveryTime("");
    setQuantity("");
    setBudget("");
    setCustomMenuText("");
    setAddress("");
    setSelectedDocs([]);
    setNotes("");
    setAgreedPrivacy(false);
    setErrorMsg(null);
    onClearMenus();
  };

  return (
    <section
      id="inquiry"
      className="py-16 md:py-24 bg-white border-t border-[#e5e2da]"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <p className="text-xs font-bold tracking-wider uppercase text-[#e05a1b] mb-2">
            FAST QUOTE
          </p>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#161f1d] tracking-tight text-balance mb-3">
            단체주문 간편 견적 문의
          </h2>
          <p className="text-[15px] sm:text-base text-[#5a6260]">
            예산과 수량만 남겨주시면 확인 후{" "}
            <strong className="text-[#161f1d]">10분 내로 맞춤 견적</strong>을 보내드립니다.
          </p>
        </div>

        <div className="bg-[#f7f6f3] border border-[#e5e2da] rounded-2xl p-5 sm:p-8">
          {/* Quick Direct Contact Strip */}
          <div className="bg-white border border-[#e5e2da] rounded-xl p-4 sm:p-5 mb-7">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div>
                <h3 className="text-sm sm:text-base font-bold text-[#161f1d] mb-0.5">
                  급한 일정이나 바로 상담이 필요하신가요?
                </h3>
                <p className="text-xs sm:text-sm text-[#5a6260] leading-relaxed">
                  전화(
                  <span className="tabular-nums font-semibold text-[#161f1d]">{CONTACT_PHONE}</span>
                  ), 이메일(
                  <a
                    href={draftEmailHref}
                    className="font-semibold text-[#161f1d] underline underline-offset-2 hover:text-[#e05a1b]"
                  >
                    {CONTACT_EMAIL}
                  </a>
                  ), 카카오톡(ID:{" "}
                  <span className="font-semibold text-[#161f1d]">{KAKAO_ID}</span>
                  )으로 즉시 안내해 드립니다.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() =>
                    onOpenKakao(
                      customMenuText.trim()
                        ? `[도시락담다 견적 상담]\n희망 메뉴: ${customMenuText.trim()}${quantity.trim() ? `\n예상 수량: ${quantity.trim()}` : ""}`
                        : undefined
                    )
                  }
                  className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 min-h-[42px] rounded-lg bg-[#fee500] hover:bg-[#f2da00] text-[#191919] text-xs sm:text-sm font-bold transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 shrink-0" strokeWidth={2.25} />
                  카카오톡 상담
                </button>
                <button
                  type="button"
                  onClick={() => setShowKakaoQr((prev) => !prev)}
                  aria-expanded={showKakaoQr}
                  className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 min-h-[42px] rounded-lg border border-[#d5d1c8] bg-white hover:bg-[#f7f6f3] text-[#161f1d] text-xs sm:text-sm font-bold transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <QrCode className="w-4 h-4 shrink-0" strokeWidth={2.25} />
                  카톡 QR
                </button>
                <a
                  href={draftEmailHref}
                  className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 min-h-[42px] rounded-lg border border-[#d5d1c8] bg-white hover:bg-[#f7f6f3] text-[#161f1d] text-xs sm:text-sm font-bold transition-colors whitespace-nowrap shrink-0"
                >
                  <Mail className="w-4 h-4 shrink-0" strokeWidth={2.25} />
                  이메일 문의
                </a>
                <a
                  href={CONTACT_PHONE_HREF}
                  className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 min-h-[42px] rounded-lg bg-[#161f1d] hover:bg-[#263330] text-white text-xs sm:text-sm font-bold transition-colors whitespace-nowrap shrink-0"
                >
                  <Phone className="w-4 h-4 shrink-0" strokeWidth={2.25} />
                  전화 걸기
                </a>
              </div>
            </div>

            {showKakaoQr && (
              <div className="mt-4 pt-4 border-t border-[#e5e2da] flex flex-col sm:flex-row items-center gap-4">
                <div className="w-36 sm:w-40 rounded-xl overflow-hidden border border-[#e5e2da] bg-[#fdf0d5] shrink-0">
                  <ResilientImage
                    src={KAKAO_QR_IMAGE}
                    alt="도시락담다 카카오톡 친구 추가 QR 코드 (ID: lionpark67)"
                    className="w-full h-auto object-contain"
                  />
                </div>
                <div className="text-center sm:text-left">
                  <p className="text-sm font-bold text-[#161f1d] mb-1">
                    박상태 폰변경 · {CONTACT_PHONE}
                  </p>
                  <p className="text-xs sm:text-sm text-[#5a6260] mb-3">
                    스마트폰 카메라로 QR 코드를 스캔하거나 카카오톡에서 아이디{" "}
                    <strong className="text-[#161f1d]">{KAKAO_ID}</strong>를 검색해 친구 추가해 주세요.
                  </p>
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                    <button
                      type="button"
                      onClick={handleCopyKakaoId}
                      className="inline-flex items-center justify-center gap-1.5 px-3 py-2 min-h-[38px] rounded-lg border border-[#d5d1c8] bg-[#f7f6f3] hover:bg-[#edeae3] text-[#161f1d] text-xs font-bold transition-colors cursor-pointer"
                    >
                      {copiedKakaoId ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-[#e05a1b]" />
                          아이디 복사됨 ({KAKAO_ID})
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          카톡 ID 복사 ({KAKAO_ID})
                        </>
                      )}
                    </button>
                    <a
                      href={KAKAO_CHANNEL_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-1.5 px-3 py-2 min-h-[38px] rounded-lg bg-[#fee500] hover:bg-[#f2da00] text-[#191919] text-xs font-bold transition-colors"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      카카오톡 바로 열기
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>

          {submittedQuote ? (
            /* Confirmed Quote Receipt State */
            <div
              role="status"
              aria-live="polite"
              className="bg-white border border-[#e5e2da] rounded-xl p-6 sm:p-8"
            >
              <div className="flex items-center gap-3 mb-5 pb-5 border-b border-[#e5e2da]">
                <div className="w-10 h-10 rounded-full bg-[#e05a1b] text-white flex items-center justify-center shrink-0">
                  <Check className="w-5 h-5" strokeWidth={2.75} />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-extrabold text-[#161f1d]">
                    견적 문의가 정상 접수되었습니다
                  </h3>
                  <p className="text-xs sm:text-sm text-[#5a6260] tabular-nums">
                    접수 시각: {submittedQuote.submittedAt} · 확인 후 10분 내로 연락드리겠습니다.
                  </p>
                </div>
              </div>

              <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 text-sm mb-6">
                <div>
                  <dt className="text-xs font-semibold text-[#88918e]">성함 / 단체명</dt>
                  <dd className="font-bold text-[#161f1d] mt-0.5">{submittedQuote.name}</dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold text-[#88918e]">연락처</dt>
                  <dd className="font-bold text-[#161f1d] tabular-nums mt-0.5">
                    {submittedQuote.phone}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold text-[#88918e]">행사 유형</dt>
                  <dd className="font-semibold text-[#161f1d] mt-0.5">{submittedQuote.eventType}</dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold text-[#88918e]">배송 희망 일시</dt>
                  <dd className="font-semibold text-[#161f1d] mt-0.5">
                    {submittedQuote.deliveryTime}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold text-[#88918e]">예상 수량</dt>
                  <dd className="font-semibold text-[#161f1d] tabular-nums mt-0.5">
                    {submittedQuote.quantity}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold text-[#88918e]">배송 지역</dt>
                  <dd className="font-semibold text-[#161f1d] mt-0.5">{submittedQuote.address}</dd>
                </div>
                <div className="sm:col-span-2">
                  <dt className="text-xs font-semibold text-[#88918e]">희망 메뉴</dt>
                  <dd className="font-semibold text-[#161f1d] mt-0.5">{submittedQuote.menuText}</dd>
                </div>
                {submittedQuote.docs.length > 0 && (
                  <div className="sm:col-span-2">
                    <dt className="text-xs font-semibold text-[#88918e]">증빙·결제</dt>
                    <dd className="font-semibold text-[#161f1d] mt-0.5">
                      {submittedQuote.docs.join(", ")}
                    </dd>
                  </div>
                )}
              </dl>

              <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-[#e5e2da]">
                <button
                  type="button"
                  onClick={handleCopySummary}
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 min-h-[42px] rounded-lg bg-[#161f1d] hover:bg-[#263330] text-white text-xs sm:text-sm font-bold transition-colors cursor-pointer"
                >
                  {copiedSummary ? (
                    <>
                      <Check className="w-4 h-4" />
                      견적 내용 복사됨
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      카톡 전달용 내용 복사
                    </>
                  )}
                </button>
                <a
                  href={submittedEmailHref}
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 min-h-[42px] rounded-lg border border-[#d5d1c8] bg-white hover:bg-[#f7f6f3] text-[#161f1d] text-xs sm:text-sm font-bold transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  이메일({CONTACT_EMAIL}) 전송
                </a>
                <button
                  type="button"
                  onClick={() => onOpenKakao(buildSummaryText(submittedQuote))}
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 min-h-[42px] rounded-lg bg-[#fee500] hover:bg-[#f2da00] text-[#191919] text-xs sm:text-sm font-bold transition-colors cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" />
                  카카오톡으로 바로 전송
                </button>
                <button
                  type="button"
                  onClick={handleCopyKakaoId}
                  className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 min-h-[42px] rounded-lg border border-[#d5d1c8] bg-white hover:bg-[#f7f6f3] text-[#161f1d] text-xs sm:text-sm font-semibold transition-colors cursor-pointer"
                >
                  {copiedKakaoId ? `카톡 ID 복사됨 (${KAKAO_ID})` : `카톡 ID: ${KAKAO_ID}`}
                </button>
                <button
                  type="button"
                  onClick={handleResetForm}
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 min-h-[42px] rounded-lg border border-[#d5d1c8] bg-white hover:bg-[#f7f6f3] text-[#4a5250] text-xs sm:text-sm font-semibold transition-colors cursor-pointer ml-auto"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  새 견적 작성
                </button>
              </div>

              <div className="mt-5 pt-5 border-t border-[#e5e2da] flex flex-col sm:flex-row items-center gap-4">
                <div className="w-28 rounded-xl overflow-hidden border border-[#e5e2da] bg-[#fdf0d5] shrink-0">
                  <ResilientImage
                    src={KAKAO_QR_IMAGE}
                    alt="카카오톡 친구 추가 QR 코드 (ID: lionpark67)"
                    className="w-full h-auto object-contain"
                  />
                </div>
                <p className="text-xs sm:text-sm text-[#5a6260] leading-relaxed text-center sm:text-left">
                  PC에서 바로 연결이 어렵다면 스마트폰으로 QR 코드를 스캔하거나 카카오톡에서{" "}
                  <strong className="text-[#161f1d]">{KAKAO_ID}</strong>를 추가해 복사한 견적 내용을 전송해 주세요.
                </p>
              </div>
            </div>
          ) : (
            /* Quote Request Form */
            <form
              action={FORMSPREE_ENDPOINT}
              method="POST"
              onSubmit={handleSubmit}
              className="bg-white border border-[#e5e2da] rounded-xl p-5 sm:p-7"
            >
              {/* Formspree spam protection honeypot */}
              <input type="text" name="_gotcha" className="hidden" tabIndex={-1} autoComplete="off" />

              {errorMsg && (
                <div
                  role="alert"
                  className="mb-5 p-3.5 rounded-lg bg-[#fff2eb] border border-[#f5c2a6] text-[#b8430f] text-sm font-semibold"
                >
                  {errorMsg}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="quote-name"
                    className="block text-xs sm:text-[13px] font-bold text-[#161f1d] mb-1.5"
                  >
                    성함 / 단체(회사)명 <span className="text-[#e05a1b]">*</span>
                  </label>
                  <input
                    id="quote-name"
                    name="성함_단체명"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="예: 홍길동 / OO기업"
                    className="w-full px-3.5 py-2.5 min-h-[44px] text-sm bg-white border border-[#d5d1c8] rounded-lg text-[#161f1d] placeholder:text-[#9aa19e] focus:outline-none focus:border-[#e05a1b] focus:ring-2 focus:ring-[#e05a1b]/15"
                  />
                </div>

                <div>
                  <label
                    htmlFor="quote-phone"
                    className="block text-xs sm:text-[13px] font-bold text-[#161f1d] mb-1.5"
                  >
                    연락처 <span className="text-[#e05a1b]">*</span>
                  </label>
                  <input
                    id="quote-phone"
                    name="연락처"
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="예: 010-0000-0000"
                    className="w-full px-3.5 py-2.5 min-h-[44px] text-sm bg-white border border-[#d5d1c8] rounded-lg text-[#161f1d] placeholder:text-[#9aa19e] tabular-nums focus:outline-none focus:border-[#e05a1b] focus:ring-2 focus:ring-[#e05a1b]/15"
                  />
                </div>

                <div>
                  <label
                    htmlFor="quote-event"
                    className="block text-xs sm:text-[13px] font-bold text-[#161f1d] mb-1.5"
                  >
                    행사 유형 <span className="text-[#e05a1b]">*</span>
                  </label>
                  <select
                    id="quote-event"
                    required
                    value={eventType}
                    onChange={(e) => setEventType(e.target.value)}
                    className="w-full px-3.5 py-2.5 min-h-[44px] text-sm bg-white border border-[#d5d1c8] rounded-lg text-[#161f1d] focus:outline-none focus:border-[#e05a1b] focus:ring-2 focus:ring-[#e05a1b]/15"
                  >
                    <option value="">행사 유형을 선택하세요</option>
                    {EVENT_TYPES.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="quote-datetime"
                    className="block text-xs sm:text-[13px] font-bold text-[#161f1d] mb-1.5"
                  >
                    배송 희망 날짜 및 시간 <span className="text-[#e05a1b]">*</span>
                  </label>
                  <input
                    id="quote-datetime"
                    type="text"
                    required
                    value={deliveryTime}
                    onChange={(e) => setDeliveryTime(e.target.value)}
                    placeholder="예: 12월 3일 오전 11시 30분"
                    className="w-full px-3.5 py-2.5 min-h-[44px] text-sm bg-white border border-[#d5d1c8] rounded-lg text-[#161f1d] placeholder:text-[#9aa19e] focus:outline-none focus:border-[#e05a1b] focus:ring-2 focus:ring-[#e05a1b]/15"
                  />
                </div>

                <div>
                  <label
                    htmlFor="quote-qty"
                    className="block text-xs sm:text-[13px] font-bold text-[#161f1d] mb-1.5"
                  >
                    예상 수량 (10~500개) <span className="text-[#e05a1b]">*</span>
                  </label>
                  <input
                    id="quote-qty"
                    type="text"
                    required
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    placeholder="예: 50개"
                    className="w-full px-3.5 py-2.5 min-h-[44px] text-sm bg-white border border-[#d5d1c8] rounded-lg text-[#161f1d] placeholder:text-[#9aa19e] tabular-nums focus:outline-none focus:border-[#e05a1b] focus:ring-2 focus:ring-[#e05a1b]/15"
                  />
                </div>

                <div>
                  <label
                    htmlFor="quote-budget"
                    className="block text-xs sm:text-[13px] font-bold text-[#161f1d] mb-1.5"
                  >
                    1인 희망 예산대
                  </label>
                  <select
                    id="quote-budget"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    className="w-full px-3.5 py-2.5 min-h-[44px] text-sm bg-white border border-[#d5d1c8] rounded-lg text-[#161f1d] focus:outline-none focus:border-[#e05a1b] focus:ring-2 focus:ring-[#e05a1b]/15"
                  >
                    <option value="">예산대를 선택하세요 (선택)</option>
                    {BUDGET_OPTIONS.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Selected Menus Interactive List */}
                <div className="sm:col-span-2">
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <label
                      htmlFor="selectedMenuInput"
                      className="block text-xs sm:text-[13px] font-bold text-[#161f1d]"
                    >
                      희망 메뉴 (메뉴판에서 [+ 견적 담기] 시 자동 입력)
                    </label>
                    {estimatedSubtotal && (
                      <span className="text-xs font-bold text-[#e05a1b] tabular-nums">
                        예상 금액 약 {estimatedSubtotal.toLocaleString("ko-KR")}원
                      </span>
                    )}
                  </div>

                  {selectedMenus.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-2">
                      {selectedMenus.map((menu) => (
                        <button
                          key={menu.id}
                          type="button"
                          onClick={() => onRemoveMenu(menu.id)}
                          aria-label={`${menu.name} 선택 해제`}
                          className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-[#f7f6f3] border border-[#dcd8ce] hover:border-[#e05a1b] text-xs font-semibold text-[#161f1d] cursor-pointer transition-colors"
                        >
                          <span>{menu.name}</span>
                          <span className="text-[#5a6260] tabular-nums">
                            {menu.priceFormatted}
                          </span>
                          <X className="w-3.5 h-3.5 text-[#88918e]" />
                        </button>
                      ))}
                    </div>
                  )}

                  <input
                    id="selectedMenuInput"
                    type="text"
                    value={customMenuText}
                    onChange={(e) => setCustomMenuText(e.target.value)}
                    placeholder="예: 명인(떡갈비+제육) 도시락, 오돈콤보 등 또는 '추천 희망'"
                    className="w-full px-3.5 py-2.5 min-h-[44px] text-sm bg-white border border-[#d5d1c8] rounded-lg text-[#161f1d] placeholder:text-[#9aa19e] focus:outline-none focus:border-[#e05a1b] focus:ring-2 focus:ring-[#e05a1b]/15"
                  />
                </div>

                <div>
                  <label
                    htmlFor="quote-address"
                    className="block text-xs sm:text-[13px] font-bold text-[#161f1d] mb-1.5"
                  >
                    배송 지역 (동 / 건물명) <span className="text-[#e05a1b]">*</span>
                  </label>
                  <input
                    id="quote-address"
                    name="배송지역"
                    type="text"
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="예: OO구 OO동 OO타워 3층"
                    className="w-full px-3.5 py-2.5 min-h-[44px] text-sm bg-white border border-[#d5d1c8] rounded-lg text-[#161f1d] placeholder:text-[#9aa19e] focus:outline-none focus:border-[#e05a1b] focus:ring-2 focus:ring-[#e05a1b]/15"
                  />
                </div>

                <div>
                  <label
                    htmlFor="quote-email"
                    className="block text-xs sm:text-[13px] font-bold text-[#161f1d] mb-1.5"
                  >
                    견적서 수신 이메일 (선택)
                  </label>
                  <input
                    id="quote-email"
                    name="email"
                    type="email"
                    value={replyEmail}
                    onChange={(e) => setReplyEmail(e.target.value)}
                    placeholder="예: name@company.com"
                    className="w-full px-3.5 py-2.5 min-h-[44px] text-sm bg-white border border-[#d5d1c8] rounded-lg text-[#161f1d] placeholder:text-[#9aa19e] focus:outline-none focus:border-[#e05a1b] focus:ring-2 focus:ring-[#e05a1b]/15"
                  />
                </div>

                <div className="sm:col-span-2">
                  <span className="block text-xs sm:text-[13px] font-bold text-[#161f1d] mb-2">
                    필요한 증빙·결제 방식 (복수 선택 가능)
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {DOC_OPTIONS.map((doc) => {
                      const checked = selectedDocs.includes(doc);
                      return (
                        <label
                          key={doc}
                          className={`inline-flex items-center gap-2 px-3.5 py-2 min-h-[40px] rounded-lg border text-xs sm:text-[13px] font-semibold cursor-pointer transition-colors ${
                            checked
                              ? "bg-[#fff5f0] border-[#e05a1b] text-[#161f1d]"
                              : "bg-[#f7f6f3] border-[#e5e2da] text-[#4a5250] hover:border-[#c8c2b6]"
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={checked}
                            onChange={() => toggleDoc(doc)}
                            className="w-4 h-4 accent-[#e05a1b]"
                          />
                          <span>{doc}</span>
                        </label>
                      );
                    })}
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="quote-notes"
                    className="block text-xs sm:text-[13px] font-bold text-[#161f1d] mb-1.5"
                  >
                    기타 요청사항
                  </label>
                  <textarea
                    id="quote-notes"
                    name="기타요청사항"
                    rows={3}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="알레르기, 수저/물티슈 추가, 배송 출입 안내 등 요청사항을 적어주세요."
                    className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#d5d1c8] rounded-lg text-[#161f1d] placeholder:text-[#9aa19e] focus:outline-none focus:border-[#e05a1b] focus:ring-2 focus:ring-[#e05a1b]/15"
                  />
                </div>
              </div>

              <label className="mt-4 flex items-center gap-2.5 text-xs sm:text-[13px] text-[#5a6260] cursor-pointer">
                <input
                  type="checkbox"
                  checked={agreedPrivacy}
                  onChange={(e) => setAgreedPrivacy(e.target.checked)}
                  className="w-4 h-4 accent-[#e05a1b] shrink-0"
                />
                <span>
                  [필수] 단체도시락 견적 상담을 위한 개인정보 수집 및 이용에 동의합니다.
                </span>
              </label>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full mt-5 py-4 px-6 min-h-[52px] rounded-xl bg-[#e05a1b] hover:bg-[#c94c12] disabled:opacity-60 disabled:cursor-not-allowed text-white text-base font-extrabold transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#161f1d]"
              >
                {isSubmitting ? "견적 접수 중..." : "10분 내 무료 맞춤 견적 받기"}
              </button>

              <div className="mt-3 text-center">
                <a
                  href={draftEmailHref}
                  className="inline-flex items-center justify-center gap-1.5 text-xs sm:text-[13px] font-semibold text-[#5a6260] hover:text-[#e05a1b] underline underline-offset-4 transition-colors"
                >
                  <Mail className="w-3.5 h-3.5" />
                  작성 내용으로 이메일({CONTACT_EMAIL}) 견적 요청하기
                </a>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
