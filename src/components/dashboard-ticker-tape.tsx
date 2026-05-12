"use client";

const tickerItems = [
    { label: "USD/NGN", value: "₦1,520.40", change: "+0.84%" },
    { label: "EUR/NGN", value: "₦1,654.90", change: "+0.42%" },
    { label: "GBP/NGN", value: "₦1,938.15", change: "-0.18%" },
    { label: "Treasury Yield", value: "5.12%", change: "+0.09%" },
    { label: "Gold", value: "$2,356.80", change: "+0.31%" },
    { label: "Oil", value: "$81.44", change: "-0.27%" },
];

const repeatedItems = [...tickerItems, ...tickerItems];

export function DashboardTickerTape() {
    return (
        <div className="overflow-hidden rounded-2xl border border-emerald-100 bg-gradient-to-r from-emerald-950 via-emerald-900 to-teal-900 shadow-lg">
            <div className="flex items-center gap-3 border-b border-white/10 px-4 py-3 text-xs font-semibold uppercase tracking-[0.28em] text-emerald-100/80">
                <span className="inline-flex h-2.5 w-2.5 rounded-full bg-emerald-300 shadow-[0_0_16px_rgba(110,231,183,0.75)]" />
                Market Watch
            </div>

            <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-emerald-950 to-transparent" />
                <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-teal-900 to-transparent" />

                <div className="ticker-track flex min-w-max items-center gap-4 px-4 py-4">
                    {repeatedItems.map((item, index) => {
                        const isPositive = item.change.startsWith("+");

                        return (
                            <div
                                key={`${item.label}-${index}`}
                                className="flex min-w-[220px] items-center justify-between gap-6 rounded-xl border border-white/10 bg-white/8 px-4 py-3 backdrop-blur-sm"
                            >
                                <div className="space-y-1">
                                    <p className="text-xs uppercase tracking-[0.2em] text-emerald-100/70">
                                        {item.label}
                                    </p>
                                    <p className="text-lg font-semibold text-white">{item.value}</p>
                                </div>
                                <span
                                    className={`rounded-full px-3 py-1 text-sm font-medium ${
                                        isPositive
                                            ? "bg-emerald-400/15 text-emerald-200"
                                            : "bg-rose-400/15 text-rose-200"
                                    }`}
                                >
                                    {item.change}
                                </span>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
