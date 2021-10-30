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

## Delete all empty lines

Similarly, rails generators often create a lot of empty lines in things like
config files. `:g/^$/d` will clean all of those up

## Do two things at once using the pipe (|)
What if I want to delete all comments AND all empty lines? Well I can do that
all together at once by chaining the two patterns I'm looking for together with
a pipe: `g/#\|^$/d` will do what I want. The `\|` means first we use the escape
character, \, to say "what comes next isn't a part of the pattern I'm searching
for, this is a new instruction". And then the pipe is the "and/or" operator.


# Vim Plugins

There are many plugins that I have installed in my vim configs, where I often
only take advantage of a small part of their functionality. This is to remind me
of some of the options I don't currently use much and help them get into my
workflow.

# Go to file
tpope/vim-rails defines some really great helpers for working in Rails app. My
most used helper is `:A` for going to the "alternate" file of the one I'm on,
i.e. if you're in a model, go to the test for that model. However, equally as
helpful is `gf`. This command brings you to the route definition of whatever
you're on. From the docs:
```
Example uses of |gf|, and where they might lead.
(* indicates cursor position)
>
	Pos*t.first
<	app/models/post.rb ~
>
	has_many :c*omments
<	app/models/comment.rb ~
>
	link_to 'Home', :controller => 'bl*og'
<	app/controllers/blog_controller.rb ~
>
	<%= render 'sh*ared/sidebar' %>
<	app/views/shared/_sidebar.html.erb ~
>
	<%= stylesheet_link_tag 'appl*ication' %>
<	app/assets/stylesheets/application.css ~

```

This is super helpful and a huge time saver.
