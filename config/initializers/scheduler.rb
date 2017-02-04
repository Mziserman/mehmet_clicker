require 'rufus-scheduler'

s = Rufus::Scheduler.singleton

s.every '20s' do
  AutoClickerBonusWorker.new.perform
end
