import { Accordion, AccordionBody } from '@material-tailwind/react';
import { useEffect, useState } from 'react';
import SectionHeader from './SectionHeader';

export default function SectionWrapper({
    children,
    className = '',
    title = 'Title',
    menuName,
    subtitle = '',
    noToggle = false,
    isOpen = true,
    isSuccess = false,
    ...rest
}) {
    const [open, setOpen] = useState(true);

    const handleOpen = () => {
        if (noToggle) return;
        setOpen(!open);
    };

    useEffect(() => {
        if (isSuccess) setOpen(isOpen);
    }, [isOpen]);

    return (
        <Accordion
            className={`${className} bg-white px-6 shadow border rounded-lg relative h-fit`}
            {...rest}
            open={open}
        >
            <SectionHeader
                title={title}
                menuName={menuName}
                subtitle={subtitle}
                toggleOpen={() => handleOpen()}
                wrapperClassName={open ? 'border-b' : 'border-none'}
                isOpen={open}
                noToggle={noToggle}
            />
            <AccordionBody>{children}</AccordionBody>
        </Accordion>
    );
}
