"use client";

import React, { useState } from "react";

type DiceResults = {
  normal: number;
  hard: number;
  extreme: number;
  critical: number;
  fail: number;
  fumble: number;
};

const initializeResults = (): DiceResults => ({
  normal: 0,
  hard: 0,
  extreme: 0,
  critical: 0,
  fail: 0,
  fumble: 0,
});

const calculateNormalResult = (value: number) => value == 100 ? 49 : value / 2;
const calculateHardResult = (value: number) => (3 * value) / 10;
const calculateExtremeResult = (value: number) => value / 5 - 1;
const calculateCriticalResult = (_: number) => 1;
const calculateFailResult = (value: number) => value < 50 ? 100 - value - 5 : 100 - value - 1;
const calculateFumbleResult = (value: number) => value < 50 ? 5 : 1;

const displayNormalResult = (value: number | "", results: DiceResults) =>
  value === ""
    ? ""
    : Math.round(
        results.normal + results.hard + results.extreme + results.critical
      );

const displayHardResult = (value: number | "", results: DiceResults) =>
  value === ""
    ? ""
    : Math.floor(results.hard + results.extreme + results.critical);

const displayExtremeResult = (value: number | "", results: DiceResults) =>
  value === "" ? "" : Math.floor(results.extreme + results.critical);

const displayCriticalResult = (value: number | "", results: DiceResults) =>
  value === "" ? "" : Math.round(results.critical);

const displayFumbleResult = (value: number | "", results: DiceResults) =>
  value === "" ? "" : Math.round(results.fumble);

const calculateResults = (value: number): DiceResults => ({
  normal: calculateNormalResult(value),
  hard: calculateHardResult(value),
  extreme: calculateExtremeResult(value),
  critical: calculateCriticalResult(value),
  fail: calculateFailResult(value),
  fumble: calculateFumbleResult(value),
});

export const NormalDice = () => {
  const [successRate, setSuccessRate] = useState<number | "">("");
  const [results, setResults] = useState<DiceResults>(initializeResults);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (value >= 0 && value <= 100) {
    	setSuccessRate(value);
      setResults(calculateResults(value));
    } else {
    	setSuccessRate("");
      setResults(initializeResults());
    }
  };

  return (
    <div>
      <h1>CC計算機：値を入力して成功値を計算</h1>
      <input
        type="number"
        value={successRate}
        onChange={handleChange}
        placeholder="成功値を入力"
        style={{
          padding: "10px",
          fontSize: "16px",
          border: "1px solid #ccc",
          borderRadius: "4px",
        }}
      />
      <div style={{ marginTop: "20px" }}>
        <p>ノーマル成功以上: {displayNormalResult(successRate, results)}</p>
        <p>ハード成功以上: {displayHardResult(successRate, results)}</p>
        <p>
          イクストリーム成功以上: {displayExtremeResult(successRate, results)}
        </p>
        <p>クリティカル: {displayCriticalResult(successRate, results)}</p>
        <p>ファンブル: {displayFumbleResult(successRate, results)}</p>
      </div>
    </div>
  );
};
