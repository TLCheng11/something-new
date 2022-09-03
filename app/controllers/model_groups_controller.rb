class ModelGroupsController < ApplicationController
  before_action :find_model_group, only: [:update, :destroy, :attach, :detach]

  # POST /model_groups
  def create
    @model_group = ModelGroup.create!(model_group_params)
    render json: @model_group, status: :created
  end

  # PATCH/PUT /model_groups/1
  def update
    @model_group.update!(model_group_update_params)
    render json: @model_group, status: :accepted
  end

  # PATCH/PUT /model_groups/1/attach
  def attach
    if ModelGroup.find(params[:parent_group_id])
      children = @model_group.child_groups_list
      if !children.include?(params[:parent_group_id])
        @model_group.update!(params.permit(:parent_group_id))
        render json: @model_group, status: :accepted
      else
        render json: {error: "Group cannot be attached to its child or grandchild"}, status: 405
      end
    else
      render json: {error: "Parent group not found"}, status: 405
    end
  end

  # PATCH/PUT /model_groups/1/attach
  def detach
    @model_group.update!(parent_group_id: nil)
    render json: @model_group, status: :accepted
  end

  # DELETE /model_groups/1
  def destroy
    if @model_group.project.model_groups.count > 1
      @model_group.destroy
      render json: {message: "Group deleted"}, status: :accepted
    else
      render json: {message: "The project must have at least one group"}, status: 405
    end
  end

  private
    def find_model_group
      @model_group = ModelGroup.find(params[:id])
    end

    def model_group_params
      params.permit(:project_id, :group_name)
    end

    def model_group_update_params
      params.permit(:group_name, :xposition, :yposition, :zposition, :xrotation, :yrotation, :zrotation)
    end
end
