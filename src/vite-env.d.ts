/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />

// ?react를 떼고 그냥 *.svg로 선언합니다.
declare module "*.svg" {
  import React from "react";
  const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
  export default ReactComponent;
}