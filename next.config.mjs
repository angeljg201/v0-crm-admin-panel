/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  output: 'export', // 👈 ¡Esto genera la carpeta 'out' con los archivos estáticos!
  images: {
    unoptimized: true,
  },
}

export default nextConfig
