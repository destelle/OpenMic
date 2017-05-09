require 'rails_helper'

RSpec.describe User, type: :model do
  describe "User models" do
    let (:user){User.create(name: "Dillon", email: "dillon@dillon.com", password: "password")}
    it "has a name" do
      expect(user.name).to eq "Dillon"
    end

    it "has an email" do
      expect(user.email).to eq "dillon@dillon.com"
    end

    it "has a password" do
      expect(user.password).not_to eq nil
    end
  end
end
