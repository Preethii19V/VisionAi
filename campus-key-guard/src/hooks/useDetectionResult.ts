import { useState } from "react";

export interface DetectionResult {
  vehicle_number: string;
  status: string;
  authorized: boolean;
}

export function useDetectionResult() {
  const [result, setResult] = useState<DetectionResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const detectVehicle = async (vehicleNumber: string) => {
    try {
      const res = await fetch("http://localhost:5000/detect", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          vehicle_number: vehicleNumber,
        }),
      });

      if (!res.ok) throw new Error("Failed to fetch");

      const data = await res.json();
      setResult(data);
      setError(null);
    } catch (err) {
      setError("Unable to connect to backend");
    }
  };

  return { result, error, detectVehicle };
}
