export interface WebGLSupportResult {
  supported: boolean;
  rendererName?: string;
  isLowPower?: boolean;
}

export const detectWebGL = (): WebGLSupportResult => {
  if (typeof window === 'undefined') {
    return { supported: false };
  }

  try {
    const canvas = document.createElement('canvas');
    const gl = (
      canvas.getContext('webgl', { powerPreference: 'default' }) ||
      canvas.getContext('experimental-webgl')
    ) as WebGLRenderingContext | null;

    if (!gl) {
      return { supported: false };
    }

    const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
    const rendererName = debugInfo ? gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) : 'Generic WebGL';

    // Simple heuristic for low-power/software fallbacks (SwiftShader, llvmpipe)
    const isSoftware = /swiftshader|llvmpipe|software/i.test(rendererName);

    return {
      supported: !isSoftware,
      rendererName,
      isLowPower: isSoftware,
    };
  } catch {
    return { supported: false };
  }
};
