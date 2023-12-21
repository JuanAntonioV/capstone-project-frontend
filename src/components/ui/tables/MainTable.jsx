import TableNoData from './TableNoData';
import TableFilter from './TableFilter';

import { MdAdd, MdClear, MdFilterList, MdFilterListOff } from 'react-icons/md';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';
import TableLoading from './TableLoading';
import {
    useReactTable,
    getCoreRowModel,
    getFilteredRowModel,
    getFacetedRowModel,
    getFacetedUniqueValues,
    getFacetedMinMaxValues,
    getPaginationRowModel,
    getSortedRowModel,
    flexRender,
} from '@tanstack/react-table';
import { useEffect, useState } from 'react';
import {
    Button,
    ButtonGroup,
    Card,
    Chip,
    IconButton,
    Option,
    Popover,
    PopoverContent,
    PopoverHandler,
    Select,
    Typography,
} from '@material-tailwind/react';
import { TbSortAscending, TbSortDescending } from 'react-icons/tb';
import DatePicker from '@hassanmojab/react-modern-calendar-datepicker';
import moment from 'moment';

export default function MainTable({
    addAction,
    nextPageAction,
    prevPageAction,
    canPreviousPage,
    canNextPage,
    currentPage = 1,
    pageCount = 1,
    pageSize,
    setPageSize,
    data = [],
    columns = [],
    search = '',
    setSearch,
    isLoading,
    pagination,
    filterDate,
    fromDate,
    toDate,
    setFromDate,
    setToDate,
    clearFilter,
}) {
    const [dataTable, setDataTable] = useState(() => [...data]);
    const [columnFilters, setColumnFilters] = useState([]);
    const [globalFilter, setGlobalFilter] = useState('');
    const [from, setFrom] = useState(null);
    const [to, setTo] = useState(null);

    useEffect(() => {
        setDataTable(data);
    }, [data]);

    const table = useReactTable({
        data: dataTable,
        columns,
        state: {
            columnFilters,
            globalFilter,
        },
        onColumnFiltersChange: setColumnFilters,
        onGlobalFilterChange: setGlobalFilter,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getFacetedRowModel: getFacetedRowModel(),
        getFacetedUniqueValues: getFacetedUniqueValues(),
        getFacetedMinMaxValues: getFacetedMinMaxValues(),
        debugTable: false,
        debugHeaders: false,
        debugColumns: false,
    });

    useEffect(() => {
        if (table.getState().columnFilters[0]?.id === 'fullName') {
            if (table.getState().sorting[0]?.id !== 'fullName') {
                table.setSorting([{ id: 'fullName', desc: false }]);
            }
        }
    }, [table]);

    const handlePrevPage = () => {
        if (prevPageAction) {
            prevPageAction();
        } else {
            table.previousPage();
        }
    };

    const handleNextPage = () => {
        if (nextPageAction) {
            nextPageAction();
        } else {
            table.nextPage();
        }
    };

    const handleFilter = () => {
        const fromFormated = `${from?.year}-${from?.month}-${from?.day}`;
        const toFormated = `${to?.year}-${to?.month}-${to?.day}`;

        setFromDate(fromFormated);
        setToDate(toFormated);
    };

    const clearDateFilter = () => {
        setFrom(null);
        setTo(null);
        clearFilter();
    };

    const handleFastFilter = (type = 'week') => {
        const isTypeMonth = type === 'month';

        const startDay = moment()
            .startOf(isTypeMonth ? 'month' : 'week')
            .date();
        const startMonth = moment().startOf('month').month() + 1;
        const startYear = moment().startOf('year').year();

        const endDay = moment()
            .endOf(isTypeMonth ? 'month' : 'week')
            .date();
        const endMonth = moment().endOf('month').month() + 1;
        const endYear = moment().endOf('year').year();

        const fromFilter = {
            year: startYear,
            month: startMonth,
            day: startDay,
        };

        const toFilter = {
            year: endYear,
            month: endMonth,
            day: endDay,
        };

        setFrom(fromFilter);
        setTo(toFilter);
        setFromDate(`${startYear}-${startMonth}-${startDay}`);
        setToDate(`${endYear}-${endMonth}-${endDay}`);
    };

    return (
        <div className='w-full h-full py-2 overflow-auto'>
            {addAction || setSearch ? (
                <div className='gap-2 mb-6 flexBetween'>
                    {setSearch && (
                        <TableFilter filter={search} setFilter={setSearch} />
                    )}
                    {filterDate && (
                        <Popover placement='bottom'>
                            <PopoverHandler>
                                {fromDate && toDate ? (
                                    <IconButton
                                        color='blue-gray'
                                        variant='outlined'
                                        className='mr-2'
                                    >
                                        <MdFilterListOff size={24} />
                                    </IconButton>
                                ) : (
                                    <IconButton
                                        color='blue-gray'
                                        variant='outlined'
                                        className='mr-2'
                                    >
                                        <MdFilterList size={24} />
                                    </IconButton>
                                )}
                            </PopoverHandler>
                            <PopoverContent className='p-4 space-y-4'>
                                <header className='flexBetween'>
                                    <Typography
                                        variant='small'
                                        color='blue-gray'
                                        className='font-medium'
                                    >
                                        Filter by Date
                                    </Typography>
                                    <div className='flex flex-wrap items-center gap-1'>
                                        <button
                                            onClick={() =>
                                                handleFastFilter('week')
                                            }
                                        >
                                            <Chip
                                                value='This Week'
                                                className='text-xs capitalize cursor-pointer'
                                                color='green'
                                                variant='outlined'
                                                size='sm'
                                            />
                                        </button>
                                        <button
                                            onClick={() =>
                                                handleFastFilter('month')
                                            }
                                        >
                                            <Chip
                                                value='This Month'
                                                className='text-xs capitalize cursor-pointer'
                                                color='green'
                                                variant='outlined'
                                                size='sm'
                                            />
                                        </button>
                                    </div>
                                </header>
                                <div className='flex gap-2 pt-2'>
                                    <DatePicker
                                        value={from}
                                        onChange={setFrom}
                                        inputPlaceholder='From'
                                        shouldHighlightWeekends
                                    />
                                    <span className='flexCenter'>-</span>
                                    <DatePicker
                                        value={to}
                                        onChange={setTo}
                                        inputPlaceholder='To'
                                        shouldHighlightWeekends
                                    />
                                </div>
                                <div className='flex gap-2'>
                                    {fromDate && toDate && (
                                        <Button
                                            onClick={clearDateFilter}
                                            variant='filled'
                                            color='red'
                                            fullWidth
                                            className='flex items-center justify-center gap-2 ml-auto text-white'
                                        >
                                            <MdClear size={18} />
                                            <span>Clear</span>
                                        </Button>
                                    )}
                                    <Button
                                        onClick={handleFilter}
                                        variant='filled'
                                        color='blue'
                                        fullWidth
                                        className='flex items-center justify-center gap-2 ml-auto text-white'
                                        disabled={!from || !to}
                                    >
                                        <MdAdd size={18} />
                                        <span>Filter</span>
                                    </Button>
                                </div>
                            </PopoverContent>
                        </Popover>
                    )}

                    {addAction && (
                        <Button
                            onClick={addAction}
                            variant='filled'
                            color='green'
                            className='flex items-center gap-2 ml-auto text-white'
                        >
                            <MdAdd size={18} />
                            <span>Create</span>
                        </Button>
                    )}
                </div>
            ) : null}

            <Card className='w-full h-full border shadow-none'>
                <table className='w-full text-left table-auto min-w-max'>
                    <thead>
                        {table.getHeaderGroups().map((headerGroup, index) => (
                            <tr key={index}>
                                {headerGroup.headers.map((header, index) => (
                                    <th
                                        key={index}
                                        className='border-b border-blue-gray-100 '
                                    >
                                        {header.isPlaceholder ? null : (
                                            <>
                                                <div
                                                    {...{
                                                        className:
                                                            header.column.getCanSort() &&
                                                            !isLoading
                                                                ? 'cursor-pointer select-none p-4'
                                                                : 'p-4',
                                                        onClick: isLoading
                                                            ? null
                                                            : header.column.getToggleSortingHandler(),
                                                    }}
                                                >
                                                    <Typography
                                                        variant='small'
                                                        color='blue-gray'
                                                        className='flex items-center gap-1 font-normal leading-none opacity-70'
                                                    >
                                                        {flexRender(
                                                            header.column
                                                                .columnDef
                                                                .header,
                                                            header.getContext()
                                                        )}
                                                        {{
                                                            asc: (
                                                                <TbSortAscending
                                                                    size={16}
                                                                />
                                                            ),
                                                            desc: (
                                                                <TbSortDescending
                                                                    size={16}
                                                                />
                                                            ),
                                                        }[
                                                            header.column.getIsSorted()
                                                        ] ?? null}
                                                    </Typography>
                                                </div>
                                            </>
                                        )}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody>
                        {isLoading ? (
                            <tr className='relative'>
                                <TableLoading />
                            </tr>
                        ) : !isLoading &&
                          table.getRowModel()?.rows?.length === 0 ? (
                            <tr className='relative'>
                                <TableNoData />
                            </tr>
                        ) : !isLoading &&
                          table.getRowModel()?.rows?.length > 0 ? (
                            table.getRowModel()?.rows?.map((row, index) => (
                                <tr
                                    key={index}
                                    className='even:bg-blue-gray-50/50'
                                >
                                    {row
                                        .getVisibleCells()
                                        .map((cell, index) => (
                                            <td key={index} className='p-4'>
                                                <Typography
                                                    variant='small'
                                                    color='blue-gray'
                                                    className='font-normal'
                                                >
                                                    {flexRender(
                                                        cell.column.columnDef
                                                            .cell,
                                                        cell.getContext()
                                                    )}
                                                </Typography>
                                            </td>
                                        ))}
                                </tr>
                            ))
                        ) : null}
                    </tbody>
                </table>
            </Card>

            {pagination ? (
                <div className='pt-10 flexBetween'>
                    <div className='gap-4 flexCenter '>
                        <div>
                            <Select
                                size='md'
                                label='Rows per page'
                                value={
                                    pageSize
                                        ? pageSize.toString()
                                        : table
                                              .getState()
                                              .pagination.pageSize.toString()
                                }
                                onChange={(value) => {
                                    if (setPageSize) {
                                        setPageSize(Number(value));
                                    } else {
                                        table.setPageSize(Number(value));
                                    }
                                }}
                            >
                                {[10, 20, 30, 40, 50].map((pageSize, index) => (
                                    <Option
                                        key={index}
                                        value={String(pageSize)}
                                    >
                                        {pageSize}
                                    </Option>
                                ))}
                            </Select>
                        </div>
                        <span className='text-sm'>entries</span>
                    </div>
                    <div className='gap-4 flexCenter'>
                        <div className='justify-end w-36 flexCenter'>
                            <span className='text-sm'>Page</span>
                            <span className='mx-2 text-sm'>
                                <strong>
                                    {currentPage ??
                                        table.getState().pagination.pageIndex +
                                            1}{' '}
                                    of {pageCount ?? table.getPageCount()}
                                </strong>
                            </span>
                            <span>|</span>
                        </div>
                        <ButtonGroup
                            size={'sm'}
                            color={'gray'}
                            variant={'outlined'}
                        >
                            <IconButton
                                onClick={handlePrevPage}
                                size={'sm'}
                                color={'gray'}
                                variant={'outlined'}
                                disabled={
                                    canPreviousPage
                                        ? !canPreviousPage
                                        : !table.getCanPreviousPage()
                                }
                            >
                                <HiChevronLeft size={20} />
                            </IconButton>

                            <IconButton
                                onClick={handleNextPage}
                                size={'sm'}
                                color={'gray'}
                                variant={'outlined'}
                                disabled={
                                    canNextPage
                                        ? !canNextPage
                                        : !table.getCanNextPage()
                                }
                            >
                                <HiChevronRight size={20} />
                            </IconButton>
                        </ButtonGroup>
                    </div>
                </div>
            ) : null}
        </div>
    );
}
