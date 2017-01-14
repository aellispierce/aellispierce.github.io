---
title: Performance
layout: post
---

There are a lot of ways that you can optimize performance in your queries by
making sure to use SQL and ActiveRecord wherever possible instead of using ruby
or rails methods to do what you're looking for.

One example is an app I was working on where users complete challenges to win
rewards. I wanted to see how many different challenges users have unlocked the rewards for. My first attempt was this:

`RewardLevel.where(unlocked: true).pluck(:pursuit_id).uniq.count`

However afterwards I learned I could do this instead:
`RewardLevel.where(unlocked: true).distinct(:pursuit_id).count(:pursuit_id)`
This replaces Ruby's `uniq` method with the active record `distinct` call, that
way SQL can do the work of eliminating duplicates. Then, I can also the
ActiveRecord `count` method to count the records in a certain colum, instead of
the ruby count. This keeps all of the work in SQL and does one database query
that returns exactly what I need.

```ruby
  def current_pursuit_participation
    pursuit_participations.select do |participation|
      participation.active?
    end.first
  end

Instead we can do this

```ruby
  def current_pursuit_participation
    pursuit_participations.where(id: Pursuit.active)
  end
```

This avoids loading up all of the participations into memory and instead keeps
the work in SQL.

Scopes

Whenever possible, it's nice to have methods that return an active record
relation, that way things can be chainable and you can keep queries in sql. This
is called a scope.

I wanted to see if there were any active pursuits
`Pursuit.any?(&:active)` Originally, active was a method that returned the currently active pursuit. So, this `any_active` loads all of the pursuits in memory and loops through each one to see if it's active. By changing `active` to return an active record relation we can do this

```ruby
  def self.any_active?
    Pursuit.active.any?
  end
```

This means the database can do all of the work, which is much more efficient and
avoids an n+1 query.

Then I wanted to see the number of finishers

```ruby
pursuit.pursuit_participations.select(&:finished).count
```

The problem with this is again that it loads all of the participations into
memory to then count how many are finished.

Instead I started by adding a scope on the `PursuitParticipation` class

```ruby
   class PursuitParticipation < ApplicationRecord
    belongs_to :user
    belongs_to :pursuit
    scope :finished, -> { where(finished: true) }
  end
```

Then I could have SQL do the work for me

```ruby
  pursuit.pursuit_participations.finished.count
```

One other really good and easy thing you can do is add an index on all your
foreign keys. This can be done pretty easily. Instead of

```ruby

create_table :posts do |t|
  t.integer :user_id, null: false
end
```

We can just do
```ruby
create_table :posts do |t|
  t.references :user, foreign_key: true, null: false
end
```

You should always index your assosciations. In [this blog
post](https://tomafro.net/2009/08/using-indexes-in-rails-index-your-associations)
he saw a speed increase from 1.42 seconds on a simple query (like doing user.posts) to 0.01 just by adding an index on the assosciation.
