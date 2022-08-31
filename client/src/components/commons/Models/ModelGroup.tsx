import { useEffect, useState } from "react";
import { ModelGroupProps } from "../../../Interface";
import GridLayout from "./GridLayout";
import ModelBox from "./ModelBox";
import ModelPlane from "./ModelPlane";
import ModelSphere from "./ModelSphere";

interface Props {
  group: ModelGroupProps;
  gridGroup: [number, number, string, string];
  showGridGroup: boolean;
  gridModel: [number, number, string, string];
  showGridModel: boolean;
  selectedGroup: number;
  setselectedGroup: React.Dispatch<React.SetStateAction<number>>;
  groupPosition: [number, number, number];
  setgroupPosition: React.Dispatch<
    React.SetStateAction<[number, number, number]>
  >;
  groupRotation: [number, number, number];
  setgroupRotation: React.Dispatch<
    React.SetStateAction<[number, number, number]>
  >;
  selectedModel: {
    type: string;
    id: number;
  };
  setselectedModel: React.Dispatch<
    React.SetStateAction<{
      type: string;
      id: number;
    }>
  >;
  planeSize: [number, number];
  setplaneSize: React.Dispatch<React.SetStateAction<[number, number]>>;
  boxSize: [number, number, number];
  setboxSize: React.Dispatch<React.SetStateAction<[number, number, number]>>;
  sphereSize: [number, number, number];
  setsphereSize: React.Dispatch<React.SetStateAction<[number, number, number]>>;
  position: [number, number, number];
  setposition: React.Dispatch<React.SetStateAction<[number, number, number]>>;
  rotation: [number, number, number];
  setrotation: React.Dispatch<React.SetStateAction<[number, number, number]>>;
  modelColor: string;
  setmodelColor: React.Dispatch<React.SetStateAction<string>>;
}

function ModelGroup(props: Props) {
  const {
    group,
    gridGroup,
    showGridGroup,
    gridModel,
    showGridModel,
    selectedGroup,
    setselectedGroup,
    groupPosition,
    setgroupPosition,
    groupRotation,
    setgroupRotation,
    selectedModel,
    setselectedModel,
    planeSize,
    setplaneSize,
    boxSize,
    setboxSize,
    sphereSize,
    setsphereSize,
    position,
    setposition,
    rotation,
    setrotation,
    modelColor,
    setmodelColor,
  } = props;

  // states for all self properties
  const [selfShowGrid, setselfShowGrid] = useState<boolean>(false);
  const [selfPosition, setSelfPosition] = useState<[number, number, number]>([
    group.xposition || 0,
    group.yposition || 0,
    group.zposition || 0,
  ]);
  const [selfRotation, setselfRotation] = useState<[number, number, number]>([
    group.xrotation || 0,
    group.yrotation || 0,
    group.zrotation || 0,
  ]);

  const showModelPlanes = group.model_planes?.map((plane) => (
    <ModelPlane
      key={plane.id}
      plane={plane}
      gridModel={gridModel}
      showGridModel={showGridModel}
      planeSize={planeSize}
      setplaneSize={setplaneSize}
      selectedModel={selectedModel}
      setselectedModel={setselectedModel}
      position={position}
      setposition={setposition}
      rotation={rotation}
      setrotation={setrotation}
      modelColor={modelColor}
      setmodelColor={setmodelColor}
    />
  ));

  const showModelBoxes = group.model_boxes?.map((box) => (
    <ModelBox
      key={box.id}
      box={box}
      gridModel={gridModel}
      showGridModel={showGridModel}
      boxSize={boxSize}
      setboxSize={setboxSize}
      selectedModel={selectedModel}
      setselectedModel={setselectedModel}
      position={position}
      setposition={setposition}
      rotation={rotation}
      setrotation={setrotation}
      modelColor={modelColor}
      setmodelColor={setmodelColor}
    />
  ));

  const showModelSpheres = group.model_spheres?.map((sphere) => (
    <ModelSphere
      key={sphere.id}
      sphere={sphere}
      gridModel={gridModel}
      showGridModel={showGridModel}
      sphereSize={sphereSize}
      setsphereSize={setsphereSize}
      selectedModel={selectedModel}
      setselectedModel={setselectedModel}
      position={position}
      setposition={setposition}
      rotation={rotation}
      setrotation={setrotation}
      modelColor={modelColor}
      setmodelColor={setmodelColor}
    />
  ));

  // set position
  useEffect(() => {
    if (selectedGroup === group.id) {
      setSelfPosition([groupPosition[0], groupPosition[1], groupPosition[2]]);
    }
  }, [groupPosition]);

  // set rotation
  useEffect(() => {
    if (selectedGroup === group.id) {
      setselfRotation([groupRotation[0], groupRotation[1], groupRotation[2]]);
    }
  }, [groupRotation]);

  // toggle grids
  useEffect(() => {
    if (selectedGroup === group.id) {
      setselfShowGrid(showGridGroup);
    }
  }, [showGridGroup]);

  // set all self properties from history when selection
  useEffect(() => {
    if (selectedGroup === group.id) {
      setgroupPosition(selfPosition);
      setgroupRotation(selfRotation);
      setselfShowGrid(showGridGroup);
    } else {
      setselfShowGrid(false);
      saveGroup();
    }
  }, [selectedGroup]);

  // save on leaving page
  // useEffect(() => {
  //   return () => saveGroup();
  // }, []);

  function saveGroup() {
    fetch(`/model_groups/${group.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        xposition: selfPosition[0],
        yposition: selfPosition[1],
        zposition: selfPosition[2],
        xrotation: selfRotation[0],
        yrotation: selfRotation[1],
        zrotation: selfRotation[2],
      }),
    })
      .then((res) => res.json())
      .then(console.log)
      .catch(console.error);
  }

  return (
    <>
      <group
        // onClick={handleOnClick}
        position={selfPosition}
        rotation={[
          (selfRotation[0] / 360) * Math.PI * 2,
          (selfRotation[1] / 360) * Math.PI * 2,
          (selfRotation[2] / 360) * Math.PI * 2,
        ]}
      >
        {selfShowGrid && (
          <GridLayout
            type="Group"
            gridArgs={gridGroup}
            gridPosition={[0, 0, 0]}
          />
        )}
        {showModelPlanes}
        {showModelBoxes}
        {showModelSpheres}
      </group>
    </>
  );
}

export default ModelGroup;
