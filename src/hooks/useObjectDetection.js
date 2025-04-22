import { useState, useEffect } from 'react';
import * as cocossd from '@tensorflow-models/coco-ssd';

export function useObjectDetection(imageElement) {
  const [objects, setObjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let model;
    let interval;

    async function init() {
      model = await cocossd.load();
      setLoading(false);
      
      interval = setInterval(async () => {
        if (imageElement.current) {
          const detections = await model.detect(imageElement.current);
          setObjects(detections);
        }
      }, 300); // Detect every 300ms
    }

    init();

    return () => {
      clearInterval(interval);
      if (model) model.dispose();
    };
  }, [imageElement]);

  return { objects, loading };
}