class RoomsController < ApplicationController

  def show
    room = Room.find(params[:id])
    if room
      user = User.find(room.admin_id)
      render json: {
        roomAdminId: room.admin_id,
        roomAdminName:user.name,
        roomPassword: room.password
      }
    else
      render json: {
        errors: 'No Room found'
      }, status: 400
  end
end

  def create
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

  def join
    room = Room.find_by(room_params)
    if room
      user = User.find(room.admin_id)
      render json: {
        roomId: room.id
      }
    else
      render json: {
        errors: 'No Room Found'
      },status: 400
    end
  end

private
def room_params
  params.require(:room).permit(:password)
end


end
