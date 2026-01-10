import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900">
      <main className="mx-auto max-w-3xl px-6 py-16">
        <header className="flex items-center justify-between">
          <div className="font-semibold">Hieu Le</div>
          <nav className="flex gap-4 text-sm text-zinc-600">
            <a className="hover:text-zinc-900" href="#projects">Projects</a>
            <a className="hover:text-zinc-900" href="#skills">Skills</a>
            <a className="hover:text-zinc-900" href="#contact">Contact</a>
          </nav>
        </header>

        <section className="mt-16">
          <Image
            src="/profile.png"
            alt="Hieu Le profile picture"
            width={250}
            height={250}
            className="rounded-full border border-zinc-200 shadow-sm"
            priority
          />

          <p className="text-sm font-medium text-zinc-600">
            Computer Science • Aspiring Software Engineer
          </p>

          <h1 className="mt-4 text-4xl font-semibold tracking-tight">
            I build clean, practical software — APIs, databases, and tools.
          </h1>

          <p className="mt-5 max-w-2xl text-lg leading-8 text-zinc-600">
            I’m a CS student focused on backend + data. I like turning messy problems
            into simple systems with solid engineering fundamentals.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              className="rounded-full bg-zinc-900 px-5 py-3 text-sm font-medium text-white hover:bg-zinc-800"
              href="https://github.com/letrunghieu313"
              target="_blank"
              rel="noreferrer"
            >
              GitHub
            </a>

            <a
              className="rounded-full border border-zinc-300 px-5 py-3 text-sm font-medium hover:bg-white"
              href="https://www.linkedin.com/in/hieulet/"
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn
            </a>

            <a
              className="rounded-full border border-zinc-300 px-5 py-3 text-sm font-medium hover:bg-white"
              href="/resume.pdf"
              target="_blank"
              rel="noreferrer"
            >
              Resume
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}

