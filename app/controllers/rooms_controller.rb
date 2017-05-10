class RoomsController < ApplicationController
  def create
    p 'Got Here'
    alph = [('a'..'z'), ('A'..'Z')].map(&:to_a).flatten
    password = (0..3).map { alph[rand(alph.length)] }.join
    user = User.find(session[:user_id])
    room = Room.new({admin_id: session[:user_id],password: password})
      if room.save
        render json: {
          password: room.password,
          username: user.name,
          roomId: room.id
        }
      else
        render json: {
          errors: room.errors.messages
        }, status: 400
      end
  end
end
