// Redis Cache Metrics Tracker
class CacheMetrics {
  private hits = 0;
  private misses = 0;
  private startTime = Date.now();

  recordHit() {
    this.hits++;
    this.logStats();
  }

  recordMiss() {
    this.misses++;
    this.logStats();
  }

  getHitRate(): number {
    const total = this.hits + this.misses;
    return total > 0 ? (this.hits / total) * 100 : 0;
  }

  getTotalRequests(): number {
    return this.hits + this.misses;
  }

  getStats() {
    const hitRate = this.getHitRate();
    const uptime = Math.floor((Date.now() - this.startTime) / 1000);
    return {
      hits: this.hits,
      misses: this.misses,
      total: this.getTotalRequests(),
      hitRate: hitRate.toFixed(2) + "%",
      uptime: `${uptime}s`,
    };
  }

  logStats() {
    const total = this.getTotalRequests();
    // Log every 10 requests
    if (total % 10 === 0) {
      console.log("📊 Cache Stats:", this.getStats());
    }
  }

  reset() {
    this.hits = 0;
    this.misses = 0;
    this.startTime = Date.now();
  }
}

export const cacheMetrics = new CacheMetrics();
