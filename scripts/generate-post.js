const fs = require('fs');
const path = require('path');

const titles = [
  "How AI Agents Are Transforming Student Workflows",
  "The Top 5 Skills You Need for the AI Era",
  "Understanding Workflow Automation in 2026",
  "Why Every Student Needs an AI Assistant"
];

const template = (title) => `---
title: "${title}"
date: "${new Date().toISOString().split('T')[0]}"
excerpt: "Discover how ${title.toLowerCase()} can change the way you learn and work."
tags: ["AI", "Education", "Automation"]
---

# ${title}

Artificial Intelligence is rapidly changing the landscape of education and professional work. In this article, we explore **${title}** and what it means for students today.

## Why This Matters

As technology evolves, the ability to leverage AI agents becomes a crucial skill. It's not just about coding; it's about understanding systems and workflows.

## Key Takeaways

1. **Efficiency**: Automate repetitive tasks.
2. **Creativity**: Free up time for complex problem solving.
3. **Future-Proofing**: Stay ahead of the curve.

Check back soon for more in-depth tutorials on SkillsXAI!
`;

const postsDir = path.join(__dirname, '../content/posts');

if (!fs.existsSync(postsDir)) {
  fs.mkdirSync(postsDir, { recursive: true });
}

// Generate a random post
const title = titles[Math.floor(Math.random() * titles.length)];
const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
const filePath = path.join(postsDir, `${slug}.md`);

fs.writeFileSync(filePath, template(title));

console.log(`✅ Generated blog post: ${slug}`);
console.log(`📂 Location: ${filePath}`);
