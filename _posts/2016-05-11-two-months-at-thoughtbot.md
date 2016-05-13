---
layout: post
---

Last week was the end of the second month of my apprenticeship at thoughtbot!
The client project that I was working on was mostly focused on API
integrations. This gave me some confidence going into the month, as this was very
similar to the work I've done on [Active Merchant] while at Spreedly. There were
some differences in how the integrations were tested though that made the
project a great learning experience.

In Active Merchant, the tests are split up into unit and remote tests. The
remote tests actually hit the sandbox API of whatever you're
integrating with. You then use the responses that you receive to basically stub
out the API responses for the unit tests. That way, when you're actually
integrating with the API or making major changes, you have the remote tests to
make sure your integration is correct, however when you're just making small
changes or want to run the whole suite you have the unit tests to test against
instead of relying on the remote tests, which will be much slower and brittle as
a result of actually making a call. This is similar to the [VCR] gem, just done
manually.

For the integrations I was doing for the client project, there were a few
different things going on. Not only were we making calls to the API that we were
integrating with, but they had a SOA setup and so we were making calls to
another internal service. None of the integration tests were actually remote
tests. This was a bit frustrating, because it means that in you're tests you're
never actually hitting the sandbox API. Therefore, you need to test your setup
manually via the console to make sure that when your tests pass you're also
actually able to make a call out to the API.

However, the bright side is that to handle all of these calls, they use a lot
of test doubles, which are things that I hadn't had that much experience with.
So, I got to learn a lot of interesting testing things on the project. The four
different types of test doubles are stubs, mocks, spies and fakes, were all
present in their code base so I got good practice seeing when one type is
appropriate to use over the other. Overall it was a good experience and a good
client project to work on.

[Active Merchant]: https://github.com/activemerchant/active_merchant
[VCR]: https://github.com/vcr/vcr
