import Image from 'next/image'
import Link from 'next/link'

export default function Header() {

    return (
        <header className='bg-white flex items-center px-[10px] py-[12px] w-full shadow sticky top-0 z-100'>
            <Link href='/' className='flex items-center justify-center'>
                <Image src="/images/logo.png" alt="logo" width={110} height={0} className='ml-[150px]' />
            </Link>
            <form className='flex w-[456px] items-center justify-between h-11 rounded-full border border-gray-300  mx-auto'>
                <button className='py-[12px] px-3.5'>
                    <Image
                        src="/images/search.svg"
                        alt='search'
                        width={24}
                        height={24} />
                </button>
                <input
                    type="text"
                    placeholder='Поиск ресторанов, мечетей или услуг'
                    className='w-full py-[12px] px-3.5 pl-0' />
                <button className='px-4 py-2.5 rounded-r-full bg-[#1A5D1A] text-white font-bold hover:bg-[#155d15] transition duration-300 ease-in-out'>
                    Найти
                </button>
            </form>
        </header>
    )
}
