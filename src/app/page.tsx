import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-neutral-950 flex items-center justify-center p-6">
      {/* Subtle grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px]"></div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-neutral-950 via-transparent to-neutral-950"></div>

      <main className="relative z-10 w-full max-w-4xl">
        {/* Horizontal layout */}
        <div className="flex flex-col md:flex-row items-center gap-12 md:gap-16">
          {/* Left side - Photo */}
          <div className="flex-shrink-0">
            <div className="relative group">
              {/* Outer glow */}
              <div className="absolute -inset-1 bg-gradient-to-br from-neutral-700 to-neutral-800 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-500"></div>

              {/* Photo container */}
              <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-2xl bg-neutral-900 border border-neutral-800 overflow-hidden">
                <Image
                  src="/profile2.jpeg"
                  alt="A. Izzat Shafran Ashari"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>

          {/* Right side - Content */}
          <div className="flex flex-col text-center md:text-left">
            {/* Small label */}
            <span className="text-neutral-500 text-sm tracking-widest uppercase mb-3">
              Hello, I am
            </span>

            {/* Name */}
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight leading-tight">
              A. Izzat
              <br />
              <span className="text-neutral-400">Shafran Ashari</span>
            </h1>

            {/* Divider line */}
            <div className="w-16 h-px bg-neutral-700 mb-6 mx-auto md:mx-0"></div>

            {/*paragraph */}
            <p className="text-neutral-400 text-lg leading-relaxed max-w-md">
              im a graphic designer and front-end
              developer with a strong eye for aesthetics and detail. I enjoy
              creating visually appealing and meaningful digital experiences
              that combine design and functionality.
            </p>

            {/* Minimal footer info */}
            <div className="mt-8 flex items-center gap-6 text-sm text-neutral-600 justify-center md:justify-start">
              <span>Intern | Ashari Tech</span>
              <span className="w-1 h-1 rounded-full bg-neutral-700"></span>
              <span>Graphic Designer | Front-End Developer</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
