import { useEffect, useState } from 'react';
import { Shield, X, AlertTriangle, Lock, Mail } from 'lucide-react';

export function DevToolsDetector() {
  const [isDevToolsOpen, setIsDevToolsOpen] = useState(false);
  const [showWarning, setShowWarning] = useState(true);

  useEffect(() => {
    // Method 1: Check window size difference (works for docked DevTools)
    const checkDevTools = () => {
      const widthThreshold = window.outerWidth - window.innerWidth > 160;
      const heightThreshold = window.outerHeight - window.innerHeight > 160;
      
      if (widthThreshold || heightThreshold) {
        setIsDevToolsOpen(true);
      } else {
        setIsDevToolsOpen(false);
      }
    };

    // Method 2: Console detection
    const devtools = { isOpen: false };
    const element = new Image();
    
    Object.defineProperty(element, 'id', {
      get: function() {
        devtools.isOpen = true;
        setIsDevToolsOpen(true);
        return 'devtools-detector';
      }
    });

    // Method 3: Debugger detection
    const detectDebugger = () => {
      const start = performance.now();
      // debugger; // Uncomment this if you want to detect debugger specifically
      const end = performance.now();
      
      if (end - start > 100) {
        setIsDevToolsOpen(true);
      }
    };

    // Check on mount
    checkDevTools();
    console.log(element);
    detectDebugger();

    // Check periodically
    const interval = setInterval(() => {
      checkDevTools();
      console.log(element);
    }, 1000);

    // Check on resize
    window.addEventListener('resize', checkDevTools);

    // Console warning message
    console.log('%c⚠️ WARNING', 'color: red; font-size: 40px; font-weight: bold;');
    console.log('%cThis code is copyrighted and protected.', 'color: orange; font-size: 20px;');
    console.log('%c© 2026 Cho Sin Hong. All Rights Reserved.', 'color: white; font-size: 16px;');
    console.log('%cUnauthorized copying, modification, or distribution is strictly prohibited and may result in legal action.', 'color: yellow; font-size: 14px;');
    console.log('%cFor licensing inquiries: howell.cho319@gmail.com', 'color: lightblue; font-size: 14px;');

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', checkDevTools);
    };
  }, []);

  // Disable right-click
  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => {
      // Allow right-click on all links
      const target = e.target as HTMLElement;
      const link = target.closest('a');
      
      if (link) {
        return true; // Allow right-click on any link
      }
      
      e.preventDefault();
      setIsDevToolsOpen(true);
      return false;
    };

    // Disable F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U, Ctrl+S, Ctrl+P, Ctrl+A, Ctrl+D
    const handleKeyDown = (e: KeyboardEvent) => {
      // Dev tools shortcuts — block & show warning
      if (
        e.key === 'F12' ||
        (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J' || e.key === 'C')) ||
        (e.ctrlKey && e.key === 'U')
      ) {
        e.preventDefault();
        setIsDevToolsOpen(true);
        return false;
      }

      // Save / print / select-all / bookmark — block silently
      if (
        (e.ctrlKey || e.metaKey) &&
        (e.key === 's' || e.key === 'S' ||   // Ctrl+S  — save page
         e.key === 'p' || e.key === 'P' ||   // Ctrl+P  — print / save as PDF
         e.key === 'a' || e.key === 'A' ||   // Ctrl+A  — select all
         e.key === 'd' || e.key === 'D')     // Ctrl+D  — bookmark
      ) {
        // Allow Ctrl+A / Ctrl+S inside text inputs and textareas (needed for forms & tools)
        const tag = (e.target as HTMLElement).tagName;
        if ((e.key === 'a' || e.key === 'A' || e.key === 's' || e.key === 'S') &&
            (tag === 'INPUT' || tag === 'TEXTAREA')) {
          return; // Don't block inside form fields
        }
        e.preventDefault();
        return false;
      }
    };

    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  if (!isDevToolsOpen || !showWarning) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 backdrop-blur-md animate-in fade-in duration-300 p-4">
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-48 h-48 bg-red-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl animate-pulse delay-700"></div>
      </div>

      <div className="relative max-w-xl w-full bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border border-red-500/50 rounded-2xl shadow-2xl overflow-hidden">
        {/* Glowing border effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 via-orange-500/20 to-red-500/20 blur-xl pointer-events-none"></div>
        
        <div className="relative p-6">
          {/* Warning Icon with animation */}
          <div className="flex justify-center mb-4">
            <div className="relative">
              <div className="absolute inset-0 bg-red-500/30 rounded-full blur-xl animate-pulse"></div>
              <div className="relative w-16 h-16 bg-gradient-to-br from-red-500 to-orange-600 rounded-full flex items-center justify-center shadow-lg shadow-red-500/50">
                <Shield className="w-8 h-8 text-white" />
              </div>
            </div>
          </div>

          {/* Warning Title */}
          <div className="text-center mb-5">
            <h2 className="text-2xl md:text-3xl font-bold mb-2 bg-gradient-to-r from-red-400 via-orange-400 to-red-400 bg-clip-text text-transparent">
              Developer Tools Detected
            </h2>
            <p className="text-gray-400 text-sm">
              Unauthorized access attempt logged
            </p>
          </div>

          {/* Warning Cards - Compact */}
          <div className="space-y-3 mb-5">
            {/* Copyright Notice Card */}
            <div className="bg-gradient-to-r from-red-950/50 to-orange-950/50 border border-red-500/30 rounded-xl p-4 backdrop-blur-sm">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-red-500/20 rounded-lg flex items-center justify-center">
                  <Lock className="w-4 h-4 text-red-400" />
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-bold text-white mb-1">Copyright Protected</h3>
                  <p className="text-gray-300 text-xs leading-relaxed">
                    All content is property of <span className="text-orange-400 font-semibold">Cho Sin Hong</span> and protected by copyright law.
                  </p>
                </div>
              </div>
            </div>

            {/* Prohibited Actions Card */}
            <div className="bg-gradient-to-r from-orange-950/50 to-red-950/50 border border-orange-500/30 rounded-xl p-4 backdrop-blur-sm">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-orange-500/20 rounded-lg flex items-center justify-center">
                  <AlertTriangle className="w-4 h-4 text-orange-400" />
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-bold text-white mb-2">Prohibited Actions</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      'Copy code',
                      'Extract design',
                      'Download assets',
                      'Reverse engineer'
                    ].map((item, index) => (
                      <div key={index} className="flex items-center gap-1.5">
                        <div className="w-1 h-1 bg-orange-400 rounded-full flex-shrink-0"></div>
                        <span className="text-gray-300 text-xs">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Legal Warning Card */}
            <div className="bg-gradient-to-r from-yellow-950/30 to-orange-950/30 border border-yellow-500/40 rounded-xl p-3 backdrop-blur-sm">
              <div className="flex items-start gap-2">
                <div className="flex-shrink-0 w-7 h-7 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                  <span className="text-lg">⚖️</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-xs font-bold text-yellow-400 mb-1">Legal Consequences</h3>
                  <p className="text-gray-300 text-xs leading-relaxed">
                    Unauthorized use may result in legal action and penalties.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Section - Compact */}
          <div className="bg-gradient-to-r from-gray-800/50 to-gray-900/50 border border-gray-700 rounded-xl p-3 mb-4">
            <div className="flex items-center justify-center gap-2 mb-1">
              <Mail className="w-4 h-4 text-blue-400" />
              <p className="text-gray-300 text-xs">
                Licensing inquiries:
              </p>
            </div>
            <p className="text-center">
              <a 
                href="mailto:howell.cho319@gmail.com"
                className="text-blue-400 hover:text-blue-300 font-semibold text-sm transition-colors"
              >
                howell.cho319@gmail.com
              </a>
            </p>
          </div>

          {/* Footer - Compact */}
          <div className="mt-4 pt-3 border-t border-gray-700 text-center">
            <p className="text-gray-500 text-xs">
              © 2026 Cho Sin Hong. All Rights Reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
