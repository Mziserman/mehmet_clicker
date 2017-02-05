# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
teams = [{name: "Mamies", color: "#FF8B9E"}, {name: "Dealers", color: "#FEE9BD"}]
teams.each do |team|
  t = Team.create(name: team[:name], color: team[:color])
  Goal.create(score: 1000000000, name: "le milliard",
    description: "Des gateaux pour les " + team[:name], team: t)
end

User.create(email: "martinziserman@gmail.com", password: "aaaaaa",
  team: Team.first)

Bonus.create(name: "bonus1")
AutoClickerBonus.create(name: "autobonus1")
Goal.create(score: 1000000000, name: "le milliard", description: "Pour des gateaux")
