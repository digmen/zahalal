'use client'
import Link from 'next/link';
import { useRouter } from 'next/navigation'

export default function BackButton() {
    const router = useRouter()

    return (
        <div className='px-4 pt-4 absolute top-4 left-0 right-0 z-10 max-lg:px-7'>
            <button
                onClick={() => router.push('/')}
                className='group inline-flex items-center gap-2 justify-center h-10 px-3 sm:px-4 py-2 bg-gray-50 backdrop-blur-sm rounded-lg hover:bg-[#131105] hover:text-white transition-colors'
            >
                <Link href='/'>
                    <svg className="h-5 w-5 fill-current transition-colors group-hover:text-white" viewBox="0 0 24 24">
                        <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20z"></path>
                    </svg>
                </Link>
                <span className="leading-5 tracking-tight text-sm font-medium hidden sm:inline transition-colors group-hover:text-white">Назад</span>
            </button>
        </div>
    )
}
