---
title: "Data Analyst Interview Questions and Answers (2026 Edition)"
date: "2026-04-11"
excerpt: "Prepare for your data analyst interview with these 25 frequently asked questions covering SQL, Python, statistics, Power BI, and behavioral scenarios. Includes detailed answers and tips."
tags: ["Data Analytics", "Career", "SQL", "Python", "Interview"]
---

# Data Analyst Interview Questions and Answers (2026 Edition)

Cracking a data analyst interview requires preparation across multiple areas — SQL, Python, statistics, business acumen, and communication skills. This guide covers the 25 most commonly asked questions with detailed answers.

## SQL Questions

### 1. What is the difference between WHERE and HAVING?

**Answer:** `WHERE` filters rows before grouping (works on individual rows). `HAVING` filters groups after `GROUP BY` (works on aggregated results).

```sql
-- WHERE: filter individual rows
SELECT * FROM orders WHERE amount > 1000;

-- HAVING: filter groups
SELECT department, AVG(salary)
FROM employees
GROUP BY department
HAVING AVG(salary) > 800000;
```

### 2. Explain different types of JOINs

**Answer:**
- **INNER JOIN**: Returns only matching rows from both tables
- **LEFT JOIN**: Returns all rows from the left table + matching rows from the right
- **RIGHT JOIN**: Returns all rows from the right table + matching rows from the left
- **FULL OUTER JOIN**: Returns all rows from both tables, with NULLs where there's no match
- **CROSS JOIN**: Returns the Cartesian product (every row paired with every row)

### 3. What are window functions? Give an example.

**Answer:** Window functions perform calculations across a set of rows related to the current row, without collapsing the result set like GROUP BY does.

```sql
SELECT 
  employee_name,
  department,
  salary,
  RANK() OVER (PARTITION BY department ORDER BY salary DESC) as dept_rank,
  AVG(salary) OVER (PARTITION BY department) as dept_avg
FROM employees;
```

### 4. How do you find duplicate records?

```sql
SELECT email, COUNT(*) as count
FROM customers
GROUP BY email
HAVING COUNT(*) > 1;
```

### 5. Write a query to find the second-highest salary.

```sql
SELECT MAX(salary) as second_highest
FROM employees
WHERE salary < (SELECT MAX(salary) FROM employees);

-- Or using window functions:
SELECT salary FROM (
  SELECT salary, DENSE_RANK() OVER (ORDER BY salary DESC) as rk
  FROM employees
) ranked
WHERE rk = 2;
```

## Python Questions

### 6. How do you handle missing values in Pandas?

**Answer:**
```python
import pandas as pd

# Check for missing values
df.isnull().sum()

# Drop rows with any missing values
df.dropna()

# Fill missing values
df['column'].fillna(df['column'].mean(), inplace=True)
df['column'].fillna(method='ffill')  # Forward fill
df['column'].fillna(0)  # Fill with specific value
```

### 7. What is the difference between loc and iloc?

**Answer:**
- `loc`: Label-based indexing (uses column names and row labels)
- `iloc`: Integer-based indexing (uses position numbers)

```python
df.loc[0:5, 'name']      # rows 0-5, column 'name'
df.iloc[0:5, 0]           # rows 0-5, first column
```

### 8. How do you merge DataFrames?

```python
# Like SQL JOINs
merged = pd.merge(orders_df, customers_df, on='customer_id', how='left')

# Concatenation (stacking)
combined = pd.concat([df1, df2], axis=0)
```

## Statistics Questions

### 9. Explain the difference between mean, median, and mode.

**Answer:**
- **Mean**: Average of all values. Sensitive to outliers.
- **Median**: Middle value when sorted. Robust to outliers.
- **Mode**: Most frequently occurring value.

Use median when data has outliers (salary data), mean when data is normally distributed.

### 10. What is a p-value?

**Answer:** The probability of observing results at least as extreme as the actual results, assuming the null hypothesis is true. If p-value < 0.05 (typically), we reject the null hypothesis and conclude the result is statistically significant.

### 11. Explain A/B testing.

**Answer:** A/B testing compares two versions of something (webpage, email, feature) to determine which performs better:

1. **Hypothesis**: "Changing the CTA button color from blue to green will increase click-through rate"
2. **Split traffic**: 50% sees version A (blue), 50% sees version B (green)
3. **Collect data**: Track clicks for a sufficient sample size
4. **Statistical test**: Use a chi-square test or t-test to check if the difference is significant
5. **Decision**: If p-value < 0.05, implement the winning version

### 12. What is correlation vs. causation?

**Answer:** Correlation means two variables move together (positive or negative). Causation means one variable directly causes the other to change. Correlation does not imply causation. Example: Ice cream sales and drowning incidents are correlated (both increase in summer), but ice cream doesn't cause drowning.

## Power BI / Visualization Questions

### 13. What is DAX in Power BI?

**Answer:** DAX (Data Analysis Expressions) is Power BI's formula language for creating calculated columns, measures, and tables. Key functions:

```
Total Sales = SUM(Sales[Amount])
YoY Growth = DIVIDE([This Year Sales] - [Last Year Sales], [Last Year Sales])
Running Total = CALCULATE(SUM(Sales[Amount]), FILTER(ALL(Calendar), Calendar[Date] <= MAX(Calendar[Date])))
```

### 14. When would you use a bar chart vs. a line chart?

**Answer:**
- **Bar chart**: Comparing categories (sales by region, products by revenue)
- **Line chart**: Showing trends over time (monthly revenue, daily active users)
- **Pie chart**: Showing parts of a whole (market share) — use sparingly
- **Scatter plot**: Showing relationships between two variables

## Behavioral Questions

### 15. Tell me about a time you found an insight that surprised stakeholders.

**Tip:** Use the STAR method (Situation, Task, Action, Result). Focus on the business impact of your finding, not just the technical process.

### 16. How do you handle conflicting data from different sources?

**Answer:** First, identify the source of truth. Cross-reference with raw data or the system of record. Document discrepancies and their causes (timing differences, calculation methods, data transformation errors). Present findings with caveats to stakeholders.

## Tips for Interview Day

1. **Practice SQL on paper** — many interviews require whiteboard SQL
2. **Explain your thought process** — interviewers want to see how you think
3. **Ask clarifying questions** — "What metric defines success?" shows analytical thinking
4. **Bring your portfolio** — walk through real projects you've built
5. **Know the company** — research what data they have and what insights they might need

## Prepare with Expert Guidance

Our [Data Analyst Course](/professionals/courses/data-analyst) includes 5+ mock interviews that simulate real company interview rounds. You'll practice SQL live, walk through case studies, and get structured feedback. Plus, our placement team provides direct referrals to hiring partners.

---

*Good luck with your interview preparation! Bookmark this page and review before your next interview.*
