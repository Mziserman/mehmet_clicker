# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20170205140446) do

  create_table "auto_clicker_bonuses", force: :cascade do |t|
    t.string   "name"
    t.integer  "base_click_bonus",   default: 1
    t.integer  "base_price",         default: 1
    t.float    "level_up_click_inc", default: 0.3
    t.float    "level_up_price_inc", default: 0.6
    t.datetime "created_at",                       null: false
    t.datetime "updated_at",                       null: false
  end

  create_table "bonuses", force: :cascade do |t|
    t.string   "name"
    t.integer  "base_click_bonus",   default: 1
    t.float    "level_up_click_inc", default: 0.3
    t.integer  "base_price",         default: 1
    t.float    "level_up_price_inc", default: 0.6
    t.datetime "created_at",                       null: false
    t.datetime "updated_at",                       null: false
  end

  create_table "goals", force: :cascade do |t|
    t.integer  "score"
    t.string   "name"
    t.string   "description"
    t.integer  "team_id"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  create_table "invited_users", force: :cascade do |t|
    t.integer  "team_id"
    t.string   "name"
    t.integer  "click_count"
    t.integer  "expenses_count"
    t.integer  "points_earned"
    t.datetime "created_at",     null: false
    t.datetime "updated_at",     null: false
  end

  create_table "team_auto_clicker_bonuses", force: :cascade do |t|
    t.integer  "team_id"
    t.integer  "auto_clicker_bonus_id"
    t.integer  "level",                 default: 1
    t.datetime "created_at",                        null: false
    t.datetime "updated_at",                        null: false
  end

  create_table "team_bonuses", force: :cascade do |t|
    t.integer  "team_id"
    t.integer  "bonus_id"
    t.integer  "level",      default: 1
    t.datetime "created_at",             null: false
    t.datetime "updated_at",             null: false
  end

  create_table "teams", force: :cascade do |t|
    t.string   "name"
    t.decimal  "score",      default: "0.0"
    t.string   "color"
    t.datetime "created_at",                 null: false
    t.datetime "updated_at",                 null: false
  end

  create_table "users", force: :cascade do |t|
    t.string   "email",                  default: "", null: false
    t.string   "encrypted_password",     default: "", null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          default: 0,  null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip"
    t.string   "last_sign_in_ip"
    t.integer  "team_id"
    t.integer  "click_count"
    t.integer  "expenses_count"
    t.integer  "points_earned"
    t.datetime "created_at",                          null: false
    t.datetime "updated_at",                          null: false
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

end
