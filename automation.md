# Surgetech Solar — Calculation Engine Specification

## Purpose

Build a production-ready calculation engine for the Surgetech Solar website that estimates:

- Current electricity cost
- Solar system size
- Expected solar generation
- Monthly and annual savings
- Estimated electricity bill after solar
- Self-consumption and export savings
- Installation cost
- Applicable subsidies/incentives
- Payback period
- 10/20/25-year financial benefit
- ROI
- CO₂ reduction
- Optional battery economics
- Financing/EMI scenarios

All outputs are estimates and must expose their assumptions, tariff source, tariff effective date, and confidence level.

---

# 1. Calculator Modes

## A. Quick Estimate

Inputs:

1. PIN code / location
2. Property type
3. Average monthly electricity bill

Output:

- Detected location
- Likely electricity provider
- Estimated consumption
- Recommended solar capacity
- Estimated annual generation
- Estimated monthly/annual savings
- Estimated post-solar bill
- Estimated payback
- CO₂ reduction

## B. Detailed Estimate

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

## C. Electricity Bill Analysis

Allow users to upload a recent electricity bill.

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

Actual bill data should take priority over generic assumptions.

---

# 2. PIN Code → Location Integration

The PIN field must be functional. Entering a valid Indian PIN code should trigger a location lookup and update the calculator.

Do not treat PIN as a decorative field.

## Recommended initial API

Use the India Postal PIN Code API:

https://www.postalpincode.in/Api-Details

Example:

```text
GET https://api.postalpincode.in/pincode/500032
```

Use it to resolve:

- PIN code
- Post office
- District
- State
- Region
- Division

The Government of India's Open Government Data ecosystem can also be considered as a secondary PIN-code source.

## Next.js architecture

Do not call the external API directly from React.

Use:

```text
Browser
   ↓
/api/location?pincode=500032
   ↓
Next.js server
   ↓
PIN API
   ↓
Normalized Surgetech response
```

Example normalized response:

```json
{
  "pincode": "500032",
  "state": "Telangana",
  "district": "Hyderabad",
  "city": "Hyderabad",
  "country": "India"
}
```

Benefits:

- Caching
- Rate limiting
- Error handling
- API abstraction
- Easier provider replacement
- Cleaner frontend

## PIN UX

When the user enters a valid PIN:

```text
500032
   ↓
Detecting location...
   ↓
✓ Hyderabad
✓ Telangana
```

Then:

```text
Electricity provider

[ Detecting likely provider... ]

Likely provider:
[ Detected DISCOM ▼ ]

Is this correct?
[ Yes ] [ Change ]
```

Never assume the DISCOM with 100% certainty from a PIN alone.

---

# 3. Location → DISCOM → Tariff

The calculator flow should be:

```text
PIN CODE
   ↓
PIN API
   ↓
State / District / City
   ↓
DISCOM Mapper
   ↓
Likely DISCOM
   ↓
User Confirmation
   ↓
Consumer Category
   ↓
Current Tariff
   ↓
Solar Calculation
   ↓
Financial Calculation
   ↓
SURGETECH RESULTS
```

Suggested model:

```ts
type LocationContext = {
  pincode: string;
  state: string;
  district?: string;
  city?: string;

  likelyDiscom?: string;
  selectedDiscom?: string;

  source: string;
  resolvedAt: string;
};
```

---

# 4. DISCOM Mapping

Create:

```text
src/
  data/
    locations/
      pincode-discom/
        andhra-pradesh.ts
        telangana.ts
        karnataka.ts
        maharashtra.ts
        tamil-nadu.ts
        kerala.ts
        gujarat.ts
        rajasthan.ts
        delhi.ts
```

Model:

```ts
type DiscomMapping = {
  state: string;
  district?: string;
  pincodePrefix?: string;
  discom: string;
  confidence: "high" | "medium" | "low";
};
```

Return:

```ts
{
  likelyDiscom: "...",
  confidence: "medium",
  alternatives: [...]
}
```

If multiple providers are possible, show them to the user.

---

# 5. Surgetech Tariff Database

Do not build the calculator around a random third-party "live electricity price API".

Indian electricity tariffs are distributed across:

- State Electricity Regulatory Commissions
- DISCOM tariff orders
- Central Electricity Authority
- Ministry of Power
- Government datasets
- Official subsidy/incentive notifications

Build a **Surgetech Tariff Database** that is periodically updated and versioned.

Architecture:

```text
Official tariff sources
        ↓
Tariff ingestion/update
        ↓
Validation
        ↓
Surgetech Tariff Database
        ↓
Tariff API
        ↓
Solar Calculator
```

Store:

```text
id
state
district
discom
consumer_type
tariff_slabs
fixed_charges
demand_charges
subsidy
effective_from
effective_to
source_name
source_url
verified_at
```

Never silently overwrite historical tariffs.

---

# 6. Tariff API

Create:

```text
GET /api/tariffs?pin=500032
```

or:

```text
GET /api/tariffs?state=Telangana&discom=...
```

Example:

```json
{
  "state": "Telangana",
  "district": "Hyderabad",
  "discom": "Example DISCOM",
  "consumerCategory": "residential",
  "tariffVersion": "2026-27",
  "effectiveFrom": "2026-04-01",
  "slabs": [],
  "fixedCharges": {},
  "source": {
    "name": "Official tariff order",
    "url": "...",
    "verifiedAt": "..."
  }
}
```

The frontend should consume this normalized Surgetech API rather than third-party tariff APIs directly.

---

# 7. Tariff Data Model

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

Tariffs must be versioned by effective date.

---

# 8. Tariff Resolution

When a user enters a PIN:

```text
PIN
 ↓
Resolve location
 ↓
Find possible DISCOMs
 ↓
User confirms provider
 ↓
Select consumer category
 ↓
Find latest valid tariff
 ↓
Verify effective date
 ↓
Run slab calculation
```

Consumer category:

```text
[ Home ]
[ Business ]
[ Industry ]
[ Agricultural ]
[ Other ]
```

Do not automatically assume residential.

---

# 9. Electricity Bill Calculation

Support progressive/slab-based billing:

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

Do not treat `bill / units` as the tariff itself.

---

# 10. Consumption Estimation

If actual kWh is provided, use it.

If only monthly bill is provided:

```text
Estimated Consumption =
Monthly Bill / Estimated Effective Tariff
```

Clearly label this as an estimate.

If 6–12 months are available, calculate:

- Average monthly kWh
- Minimum
- Maximum
- Seasonal variation
- Annual kWh

---

# 11. Solar System Sizing

Primary:

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

# 12. Solar Generation

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

Never guarantee generation.

---

# 13. Roof Area

Calculate:

```text
Available Roof Area
÷ Approximate Area per kW
= Maximum Practical Capacity
```

Compare consumption-required capacity with roof-limited capacity.

Example:

```text
Consumption requirement: 7.2 kW
Roof capacity: 6.0 kW

Recommended system: 6.0 kW
```

This is an estimate, not engineering-grade roof design.

---

# 14. Self-Consumption and Export

Separate:

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

# 15. Post-Solar Bill

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

# 16. Savings

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

# 17. Tariff Escalation

Make annual tariff escalation configurable.

Example:

```ts
annualTariffEscalation: 0.05
```

Support:

- Conservative
- Expected
- Optimistic

---

# 18. Solar Degradation

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

# 19. Installation Cost

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

Show price ranges rather than guaranteed quotations.

---

# 20. Subsidies and Incentives

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

Never guarantee subsidy approval.

---

# 21. Payback

Simple:

```text
Payback =
Net Solar Investment / Annual Savings
```

Prefer yearly cash-flow modeling for production.

Find the exact month/year when cumulative cash flow becomes positive.

---

# 22. ROI

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

Support 10, 20, and 25-year projections.

---

# 23. NPV / IRR

Advanced mode:

```text
NPV =
Σ(Cash Flow_t / (1 + Discount Rate)^t)
```

Support IRR from project cash flows.

Keep these under:

> Advanced financial analysis

---

# 24. Battery Calculation

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

Calculate battery economics separately from solar-only savings.

---

# 25. System Type

### On-Grid

For bill reduction where grid supply is reliable.

### Hybrid

For bill reduction plus backup.

### Off-Grid

For locations without reliable grid access.

---

# 26. Carbon Reduction

```text
CO₂ Avoided =
Solar Electricity Offset
× Grid Emission Factor
```

Display:

> Estimated CO₂ reduction: X tonnes/year

Clearly label as an estimate.

---

# 27. Results Dashboard

Example:

```text
YOUR SURGETECH SOLAR PLAN

6.6 kW
Recommended system

9,200 kWh
Estimated annual generation

₹92,000
Estimated annual savings

4.2 years
Estimated payback
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

# 28. Visualization

Show:

```text
WITHOUT SOLAR
₹8,500 / month

████████████████████

WITH SOLAR
₹1,400 / month

███
```

Add an animated 25-year cumulative-cost chart and clearly highlight the payback crossover.

---

# 29. Scenario Comparison

### Conservative

Lower generation, lower tariff escalation, higher cost assumptions.

### Expected

Standard assumptions.

### Optimistic

Higher generation, higher tariff escalation, favorable cost assumptions.

---

# 30. Confidence Score

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

# 31. Assumptions Panel

Every result page should include:

> How we calculated this

Show:

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

---

# 32. Data Source Policy

Prefer:

1. State Electricity Regulatory Commissions
2. DISCOM tariff orders
3. Central Electricity Authority
4. Ministry of Power
5. Government datasets
6. Official subsidy/incentive sources

Third-party data can validate but should not silently become the authoritative source.

---

# 33. Cached PIN Lookups

PIN codes change infrequently.

Use:

```text
PIN entered
   ↓
Check Surgetech cache
   ↓
Found?
 ├── YES → Return cached location
 └── NO  → External PIN API
              ↓
           Validate
              ↓
           Store cache
              ↓
           Return
```

Suggested cache fields:

```text
pincode
state
district
city
post_offices
source
last_verified
```

---

# 34. Calculator State and Recalculation

Use centralized calculator state.

```ts
type CalculatorContext = {
  location: LocationContext;

  electricity: {
    provider?: string;
    consumerCategory?: string;
    monthlyBill?: number;
    monthlyKwh?: number;
    tariff?: TariffRecord;
    tariffConfidence?: "high" | "medium" | "low";
  };

  solar: {
    roofArea?: number;
    systemSize?: number;
    generation?: number;
  };

  finance: {
    installationCost?: number;
    incentive?: number;
    payback?: number;
    roi?: number;
  };
};
```

Changing the PIN must invalidate/recalculate dependent fields.

```text
PIN changed
 ↓
Location changed
 ↓
DISCOM may change
 ↓
Tariff may change
 ↓
Consumption estimate may change
 ↓
Solar savings recalculate
 ↓
Results animate to new values
```

Inputs that trigger recalculation:

- PIN
- State/district
- DISCOM
- Consumer category
- Monthly bill
- Monthly kWh
- Roof area
- System size
- Battery
- Export assumptions
- Installation cost
- Incentive
- Tariff escalation

For PIN input, wait until 6 digits are entered and debounce roughly 300–500ms.

---

# 35. Graceful Fallbacks

If PIN lookup fails:

> We couldn't automatically locate this PIN code. Please select your state and district manually.

If DISCOM cannot be confidently determined:

> We found your location, but couldn't confidently identify your electricity provider. Please select your provider.

If tariff data is unavailable:

> We don't currently have a verified tariff for this provider. We can still provide a general solar estimate using regional benchmark assumptions.

Never silently use an incorrect/default tariff.

---

# 36. API / Backend Architecture

Recommended:

```text
Next.js Frontend
       ↓
/api/location?pincode=500032
       ↓
Location Service

Next.js Frontend
       ↓
/api/tariffs?pin=500032
       ↓
Tariff Service

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
GET  /api/location?pincode=500032
GET  /api/tariffs?pin=500032
GET  /api/tariffs/:discom
GET  /api/incentives?state=...
POST /api/solar/calculate
POST /api/bill/analyze
```

---

# 37. Calculation Code Organization

Keep pure calculation functions separate from React components.

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

React components consume results; they should not contain business formulas.

---

# 38. Privacy

Electricity bills may contain personal information.

Requirements:

- Do not permanently store bills unless explicitly required.
- Do not expose consumer numbers.
- Do not log raw bill contents.
- Encrypt uploads in transit.
- Delete temporary documents after processing.
- Clearly explain bill-data usage.

---

# 39. UI / Brand Direction

The calculator should feel like a premium Surgetech product:

- Deep Surgetech navy
- Solar orange
- Sustainable green
- Clean white/light surfaces
- Large numeric typography
- Rounded cards
- Subtle gradients
- Premium glass effects used sparingly
- Smooth micro-interactions

Avoid a generic dark tech-startup calculator.

---

# 40. Animation

Use Motion/Framer Motion or equivalent.

Useful interactions:

- Count-up savings
- Animated system-size number
- Solar-generation gauge
- Progress steps
- Smooth result transitions
- Animated payback chart
- Number interpolation when assumptions change

---

# 41. Lead Generation

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

Include calculator outputs with the lead.

---

# 42. Shareable Results

Support:

- PDF estimate
- WhatsApp/share
- Copy result link
- Email estimate

Never expose private bill data in public URLs.

---

# 43. Testing

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
- PIN lookup normalization
- DISCOM mapping
- Tariff resolution

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
Invalid PIN
Unsupported PIN
Multiple possible DISCOMs
```

---

# 44. Calculation Integrity Rules

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

# 45. Future Integrations

Design for:

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

# 46. Example End-to-End User Flow

```text
USER ENTERS PIN
      ↓
500032
      ↓
Detecting location...
      ↓
✓ Hyderabad
✓ Telangana
      ↓
Detecting likely electricity provider...
      ↓
[ Detected DISCOM ▼ ]
      ↓
Is this correct?
[ Yes ] [ Change ]
      ↓
Property:
[ Home ] [ Business ] [ Industry ]
      ↓
Monthly bill:
₹8,000
      ↓
Resolve tariff
      ↓
Estimate consumption
      ↓
Size solar system
      ↓
Estimate generation
      ↓
Model self-consumption/export
      ↓
Calculate post-solar bill
      ↓
Calculate savings/payback
      ↓
Animate results
```

Example result:

```text
YOUR SURGETECH SOLAR PLAN

6.6 kW
Recommended system

₹8,000
Current estimated bill

↓ 82%

₹1,450
Estimated bill with solar

₹78,600
Potential annual savings

4.3 years
Estimated payback
```

---

# 47. Definition of Done

- [ ] Quick calculator works
- [ ] Detailed calculator works
- [ ] PIN input triggers real location lookup
- [ ] Valid PIN returns state/district/city
- [ ] Invalid PIN produces a clear error
- [ ] PIN lookup is debounced
- [ ] PIN results are cached
- [ ] External PIN API is accessed through Next.js backend
- [ ] DISCOM mapping exists
- [ ] Multiple possible DISCOMs can be presented
- [ ] User can override detected DISCOM
- [ ] Consumer category affects tariff selection
- [ ] Versioned tariff data works
- [ ] Tariff lookup connects to location/DISCOM
- [ ] Tariff effective date is validated
- [ ] Changing PIN triggers dependent recalculation
- [ ] Changing DISCOM triggers tariff recalculation
- [ ] Changing consumer category triggers tariff recalculation
- [ ] Missing tariff data produces a transparent fallback
- [ ] No incorrect default tariff is silently applied
- [ ] Calculation confidence reflects data quality
- [ ] Result assumptions identify tariff source
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
- [ ] Results can be shared
- [ ] Lead capture works
- [ ] Privacy requirements are met
- [ ] Unit tests pass
- [ ] Mobile UX is excellent
- [ ] No estimate is presented as a guarantee

---

# 48. Product Principle

Do not build a calculator that only outputs:

> "You can save ₹X."

Build a trustworthy **Surgetech Solar Energy Intelligence Engine** that explains:

> **What you're paying now → how much solar you need → how much energy it can produce → how much you can potentially save → how long the investment may take to pay back → and why the estimate was calculated that way.**

The experience should feel premium, transparent, technically credible, and simple enough for a homeowner to understand in under two minutes.


---

# 49. Automation, Enquiries, Email & Admin System

Surgetech should automate as much of the enquiry and quotation workflow as practical while keeping all customer-facing communication controlled through approved templates.

The calculator is both a **solar calculation engine** and a **lead-generation/enquiry automation system**.

Core flow:

```text
Visitor
   ↓
Calculator
   ↓
Approximate solar result
   ↓
Submit enquiry
   ↓
Store enquiry in SQLite
   ↓
Generate approved email/quote template
   ↓
Send via Nodemailer + Gmail SMTP
   ↓
Record email event
   ↓
Admin can resend / send quote / follow up / reply
```

Every customer-facing price, saving, system size, generation and payback must clearly state that it is an estimate and actual results/prices may vary.

---

# 50. Required Technology

Use:

- Next.js
- React
- TypeScript
- Tailwind CSS
- Prisma 7
- Local SQLite
- NextAuth/Auth.js for admin authentication
- React Hot Toast
- Nodemailer
- Gmail SMTP
- Motion/Framer Motion or equivalent
- Zod for validation
- Server Actions and/or Route Handlers

Keep the data layer modular so SQLite can later migrate to PostgreSQL without rewriting business logic.

---

# 51. Database Architecture

Use Prisma as the application database abstraction.

Suggested structure:

```text
prisma/
  schema.prisma
  migrations/
  seed.ts

data/
  surgetech.db
```

Suggested models:

```text
AdminUser
Enquiry
EnquiryEvent
CalculationSnapshot
Quote
QuoteItem
EmailTemplate
EmailLog
SmtpSettings
SiteSettings
ContactDetail
PincodeLocation
Discom
ElectricityDepartment
Tariff
TariffSlab
SystemSetting
```

Keep repositories/services separate from UI. Do not scatter raw database calls through React components.

---

# 52. Enquiry Model

An enquiry must preserve the customer's calculation at submission time.

Store:

```text
id
name
email
phone
pincode
state
district
city
propertyType
consumerCategory
monthlyBill
monthlyKwh
recommendedSystemKw
estimatedAnnualGenerationKwh
estimatedAnnualSavings
estimatedMonthlySavings
estimatedSystemCost
estimatedIncentive
estimatedNetCost
estimatedPaybackYears
estimatedRoiPercent
calculationConfidence
status
createdAt
updatedAt
```

Statuses:

```text
NEW
CONTACTED
QUOTE_SENT
FOLLOW_UP
CONVERTED
CLOSED
```

Do not depend on today's calculation to reconstruct an old enquiry.

---

# 53. Calculation Snapshot

When an enquiry is submitted, save the exact calculation inputs and assumptions:

```text
calculatorVersion
inputs
location
tariffSnapshot
solarAssumptions
costAssumptions
incentiveAssumptions
results
calculatedAt
```

This ensures an old quote remains explainable even after tariff data changes.

---

# 54. Enquiry Submission

At the end of the calculator:

```text
Want a detailed Surgetech Solar estimate?

Name
[________________]

Phone
[________________]

Email
[________________]

[ SEND MY ESTIMATE ]
```

After submission:

```text
✓ Estimate request received

We've sent an approximate solar estimate
to your email.

A Surgetech team member can review your
requirements and provide a detailed proposal.
```

Use React Hot Toast for success, validation errors, API errors and admin actions. Do not use browser `alert()`.

---

# 55. Mandatory Estimate Disclaimer

Every automated customer email, quote and result must prominently communicate:

> **Important:** The prices, savings, system size, generation and payback shown are approximate estimates based on the information provided and currently available assumptions. Actual project pricing and savings may vary based on site conditions, roof structure, equipment selection, installation requirements, electrical infrastructure, government policies, applicable tariffs, approvals, taxes, financing, net-metering/export rules and other factors. A final quotation requires a detailed assessment by Surgetech Solar.

The disclaimer must appear in:

- Calculator results
- Enquiry confirmation
- Estimate emails
- Quote emails
- Quote/PDF output
- Follow-up messages where relevant
- Admin-generated customer communications

---

# 56. Email Architecture

Use:

```text
Nodemailer
+
Gmail SMTP
```

Architecture:

```text
Enquiry
   ↓
Email Service
   ↓
Approved Template
   ↓
Variable Renderer
   ↓
Nodemailer
   ↓
Gmail SMTP
   ↓
EmailLog
```

All customer emails must originate from approved templates.

---

# 57. SMTP Credentials

SMTP settings may be stored in the database, but **SMTP passwords/app passwords must never be stored as plaintext**.

Use:

```text
Database
   ↓
Encrypted SMTP credentials
   ↓
Server decrypts only when sending
```

Store the encryption key only in an environment variable:

```text
SMTP_CREDENTIAL_ENCRYPTION_KEY
```

Never store that encryption key in SQLite.

Suggested fields:

```text
smtpHost
smtpPort
smtpUser
encryptedSmtpPassword
fromName
fromEmail
secure
enabled
```

Never expose credentials to React, browser bundles, API responses, logs or error messages.

Prefer a Gmail App Password or appropriate SMTP credential rather than a personal Gmail account password.

---

# 58. SMTP Admin Settings

Create:

```text
/admin/smtp
```

Fields:

```text
SMTP Host
smtp.gmail.com

SMTP Port
465 / 587

SMTP Username
hello@surgetechsolar.com

SMTP Password
••••••••••••

From Name
Surgetech Solar

From Email
hello@surgetechsolar.com

[ Test SMTP ]
[ Save Settings ]
```

After saving, never display the password.

---

# 59. Email Templates

Required templates:

```text
ENQUIRY_RECEIVED
ESTIMATE_SENT
QUOTE_SENT
QUOTE_RESENT
FOLLOW_UP
QUOTE_FOLLOW_UP
CUSTOM_REPLY
ADMIN_NOTIFICATION
EMAIL_TEST
```

Variables may include:

```text
{{customerName}}
{{companyName}}
{{recommendedSystemKw}}
{{annualGenerationKwh}}
{{estimatedAnnualSavings}}
{{estimatedMonthlySavings}}
{{estimatedPaybackYears}}
{{estimatedSystemCost}}
{{estimatedIncentive}}
{{estimatedNetCost}}
{{location}}
{{discom}}
{{monthlyBill}}
{{monthlyKwh}}
{{quoteNumber}}
{{calculatorDate}}
{{disclaimer}}
{{contactPhone}}
{{contactEmail}}
{{websiteUrl}}
```

Each template stores subject, HTML body, plain-text body, active state, description and version.

---

# 60. Template Safety

Admin users can edit approved templates, but the system must:

- Validate variables
- Reject unknown variables
- Sanitize HTML
- Generate plain-text fallback
- Preview before sending
- Never evaluate template content as JavaScript

Do not provide unrestricted server-side code execution from email templates.

---

# 61. Automatic Enquiry Email

On enquiry:

```text
Enquiry created
      ↓
Calculation snapshot saved
      ↓
ENQUIRY_RECEIVED template loaded
      ↓
Variables populated
      ↓
Email sent
      ↓
EmailLog created
```

Email should include the thank-you message, approximate system size, approximate savings, approximate payback, location, electricity provider, assumptions, disclaimer, Surgetech contact details and CTA.

---

# 62. Automated Quote

Admin can generate a quote directly from the calculation snapshot.

```text
Enquiry
   ↓
Generate Quote
   ↓
Quote number
   ↓
Quote template
   ↓
Email
   ↓
EmailLog
```

Example:

```text
STS-2026-000123
```

Quote contents:

```text
Customer
Location
System size
Panel assumptions
Inverter assumptions
Battery if applicable
Estimated generation
Estimated savings
Estimated project price
Incentive assumptions
Estimated net price
Payback
Warranty information
Validity
Disclaimer
Contact details
```

Until manually finalized by Surgetech, prices remain estimates.

---

# 63. Admin Enquiry Actions

Each enquiry should have:

```text
[ Send Estimate ]
[ Send Quote ]
[ Send Quote Again ]
[ Follow Up ]
[ Custom Template Reply ]
[ View Calculation ]
[ View Email History ]
[ Change Status ]
```

Use confirmation dialogs before customer-facing sends.

---

# 64. Resend Quote

If a quote was already sent:

```text
Quote sent:
✓ 15 Aug 2026 10:31 AM

[ Send Quote Again ]
```

Before resending:

```text
This will resend the existing quote to:

john@example.com

[ Cancel ]
[ Confirm Resend ]
```

Record the resend as an event.

Resending does not silently create a new quote version.

---

# 65. Automated Follow-Ups

Support configurable follow-ups.

Example:

```text
Enquiry created
      ↓
Immediately: ENQUIRY_RECEIVED
      ↓
After 1 day: FOLLOW_UP
      ↓
After 3 days: QUOTE_FOLLOW_UP
```

Only send if the enquiry is not closed, the customer has not opted out, the same template has not already been sent, and automation is enabled.

---

# 66. Custom Reply — Template Based

Do not provide an unrestricted raw HTML email editor.

Use:

```text
Template:
[ Customer Follow-up ▼ ]

Approved message block:
[____________________________]

[ Preview ]
[ Send ]
```

The custom message is inserted into an approved Surgetech template.

---

# 67. Email Logging

Every email attempt creates an `EmailLog`.

Fields:

```text
id
enquiryId
templateId
recipient
subject
type
status
messageId
error
sentAt
createdAt
```

Statuses:

```text
QUEUED
SENT
FAILED
FAILED_PERMANENTLY
```

Never store SMTP secrets in email logs.

---

# 68. Enquiry Timeline

Each enquiry should show:

```text
15 Aug 10:20
Enquiry created

15 Aug 10:21
Estimate email sent

15 Aug 10:30
Admin viewed enquiry

15 Aug 10:32
Quote generated

15 Aug 10:33
Quote sent

16 Aug 10:00
Follow-up scheduled
```

Use `EnquiryEvent` for:

```text
CREATED
VIEWED
STATUS_CHANGED
CALCULATION_UPDATED
QUOTE_CREATED
QUOTE_SENT
QUOTE_RESENT
EMAIL_SENT
EMAIL_FAILED
FOLLOW_UP_SCHEDULED
FOLLOW_UP_SENT
ADMIN_NOTE
```

---

# 69. Full Admin Panel

Suggested routes:

```text
/admin
/admin/enquiries
/admin/enquiries/[id]
/admin/quotes
/admin/email-templates
/admin/email-logs
/admin/tariffs
/admin/pincodes
/admin/discoms
/admin/electricity-departments
/admin/site-settings
/admin/contact-details
/admin/smtp
/admin/calculator
/admin/settings
/admin/users
```

---

# 70. Admin Dashboard

KPI cards:

```text
New Enquiries
Quotes Sent
Follow-ups Due
Emails Sent
Email Failures
This Month's Enquiries
```

Useful analytics:

- Enquiries by day
- Enquiries by state
- Enquiries by property type
- Quote conversion
- Email failures
- Average estimated system size
- Estimated enquiry value

---

# 71. Enquiry Management

Filters:

```text
Status
Date
State
District
DISCOM
Property type
Consumer category
Quote status
Email status
```

Search:

```text
Name
Email
Phone
PIN
Quote number
```

Sort:

```text
Newest
Oldest
Highest estimated system size
Highest estimated savings
```

---

# 72. Pincode Admin

Create:

```text
/admin/pincodes
```

Features:

- Search PIN
- Lookup PIN
- View location
- View associated DISCOM
- View confidence
- Edit mapping
- Add alternative DISCOM
- Refresh external lookup
- Mark verified
- View source
- View last verified time

---

# 73. Tariff Admin

Create:

```text
/admin/tariffs
```

Features:

- Search by state
- Search by DISCOM
- Search by consumer category
- View current tariff
- Create tariff version
- Edit tariff slabs
- Set effective date
- Expire old tariff
- Add source
- Mark verified
- Compare tariff versions

Never delete historical tariff records.

---

# 74. Electricity Department Directory

Maintain detailed electricity department information for each relevant area/DISCOM:

```text
DISCOM name
Parent organization
State
Districts served
Office names
Office addresses
Phone numbers
Email addresses
Website
Emergency number
Customer care
Billing support
Net-metering contact
Solar/renewable contact
Complaint portal
Working hours
Notes
Source
Last verified
```

This data should be usable in the admin panel and customer communication.

---

# 75. Site-Wide Contact Details

Do not hard-code Surgetech contact details into individual components.

Store:

```text
Company name
Phone
WhatsApp
Email
Sales email
Support email
Address
Office hours
Website
Social links
```

Use the database-driven settings everywhere:

- Header
- Footer
- Contact page
- Calculator
- Quote
- Emails
- PDF
- Enquiry confirmation
- WhatsApp CTA
- Admin

Changing contact details in admin should update the entire site.

---

# 76. `/setup` Initial Admin Setup

Create:

```text
/setup
```

Behavior:

```text
Does an admin account exist?
        │
       NO
        ↓
Show setup page
        ↓
Create first SUPER_ADMIN
        ↓
Redirect to /admin
```

If an admin already exists:

```text
/setup
   ↓
Redirect to /admin/login
```

The setup page must never allow unauthorized creation of additional admins.

Require name, email, strong password and password confirmation.

---

# 77. NextAuth/Auth.js Protection

Protect the admin panel with NextAuth/Auth.js.

Requirements:

- Secure login
- Password hashing
- Protected server routes
- Protected Server Actions
- Session validation
- Logout
- Login rate limiting
- Server-side authorization

Do not rely only on client-side route guards.

---

# 78. Admin Roles

Start with:

```text
SUPER_ADMIN
ADMIN
STAFF
```

SUPER_ADMIN controls everything.

ADMIN controls enquiries, quotes, templates and location/tariff data.

STAFF controls enquiries, quotes and approved customer communication.

---

# 79. Admin Notifications

On new enquiry:

```text
New enquiry
   ↓
Create enquiry
   ↓
Send internal notification
```

Include:

- Customer
- Phone
- Email
- PIN
- Location
- Property type
- Monthly bill
- Estimated system
- Estimated savings
- Admin link

---

# 80. Email Service Structure

Suggested:

```text
src/lib/email/
  mailer.ts
  smtp.ts
  templates.ts
  renderer.ts
  variables.ts
  automation.ts
```

Responsibilities:

```text
Mailer
  ↓
Load SMTP settings
  ↓
Decrypt credentials
  ↓
Load template
  ↓
Validate variables
  ↓
Render HTML + text
  ↓
Send
  ↓
Log result
```

---

# 81. Automation Jobs

Design for scheduled jobs:

```text
processFollowUps
retryFailedEmails
checkPendingQuotes
refreshPincodeData
checkTariffExpiry
```

For the initial SQLite deployment, use a cron-compatible process/deployment scheduler. Do not depend on an in-memory `setInterval()` for reliable automation.

---

# 82. Follow-Up Automation Rules

Store:

```text
AutomationRule

name
trigger
delay
templateId
enabled
maxAttempts
```

Example:

```text
NEW_ENQUIRY
0 days
ENQUIRY_RECEIVED

NEW_ENQUIRY
1 day
FOLLOW_UP

QUOTE_SENT
3 days
QUOTE_FOLLOW_UP
```

Before sending, check enquiry status, previous emails, opt-out, template state and automation state.

---

# 83. Failed Email Retry

If Gmail SMTP fails:

```text
Email attempt
   ↓
FAILED
   ↓
EmailLog
   ↓
Retry queue
```

Suggested:

```text
Attempt 1
↓
5 minutes
↓
Attempt 2
↓
30 minutes
↓
Attempt 3
```

After maximum retries:

```text
FAILED_PERMANENTLY
```

Show the failure clearly in admin.

---

# 84. Customer Communication Preferences

Store:

```text
emailOptIn
marketingOptIn
followUpOptIn
```

Always provide a reasonable way to opt out of marketing/follow-up communication.

---

# 85. Quote Versioning

A quote should contain:

```text
quoteNumber
version
status
createdAt
validUntil
calculationSnapshotId
```

Example:

```text
STS-2026-000123 v1
STS-2026-000123 v2
```

Resending preserves the version.

A recalculation creates a new version.

---

# 86. Admin UX

Build a premium operational dashboard with:

- Sidebar navigation
- Search/command bar
- KPI cards
- Data tables
- Detail drawers
- Timeline
- Toast notifications
- Confirmation dialogs
- Empty states
- Skeleton loading
- Keyboard-friendly actions
- Responsive layout

Use React Hot Toast consistently:

```text
✓ Quote sent successfully
✓ Tariff updated
✓ PIN mapping saved
✓ SMTP test successful
✗ Email failed
```

---

# 87. Security Requirements

Critical:

- Hash admin passwords using a strong password hashing algorithm.
- Encrypt SMTP credentials at rest.
- Keep encryption keys in environment variables.
- Never return SMTP passwords through API responses.
- Never log SMTP passwords.
- Protect every admin Server Action.
- Validate admin input with Zod.
- Sanitize email HTML.
- Rate-limit authentication.
- Rate-limit public enquiry submission.
- Prevent duplicate enquiry submissions.
- Validate uploaded bill file type and size.
- Keep private customer data out of public URLs.
- Audit important admin actions.

---

# 88. Public API Protection

Protect:

```text
/api/location
/api/enquiries
/api/bill/analyze
```

Use:

- Rate limiting
- Input validation
- Request size limits
- Duplicate submission detection
- CAPTCHA/honeypot where appropriate
- IP throttling where appropriate

---

# 89. Database Seed

Seed:

- Site settings
- Contact details
- Initial email templates
- Calculator defaults
- Initial DISCOM records
- Initial electricity department records
- Initial tariff data/examples

Never seed real production SMTP credentials.

---

# 90. First-Run Checklist

```text
1. Run Prisma migrations
2. Run seed
3. Open /setup
4. Create SUPER_ADMIN
5. Login
6. Configure contact details
7. Configure SMTP
8. Test SMTP
9. Configure email templates
10. Verify tariff data
11. Verify DISCOM data
12. Verify electricity department data
13. Enable follow-up automation
```

---

# 91. Operational Automation Goal

Target workflow:

```text
Customer calculates
      ↓
Customer submits enquiry
      ↓
Database stores enquiry
      ↓
Calculation snapshot saved
      ↓
Customer automatically receives estimate
      ↓
Admin automatically notified
      ↓
Quote generated with one click
      ↓
Quote emailed
      ↓
Follow-up scheduled
      ↓
Follow-up sent when appropriate
      ↓
All activity logged
```

The admin should primarily intervene for customer replies, detailed site assessment, final pricing approval, quote customization and sales conversion.

---

# 92. Pricing Language

Never send:

> Your solar system will cost ₹X.

Prefer:

> Estimated system price: approximately ₹X, based on the information provided.

Use:

> Final pricing is subject to site assessment, system design, equipment selection, installation requirements, applicable approvals, taxes, incentives and other project-specific factors.

Likewise:

> Estimated annual savings: approximately ₹X.

Not:

> You will save ₹X every year.

---

# 93. Example Automated Email

Subject:

```text
Your Surgetech Solar Estimate — {{recommendedSystemKw}} kW
```

Body structure:

```text
Hi {{customerName}},

Thank you for exploring solar with Surgetech Solar.

Based on the information you provided, we estimate:

Recommended system:
{{recommendedSystemKw}} kW

Estimated annual generation:
{{annualGenerationKwh}} kWh

Estimated annual savings:
₹{{annualSavings}}

Estimated payback:
{{paybackYears}} years

Location:
{{location}}

Electricity provider:
{{discom}}

IMPORTANT

This is an approximate estimate, not a final quotation.

Actual pricing, generation and savings may vary based on site
conditions, roof structure, equipment selection, electrical work,
tariffs, government policies, approvals, taxes, financing,
net-metering/export rules and other factors.

A detailed assessment is required before final pricing.

Regards,
{{companyName}}

{{contactPhone}}
{{contactEmail}}
{{websiteUrl}}
```

---

# 94. Recommended File Structure

```text
app/
  (public)/
    page.tsx
    calculator/
    contact/
    quote/

  admin/
    page.tsx
    enquiries/
    quotes/
    email-templates/
    email-logs/
    pincodes/
    tariffs/
    discoms/
    electricity-departments/
    contacts/
    smtp/
    settings/
    users/

  setup/
    page.tsx

  api/
    location/
    tariffs/
    enquiries/
    quotes/
    email/
    bill/

components/
  calculator/
  admin/
  emails/
  forms/
  ui/

lib/
  calculations/
  db/
  repositories/
  auth/
  email/
  automation/
  tariffs/
  locations/
  security/
  validation/

prisma/
  schema.prisma
  seed.ts

data/
  surgetech.db
```

---

# 95. Final Automation Definition of Done

- [ ] Prisma 7 configured
- [ ] SQLite configured
- [ ] Database migrations work
- [ ] Seed process exists
- [ ] `/setup` creates the first admin only
- [ ] NextAuth/Auth.js protects admin
- [ ] Admin roles implemented
- [ ] Enquiry database implemented
- [ ] Calculation snapshots implemented
- [ ] Quote model implemented
- [ ] Quote versioning implemented
- [ ] Email templates implemented
- [ ] Template variable validation implemented
- [ ] Nodemailer configured
- [ ] Gmail SMTP configured
- [ ] SMTP credentials encrypted in database
- [ ] SMTP credentials never exposed to client
- [ ] SMTP test action works
- [ ] Enquiry confirmation automation works
- [ ] Automatic estimate email works
- [ ] Quote sending works
- [ ] Quote resend works
- [ ] Follow-up automation works
- [ ] Failed email retry works
- [ ] Email logging works
- [ ] Enquiry timeline works
- [ ] Admin notifications work
- [ ] Pincode admin works
- [ ] Tariff admin works
- [ ] DISCOM admin works
- [ ] Electricity department directory works
- [ ] Site-wide contact details are database-driven
- [ ] Contact details appear consistently throughout the site
- [ ] React Hot Toast used for admin/action feedback
- [ ] All automated customer messages use approved templates
- [ ] Approximate-price disclaimer appears everywhere required
- [ ] Customer communication preferences are stored
- [ ] Public enquiry API is rate-limited
- [ ] Admin actions are audited
- [ ] Sensitive credentials are encrypted
- [ ] No raw SMTP secrets appear in logs
- [ ] No arbitrary code execution from templates
- [ ] Automated workflows are idempotent
- [ ] Old quotes retain their original calculation snapshot
- [ ] Admin can automate most routine enquiry communication
