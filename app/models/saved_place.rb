class SavedPlace < ApplicationRecord
  belongs_to :destination

  validates :tripadvisor_id, presence: true
  validates :name, presence: true
  validates :enriched_data, presence: true
end
