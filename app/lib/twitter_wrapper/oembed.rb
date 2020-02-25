# frozen_string_literal: true

module TwitterWrapper
  class Oembed
    delegate :html, to: :@oembed

    def initialize(oembed)
      @oembed = oembed
    end
  end
end
