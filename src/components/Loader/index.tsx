import { Html, useProgress } from '@react-three/drei';
import { useEffect } from 'react';

export default function Loader({
  onLoading,
}: {
  onLoading: (p: number) => void;
}) {
  const { progress } = useProgress();

  useEffect(() => {
    onLoading(progress);
  }, [progress]);

  return <Html></Html>;
}
