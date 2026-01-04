# Modelos 3D

## Como Adicionar o Modelo do Chevrolet Tracker

1. Acesse: https://sketchfab.com/3d-models/chevy-tracker-5aad1bae1d934d8c8781dc589a67c0ec
2. Crie uma conta gratuita no Sketchfab (se ainda não tiver)
3. Clique em "Download 3D model"
4. Selecione o formato **GLB** (recomendado para web)
5. Salve o arquivo nesta pasta com o nome: `chevy-tracker.glb`
6. Atualize o componente `src/components/CarViewer3D.jsx` para carregar o modelo

## Código para Carregar o Modelo 3D

Quando o modelo estiver disponível, substitua a função `CarPlaceholder` por:

```jsx
import { useGLTF } from '@react-three/drei';

function CarModel({ modelPath }) {
  const { scene } = useGLTF(modelPath);
  return <primitive object={scene} scale={1.5} />;
}

// E use no componente:
<CarModel modelPath="/models/chevy-tracker.glb" /> 
```

## Formatos Suportados

- **GLB** (recomendado) - Arquivo binário único
- **GLTF** - JSON + arquivos externos

## Licença

O modelo do Chevrolet Tracker está sob licença Creative Commons Attribution-NonCommercial-ShareAlike.
Certifique-se de dar crédito ao autor original ao usar o modelo.
