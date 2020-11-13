---
layout: post
published: false
---

Fridays are investment days at thoughtbot, so I decided to use the day to
explore [Elm], a functional programming language for the browser. I was able to
pair program on making a Select2 implementation in Elm with my mentor Joël, and
it was a fantastic experience. One of the most interesting aspects that I learned
 was about Currying and Partial Application.

## Currying

Currying is the process of taking a function with multiple arguments and turning
it into a series of functions with one argument. So, for example, for making the
select library we wanted a filtering aspect, so we had a function
`optionContainsTerm` that takes two arguments, a String (the search term), and
an Option, one of the elements in the dropdown, and returns a boolean that says
whether that option contains the search term or not. In Elm, that looks like
this

```elm
optionContainsTerm : String -> Option -> Bool
```

This syntax threw me off a lot at first. When we were dealing with functions
that take one argument, this syntax made sense to me. `myFunc : String -> String`
means the function `myFunc` takes in a string and returns a string. With
multiple arguments though the arrows suddenly stopped making sense. It takes in
a String and then returns an Option and then returns a Bool? Well, turns out
through the magic of currying, that's exactly what's happening!

In Elm, all functions are curried under the hood. So, if a function has _n_
arguments, it will be transformed into _n_ functions with one argument each.

This then leads us into partial application.

## Partial Application

Arity is the number of arguments a function takes. If it takes 2 arguments, the
function is said to have an arity of 2. To partially apply a function is to call
a function with less arguments then it's arity. So, if a function has an arity
of 2, and you call it with only 1 argument, then the function is "partially
applied." As a result, you'll get back an anonymous function that takes in the
second argument. Knowing this makes Elm's error messages make a lot more sense.
Oftentimes you'll get an error that looks something like this:

```
-- TYPE MISMATCH -------------------------------------------------- src/Main.elm

The type annotation for `initialSelect` does not match its definition.

25| initialSelect : Select
                    ^^^^^^
The type annotation is saying:

    { options : List Option
    , searchTerm : String
    }

But I am inferring that the definition has this type:

    String -> Select
```

What this is saying is that I'm expecting Select to be a record with two keys,
options, which is a List of Options and searchTerm, which is a string. Instead,
I'm getting back a function that takes in a String and returns a Select.

If you see an error like this, 99% of the time what it's trying to say is that
you've passed in less arguments than you were supposed to, so the function has
been partially applied. In this case, since I only passed in one argument when
it was expecting two, it returned an anonymous function that takes in the
second argument (a String) and returns a Select.

------------
To recap, currying is breaking down a function with _n_ arguments into _n_
functions with one argument each. Partial Application is calling a function with
fewer arguments then it's arity, which will then return an anonymous function
that will expect to receive the missing arguments. These are concepts that
always sounded scary to me, but one day of working with Elm and seeing how
they're applied in practice and they make a lot more sense. Hopefully this
explanation helps them make sense to someone else!

[Elm]: http://elm-lang.org/
