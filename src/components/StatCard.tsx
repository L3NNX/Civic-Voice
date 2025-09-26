"use client"

import { motion } from "framer-motion"
import { cn } from "../lib/utils"
import { Card, CardContent } from "../components/ui/Card"
import { TrendingUp, TrendingDown, AlertCircle, Clock, CheckCircle, AlertTriangle } from 'lucide-react';
import { StatCard as StatCardType } from '../types';

const iconMap = {
  AlertCircle,
  Clock,
  CheckCircle,
  AlertTriangle,
};

interface StatCardProps {
  stat: StatCardType;
}

export function StatCard({ stat }: StatCardProps) {
  const Icon = iconMap[stat.icon as keyof typeof iconMap];
  const positive = stat.trend >= 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <Card
 className={cn(
          "relative overflow-hidden border-transparent bg-gradient-to-b from-white/80 to-white/60 dark:from-slate-700/80 dark:to-slate-800/70 backdrop-blur-xl shadow-[0_1px_0_0_rgba(255,255,255,.4)_inset,0_0_0_1px_rgba(255,255,255,.08)_inset]",
          "before:absolute before:inset-px before:rounded-[calc(var(--radius-lg)-2px)] before:bg-[radial-gradient(1200px_400px_at_-20%_-20%,color-mix(in_oklab,var(--color-chart-2)_25%,transparent),transparent_40%),radial-gradient(800px_300px_at_120%_0%,color-mix(in_oklab,var(--color-chart-4)_20%,transparent),transparent_40%)] before:pointer-events-none"
        )}
      >
        <CardContent className="p-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-medium text-muted-foreground tracking-wide uppercase">
                {stat.title}
              </p>
              <div className="mt-2 flex items-end gap-2">
                <motion.span
                  key={String(stat.value)}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="text-3xl font-semibold tabular-nums"
                >
                  {stat.value}
                </motion.span>
                {typeof stat.trend === "number" && (
                  <span
                    className={cn(
                      "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold",
                      positive
                        ? "bg-emerald-500/15 text-emerald-400 ring-1 ring-emerald-400/30"
                        : "bg-rose-500/15 text-rose-400 ring-1 ring-rose-400/30"
                    )}
                    aria-label={positive ? "Up" : "Down"}
                  >
                    {positive ? (
                      <TrendingUp className="w-3 h-3" />
                    ) : (
                      <TrendingDown className="w-3 h-3" />
                    )}
                    {Math.abs(stat.trend)}%
                  </span>
                )}
              </div>
            </div>

            {Icon && (
              <div className="shrink-0 rounded-lg p-2 bg-gradient-to-br from-chart-2/20 to-chart-4/10 text-primary-foreground ring-1 ring-border/60">
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.4 }}
                  className="text-primary/80"
                >
                  <Icon className="w-6 h-6" />
                </motion.div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
