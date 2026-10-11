---
title: Knowledge Transfer with AI
description: Thoughts on shared understanding between humans and AI
pubDate: 2026-10-11
draft: false
---
## **Introduction**

I use AI every single day. It is now a crucial tool that I rely on to do my job. For context, my primary job at the moment is to conduct ML research in the aviation domain, and on a day-to-day basis I create and run experiments to improve a small set of models used in our team’s products. I also do a good amount of regular software engineering work, implementing new features into our products across the stack, mostly to serve the aforementioned models to customers in newer and better ways.

The biggest bottleneck in my workflow is a lack of knowledge transfer between my agents and me.

## **What is knowledge transfer here?**

A typical day for me involves thinking of some new experiment to run, deciding what features need to be implemented for that experiment to work, asking Claude to implement those features and conduct the experiment, and then looking at the results to decide what the next experiment should be.

There is a trap in this workflow: if I give Claude vague instructions, and it goes out and implements a new experiment that I don’t really understand, I won’t be able to interpret the results correctly and the next steps are likely to be wrong. The same kind of phenomenon occurs with regular old software engineering - I have to implement some new feature into our backend, I ask Claude to do it with vague instructions, and then something breaks and I don’t know how to fix it because I don’t know what’s going on.

Of course, there’s some useful level of abstraction when using AI - if I had to understand why every single line of code was written, there wouldn’t really be a point to using AI in the first place. AI accelerates my workflow under very specific conditions:

1. AI must be able to take a simple imperative (“go build this”) and figure out the lower level details to write the actual code.
2. AI must be able to explain the code it has written in a way that I can update my mental models and figure out how the next thing should be built.

Currently, frontier models are very good at satisfying requirement 1 - given some command like “++[go solve Navier-Stokes](https://openai.com/index/navier-stokes-solution/)++,” agents can perform an enormous amount of cognitive work to arrive at a solution. Frontier models are still shockingly bad at requirement 2! Ask Claude to give you an explanation of a vibecoded PR you didn’t work on, and the explanation is likely to be completely indigestible, even if you are intimately familiar with the codebase.

This second requirement is what I am calling **knowledge transfer**, the ability of the AI to induce in the user a useful mental model of what’s going on. I am not going to make any claims about the AI having this knowledge itself, but this task is comparable to the old-school routine of explaining code changes to collaborators through documentation and code review.

## **Is AI really that bad at this?**

Perhaps this is a skill issue on my part, but I find it very difficult to truly understand Claude when I ask it to explain a set of changes it made. Sometimes, agents will spit out explanations that make me feel like I understand what is happening, but by trying to continue the work it becomes clear that I never really understood anything in the first place. Humans are pretty bad at evaluating their own level of understanding of a concept (conversely, it’s quite easy to convince a human that they have understood something without actually having to explain it to them in detail!). This phenomenon has been studied in cognitive science as the ++[illusion of explanatory depth](https://doi.org/10.1207/s15516709cog2605_1)++, and more recently in the context of AI-assisted research as ++[illusions of understanding](https://doi.org/10.1038/s41586-024-07146-0)++.

With all of the recent advances in capabilities from frontier models, it is surprising that the models are still this bad at knowledge transfer. It is difficult to create a verifiable reward for this task, so scaling up post-training on “explanation quality” is probably still very difficult.

## **Who cares?**

One natural response to this problem is: who cares? Assuming that AI capabilities continue to progress at an exponential rate, human understanding will become less and less important to cognitive work. One could argue that it does not matter whether or not the engineer understands their code as long as it works.

	This certainly seems plausible to me, but I’m skeptical that this will happen in the immediate future. For example, I believe that AI is already superhuman (or at least super-Archan) at coding, but it is still necessary for me to understand codebases to do my job, if only so I can tell the AI to do the right thing. Until corporations are entirely controlled and operated by AI, there will always be some need to interface clearly between humans and AI agents, and the effectiveness of this interface is constrained by the level of shared understanding between humans and AIs.

## **How do I solve this?**

One successful strategy that I have found is to have agents generate quizzes for me to complete for every PR. The quiz should test my understanding of what changes were made, why the changes were made, and what the impacts of those changes will be on the rest of a system as well as future feature development.

![image.png](/images/blog/image-2.png)

*Example quiz question on the Flask codebase. Note how the question is jargon-heavy and phrased strangely - models have room to improve on knowledge-tracing!*

Usually, I completely flunk the first round of this quiz. The next step of the process is to hand my quiz results back to an agent, and have it generate explanations for what was done that specifically patch the gaps in my understanding exposed by the quiz. After generating more explanations, the agent generates a new quiz, and the process iterates until the agent is satisfied with my level of understanding.

![image.png](/images/blog/image-3.png)

This approach has parallels with research on ++[knowledge tracing](https://doi.org/10.1007/BF01099821)++, which models what a learner knows based on their responses, and ++[test-enhanced learning](https://doi.org/10.1111/j.1467-9280.2006.01693.x)++, which studies how testing itself can improve retention.

This process is not without its flaws. For one, the explanations generated by the agent in earlier rounds are oftentimes extremely difficult to understand and focus on irrelevant details rather than the parts that actually matter for an active contributor. Secondly, the quiz questions are oftentimes useless in evaluating one’s understanding of a code change. Something like:

> *How many parameters does encode_outputs() accept?*

is not really relevant to the broader structure of the change, but something like:

> *Does encode_outputs() require X piece of data as an input?*

would be more useful to understand for an active contributor.

Still, with all of these flaws, this workflow has drastically improved my understanding of vibe-coded codebases, and has consequently improved the quality of my contributions and experiments. There is a lot of work to do on creating a set of best practices for this new era of engineering, and this workflow is my primitive effort in that direction.