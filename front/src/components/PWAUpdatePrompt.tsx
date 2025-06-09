import { useState } from "react";
// @ts-expect-error - virtual:pwa-register is a Vite plugin that doesn't have TypeScript definitions
import { registerSW } from "virtual:pwa-register";

export function PWAUpdatePrompt() {
  const [needRefresh, setNeedRefresh] = useState(false);
  const [offlineReady, setOfflineReady] = useState(false);

  const close = () => {
    setOfflineReady(false);
    setNeedRefresh(false);
  };

  const updateSW = registerSW({
    onNeedRefresh() {
      setNeedRefresh(true);
    },
    onOfflineReady() {
      setOfflineReady(true);
    },
  });

  if (!needRefresh && !offlineReady) return null;

  return (
    <div className="fixed bottom-4 right-4 bg-white border border-gray-300 rounded-lg shadow-lg p-4 max-w-sm z-50">
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0">
          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
            <svg
              className="w-5 h-5 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-900">
            {offlineReady
              ? "앱이 오프라인에서 사용 가능합니다"
              : "새로운 버전이 사용 가능합니다"}
          </p>
          <p className="text-sm text-gray-500 mt-1">
            {offlineReady
              ? "이제 인터넷 연결 없이도 앱을 사용할 수 있습니다."
              : "최신 기능과 개선사항을 위해 업데이트하세요."}
          </p>
        </div>
        <div className="flex-shrink-0">
          <button onClick={close} className="text-gray-400 hover:text-gray-600">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>
      {needRefresh && (
        <div className="mt-3 flex space-x-2">
          <button
            onClick={() => updateSW(true)}
            className="flex-1 bg-blue-500 text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-600 transition-colors"
          >
            업데이트
          </button>
          <button
            onClick={close}
            className="flex-1 bg-gray-200 text-gray-700 px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-300 transition-colors"
          >
            나중에
          </button>
        </div>
      )}
    </div>
  );
}
