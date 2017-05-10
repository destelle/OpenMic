class Room < ApplicationRecord
  validates :admin_id
  belongs_to :admin, class_name: 'User'
end
