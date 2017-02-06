require 'thread'

class Lock
  def self.mutex
    @mutex ||= Mutex.new
  end
end
