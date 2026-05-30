export default function HomePage() {
  return (
    <div className="min-h-screen bg-dark text-white overflow-x-hidden">
      {/* Top Bar */}
      <div className="border-b border-brand/20">
        <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center text-sm">
          <div className="flex items-center gap-6">
            <span className="text-brand font-mono">v1.0</span>
            <span className="text-gray-500">•</span>
            <span className="text-gray-400">No BS. Just feedback.</span>
          </div>
          <a href="/login" className="text-brand hover:underline">Login →</a>
        </div>
      </div>

      {/* Main Nav */}
      <nav className="border-b border-dark-200">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-black tracking-tight">MICROPULSE</h1>
              <p className="text-xs text-gray-500 font-mono mt-1">Survey widget that doesn't suck</p>
            </div>
            <div className="flex gap-8 items-center">
              <a href="#how" className="text-sm hover:text-brand transition">How it works</a>
              <a href="#pricing" className="text-sm hover:text-brand transition">Pricing</a>
              <a href="https://github.com/yourusername/micropulse/tree/main/docs" target="_blank" rel="noopener noreferrer" className="text-sm hover:text-brand transition">Docs</a>
              <a href="/login" className="px-6 py-2.5 bg-brand text-dark font-bold rounded hover:bg-brand-400 transition">
                START FREE
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero - Asymmetric Split */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-12 gap-12 items-center">
          <div className="md:col-span-7">
            <div className="inline-block px-3 py-1 bg-brand/10 border border-brand/30 rounded text-xs font-mono text-brand mb-6">
              ZERO FRICTION FEEDBACK
            </div>

            <h2 className="text-6xl md:text-7xl font-black leading-none mb-6">
              Stop Using
              <br />
              <span className="text-brand">Annoying</span>
              <br />
              Popups
            </h2>

            <p className="text-xl text-gray-400 mb-8 max-w-lg">
              A tiny widget that sits quietly in the corner. One question. One click. Real answers.
            </p>

            <div className="flex gap-4 mb-8">
              <a href="/login" className="px-8 py-4 bg-brand text-dark font-bold rounded-lg hover:bg-brand-400 transition">
                Try it free →
              </a>
              <a href="#demo" className="px-8 py-4 border border-dark-200 rounded-lg hover:border-brand/30 transition">
                See demo
              </a>
            </div>

            <div className="flex gap-8 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                100% uptime
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-brand rounded-full"></div>
                No credit card
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                Deploy in 30 sec
              </div>
            </div>
          </div>

          <div className="md:col-span-5">
            <div className="relative">
              <div className="absolute -inset-4 bg-brand/5 rounded-3xl blur-2xl"></div>
              <div className="relative bg-dark-400 border border-dark-200 rounded-2xl p-8">
                <div className="bg-dark-500 rounded-lg p-4 font-mono text-xs mb-4">
                  <div className="text-brand-400">&lt;script</div>
                  <div className="text-gray-400 ml-4">src="<span className="text-green-400">micropulse.js</span>"</div>
                  <div className="text-gray-400 ml-4">data-id="<span className="text-yellow-400">abc123</span>"</div>
                  <div className="text-brand-400">&gt;&lt;/script&gt;</div>
                </div>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>That's it. One line.</span>
                  <span className="text-brand font-mono">4.8KB gzipped</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="border-y border-dark-200 bg-dark-400/30">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <div className="text-5xl font-black text-brand mb-2">&lt;5KB</div>
              <div className="text-sm text-gray-400">Total widget size</div>
              <div className="text-xs text-gray-600 mt-1">Smaller than your logo</div>
            </div>
            <div>
              <div className="text-5xl font-black text-brand mb-2">0</div>
              <div className="text-sm text-gray-400">Dependencies</div>
              <div className="text-xs text-gray-600 mt-1">Pure vanilla JavaScript</div>
            </div>
            <div>
              <div className="text-5xl font-black text-brand mb-2">1</div>
              <div className="text-sm text-gray-400">Line to embed</div>
              <div className="text-xs text-gray-600 mt-1">Copy, paste, done</div>
            </div>
            <div>
              <div className="text-5xl font-black text-brand mb-2">∞</div>
              <div className="text-sm text-gray-400">Surveys you can make</div>
              <div className="text-xs text-gray-600 mt-1">No artificial limits</div>
            </div>
          </div>
        </div>
      </div>

      {/* How Section */}
      <div id="how" className="max-w-7xl mx-auto px-6 py-20">
        <div className="mb-16">
          <div className="text-sm font-mono text-brand mb-4">HOW IT WORKS</div>
          <h2 className="text-5xl font-black mb-4">Dead Simple</h2>
          <p className="text-xl text-gray-400 max-w-2xl">
            No complex setup. No configuration hell. Just paste one line and you're collecting feedback.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-dark-400 border-l-4 border-brand p-8 hover:bg-dark-300 transition">
            <div className="text-4xl font-black text-brand mb-4">01</div>
            <h3 className="text-2xl font-bold mb-3">Create Survey</h3>
            <p className="text-gray-400 mb-4">
              Pick a question type. Write your question. Click create. Takes 20 seconds.
            </p>
            <div className="flex flex-wrap gap-2 text-xs">
              <span className="px-2 py-1 bg-dark-500 rounded">⭐ Rating</span>
              <span className="px-2 py-1 bg-dark-500 rounded">📊 NPS</span>
              <span className="px-2 py-1 bg-dark-500 rounded">☑️ Choice</span>
              <span className="px-2 py-1 bg-dark-500 rounded">💬 Text</span>
            </div>
          </div>

          <div className="bg-dark-400 border-l-4 border-brand p-8 hover:bg-dark-300 transition">
            <div className="text-4xl font-black text-brand mb-4">02</div>
            <h3 className="text-2xl font-bold mb-3">Embed Widget</h3>
            <p className="text-gray-400 mb-4">
              Copy the script tag. Paste it anywhere on your site. Widget appears automatically.
            </p>
            <div className="bg-dark-500 rounded p-3 font-mono text-xs text-gray-400">
              &lt;script src="..." /&gt;
            </div>
          </div>

          <div className="bg-dark-400 border-l-4 border-brand p-8 hover:bg-dark-300 transition">
            <div className="text-4xl font-black text-brand mb-4">03</div>
            <h3 className="text-2xl font-bold mb-3">Get Answers</h3>
            <p className="text-gray-400 mb-4">
              Watch responses roll in. Real-time charts. Export CSV. Actually use the data.
            </p>
            <div className="space-y-1">
              <div className="h-2 bg-brand rounded-full w-3/4"></div>
              <div className="h-2 bg-brand/60 rounded-full w-1/2"></div>
              <div className="h-2 bg-brand/30 rounded-full w-1/4"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing - Bold Cards */}
      <div id="pricing" className="bg-dark-400/30 border-y border-dark-200">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="mb-16 text-center">
            <div className="text-sm font-mono text-brand mb-4">PRICING</div>
            <h2 className="text-5xl font-black mb-4">Pick Your Plan</h2>
            <p className="text-xl text-gray-400">No hidden fees. No surprises. Cancel anytime.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Free */}
            <div className="bg-dark border-2 border-dark-200 rounded-2xl p-8 hover:border-brand/30 transition">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h3 className="text-2xl font-black mb-2">FREE</h3>
                  <p className="text-sm text-gray-500">For side projects & MVPs</p>
                </div>
                <div className="px-3 py-1 bg-dark-400 rounded-full text-xs font-mono">FOREVER</div>
              </div>

              <div className="mb-8">
                <div className="text-6xl font-black mb-2">
                  Rp0<span className="text-2xl text-gray-500">/mo</span>
                </div>
              </div>

              <ul className="space-y-3 mb-8 text-sm">
                <li className="flex items-start gap-3">
                  <span className="text-brand text-lg">✓</span>
                  <span><strong className="text-white">100 responses</strong> per month</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-brand text-lg">✓</span>
                  <span>Unlimited surveys</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-brand text-lg">✓</span>
                  <span>All 4 question types</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-brand text-lg">✓</span>
                  <span>Real-time analytics</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-brand text-lg">✓</span>
                  <span>CSV export</span>
                </li>
              </ul>

              <a href="/login" className="block w-full text-center py-4 border-2 border-brand text-brand font-bold rounded-lg hover:bg-brand/10 transition">
                START FREE
              </a>
            </div>

            {/* Pro */}
            <div className="bg-brand text-dark rounded-2xl p-8 relative overflow-hidden">
              <div className="absolute top-4 right-4 px-3 py-1 bg-dark/20 backdrop-blur rounded-full text-xs font-black">
                MOST POPULAR
              </div>

              <div className="flex items-start justify-between mb-6">
                <div>
                  <h3 className="text-2xl font-black mb-2">PRO</h3>
                  <p className="text-sm text-dark/70">For real businesses</p>
                </div>
              </div>

              <div className="mb-8">
                <div className="text-6xl font-black mb-2">
                  99K<span className="text-2xl text-dark/70">/mo</span>
                </div>
                <p className="text-sm text-dark/70">Billed monthly in IDR</p>
              </div>

              <ul className="space-y-3 mb-8 text-sm">
                <li className="flex items-start gap-3">
                  <span className="text-dark text-lg">✓</span>
                  <span><strong>Unlimited responses</strong></span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-dark text-lg">✓</span>
                  <span>Everything in Free, plus:</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-dark text-lg">✓</span>
                  <span>Remove "Powered by" branding</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-dark text-lg">✓</span>
                  <span>Custom widget colors</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-dark text-lg">✓</span>
                  <span>Priority email support</span>
                </li>
              </ul>

              <a href="/login" className="block w-full text-center py-4 bg-dark text-brand font-bold rounded-lg hover:bg-dark/90 transition">
                UPGRADE TO PRO
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ - Minimal */}
      <div className="max-w-4xl mx-auto px-6 py-20">
        <div className="mb-12">
          <div className="text-sm font-mono text-brand mb-4">FAQ</div>
          <h2 className="text-5xl font-black mb-4">Questions?</h2>
        </div>

        <div className="space-y-1">
          {[
            ["Does it slow down my site?", "Nope. <5KB, async load, zero impact on Lighthouse scores."],
            ["Can I customize it?", "Pro plan lets you change colors and remove branding."],
            ["What if I go over 100 responses?", "We email you. Upgrade to Pro or wait for next month."],
            ["Is my data safe?", "Yep. Encrypted, RLS-protected, no PII collected."],
            ["Can I cancel anytime?", "Yes. No contracts. Keep access until billing period ends."],
          ].map(([q, a], i) => (
            <details key={i} className="group border-b border-dark-200">
              <summary className="py-6 cursor-pointer flex justify-between items-center hover:text-brand transition">
                <span className="font-bold">{q}</span>
                <span className="text-brand group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <div className="pb-6 text-gray-400">{a}</div>
            </details>
          ))}
        </div>
      </div>

      {/* Final CTA */}
      <div className="border-t border-dark-200">
        <div className="max-w-7xl mx-auto px-6 py-20 text-center">
          <h2 className="text-6xl font-black mb-6">
            Ready to get
            <br />
            <span className="text-brand">real feedback?</span>
          </h2>
          <p className="text-xl text-gray-400 mb-10">
            100 free responses. No credit card. Deploy in 30 seconds.
          </p>
          <a href="/login" className="inline-block px-12 py-5 bg-brand text-dark text-lg font-black rounded-lg hover:bg-brand-400 transition hover:scale-105">
            START NOW →
          </a>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-dark-200 bg-dark-400/30">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
            <div>
              <div className="text-2xl font-black mb-2">MICROPULSE</div>
              <p className="text-sm text-gray-500">Survey widget that doesn't suck</p>
            </div>
            <div className="flex gap-12 text-sm">
              <div>
                <div className="font-bold mb-3">Product</div>
                <div className="space-y-2 text-gray-400">
                  <div><a href="#how" className="hover:text-brand transition">How it works</a></div>
                  <div><a href="#pricing" className="hover:text-brand transition">Pricing</a></div>
                  <div><a href="/login" className="hover:text-brand transition">Login</a></div>
                </div>
              </div>
              <div>
                <div className="font-bold mb-3">Legal</div>
                <div className="space-y-2 text-gray-400">
                  <div><a href="#" className="hover:text-brand transition">Privacy</a></div>
                  <div><a href="#" className="hover:text-brand transition">Terms</a></div>
                  <div><a href="#" className="hover:text-brand transition">Security</a></div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-dark-200 text-center text-sm text-gray-500">
            <p>Built with Claude Code • MicroPulse © 2026</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
