import { createContext, type MutableRefObject, useContext } from "react";
import { useSearchParams } from "react-router-dom";

export interface TransactionElement {
    /**
     * Name of the search param that should be updated
     */
    paramName: string;
    /**
     * The value of the search param
     */
    value: string | null;
}

/**
 * Context that contains all transaction elements
 */
export const SearchParamTransactionContext = createContext<MutableRefObject<
    TransactionElement[]
> | null>(null);

/**
 * Provides functions to perform a search parameter transaction
 */
const useTransactionalSearchParams = () => {
    const context = useContext(SearchParamTransactionContext);
    const [searchParams, setSearchParams] = useSearchParams();

    if (context === null) {
        throw new Error("The context provider for transactions is not provided");
    }

    /**
     * Adds a new update to the transaction
     *
     * @param paramName Name of the search parameter that should be updated
     * @param value The new value of the search param
     */
    const updateParam = (paramName: string, value: string | null) =>
        context.current.push({ paramName, value });

    /**
     * Commits a transaction
     */
    const commit = () => {
        for (const element of context.current) {
            if (element.value === null) {
                searchParams.delete(element.paramName);
            } else {
                searchParams.set(element.paramName, element.value);
            }
        }
        setSearchParams(searchParams);
        context.current = [];
    };

    return { updateParam, commit, searchParams };
};

export default useTransactionalSearchParams;
