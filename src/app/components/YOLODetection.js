import { Box, Typography, CircularProgress } from '@mui/material';
import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import * as tf from '@tensorflow/tfjs';
import * as cocossd from '@tensorflow-models/coco-ssd';

export default function YOLODetection() {
  const [loading, setLoading] = useState(true);
  const [objects, setObjects] = useState([]);
  const [fps, setFps] = useState(0);
  const canvasRef = useRef();
  const imageRef = useRef();
  const lastFpsUpdate = useRef(0);
  const frameCount = useRef(0);

  useEffect(() => {
    let model;
    let animationFrameId;
    let lastDetectionTime = 0;

    async function loadModel() {
      await tf.ready();
      model = await cocossd.load();
      setLoading(false);
      detectObjects(model);
    }

    async function detectObjects(model) {
      const now = Date.now();
      
      // Calculate FPS
      frameCount.current++;
      if (now - lastFpsUpdate.current >= 1000) {
        setFps(frameCount.current);
        frameCount.current = 0;
        lastFpsUpdate.current = now;
      }

      if (imageRef.current && canvasRef.current) {
        try {
          const predictions = await model.detect(imageRef.current);
          setObjects(predictions);
          drawPredictions(predictions);
        } catch (error) {
          console.error('Detection error:', error);
        }
      }

      // Limit to ~10 FPS for performance
      const detectionInterval = 100; // ms
      const elapsed = Date.now() - lastDetectionTime;
      const delay = Math.max(0, detectionInterval - elapsed);
      
      lastDetectionTime = Date.now();
      animationFrameId = setTimeout(() => detectObjects(model), delay);
    }

    function drawPredictions(predictions) {
      const ctx = canvasRef.current.getContext('2d');
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      
      predictions.forEach(prediction => {
        const [x, y, width, height] = prediction.bbox;
        
        // Draw bounding box
        ctx.strokeStyle = '#00FF00';
        ctx.lineWidth = 2;
        ctx.strokeRect(x, y, width, height);
        
        // Draw label background
        ctx.fillStyle = '#00FF00';
        const text = `${prediction.class} ${(prediction.score * 100).toFixed(0)}%`;
        const textWidth = ctx.measureText(text).width;
        ctx.fillRect(x - 1, y - 20, textWidth + 4, 20);
        
        // Draw text
        ctx.fillStyle = '#000000';
        ctx.font = '12px Arial';
        ctx.fillText(text, x + 1, y - 5);
      });
    }

    loadModel();

    return () => {
      clearTimeout(animationFrameId);
      if (model) {
        model.dispose();
      }
    };
  }, []);

  return (
    <Box sx={{ 
      position: 'relative',
      width: '100%',
      height: '400px',
      bgcolor: 'black',
      overflow: 'hidden'
    }}>
      {/* Background image - will be analyzed by COCO-SSD */}
      <Box
        component="img"
        ref={imageRef}
        src="https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
        sx={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          display: 'block'
        }}
        alt="Crowd feed"
        crossOrigin="anonymous" // Required for TensorFlow.js
      />
      
      {/* Detection canvas overlay */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none'
        }}
        width={imageRef.current?.width || 0}
        height={imageRef.current?.height || 0}
      />
      
      {/* Status overlay */}
      <Box sx={{
        position: 'absolute',
        top: 8,
        right: 8,
        bgcolor: 'rgba(0,0,0,0.7)',
        color: 'white',
        p: 1,
        borderRadius: 1,
        fontSize: '0.75rem',
        display: 'flex',
        alignItems: 'center',
        gap: 1
      }}>
        {loading ? (
          <>
            <CircularProgress size={14} color="inherit" />
            <Typography variant="caption">Loading model...</Typography>
          </>
        ) : (
          <>
            <Box sx={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              bgcolor: 'success.main',
              animation: 'pulse 1.5s infinite'
            }} />
            <Typography variant="caption">
              COCO-SSD: {fps} FPS | {objects.length} objects
            </Typography>
          </>
        )}
      </Box>
    </Box>
  );
}