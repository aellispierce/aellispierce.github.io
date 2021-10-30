---
layout: post
title: Vim Tricks
published: false
---

There are so many little vim tricks I learn... and then promptly forget, because
I don't write them down and remember to practice. So that's what this space is
for. Here's some good vim tricks that I use often in my development cycle.

## Delete all comments

When you create a new rails project, there are often a ton of unnecessary
comments in the gemfile. To delete all of those quickly and easily, you can do
`:g/#/d`. This will delete every line that starts with a comment


