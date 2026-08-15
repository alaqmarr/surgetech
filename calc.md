# Surgetech Solar — Calculation Engine Specification

## 1. Goal

Build a production-ready calculation engine for the Surgetech Solar website that estimates:

- Current electricity cost
- Solar system size
- Expected solar generation
- Monthly and annual savings
- Estimated bill after solar
- Self-consumption and export savings
- Installation cost
- Applicable subsidies/incentives
- Payback period
- 10/20/25-year financial benefit
- ROI
- CO₂ reduction
- Optional battery economics
- Financing/EMI scenarios

All results must be presented as **estimates**, with assumptions and source/effective-date information visible to the user.

---

## 2. Calculator Modes

### A. Quick Estimate

Inputs:

1. PIN code / location
2. Property type
3. Average monthly electricity bill

Output immediately:

- Estimated monthly consumption
- Recommended solar capacity
- Estimated annual generation
- Estimated monthly/annual savings
- Estimated post-solar bill
- Estimated payback
- CO₂ reduction

### B. Detailed Estimate

Additional inputs:

- State
- City/district
- DISCOM/electricity provider
- Monthly kWh
- Roof area
- Roof type
- Daytime consumption
- Night-time consumption
- Existing solar capacity
- Backup requirement
- Battery preference
- Budget

### C. Electricity Bill Analysis

Allow the user to upload a recent electricity bill.

Extract where possible:

- DISCOM/provider
- Consumer category
- Billing period
- Units consumed
- Meter readings
- Energy charges
- Fixed charges
- Taxes/adjustments
- Subsidy
- Tariff/slab information

Actual bill information should take priority over generic assumptions.

---

# 3. Location → Tariff Flow

Do not use only a state-average electricity rate.

Preferred flow:

```text
PIN CODE
   ↓
STATE
   ↓
DISTRICT / CITY
   ↓
LIKELY DISCOM
   ↓
CONSUMER CATEGORY
   ↓
TARIFF VERSION
   ↓
SLAB CALCULATION
```

Allow the user to override the detected DISCOM.

Example:

```text
PIN: 500032
Location: Hyderabad, Telangana
Likely provider: Detected DISCOM

Is this correct?
[ Yes ] [ Change ]
```

---

# 4. Tariff Data Architecture

Keep tariff data separate from UI and calculation code.

Suggested structure:

```text
src/
  data/
    tariffs/
      states/
        andhra-pradesh/
        telangana/
        karnataka/
        maharashtra/
        tamil-nadu/
        kerala/
        gujarat/
        rajasthan/
        delhi/
      discoms/
```

Suggested TypeScript model:

```ts
type TariffRecord = {
  id: string;
  state: string;
  district?: string;
  discom: string;

  consumerCategory:
    | "residential"
    | "commercial"
    | "industrial"
    | "agricultural"
    | "other";

  effectiveFrom: string;
  effectiveTo?: string;

  energySlabs: {
    fromKwh: number;
    toKwh?: number;
    ratePerKwh: number;
  }[];

  fixedCharge?: {
    type: "monthly" | "load_based" | "other";
    amount?: number;
    rate?: number;
  };

  demandCharge?: number;

  subsidy?: {
    enabled: boolean;
    description?: string;
  };

  notes?: string;

  sourceName: string;
  sourceUrl: string;
  verifiedAt: string;
};
```

Tariffs must be versioned by effective date. Never silently overwrite an old tariff.

---

# 5. Electricity Bill Calculation

Support progressive/slab-based billing.

Conceptually:

```text
Energy Charges
+ Fixed Charges
+ Demand Charges where applicable
+ Applicable adjustments
- Applicable subsidies
= Estimated Grid Bill
```

Also calculate:

```text
Effective Rate =
Total Electricity Cost / Total Units
```

Example:

> Estimated effective electricity cost: ₹8.15/kWh

Do not assume `bill / units` is the actual tariff; use it only as an effective-cost metric.

---

# 6. Consumption Estimation

If actual kWh is provided, use it.

If only monthly bill is provided:

```text
Estimated Consumption =
Monthly Bill / Estimated Effective Tariff
```

Clearly label this as an estimate.

If 6–12 months of usage are available, calculate:

- Average monthly kWh
- Minimum
- Maximum
- Seasonal variation
- Annual kWh

---

# 7. Solar System Sizing

Primary model:

```text
Required Solar Capacity (kW)
≈ Annual Electricity Consumption
  / Expected Annual Generation per kW
```

Alternative:

```text
Solar kW
≈ Monthly Consumption
  / (Peak Sun Hours × 30 × Performance Ratio)
```

Use configurable regional solar-resource profiles.

```ts
type SolarResourceProfile = {
  region: string;
  peakSunHours: number;
  annualEquivalentSunHours: number;
  performanceRatio: number;
};
```

Performance ratio should account for practical losses such as temperature, inverter, wiring, soiling, mismatch, and downtime.

---

# 8. Solar Generation

Monthly:

```text
Monthly Generation =
System Size
× Peak Sun Hours
× Days
× Performance Ratio
```

Annual:

```text
Annual Generation =
System Size
× Annual Equivalent Sun Hours
× Performance Ratio
```

Future-ready: support integration with a proper solar irradiance/geospatial API.

Never guarantee generation.

---

# 9. Roof Area Constraint

Calculate:

```text
Available Roof Area
÷ Approximate Area per kW
= Maximum Practical Capacity
```

Compare:

- Consumption-required capacity
- Roof-limited capacity

Example:

```text
Consumption requirement: 7.2 kW
Roof capacity: 6.0 kW

Recommended system: 6.0 kW
```

This is an estimate, not an engineering-grade roof design.

---

# 10. Self-Consumption and Export

Separate solar energy into:

```text
Self-consumed solar
+
Exported solar
=
Total solar generation
```

Savings:

```text
Self-consumed units × Avoided Grid Tariff
+
Exported units × Applicable Export Credit
```

Do not assume exported electricity has the same value as self-consumed electricity.

Export/net-metering rules must be configurable by location and system type.

---

# 11. Post-Solar Bill

```text
Original Grid Consumption
- Solar Self-Consumption
= Remaining Grid Consumption
```

Then:

```text
Remaining Grid Energy Charges
+ Fixed Charges
+ Applicable Charges
- Applicable Credits/Subsidies
= Estimated Post-Solar Bill
```

Do not calculate savings simply as:

```text
Solar generation × electricity rate
```

---

# 12. Savings

Monthly:

```text
Current Estimated Bill
- Post-Solar Estimated Bill
= Monthly Savings
```

Annual:

```text
Monthly Savings × 12
```

For advanced mode, calculate month-by-month to account for seasonal generation and tariff differences.

Display:

- Monthly savings
- Annual savings
- 5-year savings
- 10-year savings
- 20-year savings
- 25-year savings

---

# 13. Electricity Tariff Escalation

Make annual tariff escalation configurable.

Example:

```ts
annualTariffEscalation: 0.05
```

Support:

- Conservative
- Expected
- Optimistic

Do not force a single permanent assumption.

---

# 14. Solar Degradation

Make annual degradation configurable.

Example:

```ts
annualSolarDegradation: 0.005
```

Conceptually:

```text
Year 1: 100%
Year 2: 99.5%
Year 3: 99.0%
...
```

Use manufacturer-specific degradation where available.

---

# 15. Installation Cost

Support configurable cost models.

```ts
type SolarCostModel = {
  baseCostPerKw: number;
  inverterCost?: number;
  mountingCost?: number;
  installationCost?: number;
  electricalBalanceOfSystem?: number;
  optionalBatteryCost?: number;
  maintenanceReserve?: number;
};
```

Calculate:

```text
Panels
+ Inverter
+ Mounting
+ BOS
+ Installation
+ Optional Battery
+ Other Costs
= Estimated System Cost
```

Show a price range rather than a guaranteed quotation.

---

# 16. Subsidies and Incentives

Store incentives as versioned data.

```ts
type Incentive = {
  region: string;
  consumerCategory: string;
  effectiveFrom: string;
  effectiveTo?: string;

  eligibility: string;
  amount?: number;
  percentage?: number;

  sourceName: string;
  sourceUrl: string;
};
```

Conceptually:

```text
Estimated System Cost
- Applicable Incentive
= Estimated Net Investment
```

If eligibility cannot be verified:

> Potential incentive — subject to eligibility and current government rules.

Never guarantee subsidy approval.

---

# 17. Payback

Simple:

```text
Payback =
Net Solar Investment / Annual Savings
```

Prefer a yearly cash-flow model for production.

Example:

```text
Year 0: -₹4,50,000
Year 1: +₹90,000
Year 2: +₹94,500
Year 3: +₹99,000
```

Find the exact month/year when cumulative cash flow becomes positive.

---

# 18. ROI

```text
Lifetime Net Benefit =
Total Electricity Savings
- Initial Investment
- Maintenance
- Replacement Costs
```

```text
ROI =
Lifetime Net Benefit / Initial Investment × 100
```

Support:

- 10-year ROI
- 20-year ROI
- 25-year ROI

---

# 19. NPV / IRR

Advanced financial analysis can include:

```text
NPV =
Σ(Cash Flow_t / (1 + Discount Rate)^t)
```

And IRR based on project cash flows.

Keep this hidden under:

> Advanced financial analysis

rather than exposing financial terminology to every homeowner.

---

# 20. Battery Calculation

Inputs:

- Critical load
- Night consumption
- Backup duration
- Battery chemistry
- Usable capacity
- Depth of discharge
- Round-trip efficiency

Basic model:

```text
Required Battery Capacity
=
Critical Load × Backup Hours
÷ Usable Battery Fraction
```

Example:

```text
Critical load: 2 kW
Backup target: 4 hours

Energy requirement: 8 kWh

After usable-capacity adjustment:
~10 kWh battery
```

Calculate battery economics separately from solar-only savings.

---

# 21. System Type

Support:

### On-Grid

For bill reduction where grid supply is reliable.

### Hybrid

For bill reduction plus backup.

### Off-Grid

For locations without reliable grid access.

Do not recommend off-grid merely because it sounds attractive.

---

# 22. Carbon Reduction

Use a configurable grid-emission factor:

```text
CO₂ Avoided =
Solar Electricity Offset
× Grid Emission Factor
```

Display:

> Estimated CO₂ reduction: X tonnes/year

Clearly label this as an estimate.

---

# 23. Results Dashboard

Primary result:

```text
YOUR SURGETECH SOLAR PLAN

Recommended system
6.6 kW

Estimated annual generation
9,200 kWh

Estimated annual savings
₹92,000

Estimated payback
4.2 years
```

Secondary metrics:

```text
25-year savings
₹32L+

CO₂ reduction
~120 tonnes

Grid dependency
↓ 72%

Estimated remaining bill
₹1,400/month
```

---

# 24. Visualization

Show a clear comparison:

```text
WITHOUT SOLAR
₹8,500 / month

████████████████████

WITH SOLAR
₹1,400 / month

███
```

Add an animated 25-year cumulative-cost chart.

Highlight the payback crossover point.

---

# 25. Scenario Comparison

Provide:

### Conservative

Lower generation, lower tariff escalation, higher cost assumptions.

### Expected

Standard assumptions.

### Optimistic

Higher generation, higher tariff escalation, favorable cost assumptions.

Example:

```text
                 Conservative | Expected | Optimistic

Annual Savings      ₹78k      | ₹92k     | ₹1.05L
Payback             5.0 yrs   | 4.2 yrs  | 3.7 yrs
25Y Benefit         ₹24L      | ₹32L     | ₹40L
```

---

# 26. Confidence Score

Every result should have a confidence level.

### High

Actual bill + verified tariff + verified location.

### Medium

Verified tariff + user consumption.

### Low

Location + monthly bill estimate.

Example:

```text
Calculation confidence
████████████████░░
High
```

Explain the reason.

---

# 27. Assumptions Panel

Every result page should have:

> How we calculated this

Include:

- Electricity tariff source
- Tariff effective date
- Consumption assumption
- Solar generation assumption
- Performance ratio
- Solar degradation
- Tariff escalation
- System cost assumption
- Incentive assumption
- Export assumption
- CO₂ factor
- Calculation date

This is essential for trust.

---

# 28. Data Source Policy

Prefer authoritative sources:

1. State Electricity Regulatory Commissions
2. DISCOM tariff orders
3. Central Electricity Authority
4. Government datasets
5. Official government subsidy/incentive sources

Third-party sources can be used for validation but should not silently become the authoritative source.

Every tariff/incentive record should include:

```text
sourceName
sourceUrl
effectiveFrom
effectiveTo
verifiedAt
```

---

# 29. Backend Architecture

Keep frequently changing tariff and incentive logic on the server.

Recommended:

```text
Next.js Frontend
       ↓
/api/solar/calculate
       ↓
Calculation Service
  ├── Location Service
  ├── Tariff Service
  ├── Solar Generation Service
  ├── Cost Service
  ├── Incentive Service
  └── Financial Model
```

Potential endpoints:

```text
GET  /api/tariffs?pin=500032
GET  /api/tariffs/:discom
GET  /api/incentives?state=...
POST /api/solar/calculate
POST /api/bill/analyze
```

---

# 30. Calculation Code Organization

Keep pure calculation functions separate from React.

```text
src/
  lib/
    solar/
      calculateSystemSize.ts
      calculateGeneration.ts
      calculateSavings.ts
      calculatePayback.ts
      calculateROI.ts
      calculateCarbon.ts
      calculateBattery.ts
      calculateCashFlow.ts

    tariffs/
      calculateSlabBill.ts
      findTariff.ts

    finance/
      calculateNPV.ts
      calculateIRR.ts
```

React components should consume calculation results, not contain business formulas.

---

# 31. Privacy

Electricity bills may contain personal information.

Requirements:

- Do not permanently store bills unless explicitly required.
- Do not expose consumer numbers.
- Do not log raw bill contents.
- Encrypt uploads in transit.
- Delete temporary documents after processing.
- Clearly explain how uploaded bills are used.

---

# 32. UI / Brand Direction

The calculator should feel like a premium Surgetech Solar product.

Use the established brand:

- Deep Surgetech navy
- Solar orange
- Sustainable green
- Clean white/light surfaces
- Large numeric typography
- Rounded cards
- Subtle gradients
- Premium glass effects used sparingly
- Smooth micro-interactions

Avoid a generic dark "tech startup" calculator.

---

# 33. Animation

Use React animation libraries such as Motion/Framer Motion.

Useful interactions:

- Count-up savings
- Animated system-size number
- Solar-generation gauge
- Progress steps
- Smooth result transitions
- Animated payback chart
- Number interpolation when assumptions change

Example:

```text
₹0
   ↓
₹92,000
```

---

# 34. Roof Visualization

Optional premium interaction.

Example:

```text
┌─────────────────────────┐
│ ▣ ▣ ▣ ▣ ▣ ▣ ▣ ▣         │
│ ▣ ▣ ▣ ▣ ▣ ▣ ▣ ▣         │
│ ▣ ▣ ▣ ▣ ▣ ▣ ▣ ▣         │
└─────────────────────────┘

Estimated capacity:
~6–7 kW
```

Clearly state that this is an estimate, not engineering-grade roof design.

---

# 35. Lead Generation

After useful results:

> Get a Surgetech Solar Assessment

Capture:

- Name
- Phone
- Email
- Location
- Property type
- Recommended system
- Estimated bill
- Estimated savings

Include calculator outputs with the lead so the sales team receives context.

---

# 36. Shareable Results

Support:

- PDF estimate
- WhatsApp/share
- Copy result link
- Email estimate

Example:

```text
Surgetech Solar Estimate

6.6 kW recommended
₹92,000 estimated annual savings
4.2 year estimated payback
```

Never expose private bill data in public URLs.

---

# 37. Validation

Validate:

- Invalid PIN
- Missing bill
- Negative values
- Unrealistic consumption
- Unrealistic roof area
- Invalid system size
- Unsupported location
- Missing tariff data

If tariff data is unavailable, do not silently use zero/default values.

Instead say:

> We don't currently have a verified tariff for this area. We can provide a general estimate using the nearest available tariff data.

---

# 38. Testing

Unit-test:

- Slab tariff calculation
- Fixed charges
- Subsidies
- Monthly/annual consumption
- Solar sizing
- Solar generation
- Self-consumption
- Export
- Savings
- Degradation
- Tariff escalation
- Payback
- ROI
- NPV
- IRR
- Battery sizing
- Carbon reduction

Edge cases:

```text
Very low usage
Very high usage
Zero bill
Missing tariff
Missing DISCOM
Large roof / low consumption
Small roof / high consumption
No export
100% self-consumption
Battery included
Subsidy unavailable
Expired tariff
```

---

# 39. Calculation Integrity Rules

Never:

- Guarantee savings
- Guarantee payback
- Guarantee subsidy approval
- Assume one national electricity rate
- Hide calculation assumptions
- Treat exported energy as identical to self-consumed energy
- Use outdated tariffs without showing the effective date
- Present rough estimates as engineering proposals

Always:

- Show assumptions
- Show tariff source/effective date
- Show confidence
- Allow location/provider correction
- Keep calculation logic testable
- Version tariff data
- Make uncertainty visible

---

# 40. Future Integrations

Design for later support of:

- PIN-code API
- Maps/geolocation
- DISCOM lookup
- Solar irradiance API
- Satellite roof analysis
- Weather API
- Government subsidy verification
- Electricity bill OCR
- WhatsApp integration
- CRM integration
- Financing API
- Installer quotation generation
- Live equipment pricing
- Panel/inverter database
- Battery degradation models

---

# 41. Definition of Done

- [ ] Quick calculator works
- [ ] Detailed calculator works
- [ ] PIN → location works
- [ ] DISCOM detection/override works
- [ ] Versioned tariff data works
- [ ] Slab calculation works
- [ ] Bill analysis works
- [ ] Solar sizing works
- [ ] Generation estimation works
- [ ] Self-consumption/export works
- [ ] Savings works
- [ ] Installation cost works
- [ ] Incentive model works
- [ ] Payback works
- [ ] ROI works
- [ ] 25-year projection works
- [ ] Carbon calculation works
- [ ] Battery option works
- [ ] Confidence score works
- [ ] Assumptions panel works
- [ ] Sources/effective dates are visible
- [ ] Results can be shared
- [ ] Lead capture works
- [ ] Privacy requirements are met
- [ ] Unit tests pass
- [ ] Mobile UX is excellent
- [ ] No estimate is presented as a guarantee

---

# 42. Product Principle

Do not build a calculator that only outputs:

> "You can save ₹X."

Build a trustworthy **Surgetech Solar Energy Intelligence Engine** that explains:

> **What you're paying now → how much solar you need → how much energy it can produce → how much you can potentially save → how long the investment may take to pay back → and why the estimate was calculated that way.**

The experience should feel premium, transparent, technically credible, and simple enough for a homeowner to understand in under two minutes.
