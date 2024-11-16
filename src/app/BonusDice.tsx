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

const calculateNormalResult = (value: number) => value == 100 ? 99 : value;
const calculateHardResult = (value: number) => value / 2;
const calculateExtremeResult = (value: number) => value / 5;
const calculateCriticalResult = (_: number) => 1;
const calculateFailResult = (value: number) => value < 50 ? 100 - value - 5 : 100 - value - 1;
const calculateFumbleResult = (value: number) => value < 50 ? 5 : 1;

const displayNormalResult = (value: number | "", bonus: number|"", results: DiceResults) =>
  value === "" || bonus === ""
    ? ""
    : (
        (1- ((100 - results.normal)/100.0) ** (bonus+1))*100
      ).toFixed(2);

const displayHardResult = (value: number | "", bonus: number|"", results: DiceResults) =>
  value === "" || bonus === ""
    ? ""
    : (
        (1- ((100 - results.hard)/100) ** (bonus+1)) * 100
      ).toFixed(2);

const displayExtremeResult = (value: number | "",bonus: number|"", results: DiceResults) =>
  value === "" || bonus === ""
    ? ""
    : (
        (1- ((100 - results.extreme)/100) ** (bonus+1)) * 100
      ).toFixed(2);

const displayCriticalResult = (value: number | "",bonus: number|"", results: DiceResults) =>
  value === "" || bonus === ""
    ? ""
    : (
        (1- ((100 - results.critical)/100) ** (bonus+1)) * 100
      ).toFixed(2);

const displayFumbleResult = (value: number | "",bonus: number|"", results: DiceResults) =>
  value === "" || bonus === ""
    ? ""
    : (
        (results.fumble/100 ** (bonus+1)) * 100
      ).toFixed(2);

const calculateResults = (value: number): DiceResults => ({
  normal: calculateNormalResult(value),
  hard: calculateHardResult(value),
  extreme: calculateExtremeResult(value),
  critical: calculateCriticalResult(value),
  fail: calculateFailResult(value),
  fumble: calculateFumbleResult(value),
});

export const BonusDice = () => {
  const [successRate, setSuccessRate] = useState<number | "">("");
  const [bonus, setBonus] = useState<number| "">(0);
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
  
  const handleBonusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (value >= 0) {
    	setBonus(value);
    } else {
      setBonus("");
    }
  };

  return (
    <div>
      <h1>ボーナスダイス計算機：値を入力して確率を計算</h1>
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
      <input
        type="number"
        value={bonus}
        onChange={handleBonusChange}
        placeholder="ボーナスダイスを入力"
        style={{
          padding: "10px",
          fontSize: "16px",
          border: "1px solid #ccc",
          borderRadius: "4px",
        }}
      />
      <div style={{ marginTop: "20px" }}>
        <p>ノーマル成功以上: {displayNormalResult(successRate, bonus, results)}</p>
        <p>ハード成功以上: {displayHardResult(successRate, bonus, results)}</p>
        <p>
          イクストリーム成功以上: {displayExtremeResult(successRate, bonus, results)}
        </p>
        <p>クリティカル: {displayCriticalResult(successRate, bonus, results)}</p>
        <p>ファンブル: {displayFumbleResult(successRate, bonus, results)}</p>
      </div>
    </div>
  );
};
