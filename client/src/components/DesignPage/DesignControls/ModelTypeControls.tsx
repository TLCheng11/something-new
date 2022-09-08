import { Dispatch, SetStateAction } from "react";

interface Props {
  selectedGroup: {
    id: number;
    name: string;
  };
  setselectedModel: React.Dispatch<
    React.SetStateAction<{
      type: string;
      id: number;
    }>
  >;
  modelType: string;
  setmodelType: Dispatch<SetStateAction<string>>;
}

function ModelTypesControls(props: Props) {
  const { selectedGroup, setselectedModel, modelType, setmodelType } = props;

  function addModel() {
    fetch(`/model_${modelType}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ model_group_id: selectedGroup.id }),
    })
      .then((res) => res.json())
      .then((data) => {
        setselectedModel({ type: modelType, id: data.id });
      });
  }

  return (
    <div id="model-type-controls" className="h-full w-full bg-gray-600">
      <h1>Model Control:</h1>
      <div id="model-type-selection" className="flex">
        <h1 className="w-1/3">Model Type:</h1>
        <div className="px-2">
          <select
            className="design-input"
            id="model-type"
            value={modelType}
            onChange={(e) => setmodelType(e.target.value)}
          >
            <option value="planes">Plane</option>
            <option value="shapes">Shape</option>
            <option value="boxes">Box</option>
            <option value="spheres">Sphere</option>
          </select>
        </div>
        <button id="add-model" className="design-btn" onClick={addModel}>
          Add
        </button>
      </div>
    </div>
  );
}

export default ModelTypesControls;
