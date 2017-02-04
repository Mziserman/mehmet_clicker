require 'rufus-scheduler'

s = Rufus::Scheduler.singleton

s.every '1s' do
  AutoClickerBonusWorker.new.perform
end
