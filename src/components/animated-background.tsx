"use client";

import { useEffect } from "react";
import { setSceneStatus } from "@/lib/scene-health";

const AnimatedBackground = () => {
  useEffect(() => {
    setSceneStatus("ready");
    return () => setSceneStatus("idle");
  }, []);

  return null;
};

export default AnimatedBackground;
