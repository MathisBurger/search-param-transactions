import {type PropsWithChildren, useRef } from "react";
import {
    SearchParamTransactionContext,
    type TransactionElement,
} from "./useTransactionalSearchParams";

/**
 * Wrapper for search parameter transactions.
 * It provides the required application wide context
 *
 * @constructor
 */
const SearchParamTransactionWrapper = ({
                                           children,
                                       }: PropsWithChildren<unknown>) => {
    const ref = useRef<TransactionElement[]>([]);

    return (
        <SearchParamTransactionContext.Provider value={ref}>
            {children}
        </SearchParamTransactionContext.Provider>
    );
};

export default SearchParamTransactionWrapper;
