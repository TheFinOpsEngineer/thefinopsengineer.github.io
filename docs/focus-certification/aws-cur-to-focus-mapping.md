---
sidebar_position: 2
title: AWS CUR vs. FOCUS 1.0
description: A direct column-mapping guide for converting AWS Cost & Usage Reports to the FOCUS Schema.
tags: [AWS, FOCUS, SQL, Engineering]
---

# Mapping AWS CUR to FOCUS 1.0: An Engineer's Guide

## The Problem: The "Tower of Babel"
AWS calls it `lineItem/UnblendedCost`. Azure calls it `PreTaxCost`. Google calls it `Cost`.
As engineers, we can't query this across clouds. **FOCUS** (FinOps Open Cost & Usage Specification) is the standardized schema that solves this.

## The Goal
This guide maps the raw AWS Cost & Usage Report (CUR) fields to their FOCUS v1.0 equivalents. This is the "Normalization" logic required to build a multi-cloud dashboard.

---

## 1. The Identity Columns (Who & Where)

| AWS CUR Column | FOCUS Column | Transformation Logic |
| :--- | :--- | :--- |
| `lineItem/ResourceId` | `ResourceId` | Direct Map (1:1). |
| `product/region` | `Region` | Direct Map. |
| `lineItem/UsageAccountId` | `SubAccountId` | The account where the resource lives. |
| `bill/PayerAccountId` | `BillingAccountId` | The management account paying the bill. |

> **Engineer's Note:** AWS often leaves `ResourceId` null for support charges or taxes. FOCUS requires strict handling of these nulls.

---

## 2. The Money Columns (What we Pay)

This is where it gets dangerous. Using the wrong column ruins your unit economics.

### Billed Cost (The Invoice)
* **AWS:** `lineItem/UnblendedCost`
* **FOCUS:** `BilledCost`
* **Logic:** This is the cash leaving the bank *today*.

### Effective Cost (The True Burn)
* **AWS:** `savingsPlan/SavingsPlanEffectiveCost` (if covered) OR `lineItem/UnblendedCost` (if on-demand).
* **FOCUS:** `EffectiveCost`
* **The Logic:** FOCUS simplifies this logic. If a row is covered by a Savings Plan, `EffectiveCost` includes the amortized portion of the upfront fee.



---

## 3. The SQL Transformation
Here is a pseudo-code SQL snippet to normalize AWS data into FOCUS format:

```sql
SELECT
  lineItem_ResourceId as ResourceId,
  lineItem_UsageStartDate as ChargePeriodStart,
  -- Handle the Cost Logic
  CASE
    WHEN lineItem_LineItemType = 'SavingsPlanCoveredUsage' 
      THEN savingsPlan_SavingsPlanEffectiveCost
    ELSE lineItem_UnblendedCost
  END as EffectiveCost
FROM aws_cur_table