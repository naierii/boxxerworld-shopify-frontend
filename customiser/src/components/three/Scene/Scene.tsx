import { Center } from '@react-three/drei';
import { CustomiserState, useCustomiserStore } from '@store/customiser';
import Model from '../Model';

// export interface SceneProps {}

const models = (state: CustomiserState) => state.selectedModels;

const Scene = () => {
  const selectedModels = useCustomiserStore(models);
  return (
    <Center>
      {selectedModels.map((m) => (
        <Model key={m.model?.id} model={m.model} />
      ))}
    </Center>
  );
};

export default Scene;
