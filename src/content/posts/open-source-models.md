---
title: On open source models
description: Musings on where the world could go with open source AI
pubDate: 2026-07-24
draft: false
tags:
  - AI
---
I like open source LLMs. Much of my job involves working with them. In my free time I occasionally like to spin up some new, interesting small model that can fit on a consumer GPU. My total token consumption as an engineer is still almost entirely Claude, through Claude Code, but all things equal I would use an open source model over an equivalently powerful closed-source model. 

The recent news about [Kimi K3](https://platform.kimi.ai/docs/guide/kimi-k3-quickstart) and [Qwen3.8](https://x.com/Alibaba_Qwen/status/2078759124914098291) has generated some timely buzz around open source AI. Several prominent companies (Nvidia, Microsoft, Meta, etc) just signed an open [letter](https://images.nvidia.com/pdf/Open-Weights-and-American-AI-Leadership.pdf) positing that open-weight LLMs are the key to American dominance in AI.

For clarity, what most people call open source LLMs are really open weight LLMs - the training code used to create those models is usually still proprietary to the creators (with some [exceptions](https://allenai.org/olmo)). We'll just call these open source models because that's what people say, and I don't feel like engaging in [prescriptivism](https://en.wikipedia.org/wiki/Linguistic_prescription) today.

## Why are open source models attractive?

People (including myself) like open source software for lots of different [reasons](https://www.hbs.edu/ris/Publication%20Files/24-038_51f8444f-502c-4139-8bf2-56eb4b65c58a.pdf), but it's not clear which of these benefits carry over to open source LLMs. For one, it is hard/impossible for engineers external to the company to contribute to training an LLM; you or I could write pull requests for the Linux kernel, but there's no way for us to contribute to the training code of the next Kimi model. Thus, there's no reason to believe that the open source approach should produce models any better than the closed source labs do. 

Open source software oftentimes makes it easier for third-parties to build complementary products on top of the original software, creating a stack. Docker is made possible by leveraging the open source Linux kernel, and both Linux and Docker benefit from this interaction. The same is almost definitely true in LLM world. Applications built on self-hosted, open-weight LLMs boost the value of the entire AI ecosystem. Applications that rely on local or on-premises AI necessitate open-weight LLMs.

Another benefit of open source software that could transfer to LLM world is the crowdsourcing of security. External AI safety and security researchers can perform research on open source LLMs that you can't really do on closed source models, unless you work at Anthropic/OpenAI/Google (ex: [snooping on internal activations to read an LLMs mind](https://www.anthropic.com/research/global-workspace)). Open source models could let the world conduct orders of magnitude more safety research, as they allow millions of people to put their hands on a model rather than, say, a couple hundred at Anthropic.

A related upside to open source LLMs is that they open the door to self-hosting intelligence. A self-hosted LLM has no access limits, or [silent reroutes to weaker models](https://www.anthropic.com/news/redeploying-fable-5) in the name of safety. It just works. In practice, this doesn't come into play for near-frontier models, as it takes hundreds of thousands of dollars to buy the GPUs required to run a model like Kimi K3. Because of the economies of scale related to batch inference, it's pretty much always a better idea to pay an inference provider for your GLM-5.2/Kimi-K3/DeepSeek-V4 tokens than to try to host it yourself.

Even with an inference provider as a middleman, the open source models remain more attractive. If Anthropic decided to serve me a slow and inaccurate version of Opus 4.8 tomorrow, I would have no way of definitively knowing, and more importantly no way to disable it. On the other hand, if a third-party inference provider served me a nerfed version of Kimi-K3, it would be immediately apparent just by running the same queries against a different provider.

Here is where the real attraction to open source models lies, personally. The inference providers are locked in competition with each other, offering identical products (tokens from the same model) on a unified market (OpenRouter and its kin). This competition means that they are forced to behave in a way that OpenAI or Anthropic never is. Raise your token costs, and requests are immediately routed to another provider. Serve a quantized checkpoint, and any competitor can immediately call you out on it by comparing to their own outputs. An open source model gives the consumer a relative guarantee that they aren't getting screwed over, while a closed source model gives the consumer a relative guarantee that they are. It sounds like a brutal business, but commoditization could be amazing for consumers (like you and I).

## What are the economics behind training an open source LLM?

DeepSeek CEO Liang Wenfeng spoke about this in DeepSeek's most recent investor meeting. From an English translation:

> Open source does not affect our business model. [...] There is no conflict between open source and paid commercialization, as long as we are talking about a reasonable multiple rather than extreme profit. [...] If you want to earn one hundred times profit, then yes, open source will affect that, because third parties can deploy the model themselves.

It took me some time to digest what he was saying here - Liang claims that Deepseek can make their money back on training in 10 months if they offer inference with a 6x markup. The reasonable next question might be - is Deepseek getting undercut on inference prices, given that they are marking up their costs 6x? Here's the OpenRouter pricing comparison for Deepseek-V4-Pro:

![image.png](/images/blog/image-1.png)

DeepSeek offers inference considerably cheaper than anyone else! Everybody has the same model weights, but DeepSeek is able to optimize their inference so much that they can take a 6x markup and still demolish the rest of the market. Presumably, DeepSeek's ability to run inference cheaply on their own models comes from some combination of having researchers and engineers familiar with the architecture, as well as a head start on developing optimizations. Still, this leaves us with two somewhat interesting possibilities:

1. DeepSeek can run inference at least 6 times cheaper than every other provider on this list, or
2. Everyone else on this list is taking just as big of a markup, and there is opportunity for more inference providers to come in and undercut the market on token prices.

Neither of these things seem obviously true or false to me. A 6x advantage on inference efficiency seems high, especially when the competition is other AI companies with extremely talented engineers. Another possible reason for the efficiency advantage is scale - presumably, DeepSeek runs inference on its own models considerably more than any third-party provider, and thus can take advantage of economies of scale in a way that others cannot.

This raises an interesting question on incentives: are open-source frontier labs incentivized to train models that implement unusual operations (such that significant optimization advantages can be had)? Standard self-attention has been studied for years, and extremely optimized [algorithms](https://arxiv.org/abs/2603.05451) exist and are widely known. DeepSeek's models use [DeepSeek Sparse Attention (DSA)](https://arxiv.org/abs/2512.02556), and it's reasonable to believe that DeepSeek has spent more time optimizing its own attention algorithm than anyone else. To be clear, I don't think that DSA exists for some strange economic reason (it performs better than the standard stuff) but it is strange that this incentive exists at all.

## Conclusion

There are a whole host of exciting things that could come out of open-weight LLMs, and I think that the economics behind it could create some really interesting markets and technologies. I would like to think about this more, and chat about this with smarter people than myself.

