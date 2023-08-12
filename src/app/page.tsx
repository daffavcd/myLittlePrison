import Game from './components/game'
import Header from './components/header'
import Footer from './components/footer'
import Image from 'next/image'

export default function Home() {

  return (
    <>
      <div className="flex flex-col h-screen">
        <Image
          className="bg-repeat-y bg-repeat"
          alt="Background Image"
          src="/images/red-velvet.jpg"
          quality={100}
          fill
          sizes="100vw"
          style={{
            objectFit: 'cover',
          }}
        />
        <div className="dark-overlay"></div>
        <main className="grid grid-cols-12 h-screen gap-12 pt-5 pr-10 pb-5 pl-10">
          <Header />
          <Game />
        </main>
        <Footer />
      </div>
    </>
  )
}
