---
title: On open source models
description: Musings on where the world could go with open source AI
pubDate: 2026-07-20
draft: true
tags:
  - AI
---
I like open source LLMs. Much of my job involves working with them. In my free time I occasionally like to spin up some new, interesting small model that can fit on a consumer GPU. My total token consumption as an engineer is still almost entirely Claude, through Claude Code, but all things equal I would use an open source model over an equivalently powerful closed-source model. The recent news about [Kimi K3](https://platform.kimi.ai/docs/guide/kimi-k3-quickstart) and [Qwen3.8](https://x.com/Alibaba_Qwen/status/2078759124914098291) has generated some timely buzz around open source AI. Some protest the trend as a Chinese ploy to destroy America, while others claim open source AI is the only way to avoid a dystopian dictatorship run by frontier labs. The truth is probably more complex.

For clarity, what most people call open source LLMs are really open weight LLMs - the training code used to create those models is usually still proprietary to the creators (with some [exceptions](https://allenai.org/olmo)). We'll just call these open source models because that's what people say, and I don't feel like engaging in [prescriptivism](https://en.wikipedia.org/wiki/Linguistic_prescription) today.

## Why are open source models attractive?

People (including myself) like open source software for lots of different [reasons](https://en.wikipedia.org/wiki/Linus%27s_law), but it's not clear which of these benefits carry over to open source LLMs. For one, there is really no worldwide collaboration involved in the creation of these models; you or I could write pull requests for the Linux kernel, but there's no way for us to contribute to the creation of the next Kimi model. Thus, there's no reason to believe that the open source approach should produce models any better than the closed source labs do. 

One benefit of open source software that could transfer to LLM world is the crowdsourcing of security. External AI safety and security researchers can perform research on open source LLMs that you can't really do on closed source models, unless you work at Anthropic/OpenAI/Google (ex: [snooping on internal activations to read an LLMs mind](https://www.anthropic.com/research/global-workspace)). Open source models could let the world conduct orders of magnitude more safety research, as they allow millions of people to put their hands on a model rather than, say, a couple hundred at Anthropic.

### Economics

A related upside to open source LLMs is that they open the door to self-hosting intelligence. A self-hosted LLM has no access limits, or [silent reroutes to weaker models](https://www.anthropic.com/news/redeploying-fable-5) in the name of safety. It just works. In practice, this doesn't come into play for near-frontier models, as it takes hundreds of thousands of dollars to buy the GPUs required to run a model like Kimi K3. Because of the economies of scale related to batch inference, it's pretty much always a better idea to pay an inference provider for your GLM-5.2/Kimi-K3/Deepseek-V4 tokens than to try to host it yourself.

Even with an inference provider as a middleman, the open source models remain more attractive. If Anthropic decided to serve me a slow and inaccurate version of Opus 4.8 tomorrow, I would have no way of definitively knowing, and more importantly no way to disable it. On the other hand, if a third-party inference provider served me a nerfed version of Kimi-K3, it would be immediately apparent just by running the same queries against a different provider.

Here is where the real attraction to open source models lies, personally. The inference providers are locked in perfect competition with each other, offering identical products (tokens from the same model) on a unified market (OpenRouter). This competition means that they are forced to behave in a way that OpenAI or Anthropic never is. Raise your token costs, and requests are immediately routed to another provider. Serve a quantized checkpoint, and any competitor can immediately call you out on it by comparing to their own outputs. An open source model gives the consumer a relative guarantee that they aren't getting screwed over, while a closed source model gives the consumer a relative guarantee that they are.

## Why train an open source model?



&nbsp;