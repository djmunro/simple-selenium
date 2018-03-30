---
title: "Writing Good Gherkin"
date: "2018-03-27"
---

https://automationpanda.com/2017/01/30/bdd-101-writing-good-gherkin/

# Why to use Gherkin

# How to use Gherkin
- The Golden Rule
- Mindset

# Bad Gherkin Test

# Good Gherkin Test

# Less is More
Scenarios should be short and sweet.

# Guidelines for writing steps
- Write all steps in third-person point of view
- Write steps as a subject-predicate action phrase

# Style and Structure
1. Focus a feature on customer needs.
2. Limit one feature per feature file. This makes it easy to find features.
3. Limit the number of scenarios per feature. Nobody wants a thousand-line feature file. A good measure is a dozen scenarios per feature.
4. Limit the number of steps per scenario to less than ten.
5. Limit the character length of each step. Common limits are 80-120 characters.
6. Use proper spelling.
7. Use proper grammar.
8. Capitalize Gherkin keywords.
9. Capitalize the first word in titles.
10. Do not capitalize words in the step phrases unless they are proper nouns.
11. Do not use punctuation (specifically periods and commas) at the end of step phrases.
12. Use single spaces between words.
13. Indent the content beneath every section header.
14. Separate features and scenarios by two blank lines.
15. Separate examples tables by 1 blank line.
16. Do not separate steps within a scenario by blank lines.
17. Space table delimiter pipes (“|”) evenly.
18. Adopt a standard set of tag names. Avoid duplicates.
19. Write all tag names in lowercase, and use hyphens (“-“) to separate words.
20. Limit the length of tag names.
21. Variables in quotes

```bash
# BAD EXAMPLE! Do not copy.

 Feature: Google Searching
     @AUTOMATE @Automated @automation @Sprint32GoogleSearchFeature
 Scenario outline: GOOGLE STUFF
Given a Web Browser is on the Google page,
 when The seach phrase "<phrase>" Enter,

 Then  "<phrase>" shown.
and The relatedd   results include "<related>".
Examples: animals
 | phrase | related |
| panda | Panda Express        |
| elephant    | elephant Man  |
```