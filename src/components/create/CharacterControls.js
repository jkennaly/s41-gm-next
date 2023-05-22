import { Container } from '@/components/Container'



export function CharacterControls() {
  return (
    <section id="controls" aria-label="CharacterControls" className="py-20 sm:py-32">
      <Container>
        <h2 className="mx-auto max-w-2xl text-center font-display text-4xl font-medium tracking-tighter text-blue-900 sm:text-5xl">
          Create a character
        </h2>
        <div className="mx-auto mt-20 grid max-w-max grid-cols-1 place-content-center gap-x-32 gap-y-12 sm:grid-cols-3 md:gap-x-16 lg:gap-x-32">

        </div>
      </Container>
    </section>
  )
}
