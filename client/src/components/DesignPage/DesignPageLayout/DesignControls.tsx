import { Dispatch, SetStateAction } from "react";
import GridControls from "../DesignControls/GridControls";
import ModelColorControls from "../DesignControls/ModelColorControls";
import ModelGroupControls from "../DesignControls/ModelGroupControls";
import ModelPositionControls from "../DesignControls/ModelPositionContorls";
import ModelRotationControls from "../DesignControls/ModelRotationControls";
import ModelSizeContorls from "../DesignControls/ModelSizeControls";
import ModelTypesControls from "../DesignControls/ModelTypeControls";

interface Props {
  showGridMain: boolean;
  setshowGridMain: Dispatch<SetStateAction<boolean>>;
  showGridModel: boolean;
  setshowGridModel: React.Dispatch<React.SetStateAction<boolean>>;
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
  modelType: string;
  setmodelType: Dispatch<SetStateAction<string>>;
  selectedModel: {
    type: string;
    id: number;
  };
  planeSize: [number, number];
  setplaneSize: React.Dispatch<React.SetStateAction<[number, number]>>;
  boxSize: [number, number, number];
  setboxSize: Dispatch<SetStateAction<[number, number, number]>>;
  sphereSize: [number, number, number];
  setsphereSize: React.Dispatch<React.SetStateAction<[number, number, number]>>;
  position: [number, number, number];
  setposition: React.Dispatch<React.SetStateAction<[number, number, number]>>;
  rotation: [number, number, number];
  setrotation: React.Dispatch<React.SetStateAction<[number, number, number]>>;
  modelColor: string;
  setmodelColor: React.Dispatch<React.SetStateAction<string>>;
}

function DesignControls(props: Props) {
  const {
    showGridMain,
    setshowGridMain,
    showGridModel,
    setshowGridModel,
    selectedGroup,
    setselectedGroup,
    groupPosition,
    setgroupPosition,
    groupRotation,
    setgroupRotation,
    modelType,
    setmodelType,
    selectedModel,
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
  return (
    <div>
      <GridControls
        showGridMain={showGridMain}
        setshowGridMain={setshowGridMain}
        showGridModel={showGridModel}
        setshowGridModel={setshowGridModel}
      />
      <ModelGroupControls
        groupPosition={groupPosition}
        setgroupPosition={setgroupPosition}
        groupRotation={groupRotation}
        setgroupRotation={setgroupRotation}
      />
      <ModelTypesControls modelType={modelType} setmodelType={setmodelType} />
      {selectedModel.type && (
        <div>
          <ModelSizeContorls
            selectedModel={selectedModel}
            planeSize={planeSize}
            setplaneSize={setplaneSize}
            boxSize={boxSize}
            setboxSize={setboxSize}
            sphereSize={sphereSize}
            setsphereSize={setsphereSize}
          />
          <ModelPositionControls
            type="Model"
            position={position}
            setposition={setposition}
          />
          <ModelRotationControls
            type="Model"
            rotation={rotation}
            setrotation={setrotation}
          />
          <ModelColorControls
            modelColor={modelColor}
            setmodelColor={setmodelColor}
          />
        </div>
      )}
    </div>
  );
}

export default DesignControls;
