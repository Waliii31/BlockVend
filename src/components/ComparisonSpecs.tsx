import React, { useState } from 'react';
import { soundFX } from '../utils/audio';
import { Calculator } from 'lucide-react';

export const ComparisonSpecs: React.FC = () => {
  const [dispenseCount, setDispenseCount] = useState<number>(5);

  const blockvendGasPerTx = 42150;
  const ammGasPerTx = 142800;
  const gasPriceGwei = 15;
  const ethPriceUsd = 3200;

  const totalBlockvendGas = blockvendGasPerTx * dispenseCount;
  const totalAmmGas = ammGasPerTx * dispenseCount;
  const gasSaved = totalAmmGas - totalBlockvendGas;

  const botSaved = (gasSaved * gasPriceGwei) / 1e9;
  const usdSaved = botSaved * ethPriceUsd;

  return (
    <section id="specs" className="w-full py-12 px-4 max-w-7xl mx-auto select-none">
      {/* Section Header */}
      <div className="mb-8">
        <div className="inline-block bg-black text-[#FFE600] font-black text-xs px-2 py-0.5 border-2 border-black tracking-widest uppercase mb-2">
          SECTION [05] // BENCHMARK & EFFICIENCY SPEC
        </div>
        <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-black flex items-center gap-3">
          BLOCKVEND VS AMM
          <span className="text-xs font-bold bg-black text-[#FFE600] px-2 py-1 neo-border">
            BENCHMARK
          </span>
        </h2>
        <p className="font-bold text-xs sm:text-sm text-neutral-800 uppercase tracking-wide mt-1 max-w-3xl">
          Deterministic hardware vending mechanics beat continuous bonding curves. Compare the operational overhead between BlockVend fixed dispenses and traditional automated market makers.
        </p>
      </div>

      {/* Comparison Grid */}
      <div className="bg-white border-4 border-black neo-box-lg p-4 sm:p-6 mb-8">
        <div className="overflow-x-auto">
          <table className="w-full text-left font-mono text-xs border-collapse">
            <thead>
              <tr className="bg-black text-white font-black uppercase border-b-2 border-black">
                <th className="p-3 border-r border-neutral-700 w-1/3">EVALUATION METRIC</th>
                <th className="p-3 border-r border-neutral-700 w-1/3 bg-[#FFE600] text-black">
                  ★ BLOCKVEND (FIXED-RATE)
                </th>
                <th className="p-3 w-1/3 bg-neutral-800 text-neutral-300">
                  STANDARD AMM DEX (UNISWAP V3)
                </th>
              </tr>
            </thead>
            <tbody className="divide-y-2 divide-black text-xs font-bold">
              <tr className="hover:bg-neutral-50">
                <td className="p-3 border-r border-black font-black uppercase">
                  SLIPPAGE TOLERANCE
                </td>
                <td className="p-3 border-r border-black bg-[#00FF66]/20 font-black text-black">
                  STRICT 0.00% (IMMUTABLE)
                </td>
                <td className="p-3 text-neutral-700">
                  0.50% - 3.50% (DYNAMIC SLIPPAGE)
                </td>
              </tr>

              <tr className="hover:bg-neutral-50">
                <td className="p-3 border-r border-black font-black uppercase">
                  BASE GAS CONSUMPTION
                </td>
                <td className="p-3 border-r border-black bg-[#00FF66]/20 font-black text-black">
                  ~42,150 GAS (ATOMIC)
                </td>
                <td className="p-3 text-neutral-700">
                  ~142,800+ GAS (MULTI-HOP)
                </td>
              </tr>

              <tr className="hover:bg-neutral-50">
                <td className="p-3 border-r border-black font-black uppercase">
                  MEV SANDWICH RISK
                </td>
                <td className="p-3 border-r border-black bg-[#00FF66]/20 font-black text-black">
                  0.00% (NO ARBITRAGE SPREAD)
                </td>
                <td className="p-3 text-red-600 font-bold">
                  HIGH (CONSTANT MEMPOOL TARGET)
                </td>
              </tr>

              <tr className="hover:bg-neutral-50">
                <td className="p-3 border-r border-black font-black uppercase">
                  TRANSACTION STEPS
                </td>
                <td className="p-3 border-r border-black bg-[#00FF66]/20 font-black text-black">
                  1-CLICK DIRECT DISPENSE
                </td>
                <td className="p-3 text-neutral-700">
                  2 TXS (ERC-20 APPROVE + SWAP)
                </td>
              </tr>

              <tr className="hover:bg-neutral-50">
                <td className="p-3 border-r border-black font-black uppercase">
                  LIQUIDITY IMPERMANENT LOSS
                </td>
                <td className="p-3 border-r border-black bg-[#00FF66]/20 font-black text-black">
                  NONE (VAULT RESERVE SALES)
                </td>
                <td className="p-3 text-neutral-700">
                  SEVERE LP PRICE DIVERGENCE RISK
                </td>
              </tr>

              <tr className="hover:bg-neutral-50">
                <td className="p-3 border-r border-black font-black uppercase">
                  SETTLEMENT GUARANTEE
                </td>
                <td className="p-3 border-r border-black bg-[#00FF66]/20 font-black text-black">
                  NON-REENTRANT SAFE_ERC20
                </td>
                <td className="p-3 text-neutral-700">
                  SUBJECT TO ROUTER PATH FAILURES
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Interactive Gas Savings Calculator */}
      <div className="bg-[#00F0FF] border-4 border-black neo-box-lg p-5">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b-3 border-black pb-3 mb-4">
          <div className="flex items-center gap-2">
            <Calculator size={20} className="text-black" />
            <span className="font-black text-sm uppercase text-black">
              INTERACTIVE DISPENSE EFFICIENCY CALCULATOR
            </span>
          </div>
          <span className="text-xs font-black bg-black text-[#FFE600] px-2 py-0.5">
            GAS ESTIMATION AT 15 GWEI
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          {/* Slider input */}
          <div className="md:col-span-6 space-y-3">
            <label className="text-xs font-black uppercase text-black block">
              ESTIMATED DISPENSES: <span className="text-lg bg-black text-white px-2">{dispenseCount} SWAPS</span>
            </label>
            <input
              type="range"
              min="1"
              max="50"
              value={dispenseCount}
              onChange={(e) => {
                soundFX.playKeypad(500 + Number(e.target.value) * 10);
                setDispenseCount(Number(e.target.value));
              }}
              className="w-full h-4 bg-white border-2 border-black accent-black cursor-pointer"
            />
            <div className="flex justify-between text-[10px] font-bold text-black font-mono">
              <span>1 SWAP</span>
              <span>25 SWAPS</span>
              <span>50 SWAPS</span>
            </div>
          </div>

          {/* Metric Outputs */}
          <div className="md:col-span-6 grid grid-cols-2 gap-3">
            <div className="bg-white border-2 border-black p-3 neo-box-sm">
              <div className="text-[10px] font-bold uppercase text-neutral-600">
                TOTAL GAS SAVED
              </div>
              <div className="text-xl font-black text-black">
                {gasSaved.toLocaleString()}
              </div>
              <div className="text-[10px] font-bold text-[#FF007F]">
                ~70.5% LESS OVERHEAD
              </div>
            </div>

            <div className="bg-black text-[#00FF66] border-2 border-black p-3 neo-box-sm font-mono">
              <div className="text-[10px] font-bold uppercase text-[#00FF66]/70">
                VALUE PRESERVED
              </div>
              <div className="text-xl font-black text-[#FFE600]">
                ${usdSaved.toFixed(2)} USD
              </div>
              <div className="text-[10px] text-white">
                ~{botSaved.toFixed(4)} BOT SAVED
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
