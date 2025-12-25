export default function NewsDescription({ description }) {
    return (
        <div className='text-[#656565] text-[16px] font-normal leading-6 max-sm:text-[14px]'>
            {description.split('\n').map((line, idx) => (
                <p key={idx} style={{ whiteSpace: 'pre-line' }}>{line}</p>
            ))}
        </div>
    );
}
