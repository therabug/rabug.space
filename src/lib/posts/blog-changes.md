---
title: 'F**k Render'
date: 2024-09-29T11:07:39+03:00
description: "Render's sleep policy sucks."
published: true
thumbnail: '/posts/supabase (1) (1).png'
tags: ['deprecated-lol']
---

Hello! Today, I want to share some updates about my site, the frustrations I encountered, and my current experience with Supabase after abandoning my old setup.

Initially, my site was using a traditional frontend-backend structure. My frontend would send requests to my backend, which in turn, would fetch data from my MongoDB Atlas database and return it to the frontend. Everything was working smoothly, and the system was stable—no unnecessary resource usage, no issues. But, here comes the big **BUT**.

I was using Render for hosting my backend, and while it worked fine initially, I quickly ran into a major problem: Render's sleep policy. After just 30 minutes of inactivity (edit from the future that was 15 minutes lol), Render would put my backend to sleep. This wasn’t a minor inconvenience, it was a complete blocker. Every time my backend went to sleep, the next request would take ages to load because the server needed to "wake up." If it was just once a day or once a week, that might be tolerable, but waking up after just 30 minutes of inactivity? That caused serious delays in loading my site and, in many cases, made it impossible for me to even access my own blog.

At first, I thought I could solve this by simply migrating everything to Vercel. But, after trying to get my backend to run on Vercel, it just didn’t work. It felt like I was chasing a solution that was never going to happen. So I experimented with Sanity, but it didn’t feel right either—it was overcomplicated for my needs.

After these frustrating experiences, I finally decided to switch to Supabase, and honestly, it’s been a game-changer. Now, everything related to my blog, from content storage to authentication, is managed by Supabase. No more complicated backend setups or MongoDB issues. My frontend directly interacts with Supabase, which has simplified the entire workflow and greatly improved performance.

It was funny, actually—after building my previous system, I went to bed thinking everything was running smoothly, only to wake up and find that nothing worked anymore. That was the last straw, and the tipping point that made me reconsider my entire stack.

Now, my site is much faster and more reliable thanks to Supabase. No more worrying about backends going to sleep or services randomly failing overnight.

Now, let's talk about Render’s sleep policy. The idea of putting inactive servers to sleep makes sense from a resource-saving perspective. But in practice, it’s deeply frustrating, especially for free-tier users like me. A 30-minute inactivity window is just too short. For a small website or a personal blog, having your server constantly going to sleep means that your first visitors after each sleep period will experience long load times. In today’s internet culture, even a few seconds of delay can make users leave your site, and in my case, it was minutes. This wasn’t just a minor inconvenience—it was completely disrupting the user experience and my ability to maintain my site.

While I appreciate the fact that services like Render offer free tiers for developers, this sleep policy creates a significant obstacle for anyone trying to run a small project without paying for higher-tier services. In the end, Render’s policy pushed me away from their platform entirely.

In the end, moving to Supabase has not only simplified my workflow but also improved the overall performance of my site. It's faster, more reliable, and I no longer have to worry about random outages or frustrating sleep policies. If you’re running into similar issues with free-tier services, I highly recommend considering alternatives like Supabase.

and a

### Markdown support yay
