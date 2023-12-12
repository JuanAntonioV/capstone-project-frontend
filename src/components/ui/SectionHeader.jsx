import { AccordionHeader, Typography } from '@material-tailwind/react';
import { RiArrowDropUpLine } from 'react-icons/ri';

export default function SectionHeader({
    title,
    menuName,
    subtitle,
    wrapperClassName = '',
    titleClassName = '',
    subtitleClassName = '',
    toggleOpen,
    isOpen,
    noToggle,
}) {
    return (
        <AccordionHeader
            className={`pb-4 ${wrapperClassName} border-gray-200 transition-all cursor-default`}
        >
            {!noToggle && (
                <RiArrowDropUpLine
                    size={36}
                    className={`absolute text-gray-500 top-3 right-3 cursor-pointer ${
                        isOpen ? 'transform rotate-180' : ''
                    }`}
                    onClick={toggleOpen}
                />
            )}

            <div className='space-y-1'>
                <Typography
                    as={'h4'}
                    className={`text-xl text-textSecondary font-medium ${titleClassName}`}
                >
                    {title}
                    {menuName && (
                        <>
                            {' - '}
                            <span className='font-extrabold'>{menuName}</span>
                        </>
                    )}
                </Typography>

                <Typography
                    color='gray'
                    variant='small'
                    className={`${subtitleClassName}`}
                >
                    {subtitle}
                </Typography>
            </div>
        </AccordionHeader>
    );
}
