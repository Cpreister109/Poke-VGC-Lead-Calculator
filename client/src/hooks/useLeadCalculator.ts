import { useState, useCallback } from 'react';

export type Predictions = Record<string, number | "N/A">;

export interface MatchupData {
    p1_percentages: Predictions;
    p2_percentages: Predictions;
}

export interface MatchupResponse {
    message: string;
    data: MatchupData;
}

interface UseLeadCalculatorReturn {
    data: MatchupData | null;
    loading: boolean;
    error: string | null;
    calculateMatchup: (p1Team: string[], p2Team: string[]) => Promise<void>;
    clearData: () => void;
}

export const useLeadCalculator = (): UseLeadCalculatorReturn => {
    const [data, setData] = useState<MatchupData | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const clearData = () => setData(null);

    const calculateMatchup = useCallback(async (p1Team: string[], p2Team: string[]) => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch('http://127.0.0.1:8000/predict', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    P1_Team: p1Team,
                    P2_Team: p2Team,
                }),
            });

            if (!response.ok) {
                throw new Error(`Server Error: ${response.status} ${response.statusText}`);
            }

            const result: MatchupResponse = await response.json();
            setData(result.data);

        } catch (err: any) {
            console.error("couldn't fetch predictions:", err);
            setError(err.message || "unexpected error occurred");
        } finally {
            setLoading(false);
        }
    }, []);

    return { data, loading, error, calculateMatchup, clearData };
};