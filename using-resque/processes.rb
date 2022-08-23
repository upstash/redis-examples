class Enterprise
    @queue = :enterprise
  
    def self.perform(difficulty, string_input)
        if difficulty == 'hard'
            sleep 3
        else
            sleep 1
        end
        puts "Enterprise process finished for { #{difficulty}: #{string_input} } "
    end
end


class Free
    @queue = :free
  
    def self.perform(difficulty, string_input)
        if difficulty == 'hard'
            sleep 3
        else
            sleep 1
        end
        puts "Free process finished for { #{difficulty}: #{string_input} } "
    end
end


