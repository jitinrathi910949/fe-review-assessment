import './pagination.css';
import { useSearchParams } from 'react-router-dom';
import { useMemo } from 'react';
import { usePaginationQuery } from '../query';

type Props = {
    currentOffset?: number;
    totalPage?: number;
    totalCount?: number
}

export const Pagination = ({ currentOffset = 1, totalPage = 0, totalCount,
}: Props) => {

    const { handleCountChange, onBtPaginate, count } = usePaginationQuery();

    const isNextDisabled = currentOffset >= totalPage;

    const isBackDisabled = currentOffset <= 1;


    const getShowingText = useMemo(() => {
        const numCount = Number(count)
        const numTotalCount = Number(totalCount)
        const lowerCount = (currentOffset - 1) * numCount + 1;
        let higherCount = currentOffset * numCount;
        if (higherCount > numTotalCount)
            higherCount = numTotalCount;

        return `Showing ${lowerCount}-${higherCount} of ${totalCount}`;
    }, [count, currentOffset, totalCount]);


    return (
        <div className="pagination">
            <span>{getShowingText}</span>
            <select value={count} name="count" onChange={handleCountChange}>
                <option value="10">10</option>
                <option value="15">15</option>
                <option value="20">20</option>
            </select>
            <button className={isBackDisabled && 'disabled' || ''} disabled={isBackDisabled} onClick={() => onBtPaginate(1)} >First</button>
            <button className={isBackDisabled && 'disabled' || ''} disabled={isBackDisabled} onClick={() => onBtPaginate(currentOffset - 1)} >Previous</button>
            <span>{currentOffset}</span>
            <button className={isNextDisabled && 'disabled' || ''} disabled={isNextDisabled} onClick={() => onBtPaginate(currentOffset + 1)} >Next</button>
            <button className={isNextDisabled && 'disabled' || ''} disabled={isNextDisabled} onClick={() => onBtPaginate(totalPage)} >Last</button>
        </div>

    )
}
