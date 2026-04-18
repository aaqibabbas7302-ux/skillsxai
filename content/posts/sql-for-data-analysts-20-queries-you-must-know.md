---
title: "SQL for Data Analysts: 20 Queries You Must Know (2026)"
date: "2026-04-13"
excerpt: "Master the 20 essential SQL queries every data analyst uses daily. From basic SELECT statements to advanced window functions, CTEs, and analytical queries with practical examples."
tags: ["SQL", "Data Analytics", "Career", "Tutorial"]
---

# SQL for Data Analysts: 20 Queries You Must Know (2026)

SQL is the single most important skill for any data analyst. Whether you're pulling data for reports, building dashboards, or running ad-hoc analysis, you'll use SQL every day.

This guide covers the 20 queries you'll use most frequently, organized from basic to advanced. Each query includes a practical example you'd encounter in a real job.

## Basic Queries (1-5)

### 1. SELECT with Filtering

```sql
SELECT customer_name, email, total_orders
FROM customers
WHERE signup_date >= '2026-01-01'
  AND total_orders > 5
ORDER BY total_orders DESC;
```

**When you use it:** "Get me a list of our most active new customers from this year."

### 2. Aggregate Functions

```sql
SELECT 
  product_category,
  COUNT(*) as total_orders,
  SUM(revenue) as total_revenue,
  AVG(order_value) as avg_order_value,
  ROUND(AVG(order_value), 2) as avg_rounded
FROM orders
WHERE order_date BETWEEN '2026-01-01' AND '2026-03-31'
GROUP BY product_category
ORDER BY total_revenue DESC;
```

**When you use it:** "What's our revenue breakdown by category for Q1?"

### 3. JOIN Operations

```sql
SELECT 
  c.customer_name,
  COUNT(o.order_id) as order_count,
  SUM(o.total_amount) as lifetime_value
FROM customers c
LEFT JOIN orders o ON c.customer_id = o.customer_id
GROUP BY c.customer_name
ORDER BY lifetime_value DESC
LIMIT 20;
```

**When you use it:** "Who are our top 20 customers by lifetime value?"

### 4. Subqueries

```sql
SELECT product_name, price
FROM products
WHERE price > (
  SELECT AVG(price) FROM products
);
```

**When you use it:** "Which products are priced above our average?"

### 5. HAVING Clause

```sql
SELECT department, AVG(salary) as avg_salary
FROM employees
GROUP BY department
HAVING AVG(salary) > 800000;
```

**When you use it:** "Which departments have an average salary above 8 LPA?"

## Intermediate Queries (6-12)

### 6. CASE Statements

```sql
SELECT 
  customer_name,
  total_orders,
  CASE 
    WHEN total_orders >= 50 THEN 'Platinum'
    WHEN total_orders >= 20 THEN 'Gold'
    WHEN total_orders >= 5 THEN 'Silver'
    ELSE 'Bronze'
  END as customer_tier
FROM customers;
```

**When you use it:** "Segment customers into tiers based on order count."

### 7. Common Table Expressions (CTEs)

```sql
WITH monthly_revenue AS (
  SELECT 
    DATE_TRUNC('month', order_date) as month,
    SUM(total_amount) as revenue
  FROM orders
  GROUP BY DATE_TRUNC('month', order_date)
)
SELECT 
  month,
  revenue,
  LAG(revenue) OVER (ORDER BY month) as prev_month,
  ROUND((revenue - LAG(revenue) OVER (ORDER BY month)) / 
    LAG(revenue) OVER (ORDER BY month) * 100, 1) as growth_pct
FROM monthly_revenue
ORDER BY month;
```

**When you use it:** "Show me month-over-month revenue growth."

### 8. Window Functions — RANK

```sql
SELECT 
  salesperson,
  region,
  total_sales,
  RANK() OVER (PARTITION BY region ORDER BY total_sales DESC) as rank_in_region
FROM sales_summary;
```

**When you use it:** "Rank salespeople within each region."

### 9. Window Functions — Running Total

```sql
SELECT 
  order_date,
  daily_revenue,
  SUM(daily_revenue) OVER (ORDER BY order_date) as running_total
FROM daily_sales;
```

**When you use it:** "Show cumulative revenue over time."

### 10. Date Functions

```sql
SELECT 
  DATE_TRUNC('week', signup_date) as week,
  COUNT(*) as new_signups
FROM users
WHERE signup_date >= CURRENT_DATE - INTERVAL '90 days'
GROUP BY DATE_TRUNC('week', signup_date)
ORDER BY week;
```

**When you use it:** "Show weekly signups for the last 90 days."

### 11. COALESCE for Null Handling

```sql
SELECT 
  customer_name,
  COALESCE(phone, email, 'No contact') as primary_contact
FROM customers;
```

**When you use it:** "Get the best available contact method for each customer."

### 12. EXISTS for Efficient Filtering

```sql
SELECT customer_name
FROM customers c
WHERE EXISTS (
  SELECT 1 FROM orders o
  WHERE o.customer_id = c.customer_id
    AND o.order_date >= '2026-01-01'
);
```

**When you use it:** "Find customers who placed at least one order this year."

## Advanced Queries (13-20)

### 13. Cohort Analysis

```sql
WITH cohort AS (
  SELECT 
    customer_id,
    DATE_TRUNC('month', MIN(order_date)) as cohort_month
  FROM orders
  GROUP BY customer_id
),
activity AS (
  SELECT 
    c.cohort_month,
    DATE_TRUNC('month', o.order_date) as activity_month,
    COUNT(DISTINCT o.customer_id) as active_customers
  FROM orders o
  JOIN cohort c ON o.customer_id = c.customer_id
  GROUP BY c.cohort_month, DATE_TRUNC('month', o.order_date)
)
SELECT 
  cohort_month,
  activity_month,
  active_customers
FROM activity
ORDER BY cohort_month, activity_month;
```

**When you use it:** "Build a retention cohort — how many customers from each month are still active?"

### 14. Funnel Analysis

```sql
SELECT 
  COUNT(DISTINCT CASE WHEN event = 'page_view' THEN user_id END) as viewed,
  COUNT(DISTINCT CASE WHEN event = 'add_to_cart' THEN user_id END) as added_to_cart,
  COUNT(DISTINCT CASE WHEN event = 'checkout' THEN user_id END) as checked_out,
  COUNT(DISTINCT CASE WHEN event = 'purchase' THEN user_id END) as purchased
FROM user_events
WHERE event_date = CURRENT_DATE;
```

**When you use it:** "What's our conversion funnel looking like today?"

### 15. Year-over-Year Comparison

```sql
WITH current_year AS (
  SELECT DATE_TRUNC('month', order_date) as month, SUM(revenue) as revenue
  FROM orders WHERE EXTRACT(YEAR FROM order_date) = 2026
  GROUP BY DATE_TRUNC('month', order_date)
),
previous_year AS (
  SELECT DATE_TRUNC('month', order_date) as month, SUM(revenue) as revenue
  FROM orders WHERE EXTRACT(YEAR FROM order_date) = 2025
  GROUP BY DATE_TRUNC('month', order_date)
)
SELECT 
  EXTRACT(MONTH FROM cy.month) as month_num,
  cy.revenue as revenue_2026,
  py.revenue as revenue_2025,
  ROUND((cy.revenue - py.revenue) / py.revenue * 100, 1) as yoy_growth
FROM current_year cy
JOIN previous_year py ON EXTRACT(MONTH FROM cy.month) = EXTRACT(MONTH FROM py.month);
```

**When you use it:** "Compare our monthly performance to last year."

### 16. Percentile Calculation

```sql
SELECT 
  PERCENTILE_CONT(0.50) WITHIN GROUP (ORDER BY order_value) as median_order,
  PERCENTILE_CONT(0.90) WITHIN GROUP (ORDER BY order_value) as p90_order,
  PERCENTILE_CONT(0.95) WITHIN GROUP (ORDER BY order_value) as p95_order
FROM orders;
```

**When you use it:** "What are the median and P90 order values?"

### 17. Self-Join for Comparison

```sql
SELECT 
  e.employee_name,
  e.salary,
  m.employee_name as manager_name,
  m.salary as manager_salary
FROM employees e
JOIN employees m ON e.manager_id = m.employee_id
WHERE e.salary > m.salary;
```

**When you use it:** "Find employees who earn more than their managers."

### 18. Pivot with CASE

```sql
SELECT 
  product_name,
  SUM(CASE WHEN EXTRACT(MONTH FROM sale_date) = 1 THEN quantity ELSE 0 END) as jan,
  SUM(CASE WHEN EXTRACT(MONTH FROM sale_date) = 2 THEN quantity ELSE 0 END) as feb,
  SUM(CASE WHEN EXTRACT(MONTH FROM sale_date) = 3 THEN quantity ELSE 0 END) as mar
FROM sales
WHERE EXTRACT(YEAR FROM sale_date) = 2026
GROUP BY product_name;
```

**When you use it:** "Create a monthly sales matrix by product."

### 19. Recursive CTE (Org Chart)

```sql
WITH RECURSIVE org_chart AS (
  SELECT employee_id, employee_name, manager_id, 1 as level
  FROM employees WHERE manager_id IS NULL
  UNION ALL
  SELECT e.employee_id, e.employee_name, e.manager_id, oc.level + 1
  FROM employees e
  JOIN org_chart oc ON e.manager_id = oc.employee_id
)
SELECT * FROM org_chart ORDER BY level, employee_name;
```

**When you use it:** "Build a hierarchical org chart from the employees table."

### 20. Moving Average

```sql
SELECT 
  order_date,
  daily_revenue,
  AVG(daily_revenue) OVER (
    ORDER BY order_date 
    ROWS BETWEEN 6 PRECEDING AND CURRENT ROW
  ) as seven_day_avg
FROM daily_sales;
```

**When you use it:** "Show the 7-day moving average of daily revenue."

## Practice These Queries

The best way to learn SQL is by practicing. Use these platforms:

- **LeetCode SQL** — great for interview prep
- **HackerRank SQL** — beginner-friendly problems
- **Mode Analytics SQL Tutorial** — real datasets
- **SQLBolt** — interactive lessons

## Level Up with a Structured Course

If you want to master SQL alongside Python, Power BI, and the complete data analyst toolkit, check out our [Data Analyst Course](/professionals/courses/data-analyst). The 10-week program includes real-world SQL projects, dashboard building, and 100% placement assistance.

---

*Bookmark this page — you'll refer back to these queries throughout your data career!*
