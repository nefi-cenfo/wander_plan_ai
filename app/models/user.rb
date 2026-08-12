class User < ApplicationRecord
  belongs_to :subscription
  has_many :trips

  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  pay_customer

  enum :role, {
    user: 0,
    admin: 1
  }, default: 0

  def premium?
    payment_processor&.subscribed?(processor_plan: ENV["WANDER_PLAN_PRICE"]) || false
  end
end
