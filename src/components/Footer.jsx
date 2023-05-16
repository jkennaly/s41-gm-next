import { Container } from '@/components/Container'
import { Logo } from '@/components/Logo'
import logo from '@/../public/S41.svg'

export function Footer() {
  return (
    <footer className="py-16">
      <Container className="flex flex-col items-center justify-between md:flex-row">
        {logo && <img className="h-12 w-auto text-slate-900" src={logo} /> || <Logo className="h-12 w-auto text-slate-900" />}
        <p className="mt-6 text-base text-slate-500 md:mt-0">
          Copyright &copy; 2044 Galactic Coporate Empire. All
          rights reserved.
        </p>
      </Container>
    </footer>
  )
}
