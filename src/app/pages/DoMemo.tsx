import { motion } from "motion/react";
import { Link, useNavigate } from "react-router";
import { ArrowLeft, FlipHorizontal, Layers, EyeOff, MousePointer2, Trash2, Keyboard } from "lucide-react";

export function DoMemo() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#fdfcfb] text-[#4a4238] font-serif selection:bg-amber-100">
      {/* Header */}
      <header className="max-w-4xl mx-auto px-6 py-12 flex items-center justify-between">
        <button 
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-sm text-amber-900/60 hover:text-amber-900 transition-colors font-sans"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </button>
        <div className="text-xl font-bold tracking-tight font-sans">DoMemo</div>
      </header>

      <main className="max-w-4xl mx-auto px-6 pb-24">
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-amber-950">DoMemo</h1>
          <p className="text-2xl md:text-3xl text-amber-900/80 leading-relaxed italic">
            A distraction-free memory desk for anyone who learns by writing.
          </p>
        </motion.div>

        {/* What is DoMemo Section */}
        <section className="mb-20">
          <h2 className="text-2xl font-bold mb-6 font-sans uppercase tracking-widest text-amber-900/50">What is DoMemo?</h2>
          <div className="space-y-6 text-lg leading-relaxed">
            <p>
              DoMemo is a single-page study tool built on one simple principle — reading is not the same as remembering. Instead of highlighting and re-reading the same notes, DoMemo gives you a clean sheet of paper, lets you write down everything you need to memorise, then flips it over so you are forced to rewrite from memory. No database, no account, no distractions. Just you and the paper.
            </p>
            <p>
              Your notes stay alive as long as the tab is open. Refresh the page and everything is still there. Close the tab and it clears — a natural reset that keeps every session intentional.
            </p>
          </div>
        </section>

        {/* How it works Section */}
        <section className="mb-20">
          <h2 className="text-2xl font-bold mb-6 font-sans uppercase tracking-widest text-amber-900/50">How it works</h2>
          <div className="bg-amber-50/50 p-8 rounded-3xl border border-amber-100">
            <p className="text-lg leading-relaxed">
              Start with a full-screen paper. Write anything — vocabulary, formulas, dates, a speech, key concepts. When you are ready, flip the paper to the blank back and rewrite everything from memory. Flip back to compare. Repeat until you no longer need to look.
            </p>
          </div>
        </section>

        {/* Features Section */}
        <section className="mb-20">
          <h2 className="text-2xl font-bold mb-8 font-sans uppercase tracking-widest text-amber-900/50">Features</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-amber-950">
                <FlipHorizontal className="w-5 h-5" />
                <h3 className="text-xl font-bold font-sans">Flip</h3>
              </div>
              <p className="text-amber-900/80 leading-relaxed">
                Your main paper fills the entire screen. Hit Flip and it physically turns over to a blank back side. Rewrite what you remember, then flip back to check. You can flip back and forth as many times as you need.
              </p>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-amber-950">
                <Layers className="w-5 h-5" />
                <h3 className="text-xl font-bold font-sans">Second paper</h3>
              </div>
              <p className="text-amber-900/80 leading-relaxed">
                Add one additional paper and choose whether it sits on the left or right of your main paper. Both papers are the same size. Use the second sheet for hints, a translation, related notes, or a topic you want to keep in view while you rewrite the first.
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-3 text-amber-950">
                <EyeOff className="w-5 h-5" />
                <h3 className="text-xl font-bold font-sans">Hide</h3>
              </div>
              <p className="text-amber-900/80 leading-relaxed">
                Instantly blurs an entire paper so the content becomes unreadable. Use it to block a sheet from your peripheral vision while you focus on the other, or to briefly cover your notes before testing yourself. Unhide with one click.
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-3 text-amber-950">
                <MousePointer2 className="w-5 h-5" />
                <h3 className="text-xl font-bold font-sans">Whiteboard block</h3>
              </div>
              <p className="text-amber-900/80 leading-relaxed">
                Generate a draggable white block you can place anywhere on the paper. Drag it freely to cover only the specific line or section you want to hide. Stack multiple blocks to gradually reveal or conceal content on your own terms.
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-3 text-amber-950">
                <Trash2 className="w-5 h-5" />
                <h3 className="text-xl font-bold font-sans">Clear All</h3>
              </div>
              <p className="text-amber-900/80 leading-relaxed">
                Wipes both papers clean in one action. Confirm once and you start fresh.
              </p>
            </div>
          </div>
        </section>

        {/* Keyboard shortcuts Section */}
        <section className="mb-20">
          <div className="flex items-center gap-3 mb-8">
            <Keyboard className="w-6 h-6 text-amber-900/50" />
            <h2 className="text-2xl font-bold font-sans uppercase tracking-widest text-amber-900/50">Keyboard shortcuts</h2>
          </div>
          <div className="bg-white border border-amber-100 rounded-3xl overflow-hidden shadow-sm">
            <table className="w-full text-left font-sans">
              <thead>
                <tr className="bg-amber-50/50 border-b border-amber-100">
                  <th className="px-6 py-4 font-bold text-amber-900/60 uppercase tracking-wider text-xs">Key</th>
                  <th className="px-6 py-4 font-bold text-amber-900/60 uppercase tracking-wider text-xs">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-amber-50">
                {[
                  ['Alt + F', 'Flip Left Paper (Tool 1)'],
                  ['Alt + Shift + F', 'Flip Right Paper (Tool 2)'],
                  ['Alt + H', 'Hide Left Paper'],
                  ['Alt + Shift + H', 'Hide Right Paper'],
                  ['Alt + D', 'Toggle Dual Paper'],
                  ['Alt + P', 'Swap Paper Position'],
                  ['Alt + L', 'Toggle Dark Mode'],
                  ['Alt + B', 'Add Whiteboard Block'],
                  ['Alt + Delete', 'Clear All'],
                  ['Esc', 'Close Help Modal'],
                ].map(([key, action]) => (
                  <tr key={key} className="hover:bg-amber-50/30 transition-colors">
                    <td className="px-6 py-4">
                      <kbd className="px-2 py-1 bg-amber-100/50 border border-amber-200 rounded text-sm font-mono font-bold text-amber-900">
                        {key}
                      </kbd>
                    </td>
                    <td className="px-6 py-4 text-amber-900/80">{action}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="px-6 py-4 bg-amber-50/30 text-sm text-amber-900/60 italic border-t border-amber-100">
              Button labels show shortcut hints on hover so you always know the fastest way to do anything.
            </div>
          </div>
        </section>

        {/* Footer info */}
        <section className="grid md:grid-cols-2 gap-12 pt-12 border-t border-amber-100">
          <div>
            <h3 className="text-xl font-bold mb-4 font-sans text-amber-950">Works everywhere</h3>
            <p className="text-amber-900/80 leading-relaxed">
              DoMemo runs entirely in your browser with no installation. It is fully responsive and works on desktop and mobile. The interface is optimised for focus — warm tones, clean typography, and a layout that is easy on the eyes during long study sessions.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4 font-sans text-amber-950">No account. No cloud. No noise.</h3>
            <p className="text-amber-900/80 leading-relaxed">
              Everything stays local in your browser tab. Open DoMemo, study, close it when you are done. That is the whole idea.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
