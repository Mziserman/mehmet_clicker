# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
names = ["Mehmet", "Mamies", "Boris", "Gang"]
names.each do |n|
  Team.create(name: n)
end

User.create(email: "martinziserman@gmail.com", password: "aaaaaa",
  team: Team.first)

Bonus.create(name: "bonus1")
AutoClickerBonus.create(name: "autobonus1")
