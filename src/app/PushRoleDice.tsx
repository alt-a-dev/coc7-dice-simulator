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

const displayNormalResult = (value: number | "") =>
  value === ""
    ? ""
    : (
        (value / 100 / 2) * (2 - value / 100 - 1 / 100) * 100 +
        (((value / 100) * 3) / 10) * (2 - value / 100 - 1 / 100) * 100 +
        (value / 100 / 5 - 1 / 100) * (2 - value / 100 - 1 / 100) * 100 +
        2 -
        value / 100 -
        1 / 100
      ).toFixed(2);

const displayHardResult = (value: number | "") =>
  value === ""
    ? ""
    : (
        (((value / 100) * 3) / 10) * (2 - value / 100 - 1 / 100) * 100 +
        (value / 100 / 5 - 1 / 100) * (2 - value / 100 - 1 / 100) * 100 +
        2 -
        value / 100 -
        1 / 100
      ).toFixed(2);

const displayExtremeResult = (value: number | "") =>
  value === ""
    ? ""
    : (
        (value / 100 / 5 - 1 / 100) * (2 - value / 100 - 1 / 100) * 100 +
        2 -
        value / 100 -
        1 / 100
      ).toFixed(2);

const displayCriticalResult = (value: number | "") =>
  value === "" ? "" : (2 - value / 100 - 1 / 100).toFixed(2);

const displayFumbleResult = (value: number | "") =>
  value === ""
    ? ""
    : (
        ((1 - value / 100) * (1 - value / 100 - 1 / 100) + 1 / 100) *
        100
      ).toFixed(2);

export const PushRoleDice = () => {
  const [successRate, setSuccessRate] = useState<number | "">("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (value >= 0 && value <= 100) {
      setSuccessRate(value);
    } else {
      setSuccessRate("");
    }
  };

  return (
    <div>
      <h1>プッシュロール計算機：値を入力して確率を計算</h1>
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
        <p>ノーマル成功以上: {displayNormalResult(successRate)}</p>
        <p>ハード成功以上: {displayHardResult(successRate)}</p>
        <p>イクストリーム成功以上: {displayExtremeResult(successRate)}</p>
        <p>クリティカル: {displayCriticalResult(successRate)}</p>
        <p>ファンブル: {displayFumbleResult(successRate)}</p>
      </div>
    </div>
  );
};
