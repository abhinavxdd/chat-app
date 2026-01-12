// Render Performance Comparison Tool
// Add this to your chat page to track and compare render performance

export class PerformanceMonitor {
  private renderLog: Array<{
    component: string;
    timestamp: number;
    action: string;
  }> = [];

  private startTime = Date.now();

  logRender(component: string, action: string = "update") {
    this.renderLog.push({
      component,
      timestamp: Date.now(),
      action,
    });
  }

  getStats() {
    const uptime = (Date.now() - this.startTime) / 1000;
    const componentStats: Record<string, number> = {};

    this.renderLog.forEach((log) => {
      componentStats[log.component] = (componentStats[log.component] || 0) + 1;
    });

    const totalRenders = this.renderLog.length;

    return {
      uptime: `${uptime.toFixed(1)}s`,
      totalRenders,
      rendersPerSecond: (totalRenders / uptime).toFixed(2),
      byComponent: componentStats,
    };
  }

  getLastMinuteRenders() {
    const oneMinuteAgo = Date.now() - 60000;
    return this.renderLog.filter((log) => log.timestamp > oneMinuteAgo).length;
  }

  // Estimate what renders would be WITHOUT Zustand (Context API behavior)
  estimateWithoutZustand() {
    // In Context API, typically ALL consumers re-render on ANY state change
    // Assume 3 main consumers: ChatWindow, UserList, MessageInput

    const withZustand = this.renderLog.length;

    // Rough estimation: each state change would cause 2-3x more renders
    const estimatedWithoutZustand = Math.floor(withZustand * 2.5);
    const reduction = (
      ((estimatedWithoutZustand - withZustand) / estimatedWithoutZustand) *
      100
    ).toFixed(1);

    return {
      withZustand,
      estimatedWithoutZustand,
      reductionPercentage: `${reduction}%`,
      rendersSaved: estimatedWithoutZustand - withZustand,
    };
  }

  printReport() {
    console.log("\n📊 ===== PERFORMANCE REPORT =====");
    console.log("Stats:", this.getStats());
    console.log("\n🎯 Zustand Impact:", this.estimateWithoutZustand());
    console.log("================================\n");
  }

  reset() {
    this.renderLog = [];
    this.startTime = Date.now();
  }
}

// Global instance
export const perfMonitor = new PerformanceMonitor();

// Expose to window for easy access in browser console
if (typeof window !== "undefined") {
  (window as any).perfMonitor = perfMonitor;
}
