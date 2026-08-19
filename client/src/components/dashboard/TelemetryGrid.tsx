import React from "react";
import { MetricCard } from "../common/MetricCard";

export const TelemetryGrid: React.FC = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-4 pb-6 border-b border-[#eae8e7]/80">
      <MetricCard
        label="Global Latency"
        value="42"
        unit="ms"
        color="blue"
      />
      <MetricCard
        label="Uptime"
        value="99.99"
        unit="%"
        color="green"
      />
      <MetricCard
        label="4XX Errors"
        value="0.02"
        unit="%"
        color="orange"
      />
      <MetricCard
        label="5XX Errors"
        value="0.00"
        unit="%"
        color="dark"
      />
    </div>
  );
};
