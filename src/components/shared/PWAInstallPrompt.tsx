'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

// Detect browser type for manual install instructions
const getBrowserInfo = () => {
  const userAgent = navigator.userAgent;
  const isChrome = /Chrome/.test(userAgent) && !/Edg/.test(userAgent);
  const isEdge = /Edg/.test(userAgent);
  const isFirefox = /Firefox/.test(userAgent);
  const isSafari = /Safari/.test(userAgent) && !/Chrome/.test(userAgent);
  const isOpera = /Opera|OPR/.test(userAgent);
  const isIOS = /iPad|iPhone|iPod/.test(userAgent);
  const isAndroid = /Android/.test(userAgent);

  return {
    isChrome,
    isEdge,
    isFirefox,
    isSafari,
    isOpera,
    isIOS,
    isAndroid,
    isMobile: isIOS || isAndroid || /Mobile/.test(userAgent),
  };
};

export default function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);
  const [isInstallable, setIsInstallable] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [showManualInstructions, setShowManualInstructions] = useState(false);
  const [browserInfo, setBrowserInfo] = useState<ReturnType<
    typeof getBrowserInfo
  > | null>(null);

  useEffect(() => {
    setBrowserInfo(getBrowserInfo());

    // Check if app is already installed
    const isStandalone = window.matchMedia(
      '(display-mode: standalone)'
    ).matches;
    const isInWebAppiOS = (window.navigator as any).standalone === true;
    const isInWebAppChrome = window.matchMedia(
      '(display-mode: standalone)'
    ).matches;

    if (isStandalone || isInWebAppiOS || isInWebAppChrome) {
      setIsInstalled(true);
      return;
    }

    // Listen for the beforeinstallprompt event
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      const event = e as BeforeInstallPromptEvent;
      setDeferredPrompt(event);
      setIsInstallable(true);

      // Show install prompt after a delay if user hasn't dismissed it
      const hasPromptBeenShown = localStorage.getItem('pwa-prompt-shown');
      const hasPromptBeenDismissed = localStorage.getItem(
        'pwa-prompt-dismissed'
      );

      if (!hasPromptBeenShown && !hasPromptBeenDismissed) {
        setTimeout(() => {
          setShowInstallPrompt(true);
          localStorage.setItem('pwa-prompt-shown', 'true');
        }, 3000); // Show after 3 seconds
      }
    };

    // Listen for app installed event
    const handleAppInstalled = () => {
      setIsInstalled(true);
      setShowInstallPrompt(false);
      setDeferredPrompt(null);
      localStorage.removeItem('pwa-prompt-shown');
      localStorage.removeItem('pwa-prompt-dismissed');
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    // For browsers that don't support beforeinstallprompt (like Opera GX)
    // Show manual install option after some time
    const timer = setTimeout(() => {
      const hasPromptBeenDismissed = localStorage.getItem(
        'pwa-prompt-dismissed'
      );
      if (!deferredPrompt && !hasPromptBeenDismissed && !isInstalled) {
        setIsInstallable(true);
        setShowInstallPrompt(true);
      }
    }, 5000);

    return () => {
      window.removeEventListener(
        'beforeinstallprompt',
        handleBeforeInstallPrompt
      );
      window.removeEventListener('appinstalled', handleAppInstalled);
      clearTimeout(timer);
    };
  }, [deferredPrompt, isInstalled]);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      // Native install prompt available - Direct installation
      try {
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;

        if (outcome === 'accepted') {
          console.log('App installed successfully!');
          // App will be added to home screen automatically
        } else {
          console.log('User dismissed the install prompt');
          localStorage.setItem('pwa-prompt-dismissed', 'true');
        }

        setDeferredPrompt(null);
        setShowInstallPrompt(false);
      } catch (error) {
        console.error('Installation failed:', error);
        // Fallback to manual instructions
        setShowManualInstructions(true);
      }
    } else {
      // For browsers without native support, show manual instructions
      setShowManualInstructions(true);
    }
  };

  // New function for direct home screen addition
  const handleAddToHomeScreen = async () => {
    // For browsers that support it, try direct installation
    if (deferredPrompt) {
      await handleInstallClick();
      return;
    }

    // For mobile browsers, provide specific instructions
    if (browserInfo?.isIOS) {
      // iOS Safari specific
      alert(
        'To add to home screen:\n1. Tap the Share button (□↑)\n2. Select "Add to Home Screen"\n3. Tap "Add"'
      );
    } else if (browserInfo?.isAndroid) {
      // Android Chrome/Edge
      alert(
        'To add to home screen:\n1. Tap the menu (⋮)\n2. Select "Add to Home screen"\n3. Tap "Add"'
      );
    } else {
      // Desktop browsers
      setShowManualInstructions(true);
    }
  };

  const handleDismiss = () => {
    setShowInstallPrompt(false);
    setShowManualInstructions(false);
    localStorage.setItem('pwa-prompt-dismissed', 'true');
  };

  const getInstallInstructions = () => {
    if (!browserInfo) return null;

    const { isChrome, isEdge, isFirefox, isSafari, isOpera, isIOS, isAndroid } =
      browserInfo;

    if (isIOS && isSafari) {
      return {
        title: 'Install on iPhone/iPad',
        steps: [
          'Tap the Share button at the bottom of the screen',
          'Scroll down and tap "Add to Home Screen"',
          'Tap "Add" to install the app',
        ],
        icon: '📱',
      };
    }

    if (isAndroid && (isChrome || isEdge)) {
      return {
        title: 'Install on Android',
        steps: [
          'Tap the menu button (⋮) in the browser',
          'Select "Add to Home Screen" or "Install App"',
          'Tap "Add" to install the app',
        ],
        icon: '📱',
      };
    }

    if (isChrome) {
      return {
        title: 'Install on Chrome',
        steps: [
          'Click the install icon in the address bar',
          'Or go to Menu (⋮) → "Install Wallet7..."',
          'Click "Install" in the popup',
        ],
        icon: '💻',
      };
    }

    if (isEdge) {
      return {
        title: 'Install on Microsoft Edge',
        steps: [
          'Click the app install icon in the address bar',
          'Or go to Menu (⋯) → "Apps" → "Install this site as an app"',
          'Click "Install" to add to your desktop',
        ],
        icon: '💻',
      };
    }

    if (isOpera) {
      return {
        title: 'Install on Opera/Opera GX',
        steps: [
          'Click the Menu button (☰) in the top-left',
          'Go to "Page" → "Install Wallet7..."',
          'Or bookmark this page and access it from your apps',
        ],
        icon: '💻',
      };
    }

    if (isFirefox) {
      return {
        title: 'Add to Firefox',
        steps: [
          'Bookmark this page (Ctrl+D or Cmd+D)',
          'Or pin this tab for quick access',
          "Firefox doesn't support PWA installation yet",
        ],
        icon: '🔖',
      };
    }

    // Default instructions
    return {
      title: 'Install as App',
      steps: [
        "Look for an install icon in your browser's address bar",
        'Or check your browser\'s menu for "Install" or "Add to Home Screen"',
        'Bookmark this page for quick access',
      ],
      icon: '📲',
    };
  };

  // Don't show anything if app is installed
  if (isInstalled) {
    return null;
  }

  const instructions = getInstallInstructions();

  return (
    <>
      {/* Floating Install Button */}
      {isInstallable && !showInstallPrompt && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={
            deferredPrompt
              ? handleInstallClick
              : () => setShowInstallPrompt(true)
          }
          className='fixed bottom-6 right-6 z-50 bg-green-600 hover:bg-green-700 text-white p-3 rounded-full shadow-lg transition-all duration-200 border-2 border-white'
          aria-label='Add Wallet7 to Home Screen'
          title={deferredPrompt ? 'Add to Home Screen' : 'Install App'}>
          <svg
            className='w-5 h-5'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'>
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M12 6v6m0 0v6m0-6h6m-6 0H6'
            />
          </svg>
        </motion.button>
      )}

      {/* Install Prompt Banner */}
      <AnimatePresence>
        {showInstallPrompt && (
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            className='fixed top-4 left-4 right-4 z-50 max-w-md mx-auto'>
            <div className='bg-white rounded-xl p-4 shadow-lg border border-gray-200'>
              {!showManualInstructions ? (
                <>
                  {/* Simple Banner Header */}
                  <div className='flex items-center justify-between'>
                    <div className='flex items-center space-x-3'>
                      <div className='w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center'>
                        <span className='text-white font-bold text-sm'>W7</span>
                      </div>
                      <div>
                        <h3 className='text-sm font-semibold text-gray-900'>
                          Add Wallet7 to Home Screen
                        </h3>
                        <p className='text-xs text-gray-600'>
                          {deferredPrompt
                            ? 'One click to install!'
                            : 'Quick access from home screen'}
                        </p>
                      </div>
                    </div>
                    <div className='flex items-center space-x-2'>
                      {deferredPrompt ? (
                        <button
                          onClick={handleInstallClick}
                          className='px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-xs font-medium rounded-lg transition-colors duration-200 flex items-center space-x-1'>
                          <svg
                            className='w-3 h-3'
                            fill='none'
                            stroke='currentColor'
                            viewBox='0 0 24 24'>
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth={2}
                              d='M12 6v6m0 0v6m0-6h6m-6 0H6'
                            />
                          </svg>
                          <span>Add to Home</span>
                        </button>
                      ) : (
                        <>
                          <button
                            onClick={handleAddToHomeScreen}
                            className='px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white text-xs font-medium rounded-lg transition-colors duration-200'>
                            Add to Home
                          </button>
                          <button
                            onClick={() => setShowManualInstructions(true)}
                            className='px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium rounded-lg transition-colors duration-200'>
                            How to
                          </button>
                        </>
                      )}
                      <button
                        onClick={handleDismiss}
                        className='text-gray-400 hover:text-gray-600 p-1'
                        aria-label='Close install prompt'>
                        <svg
                          className='w-4 h-4'
                          fill='none'
                          stroke='currentColor'
                          viewBox='0 0 24 24'>
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth={2}
                            d='M6 18L18 6M6 6l12 12'
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  {/* Manual Installation Instructions */}
                  <div className='p-2'>
                    {instructions && (
                      <div>
                        <div className='flex items-center justify-between mb-3'>
                          <div className='flex items-center space-x-2'>
                            <span className='text-lg'>{instructions.icon}</span>
                            <h4 className='text-sm font-semibold text-gray-900'>
                              {instructions.title}
                            </h4>
                          </div>
                          <button
                            onClick={handleDismiss}
                            className='text-gray-400 hover:text-gray-600 p-1'
                            aria-label='Close install prompt'>
                            <svg
                              className='w-4 h-4'
                              fill='none'
                              stroke='currentColor'
                              viewBox='0 0 24 24'>
                              <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth={2}
                                d='M6 18L18 6M6 6l12 12'
                              />
                            </svg>
                          </button>
                        </div>
                        <ol className='space-y-1.5 mb-3'>
                          {instructions.steps.map((step, index) => (
                            <li
                              key={index}
                              className='flex items-start space-x-2 text-xs'>
                              <span className='flex-shrink-0 w-4 h-4 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-medium'>
                                {index + 1}
                              </span>
                              <span className='text-gray-700'>{step}</span>
                            </li>
                          ))}
                        </ol>
                        <button
                          onClick={() => setShowManualInstructions(false)}
                          className='text-xs text-blue-600 hover:text-blue-700 font-medium'>
                          ← Back
                        </button>
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
