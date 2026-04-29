import { useEffect, useState } from 'react';
import './LoadingAnimation.css';
import { getPublicAssetUrl } from '../utils/publicAsset';

const LoadingAnimation = () => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 2000); // 2 seconds
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div className="loading-overlay">
      <img
        src={getPublicAssetUrl('/webp/tree.webp')}
        alt="Loading Tree"
        className="tree-animation"
      />
    </div>
  );
};

export default LoadingAnimation;
