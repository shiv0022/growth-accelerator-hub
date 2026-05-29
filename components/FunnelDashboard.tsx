"use client";

import React, { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Info, TrendingUp, DollarSign, Users, Award, Percent, Layers, ShieldCheck } from "lucide-react";

export default function FunnelDashboard() {
  // Calculator variables
  const [budget, setBudget] = useState(100000); // ₹1,00,000
  const [cpc, setCpc] = useState(25); // ₹25
  const [leadRate, setLeadRate] = useState(4.5); // 4.5%
  const [closeRate, setCloseRate] = useState(12); // 12%
  const [aov, setAov] = useState(7500); // ₹7,500

  // Derived metrics
  const clicks = Math.round(budget / cpc);
  const leads = Math.round(clicks * (leadRate / 100));
  const customers = Math.round(leads * (closeRate / 100));
  const revenue = customers * aov;
  const profit = revenue - budget;
  const roas = budget > 0 ? (revenue / budget).toFixed(2) : "0.00";
  const roi = budget > 0 ? Math.round((profit / budget) * 100) : 0;
  
  // Cost analysis
  const cpl = leads > 0 ? Math.round(budget / leads) : 0;
  const cac = customers > 0 ? Math.round(budget / customers) : 0;

  // Percentage widths for the CSS funnel segment widths (max 100%, min 20%)
  const trafficWidth = 100;
  const leadWidth = Math.max(30, Math.min(85, (leadRate / 15) * 100));
  const customerWidth = Math.max(15, Math.min(65, (closeRate / 40) * 100));

  return (
    <Card className="w-full bg-card/45 backdrop-blur-xl border border-border/80 p-6 md:p-8 rounded-3xl overflow-hidden shadow-2xl relative">
      {/* Visual background glows */}
      <div className="absolute top-0 right-0 w-[250px] h-[250px] bg-primary/5 rounded-full blur-[90px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[250px] h-[250px] bg-cyan-500/5 rounded-full blur-[90px] pointer-events-none" />
      
      <div className="grid lg:grid-cols-12 gap-8 items-stretch relative z-10">
        
        {/* Left Side: Campaign Config Sliders */}
        <div className="lg:col-span-5 flex flex-col gap-6 border-b lg:border-b-0 lg:border-r border-border/40 pb-8 lg:pb-0 lg:pr-8">
          <div>
            <div className="flex items-center gap-1.5 text-primary mb-1.5">
              <TrendingUp size={16} className="text-primary animate-pulse" />
              <span className="text-[10px] font-extrabold uppercase tracking-wider">Campaign Forecaster</span>
            </div>
            <h3 className="text-2xl font-black tracking-tight text-foreground">
              Funnel ROI Calculator
            </h3>
            <p className="text-xs text-muted-foreground mt-1">
              Calibrate budget inputs and target conversion metrics to estimate your ROAS scalability.
            </p>
          </div>

          <div className="flex flex-col gap-5">
            {/* Ad Budget */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <Label className="font-bold text-foreground/80">Monthly Ad Budget</Label>
                <span className="font-black text-primary">₹{budget.toLocaleString('en-IN')}</span>
              </div>
              <Slider
                value={[budget]}
                min={20000}
                max={1000000}
                step={10000}
                onValueChange={(val) => setBudget(val[0])}
                className="cursor-pointer"
              />
            </div>

            {/* Cost Per Click */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <Label className="font-bold text-foreground/80">Avg. Cost Per Click (CPC)</Label>
                <span className="font-black text-primary">₹{cpc}</span>
              </div>
              <Slider
                value={[cpc]}
                min={5}
                max={150}
                step={1}
                onValueChange={(val) => setCpc(val[0])}
                className="cursor-pointer"
              />
            </div>

            {/* Lead Conversion */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <Label className="font-bold text-foreground/80">Click-to-Lead Rate</Label>
                <span className="font-black text-primary">{leadRate}%</span>
              </div>
              <Slider
                value={[leadRate]}
                min={0.5}
                max={15}
                step={0.1}
                onValueChange={(val) => setLeadRate(val[0])}
                className="cursor-pointer"
              />
            </div>

            {/* Sale Close Rate */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <Label className="font-bold text-foreground/80">Lead-to-Customer Close Rate</Label>
                <span className="font-black text-primary">{closeRate}%</span>
              </div>
              <Slider
                value={[closeRate]}
                min={1}
                max={40}
                step={0.5}
                onValueChange={(val) => setCloseRate(val[0])}
                className="cursor-pointer"
              />
            </div>

            {/* AOV */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <Label className="font-bold text-foreground/80">Average Order Value (AOV)</Label>
                <span className="font-black text-primary">₹{aov.toLocaleString('en-IN')}</span>
              </div>
              <Slider
                value={[aov]}
                min={1000}
                max={50000}
                step={500}
                onValueChange={(val) => setAov(val[0])}
                className="cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Right Side: Funnel Chart & ROI Display */}
        <div className="lg:col-span-7 flex flex-col justify-between gap-6 pl-0 lg:pl-4">
          {/* Top segment: Styled CSS Funnel Chart */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label className="text-xs font-bold text-foreground/70 uppercase tracking-widest flex items-center gap-1.5">
                <Layers size={14} className="text-primary" /> Visual Conversion Pipeline
              </Label>
              <span className="text-[10px] text-muted-foreground font-semibold flex items-center gap-1">
                <ShieldCheck size={12} className="text-emerald-500" /> Interactive Forecast
              </span>
            </div>

            {/* Funnel visualization stack */}
            <div className="flex flex-col gap-3 items-center w-full py-4 bg-secondary/15 border border-border/40 rounded-2xl p-4">
              
              {/* Stage 1: Clicks */}
              <div 
                style={{ width: `${trafficWidth}%` }}
                className="h-12 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-xl flex items-center justify-between px-5 shadow-lg shadow-blue-500/10 border border-blue-400/20 transition-all duration-500 hover:brightness-105"
              >
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-white/20 text-[10px] font-black flex items-center justify-center">1</span>
                  <span className="text-xs font-black tracking-wide uppercase">Stage 1: Traffic Clicks</span>
                </div>
                <div className="text-right">
                  <span className="text-sm font-black block leading-none">{clicks.toLocaleString()}</span>
                  <span className="text-[9px] opacity-75 font-semibold">₹{cpc} Avg. CPC</span>
                </div>
              </div>

              {/* Stage 2: Leads */}
              <div 
                style={{ width: `${leadWidth}%` }}
                className="h-12 bg-gradient-to-r from-cyan-500 to-emerald-500 text-white rounded-xl flex items-center justify-between px-5 shadow-lg shadow-cyan-500/10 border border-cyan-400/20 transition-all duration-500 hover:brightness-105"
              >
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-white/20 text-[10px] font-black flex items-center justify-center">2</span>
                  <span className="text-xs font-black tracking-wide uppercase">Stage 2: Qualified Leads</span>
                </div>
                <div className="text-right">
                  <span className="text-sm font-black block leading-none">{leads.toLocaleString()}</span>
                  <span className="text-[9px] opacity-75 font-semibold">CPL: ₹{cpl.toLocaleString('en-IN')}</span>
                </div>
              </div>

              {/* Stage 3: Customers */}
              <div 
                style={{ width: `${customerWidth}%` }}
                className="h-12 bg-gradient-to-r from-emerald-500 via-purple-500 to-purple-600 text-white rounded-xl flex items-center justify-between px-5 shadow-lg shadow-purple-500/10 border border-purple-400/20 transition-all duration-500 hover:brightness-105"
              >
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-white/20 text-[10px] font-black flex items-center justify-center">3</span>
                  <span className="text-xs font-black tracking-wide uppercase">Stage 3: Customers</span>
                </div>
                <div className="text-right">
                  <span className="text-sm font-black block leading-none">{customers.toLocaleString()}</span>
                  <span className="text-[9px] opacity-75 font-semibold">CPA: ₹{cac.toLocaleString('en-IN')}</span>
                </div>
              </div>

            </div>
          </div>

          {/* Bottom segment: Campaign outcomes grids */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-2">
            
            {/* Metric 1 */}
            <div className="bg-background/80 border border-border/80 p-3.5 rounded-xl text-center shadow-sm">
              <span className="text-[9px] text-muted-foreground uppercase font-bold tracking-wider block mb-1">ROAS Return</span>
              <p className="text-xl font-black text-primary">{roas}x</p>
              <p className="text-[9px] text-muted-foreground font-semibold mt-0.5">Ad Spend Yield</p>
            </div>

            {/* Metric 2 */}
            <div className="bg-background/80 border border-border/80 p-3.5 rounded-xl text-center shadow-sm">
              <span className="text-[9px] text-muted-foreground uppercase font-bold tracking-wider block mb-1">Campaign Profit</span>
              <p className={`text-xl font-black ${profit >= 0 ? "text-emerald-500" : "text-red-500"}`}>
                {profit >= 0 ? "+" : ""}₹{profit.toLocaleString('en-IN')}
              </p>
              <p className="text-[9px] text-muted-foreground font-semibold mt-0.5">Net Revenue Return</p>
            </div>

            {/* Metric 3 */}
            <div className="bg-background/80 border border-border/80 p-3.5 rounded-xl text-center shadow-sm">
              <span className="text-[9px] text-muted-foreground uppercase font-bold tracking-wider block mb-1">Customer CAC</span>
              <p className="text-xl font-black text-foreground">₹{cac.toLocaleString('en-IN')}</p>
              <p className="text-[9px] text-muted-foreground font-semibold mt-0.5">Cost Per Customer</p>
            </div>

            {/* Metric 4 */}
            <div className="bg-background/80 border border-border/80 p-3.5 rounded-xl text-center shadow-sm">
              <span className="text-[9px] text-muted-foreground uppercase font-bold tracking-wider block mb-1">Projected ROI</span>
              <p className="text-xl font-black text-foreground">{roi}%</p>
              <p className="text-[9px] text-muted-foreground font-semibold mt-0.5">Net ROI Margin</p>
            </div>

          </div>

          {/* Revenue display banner */}
          <div className="bg-primary/5 border border-primary/20 p-4 rounded-2xl flex items-center justify-between">
            <div>
              <span className="text-[10px] text-primary font-extrabold uppercase tracking-wider block">Estimated Total Revenue</span>
              <p className="text-2xl font-black text-primary leading-none mt-1">₹{revenue.toLocaleString('en-IN')}</p>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-muted-foreground font-bold uppercase block">Conversion AOV</span>
              <span className="text-xs font-extrabold text-foreground mt-1 block">₹{aov.toLocaleString('en-IN')}</span>
            </div>
          </div>

        </div>
      </div>
    </Card>
  );
}
