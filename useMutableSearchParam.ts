import useTransactionalSearchParams from "./useTransactionalSearchParams";

type ResponseType = [
        string | null,
    (v: string | null, options?: UpdateOptions) => void,
];

interface UpdateOptions {
    /**
     * Indicates whether the update should be not committed directly
     */
    noCommit?: boolean;
}

/**
 * Provides the option to handle search params in a mutable way
 *
 * @param param The name of the search param
 */
const useMutableSearchParam = (param: string): ResponseType => {
    const { updateParam, searchParams, commit } = useTransactionalSearchParams();

    const updateParamTransactional = (
        value: string | null,
        options?: UpdateOptions,
    ) => {
        updateParam(param, value);
        if (options === undefined || !options.noCommit) {
            commit();
        }
    };

    if (searchParams.has(param)) {
        return [searchParams.get(param), updateParamTransactional];
    }
    return [null, updateParamTransactional];
};

export default useMutableSearchParam;
