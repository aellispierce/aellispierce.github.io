---
title: Working with Gems Locally
layout: post
---


As Rails developers, we use gems everyday. Usually a lot of gems. However,
sometimes gems can seem like magic black boxes. If they lack detailed
documentation it can be especially hard to figure out how they work.

If you'd like to know more about the gem you're working with, the first step
might be running `bundle info`

```
bundle info clearance
  * clearance (2.5.0)
        Summary: Rails authentication & authorization with email & password.
        Homepage: https://github.com/thoughtbot/clearance
        Path: /Users/aellispierce/.rbenv/versions/2.7.2/lib/ruby/gems/2.7.0/gems/clearance-2.5.0
```
This gives you lots of information about the gem, such as the version you're
working with, a summary of what the gem is for, where to find more information
about it, and the path to your local installation.

Now, lets say you're particularly interested in digging into the source code.
Of course,
you can go to the gems page on GitHub and investigate the content there, but you
can also do that locally.
`bundle open gem-name` will open up your local copy of your gem in the editor
of  your choice. This is especially great if you're not up to date with the
latest version. Investigating the source locally can be helpful to make sure
you're seeing the code as it actually is when you run it, and not accidentally
looking at a different version on GitHub.

Now, let's say you think there's a bug in the gem, and you want to make some
changes to your local version to see how they interact. If it's a small change
that you'll likely not want to keep around, you can just change it right on that
local copy that was opened when you did `bundle open gem-name`. Make some change
there, restart your server, and you should now be receiving the new behavior.

If it's a larger change, you may want to fork and clone the gem so you're not messing
with your main installation and you can submit a PR at the end. Once you've
cloned the gem, you can change how you access it in your gemfile so you can use
your local version.

```
gem 'my_local_gem', path: '/absolute/path/to/your/gem'
```

Now, just bundle install again and you'll be using your local copy.
Remember to restart your server after making any local gem changes to see the
results.

As another note, let's say you're testing changes to one gem, and you want to
update to the newest version, however you don't want to re-bundle all of the
dependencies. You can do:
```
bundle update --conservative my_gem
```
And this will only update the one gem directly, saving you a lot of time in the
bundle.

