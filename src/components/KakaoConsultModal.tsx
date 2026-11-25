import { useEffect, useState } from "react";
import { Check, Copy, ExternalLink, MessageCircle, Phone, X } from "lucide-react";
import {
  CONTACT_PHONE,
  CONTACT_PHONE_HREF,
  KAKAO_CHANNEL_URL,
  KAKAO_ID,
  KAKAO_QR_IMAGE,
} from "../data/menus";
import { ResilientImage } from "./ResilientImage";

interface KakaoConsultModalProps {
  isOpen: boolean;
  onClose: () => void;
  quoteText?: string;
}

export function KakaoConsultModal({
  isOpen,
  onClose,
  quoteText,
}: KakaoConsultModalProps) {
  const [copiedId, setCopiedId] = useState(false);
  const [copiedQuote, setCopiedQuote] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleCopyId = async () => {
    try {
      await navigator.clipboard.writeText(KAKAO_ID);
      setCopiedId(true);
      setTimeout(() => setCopiedId(false), 2500);
    } catch {
      // Clipboard fallback ignored
    }
  };

  const handleCopyQuote = async () => {
    if (!quoteText) return;
    try {
      await navigator.clipboard.writeText(quoteText);
      setCopiedQuote(true);
      setTimeout(() => setCopiedQuote(false), 2500);
    } catch {
      // Clipboard fallback ignored
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="kakao-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md bg-white border border-[#e5e2da] rounded-2xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-5 py-4 bg-[#fee500] text-[#191919] flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <MessageCircle className="w-5 h-5 shrink-0" strokeWidth={2.25} />
            <h2 id="kakao-modal-title" className="text-base font-extrabold tracking-tight">
              도시락담다 카카오톡 상담 연결
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="닫기"
            className="w-9 h-9 rounded-lg flex items-center justify-center hover:bg-black/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 sm:p-6">
          <div className="flex flex-col sm:flex-row items-center gap-4 mb-5">
            <div className="w-40 sm:w-44 rounded-xl overflow-hidden border border-[#e5e2da] bg-[#fdf0d5] shrink-0">
              <ResilientImage
                src={KAKAO_QR_IMAGE}
                alt="박상태 폰변경 010-2267-3330 카카오톡 QR 코드 (ID: lionpark67)"
                className="w-full h-auto object-contain"
              />
            </div>

            <div className="flex-1 text-center sm:text-left">
              <p className="text-xs font-bold text-[#e05a1b] mb-1">
                담당자 직통 카카오톡
              </p>
              <p className="text-base font-extrabold text-[#161f1d] mb-1">
                박상태 ({CONTACT_PHONE})
              </p>
              <p className="text-xs sm:text-sm text-[#5a6260] leading-relaxed mb-3">
                카메라로 QR 코드를 스캔하거나 카카오톡 친구 추가에서 ID{" "}
                <strong className="text-[#161f1d]">{KAKAO_ID}</strong>를 검색해 주세요.
              </p>

              <button
                type="button"
                onClick={handleCopyId}
                className="w-full inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 min-h-[40px] rounded-lg bg-[#161f1d] hover:bg-[#263330] text-white text-xs sm:text-sm font-bold transition-colors cursor-pointer"
              >
                {copiedId ? (
                  <>
                    <Check className="w-4 h-4 text-[#ff9c6b]" />
                    카톡 ID 복사 완료 ({KAKAO_ID})
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    카톡 ID 복사 ({KAKAO_ID})
                  </>
                )}
              </button>
            </div>
          </div>

          {quoteText && (
            <div className="mb-4 p-3.5 rounded-xl bg-[#f7f6f3] border border-[#e5e2da]">
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <span className="text-xs font-bold text-[#161f1d]">
                  선택하신 견적 내용
                </span>
                <button
                  type="button"
                  onClick={handleCopyQuote}
                  className="inline-flex items-center gap-1 text-xs font-bold text-[#e05a1b] hover:underline cursor-pointer"
                >
                  {copiedQuote ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      복사됨
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      견적 내용 복사
                    </>
                  )}
                </button>
              </div>
              <p className="text-xs text-[#5a6260] line-clamp-3 whitespace-pre-line">
                {quoteText}
              </p>
            </div>
          )}

          <div className="grid grid-cols-2 gap-2.5 pt-4 border-t border-[#e5e2da]">
            <a
              href={KAKAO_CHANNEL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 min-h-[42px] rounded-lg bg-[#fee500] hover:bg-[#f2da00] text-[#191919] text-xs sm:text-sm font-bold transition-colors whitespace-nowrap"
            >
              <ExternalLink className="w-4 h-4 shrink-0" />
              QR 링크 열기
            </a>
            <a
              href={CONTACT_PHONE_HREF}
              className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 min-h-[42px] rounded-lg border border-[#d5d1c8] bg-white hover:bg-[#f7f6f3] text-[#161f1d] text-xs sm:text-sm font-bold transition-colors whitespace-nowrap"
            >
              <Phone className="w-4 h-4 shrink-0" />
              전화 연결
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
