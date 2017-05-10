class CreateRoom < ActiveRecord::Migration[5.0]
  def change
    create_table :rooms do |t|
      t.integer :admin_id, null: false
      t.string :password, null: false

      t.timestamps null: false
    end
  end
end
