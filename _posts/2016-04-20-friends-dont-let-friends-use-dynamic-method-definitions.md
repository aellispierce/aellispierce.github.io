---
layout: post
---

I've recently been reading _Refactoring: Ruby Edition_ by Jay Fields, Martin
Fowler, and Shane Harvie. All in all it's a fantastic book and I've learned a
lot from it, I'd definitely recommend it. However, there was one section that
pretty much made me do this:

![Nope Octopus](http://s3-ec.buzzfed.com/static/enhanced/terminal05/2012/8/10/14/anigif_enhanced-buzz-17859-1344624588-3.gif)

That section was on Dynamic Method Definitions. Normally in Ruby, if you'd like
to define a method you do it between a `def` and an `end`. However, there may be
a situation in which you have many methods that all have a similar structure and
it gets repetitive. For example, lets say we've got a kid that has some chores
to do.

{% highlight ruby  %}
  def wash_dog
    clean(dog)
  end

  def wash_dishes
    clean(dishes)
  end

  def wash_car
    clean(car)
  end
{% endhighlight %}
<br>
Obviously this is a pretty contrived example, but stay with me. If we wanted to
dynamically define these methods instead of doing each one individually we could
instead do:

{% highlight ruby  %}
["dog", "dishes", "car"].each do |method|
  define_method "wash_#{method}" do
    clean(method)
  end
end

{% endhighlight %}

There are a lot of benefits to this, it obviously reduces duplication in the
code and as a result of that can also reduce the possibility for errors when
compared to defining the methods individually.

However, to me the benefits are not worth the huge downside of reducing
readability and easy code navigation. Oftentimes when going throw a codebase we
use some go-to tricks for finding where a method is defined when we need to know
more about it. If I went into a codebase and saw the `wash_car` method and
wanted to find it's definition I would immediately search for `def wash_car`.
When it didn't come up I'd think, maybe it's an instance variable with an
attr_reader and search for that. Nope? Maybe it's delegated from another object.
Nope? Maybe it's an alias. Nope? WHERE THE F*CK is it defined?

I personally will always favor readibility over brevity. If there were 100 of
these small chore methods then at that point it may be worth the trade-off, but
with only a couple of them I don't think Dynamic Method Definiton is worth it.
Many people would disagree with me, it's kind of like the
argument of using a ternary vs an `if/else` for a short conditional. Some people
think it's awesome, some people think it's [Ruby
Golf](http://www.sitepoint.com/ruby-golf/). Either way, I'm sticking by my PSA.
Friends Don't Let Friends Use Dynamic Method Definition.
