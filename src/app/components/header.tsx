import Image from 'next/image'

export default function Header() {
    return (
        <div className="w-full z-10">
            <Image
                src="/images/logo.svg"
                width={250}
                height={250}
                alt="Picture of the author"
            />
        </div >
    )
}