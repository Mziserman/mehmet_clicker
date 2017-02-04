desc "Update scores every 10 minutes"
task :update_scores => :environment do
  puts "Updating scores"
  AutoClickerBonusWorker.new.perform
  puts "done."
end
