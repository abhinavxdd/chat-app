import { useEffect, useRef } from "react";

// Hook to track component re-renders
export function useRenderCount(componentName: string, logEvery: number = 1) {
  const renderCount = useRef(0);
  const startTime = useRef(Date.now());

  useEffect(() => {
    renderCount.current++;

    // Log to performance monitor if available
    if (typeof window !== "undefined" && (window as any).perfMonitor) {
      (window as any).perfMonitor.logRender(componentName);
    }

    if (renderCount.current % logEvery === 0) {
      const uptime = Math.floor((Date.now() - startTime.current) / 1000);
      console.log(
        `🔄 [${componentName}] Renders: ${renderCount.current} (${uptime}s uptime)`
      );
    }
  });

  return renderCount.current;
}

// Global render tracker for comparing with/without Zustand
class RenderTracker {
  private components = new Map<string, number>();
  private startTime = Date.now();

  track(componentName: string) {
    const current = this.components.get(componentName) || 0;
    this.components.set(componentName, current + 1);
  }

  getStats() {
    const stats: Record<string, any> = {};
    const uptime = Math.floor((Date.now() - this.startTime) / 1000);

    this.components.forEach((count, name) => {
      stats[name] = {
        renders: count,
        avgPerSecond: (count / Math.max(uptime, 1)).toFixed(2),
      };
    });

    return { components: stats, uptime: `${uptime}s` };
  }

  logStats() {
    console.log("📈 Render Stats:", this.getStats());
  }

  reset() {
    this.components.clear();
    this.startTime = Date.now();
  }
}

export const renderTracker = new RenderTracker();
