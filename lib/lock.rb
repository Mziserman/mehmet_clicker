require 'thread'

module Lock
  def self.mutex
    @mutex ||= Mutex.new
  end
end
