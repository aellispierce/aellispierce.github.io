---
layout: post
published: false
---

At work recently I've been creating the JSON API of our main application, [Spreedly Core](https://spreedly.com/)
and during this time I've had a lot of opportunity to try out different testing methods
and start to understand a lot more about the inner workings of both Rspec and Minitest.
One of the interesting things I learned about were Minitest custom assertions.

A custom assertion is exactly what it sounds like, an opportunity to make your own
Minitest assertion if the standard things like  `assert_equal` aren't doing it for you.

The first thing you'll need to do is to create a `test/custom_assertions.rb` file where you'll
crack open the built in module Minitest::Assertions.

{% highlight ruby  %}
#custom_assertions.rb
require 'minitest/assertions'

module Minitest::Assertions

end
{% endhighlight %}

<br>
Then, in the test file that you're working in or your `test_helper.rb` you can require
your custom_assertions file. From there, making new assertions is easy.

{% highlight ruby  %}
#custom_assertions.rb
require 'minitest/assertions'

module Minitest::Assertions

  def assert_shows_access_denied(response)
      result = json_response['errors'].collect do |error|
        error['key'] == "errors.access_denied" && error['message'] == "Unable to authenticate using the given environment_key and access_token.  Please check your credentials."
      end.all? && response.status == 401
    assert result
  end

end
{% endhighlight %}
<br>
One other nice trick is that you can pass in a custom message to be sent back on failure.

{% highlight ruby  %}
#custom_assertions.rb
require 'minitest/assertions'

module Minitest::Assertions

  def assert_shows_access_denied(response)
    result = json_response['errors'].collect do |error|
      error['key'] == "errors.access_denied" && error['message'] == "Unable to authenticate using the given environment_key and access_token.  Please check your credentials."
    end.all? && response.status == 401
    assert result,
      "Expected the response to show access denied (401).  Actual response code: #{response.code}.  Actual body:\n #{response.body}"
  end

end
{% endhighlight %}
<br>
And that's basically it! Simple and straightforward.
