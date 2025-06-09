import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setShowInstallPrompt(true);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === "accepted") {
      console.log("사용자가 PWA 설치를 수락했습니다");
    } else {
      console.log("사용자가 PWA 설치를 거부했습니다");
    }

    setDeferredPrompt(null);
    setShowInstallPrompt(false);
  };

  const handleDismiss = () => {
    setShowInstallPrompt(false);
  };

  if (!showInstallPrompt) return null;

  return createPortal(
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="flex flex-col gap-5 bg-white w-full mx-10 max-w-md p-6 rounded-lg relative shadow-lg">
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mb-4">
            <svg
              className="w-12 h-12 text-darkgray border border-2 border-gray rounded-full p-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
              />
            </svg>
          </div>
          <p className="text-lg font-medium text-center mb-2">앱 설치하기</p>
          <p className="text-sm text-gray-500 text-center mb-6">
            홈 화면에 추가하여 더 빠르게 접근하세요
          </p>
          <button
            onClick={handleInstallClick}
            className="w-full mb-2 p-2 rounded-xl font-semibold transition duration-300 text-white text-md tracking-wide shadow-md bg-purple bg-opacity-70 hover:bg-purple shadow-lg transform hover:scale-105"
          >
            설치
          </button>
          <button
            onClick={handleDismiss}
            className="w-full mb-2 p-2 rounded-xl font-semibold transition duration-300 text-gray-600 text-md tracking-wide shadow-md bg-gray-200 hover:bg-gray-300 transform hover:scale-105"
          >
            그냥 웹으로 사용하기
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
